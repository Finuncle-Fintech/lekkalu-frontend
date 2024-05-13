import React from 'react'
import { Button } from '@/components/ui/button'
import { useStepper } from '@/components/ui/stepper'
import { AddGoalSchema } from '@/schema/goals'

type StepperFooterType = {
  isEdit: boolean
  values: AddGoalSchema
  handleCreate: () => void
  isLoading: boolean
}

const StepFooter = ({ isEdit, values, handleCreate, isLoading }: StepperFooterType) => {
  const { nextStep, prevStep, isLastStep, isDisabledStep, hasCompletedAllSteps } = useStepper()

  const FinishLabel = isEdit ? 'Edit' : 'Create'

  const disableNext = () => {
    if (values.name && values.goal_proportionality && values.track_kpi && values.target_date) {
      return false
    }
    return true
  }

  const disableCreate = () => {
    if (values.target_value && values.target_contribution_source) {
      return false
    }
    return true
  }

  const shouldDisable = () => {
    if (isLastStep) {
      return disableCreate()
    } else {
      return disableNext()
    }
  }

  const handleNext = () => {
    if (isLastStep) {
      handleCreate()
    }
    nextStep()
  }

  return (
    <>
      {hasCompletedAllSteps ? <p className='p-5 text-gray-500'>In Progress...</p> : <></>}
      <div className='w-full flex justify-end gap-2'>
        <Button disabled={isDisabledStep} onClick={prevStep} size='sm' variant='secondary' type='button'>
          Prev
        </Button>
        <Button size='sm' onClick={handleNext} disabled={shouldDisable()} type='button' loading={isLoading}>
          {isLastStep || hasCompletedAllSteps ? FinishLabel : 'Next'}
        </Button>
      </div>
    </>
  )
}

export { StepFooter }
