import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, UnlockIcon } from 'lucide-react'

import { cn } from '@/utils/utils'
import Options from './Options'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type ComparisonType = {
  id: number
  access: string
  name: string
  style?: React.CSSProperties
  className?: String
}

const Comparison = ({ id, access, name, style, className }: ComparisonType) => {
  const [allowRename, setAllowRename] = useState(false)
  const [comparisonName, setComparisonName] = useState(name)
  const handleRename = () => {
    // goalMutation.mutate({ name: goalName })
  }

  const comparisonNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (allowRename) {
      comparisonNameRef.current?.focus()
    }
  }, [allowRename])

  const handleRenameCancel = () => {
    setAllowRename(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleRename()
    } else if (e.code === 'Escape') {
      handleRenameCancel()
    }
  }

  const handleAllowRename = () => {
    setAllowRename(true)
  }

  return (
    <div
      className={cn('flex flex-col rounded-lg p-4 shadow-md hover:shadow-lg hover:cursor-pointer', className)}
      style={{ ...style }}
    >
      <Options id={id} access={access} handleAllowRename={handleAllowRename} />
      <Link to={!allowRename ? `/comparison/${id}` : ''}>
        <div className='flex flex-col gap-y-5'>
          <div
            className={`self-center p-5 text-primary p-5 rounded-full bg-${access === 'private' ? 'red' : 'blue'}-200`}
          >
            {access === 'private' ? <Lock size={80} /> : <UnlockIcon size={80} />}
          </div>
          {allowRename ? (
            <>
              <Input
                ref={comparisonNameRef}
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
                onKeyDown={handleKeyPress}
                type='textarea'
              />
              <div className='flex gap-2 justify-center'>
                <Button onClick={handleRename} loading={false}>
                  Rename
                </Button>
                <Button onClick={handleRenameCancel} variant={'secondary'}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <p className='text-lg font-bold text-center'>{name}</p>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Comparison
