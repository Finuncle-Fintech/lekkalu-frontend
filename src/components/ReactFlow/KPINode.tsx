// Define the custom KPI node component with default node styling
import { Handle, Position } from '@xyflow/react'
import React from 'react'

const KPINode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
    </div>
  )
}

export default KPINode
