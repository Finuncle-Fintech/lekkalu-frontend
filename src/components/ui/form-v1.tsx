import React from 'react'
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

export const SaveButton = () => (
  <div className='w-[59px] h-[21px] px-[5px] bg-[#154181] rounded-[5px] justify-center items-center gap-2.5 flex'>
    <button type='submit' className="text-white text-[13px] font-normal font-['Charter']">
      Save
    </button>
  </div>
)

interface CancelButtonProps {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const CancelButton: React.FC<CancelButtonProps> = ({ clickHandler }) => (
  <div className='w-[59px] h-[21px] px-[5px] bg-[#154181]/20 rounded-[5px] justify-center items-center gap-2.5 flex'>
    <button
      className="text-black text-[13px] font-normal font-['Charter']"
      onClick={(event) => {
        event.preventDefault()
        clickHandler(event)
      }}
    >
      Cancel
    </button>
  </div>
)

type DetailFieldProps = {
  label: string
  children: React.ReactNode
  error?: FieldError
}

// Define the props for the generic field component
interface GenericFieldProps<T extends FieldValues> {
  name: Path<T>
  type?: string
  register: UseFormRegister<T>
  className?: string // Accept custom className as a prop
  placeholder?: string
  valueAsNumber?: boolean
  disabled?: boolean
  textAlign?: 'left' | 'center' | 'right' // Accept custom textAlight as a prop
  value?: string | number
  choices?: string[]
}

// Generic component for rendering a field
const GenericFormField = <T extends FieldValues>({
  name,
  type = 'text', // default input type
  register,
  className = '', // default to an empty string for className
  placeholder = '', // default to an empty string for placeholder
  valueAsNumber = false, // default to false for valueAsNumber
  disabled = false, // default to false for disabled
  textAlign = 'right', // default to left for textAlight
  value,
  choices, //Destructive choices
}: GenericFieldProps<T>) => {
  return type === 'choice' ? (
    <select {...register(name)} className={className} disabled={disabled} style={{ textAlign }}>
      {choices?.map((choice, idx) => (
        <option key={idx} value={choice}>
          {choice}
        </option>
      ))}
    </select>
  ) : (
    <input
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      type={type}
      className={`${className} ${type === 'number' ? 'no-spinner' : ''}`} // Add custom class for number inputs
      style={{ textAlign }} // Apply custom text alignment
      disabled={disabled}
      value={value}
    />
  )
}

export const DetailField: React.FC<DetailFieldProps> = ({ label, children, error }) => (
  // Field component that takes the field body as child, text as label to render a field
  <div className='flex flex-col h-full w-full'>
    <div className='flex justify-between w-full gap-10'>
      <div className='self-stretch text-black/50 text-base leading-snug whitespace-nowrap flex items-center justify-center'>
        <p className='font-normal font-["Charter"]'>{label}</p>
      </div>
      <div className='justify-start items-center gap-[5px] inline-flex'>{children}</div>
    </div>
    {error && <p className='text-destructive text-md text-right'>{error.message}</p>}
  </div>
)

interface FieldProps {
  error?: FieldError
  children: React.ReactNode
}

export const Field: React.FC<FieldProps> = ({ error, children }) => (
  <div>
    {children}
    {error && <p className='text-destructive text-md text-right'>{error.message}</p>}
  </div>
)

export const FieldContainer = ({ children }: { children: React.ReactNode }) => (
  // Field Container component that takes children fields and renders them in a row
  <div className='w-full p-[5px] bg-[#154181]/20 rounded-[5px] justify-start items-start flex-col inline-flex'>
    {children}
  </div>
)
export default GenericFormField
