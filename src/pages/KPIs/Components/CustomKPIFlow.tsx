import React, { useCallback, useEffect, useState } from 'react'
import {
  addEdge, Background, BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import KPINode from '@/components/ReactFlow/KPINode'
import BasicMathNode, { addMathNode } from '@/components/ReactFlow/BasicMathNode'
import '@xyflow/react/dist/style.css'
import BaseKpiAddButton from '@/pages/KPIs/Components/BaseKpiAddButton'
import BaseKpiNode, { addBaseKpiNode, addConstNumNode, ConstNumNode } from '@/components/ReactFlow/BaseKpiNode'

const initialNodes: Node[] = [
  {
    id: 'kpi',
    position: { x: 0, y: 0 },
    data: { label: 'KPI' },
    type: 'kpiNode',
  },
]
const initialEdges: Edge[] = []

interface CustomKPIFlowProps {
  setLatexEquation: (equation: string) => void;
}

export default function CustomKPIFlow({ setLatexEquation }: CustomKPIFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [kpiLabel] = useState<string>('\\mathit{kpi}')

  const generateLatexEquation = useCallback((currentEdges: Edge[]) => {
    const startNode = nodes.find((node) => node.type === 'kpiNode')
    if (!startNode) {
      setLatexEquation('')
      return
    }

    const getLabelsRecursively = (nodeId: string, visited = new Set<string>()): string[] => {
      if (visited.has(nodeId)) {
        return []
      }
      visited.add(nodeId)

      const incomingEdges = currentEdges.filter((edge) => edge.target === nodeId)
      return incomingEdges.flatMap((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source)
        if (!sourceNode) return []
        const subLabels = getLabelsRecursively(sourceNode.id, visited)

        if (sourceNode.type === 'multiplyNode' || sourceNode.type === 'divideNode') {
          const operator = sourceNode.type === 'multiplyNode' ? ' \\cdot ' : ' \\div '
          return subLabels.length > 0 ? [`(${subLabels.join(operator)})`] : []
        }
        const sourceLabel = sourceNode.type === 'constNumNode' ? `${sourceNode.data.label}` : `\\mathit{${sourceNode.data.label}}`
        return subLabels.length > 0 ? subLabels.concat(sourceLabel) : [sourceLabel]
      })
    }

    const lhsArray = getLabelsRecursively(startNode.id)
    const lhs = lhsArray.join(' \\cdot ')
    const latex = `${lhs} = ${kpiLabel}`
    setLatexEquation(latex)
  }, [nodes, kpiLabel, setLatexEquation])

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdges = addEdge(params, eds)
        generateLatexEquation(newEdges)
        return newEdges
      })
    },
    [setEdges, generateLatexEquation],
  )

  useEffect(() => {
    generateLatexEquation(edges)
  }, [edges, generateLatexEquation])

  const isValidConnection = (connection: Connection | Edge): boolean => {
    if ('target' in connection) {
      const targetNode = nodes.find((node) => node.id === connection.target)
      if (targetNode && targetNode.type === 'kpiNode') {
        const targetNodeConnections = edges.filter(
          (edge) => edge.target === targetNode.id,
        )
        return targetNodeConnections.length < 1
      }
    }
    return true
  }

  return (
    <div className="mt-5">
      <div className="flex shadow-lg">
        <div className="shadow-inner p-4 bg-white rounded-l-xl"
             style={{
               minWidth: '400px',
               minHeight: '400px',
               width: '500px',
               height: '500px',
               backgroundColor: '#f0f0f0',
             }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            fitView
            nodeTypes={{
              kpiNode: KPINode,
              baseKpiNode: BaseKpiNode,
              multiplyNode: BasicMathNode,
              divideNode: BasicMathNode,
              constNumNode: ConstNumNode,
            }}
          >
            <Background
              variant={BackgroundVariant.Dots} // you can use "lines" for a line grid
              gap={16} // size of the grid
              size={1} // size of the dots
              color="#888" // color of the grid
            />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div className=" bg-blue-50 mr-1 ">
          <div className="mx-5">
            <div className="collapse collapse-arrow bg-gray-100 shadow-lg rounded-md my-2">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-sm  text-gray-900">Basic KPIs
              </div>
              <div className="collapse-content text-sm text-gray-700">
                <BaseKpiAddButton onButtonClick={() => addBaseKpiNode('TotalCash', nodes, setNodes)}
                                  name={'Total Cash'} />
                <BaseKpiAddButton onButtonClick={() => addBaseKpiNode('TotalIncomeExpense', nodes, setNodes)}
                                  name={'Total Monthly Expense'} />
              </div>
            </div>
            <div className="collapse collapse-arrow bg-gray-100 shadow-lg rounded-md my-2">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-sm  text-gray-900">Basic Math Operations
              </div>
              <div className="collapse-content text-gray-700">
                <BaseKpiAddButton onButtonClick={() => addMathNode('multiplyNode', nodes, setNodes)}
                                  name={'Multiply'} />
                <BaseKpiAddButton onButtonClick={() => addMathNode('divideNode', nodes, setNodes)}
                                  name={'Divide'} />
                <BaseKpiAddButton onButtonClick={() => addConstNumNode('100', nodes, setNodes)}
                                  name={'Constant'} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-r-xl">

          <p className="text-center text-gray-500 dark:text-gray-400">Use the popular KPIs along with math operations to
            build your own custom KPI</p>
          <p className="text-center text-gray-500 dark:text-gray-400">Click on any Helper component to add it to your
            KPI equation, and also can be seen on KPI&apos;s Canvas on the left</p>
          <p className="text-center text-gray-500 dark:text-gray-400">Click backspace on a selected wire to delete
            it</p>

        </div>
      </div>
    </div>
  )
}
