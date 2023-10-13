import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import cardStyles from './Add-card.module.css'
const Add = () => {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.card}>
        <AddCircleOutlineIcon sx={{ fontSize: '30px', color: '#fff' }} />
      </div>
    </div>
  )
}

export default Add
