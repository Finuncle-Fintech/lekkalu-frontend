import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useUserPreferences } from '@/hooks/use-user-preferences'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import currencyCodes from '@/data/currency-codes.json'
import { deleteUser } from '../../queries/auth'
import { useAuthContext } from '@/hooks/use-auth'

export default function Settings() {
  const { preferences, setPreferences, savePreferences } = useUserPreferences()
  const { userData } = useAuthContext()
  const navigate = useNavigate()

  const deleteGoalMutation = useMutation(() => deleteUser(userData?.id), {
    onSuccess: () => {
      navigate('/signin')
    },
  })

  const handleValueChange = (symbol: string) => {
    setPreferences((prev) => ({ ...prev, currencyUnit: symbol }))
  }

  const handlerDeleteAccount = async () => {
    deleteGoalMutation.mutate()
  }

  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4'>
      <div className='text-lg font-bold'>Manage your preferences</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <div className='grid md:grid-cols-2 gap-4 mb-2'>
        <div className='space-y-2'>
          <div>First name</div>
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

      <div className='w-fit mx-auto mt-10'>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete this account.</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlerDeleteAccount}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>

    </div>
  )
}
