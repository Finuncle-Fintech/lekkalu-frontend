import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import currencyCodes from '@/data/currency-codes.json'
import Alert from '@/components/Alert/Alert'
import { useToast } from '@/components/ui/use-toast'
import { getErrorMessage } from '@/utils/utils'
import { queryClient } from '@/utils/client'
import { deleteUserAccount } from '@/queries/auth'
import { useAuthContext } from '@/hooks/use-auth'
import DownloadAllData from '@/components/DownloadAllData/DownloadAllData'
import Page from '@/components/Page/Page'

export default function Settings() {
  const { toast } = useToast()
  const { preferences, setPreferences, savePreferences } = useUserPreferences()
  const { logout } = useAuthContext()

  const handleValueChange = (symbol: string) => {
    setPreferences((prev) => ({ ...prev, currencyUnit: symbol }))
  }

  const deleteUserAccountMutation = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      queryClient.invalidateQueries()
      logout()
      toast({ title: 'Your account has been successfully deleted!' })
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  return (
    <Page className='space-y-4 min-h-screen'>
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

      <div className='text-lg font-bold mt-4'>Download all financial data</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />
      <DownloadAllData />

      <div className='text-lg font-bold mt-4'>Account</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <Alert
        trigger={
          <Button type='submit' variant='destructive'>
            Delete Account
          </Button>
        }
        title='Delete Account'
        description='Do you really want to delete your account? This process cannot be undone.'
        okText='Yes, Delete'
        cancelText='No'
        cancelProps={{ disabled: deleteUserAccountMutation.isPending }}
        okButtonProps={{ disabled: deleteUserAccountMutation.isPending, className: 'bg-red-500 hover:bg-red-400' }}
        onOk={() => {
          deleteUserAccountMutation.mutate()
        }}
      />
    </Page>
  )
}
