import React, { useCallback } from 'react'
import { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import When from '../When/When'
import DatePicker from '../DatePicker/DatePicker'

// @TODO: Add extraContent prop
type BaseInput = {
  id: string
  label: string
  className?: string
  style?: React.CSSProperties
}

type NumberInput = BaseInput & {
  type: 'number'
  hasRange?: boolean
  range?: {
    min: number
    max: number
    step: number
  }
}

type DateInput = BaseInput & {
  type: 'date'
  defaultDate?: Date
}

export type InputField = NumberInput | DateInput

type Props = {
  control: Control<any>
  inputs: InputField[]
}

export default function InputFieldsRenderer({ inputs, control }: Props) {
  const getFieldInput = useCallback((input: InputField, field: ControllerRenderProps<FieldValues, string>) => {
    switch (input.type) {
      case 'number': {
        return (
          <div className='space-y-2'>
            <Input type='number' placeholder={input.label} {...field} />
            <When truthy={Boolean(input.hasRange)}>
              <Slider
                defaultValue={[field.value]}
                min={input?.range?.min}
                max={input?.range?.max}
                step={input?.range?.step}
                onValueChange={(value) => {
                  field.onChange(value[0])
                }}
              />
            </When>
          </div>
        )
      }

      case 'date': {
        return <DatePicker placeholder={input.label} defaultDate={input.defaultDate} {...field} />
      }

      default: {
        return null
      }
    }
  }, [])

  return inputs.map((input) => (
    <FormField
      key={input.id}
      control={control}
      name={input.id}
      render={({ field }) => (
        <FormItem className={input.className} style={input.style}>
          <FormLabel>{input.label}</FormLabel>
          <FormControl>{getFieldInput(input, field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ))
}
