// Define the custom BaseKPI node component with default node styling
import { Handle, Node, Position } from '@xyflow/react'
import React from 'react'

const BaseKpiNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="react-flow__node-default">
      <Handle type="source" position={Position.Right} />
      <div>{data.label}</div>
    </div>
  )
}
export const ConstNumNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="react-flow__node-default">
      <Handle type="source" position={Position.Right} />
      <div>{data.label}</div>
    </div>
  )
}
export const addBaseKpiNode = (
  label: string,
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
) => {
  const newNode: Node = {
    id: `cash_${nodes.length + 1}`,
    position: { x: 0, y: 0 },
    data: { label },
    type: 'baseKpiNode',
  }
  setNodes((nds: Node[]) => nds.concat(newNode))
}
export const addConstNumNode = (
  label: string,
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
) => {
  const newNode: Node = {
    id: `const_num_${nodes.length + 1}`,
    position: { x: 0, y: 0 },
    data: { label },
    type: 'constNumNode',
  }
  setNodes((nds: Node[]) => nds.concat(newNode))
}
export default BaseKpiNode
