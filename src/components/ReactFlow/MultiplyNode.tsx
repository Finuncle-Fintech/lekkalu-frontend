// Define the custom BaseKPI node component with default node styling
import { Handle, Node, Position } from '@xyflow/react'
import React from 'react'

const MultiplyNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="react-flow__node-default">
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ top: '25%' }} // Adjust the position
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: '75%' }} // Adjust the position
      />
      <Handle type="source" position={Position.Right} />
      <div>{data.label}</div>
    </div>
  )
}
// Add a new Multiply node to the flow
export const addMultiplyNode = (
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
) => {
  const newNode: Node = {
    id: `multiply_${nodes.length + 1}`,
    position: { x: 0, y: 0 },
    data: { label: 'Multiply' },
    type: 'multiplyNode',
  }
  setNodes((nds: Node[]) => nds.concat(newNode))
}
export default MultiplyNode
