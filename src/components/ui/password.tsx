import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, InputProps } from './input'
import { cn } from '@/utils/utils'

export type PasswordProps = Omit<InputProps, 'type'>

const Password = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, style, ...props }: PasswordProps, ref) => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

    return (
      <div
        className={cn(
          'flex rounded-md items-center gap-2 border px-3 border-input bg-background ring-offset-background focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        style={style}
      >
        <Input
          ref={ref}
          type={visiblePassword ? 'text' : 'password'}
          className='!border-none !outline-none p-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
          {...props}
        />
        <div
          className='cursor-pointer'
          onClick={() => {
            setVisiblePassword((prev) => !prev)
          }}
        >
          {visiblePassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
        </div>
      </div>
    )
  },
)

Password.displayName = 'Password'
export default Password
