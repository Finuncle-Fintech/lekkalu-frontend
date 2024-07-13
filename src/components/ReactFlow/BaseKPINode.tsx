// Define the custom BaseKPI node component with default node styling
import { Handle, Position } from '@xyflow/react'
import React from 'react'

const BaseKPINode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="react-flow__node-default">
      <Handle type="source" position={Position.Right} />
      <div>{data.label}</div>
    </div>
  )
}
export default BaseKPINode
