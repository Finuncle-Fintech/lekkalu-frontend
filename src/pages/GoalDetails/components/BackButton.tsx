import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function BackButton() {
  return (
    <div>
      <Link to='/goals' className='flex items-center gap-2 mb-10 text-muted-foreground w-40'>
        {' '}
        <ArrowLeft className='w-4 h-4' /> Back to goals
      </Link>
    </div>
  )
}
