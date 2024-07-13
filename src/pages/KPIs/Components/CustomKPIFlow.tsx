import React, { useCallback, useEffect, useState } from 'react'
import {
  addEdge,
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
import CashNode, { addCashNode } from '@/components/ReactFlow/CashNode'
import MultiplyNode, { addMultiplyNode } from '@/components/ReactFlow/MultiplyNode'
import '@xyflow/react/dist/style.css'

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
  const [kpiLabel] = useState<string>('KPI')

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

        if (sourceNode.type === 'multiplyNode') {
          return subLabels.length > 0 ? [`(${subLabels.join(' \\cdot ')})`] : []
        }
        const sourceLabel = `\\mathit{${sourceNode.data.label}}`
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
    <div>
      <button onClick={() => addCashNode(nodes, setNodes)}>Cash</button>
      <button onClick={() => addMultiplyNode(nodes, setNodes)}>Add Multiply Node</button>
      <button onClick={() => generateLatexEquation(edges)}>Generate LaTeX Equation</button>
      <div style={{ minWidth: '200px', minHeight: '400px', width: 'inherit', height: '500px' }}>
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
            baseKpiNode: CashNode,
            multiplyNode: MultiplyNode,
          }}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <h3>LaTeX Equation:</h3>
    </div>
  )
}
