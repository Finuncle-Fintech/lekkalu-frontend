import React from 'react'
import { Link } from 'react-router-dom'
import { SocialIconType } from '@/types/social-icon'

const SocialIcon = ({ Icon, link }: SocialIconType) => {
  return (
    <Link to={link} target='_blank'>
      <span className='block bg-white py-4 px-5 rounded-sm text-primary hover:bg-gray-300 hover:transition'>
        {Icon}
      </span>
    </Link>
  )
}

export default SocialIcon
