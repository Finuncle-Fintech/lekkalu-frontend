import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react'
import { Button } from '../ui/button'
import When from '../When/When'

type Props = {
  showSkipButtons?: boolean
  onSkipPrevious?: () => void
  onPrevious: () => void
  disablePrevious: boolean
  disableNext: boolean
  onNext: () => void
  onSkipNext?: () => void
}

export default function Pagination({
  showSkipButtons = false,
  onSkipPrevious,
  onPrevious,
  disablePrevious,
  disableNext,
  onNext,
  onSkipNext,
}: Props) {
  return (
    <div className='flex items-center'>
      <When truthy={showSkipButtons}>
        <Button size='sm' variant='ghost' disabled={disablePrevious} onClick={onSkipPrevious}>
          <SkipBackIcon className='w-4 h-4' />
        </Button>
      </When>
      <Button size='sm' variant='ghost' disabled={disablePrevious} onClick={onPrevious}>
        <ChevronLeftIcon className='w-4 h-4' />
      </Button>
      <Button size='sm' variant='ghost' disabled={disableNext} onClick={onNext}>
        <ChevronRightIcon className='w-4 h-4' />
      </Button>
      <When truthy={showSkipButtons}>
        <Button size='sm' variant='ghost' disabled={disableNext} onClick={onSkipNext}>
          <SkipForwardIcon className='w-4 h-4' />
        </Button>
      </When>
    </div>
  )
}
