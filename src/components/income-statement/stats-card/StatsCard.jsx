import React from 'react'
import cardStyles from './stats-card.module.css'
const StatsCard = ({ label, value, bg }) => {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.card} style={{ background: bg }}>
        <div className={cardStyles.shine} />
        <p className={cardStyles.label} style={{ ...(bg && { color: 'white' }) }}>
          {label}
        </p>
        <p className={cardStyles.value}>{value}</p>
      </div>
      <div className={cardStyles.shadow} />
    </div>
  )
}

export default StatsCard
