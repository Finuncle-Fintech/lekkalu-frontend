// Define the custom BaseKPI node component with default node styling
import { Handle, Position } from '@xyflow/react'
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
export default MultiplyNode
