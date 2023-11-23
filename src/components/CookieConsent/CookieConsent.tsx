import React, { useState } from 'react'
import { CookieIcon } from 'lucide-react'
import { setCookie, getCookie } from '@/utils/cookie'
import { COOKIE_CONSENT } from '@/utils/constants'
import { Button } from '../ui/button'
import { useAuthContext } from '@/hooks/use-auth'

export default function CookieConsent() {
  // Open dialog only if key is not present
  const shouldModalOpen = !!getCookie(COOKIE_CONSENT)
  const { userData } = useAuthContext()

  const [isAlertDialogOpen, setAlertDialogOpen] = useState(!shouldModalOpen)
  const handleAlert = (permission: boolean) => {
    if (permission) {
      setCookie(COOKIE_CONSENT, 'accept', 30)
    } else {
      setCookie(COOKIE_CONSENT, 'decline', 30)
    }
    setAlertDialogOpen(false)
  }

  return (
    <>
      {!userData && isAlertDialogOpen && (
        <div className='fixed bottom-[12px] left-[12px] bg-white p-[24px] z-50 rounded-[0.5rem] border border-1 border-[#e5e7eb] max-w-[512px] shadow-md'>
          <div className='flex items-center gap-4 text-blue-500 font-semibold mb-8'>
            <CookieIcon />
            <span className='text-base'>Cookies Consent</span>
          </div>
          <p className='text-sm text-gray-500'>
            This website use cookies to help you have a superior and more admissible browsing experience on the website.
          </p>
          <div className='mt-4 flex justify-end gap-2'>
            <Button onClick={() => handleAlert(false)}>Decline</Button>
            <Button variant='ghost' onClick={() => handleAlert(true)}>
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
