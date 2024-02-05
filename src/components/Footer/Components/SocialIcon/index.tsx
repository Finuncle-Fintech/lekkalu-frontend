import React from 'react'
import { Link } from 'react-router-dom'
import { SocialIconType } from '@/types/social-icon'

const SocialIcon = ({ Icon, link }: SocialIconType) => {
  return (
    <Link to={link} target='_blank'>
      <span className='block bg-white h-10 px-4 py-3 rounded text-primary hover:bg-gray-300 hover:transition'>
        {<Icon size={18} />}
      </span>
    </Link>
  )
}

export default SocialIcon
