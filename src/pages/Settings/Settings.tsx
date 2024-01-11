import React from 'react'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import currencyCodes from '@/data/currency-codes.json'

export default function Settings() {
  const { preferences, setPreferences, savePreferences } = useUserPreferences()

  const handleValueChange = (symbol: string) => {
    setPreferences((prev) => ({ ...prev, currencyUnit: symbol }))
  }

  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4'>
      <div className='text-lg font-bold'>Manage your preferences</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <div className='grid md:grid-cols-2 gap-4 mb-2'>
        <div className='space-y-2'>
          <div>Currency</div>
          <Select onValueChange={handleValueChange} value={preferences.currencyUnit}>
            <SelectTrigger>
              <SelectValue placeholder='Currency Unit' />
            </SelectTrigger>
            <SelectContent className='max-h-60'>
              {currencyCodes.map(({ name, symbol }) => (
                <SelectItem value={symbol} key={`${name}_${symbol}`}>
                  {name} {symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type='submit'
        onClick={() => {
          savePreferences()
        }}
      >
        Update
      </Button>
    </div>
  )
}
