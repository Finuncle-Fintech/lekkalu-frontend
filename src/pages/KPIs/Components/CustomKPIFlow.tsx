import React, { ChangeEvent, useCallback, useState } from 'react'
import { addEdge, Connection, Edge, OnConnect, ReactFlow, useEdgesState, useNodesState, Node } from '@xyflow/react'
import KPINode from '@/components/ReactFlow/KPINode'
import BaseKPINode from '@/components/ReactFlow/BaseKPINode'
import MultiplyNode from '@/components/ReactFlow/MultiplyNode'
import '@xyflow/react/dist/style.css'

// Define the initial nodes and edges
const initialNodes: Node[] = [
  {
    id: 'kpi',
    position: { x: 0, y: 0 },
    data: { label: 'KPI' },
    type: 'kpiNode', // Specify the custom node type
  },
]
const initialEdges: Edge[] = []

export default function CustomKPIFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [kpiLabel, setKpiLabel] = useState('KPI')
  const [latexEquation, setLatexEquation] = useState('')

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  // Update KPI node label when kpiLabel state changes
  const updateKpiLabel = (event: ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value
    setKpiLabel(newLabel)

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'kpi') {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          }
        }
        return node
      }),
    )
  }

  // Add a new BaseKPI node to the flow
  const addBaseKPINode = () => {
    const newNode: Node = {
      id: `basekpi_${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'BaseKPI' },
      type: 'baseKpiNode',
    }
    setNodes((nds) => nds.concat(newNode))
  }

  // Add a new Multiply node to the flow
  const addMultiplyNode = () => {
    const newNode: Node = {
      id: `multiply_${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'Multiply' },
      type: 'multiplyNode',
    }
    setNodes((nds) => nds.concat(newNode))
  }

  // Custom validation function to restrict KPI node to one connection
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

  // Function to generate LaTeX equation from the flowchart
  const generateLatexEquation = () => {
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

      const incomingEdges = edges.filter((edge) => edge.target === nodeId)
      const labels: string[] = incomingEdges.flatMap((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source)
        if (!sourceNode) return []
        const subLabels = getLabelsRecursively(sourceNode.id, visited)

        if (sourceNode.type === 'multiplyNode') {
          return subLabels.length > 0 ? [`(${subLabels.join(' \\cdot ')})`] : []
        }
        const sourceLabel = `\\mathit{${sourceNode.data.label}}`
        return subLabels.length > 0 ? subLabels.concat(sourceLabel) : [sourceLabel]
      })

      return labels
    }

    const lhsArray = getLabelsRecursively(startNode.id)
    const lhs = lhsArray.join(' \\cdot ')
    const rhs = kpiLabel
    const latex = `${lhs} = ${rhs}`
    setLatexEquation(latex)
  }
  return (
    <div>
      <input
        type="text"
        value={kpiLabel}
        onChange={updateKpiLabel}
        placeholder="Enter KPI label"
      />
      <button onClick={addBaseKPINode}>Add Base KPI Node</button>
      <button onClick={addMultiplyNode}>Add Multiply Node</button>
      <button onClick={generateLatexEquation}>Generate LaTeX Equation</button>
      <div style={{ width: '80vw', height: '80vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          nodeTypes={{
            kpiNode: KPINode,
            baseKpiNode: BaseKPINode,
            multiplyNode: MultiplyNode,
          }} // Register the custom node types
        />
      </div>
      <div>
        <h3>LaTeX Equation:</h3>
        <p>{latexEquation}</p>
      </div>
    </div>
  )
}
