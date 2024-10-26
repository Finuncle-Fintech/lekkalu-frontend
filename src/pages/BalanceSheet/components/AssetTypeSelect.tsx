import React from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * AssetTypeSelect component.
 *
 * This component renders a selectable asset type option. When clicked, it toggles an overlay
 * unless the `asOption` prop is set to `true`.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.toggleOverlay - Function to toggle the overlay visibility.
 * @param {boolean} [props.asOption=false] - If true, clicking the component will not toggle the overlay.
 * @param {React.ReactElement} props.icon - The icon to display in the component.
 *
 * @returns {JSX.Element} The rendered component.
 */
type AssetTypeSelectProps = {
  toggleOverlay: () => void
  asOption?: boolean
  children: React.ReactNode
  dispatch?: React.Dispatch<{
    type: 'SET_MODAL'
    payload: 'Real Estate' | 'Metal' | 'Equity' | 'Bank Account' | 'Mutual Fund'
  }>
  payload: 'Real Estate' | 'Metal' | 'Equity' | 'Bank Account' | 'Mutual Fund'
}
const AssetTypeSelect: React.FC<AssetTypeSelectProps> = ({
  toggleOverlay,
  asOption = false,
  children,
  dispatch,
  payload,
}) => {
  const handleClick = () => {
    toggleOverlay()
    if (asOption && dispatch && payload) {
      dispatch({ type: 'SET_MODAL', payload })
    }
  }
  return (
    <div
      onClick={handleClick}
      className={`px-2.5 py-[5px] bg-[#c6ddff] ${
        !asOption ? 'rounded-[5px]' : ''
      } justify-center items-center gap-2.5 inline-flex cursor-pointer`}
    >
      <div className='w-[15px] h-[15px] relative'>
        {React.cloneElement(children as React.ReactElement, { className: 'w-[15px] h-[15px]' })}
      </div>
      <div className='text-black text-base font-normal font-[ Charter ] leading-snug'>{payload}</div>
      {!asOption && (
        <div className='w-[15px] h-[15px] p-[1.25px] justify-center items-center flex'>
          <ChevronDown className='w-[15px] h-[15px]' />
        </div>
      )}
    </div>
  )
}

export default AssetTypeSelect
