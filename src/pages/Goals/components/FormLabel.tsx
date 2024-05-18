import React from 'react'
import { FormLabel } from '@/components/ui/form'
import { TooltipForGoals } from './Tooltip'

type FormLabelForGoalFormType = {
  label: string
  info?: string
  required?: boolean
}

const FormLabelForGoalForm = ({ label, info, required }: FormLabelForGoalFormType) => {
  return (
    <FormLabel>
      <div className='flex gap-2'>
        <p className='self-center'>
          {label}
          {required ? '*' : ''}
        </p>
        {info && (
          <TooltipForGoals iconSize={'small'}>
            <div className='max-w-[200px]'>{info}</div>
          </TooltipForGoals>
        )}
      </div>
    </FormLabel>
  )
}

export { FormLabelForGoalForm }
