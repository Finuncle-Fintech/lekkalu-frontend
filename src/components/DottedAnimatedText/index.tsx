import React from 'react'

const DottedAnimatedText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center space-x-1'>
      {children}
      <div className='dot1 animate-bounce'>.</div>
      <div className='dot2 animate-bounce200'>.</div>
      <div className='dot3 animate-bounce400'>.</div>
    </div>
  )
}

export default DottedAnimatedText
