// Define the custom BaseKPI node component with default node styling
import { Handle, Node, Position } from '@xyflow/react'
import React from 'react'

const BasicMathNode = ({ data }: { data: { label: string } }) => {
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

export const addMathNode = (
  type: string,
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
) => {
  const labelMap: { [key: string]: string } = {
    multiplyNode: 'x',
    divideNode: '÷',
    // Add more mappings here as needed
  }

  const newNode: Node = {
    id: `${type + nodes.length + 1}`,
    position: { x: 0, y: 0 },
    data: { label: labelMap[type] || 'Label' },
    type,
  }

  setNodes((nds: Node[]) => nds.concat(newNode))
}
export default BasicMathNode
