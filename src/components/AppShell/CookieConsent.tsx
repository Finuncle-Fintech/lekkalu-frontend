import React, { useState } from 'react'
import colors from 'tailwindcss/colors'
import { CookieIcon } from 'lucide-react'
import '../../styles/custom.css'
import { setCookie, getCookie } from '@/utils/cookie'
import { COOKIE_CONSENT } from '@/utils/constants'

export default function CookieConsent() {
  // Open dialog only if key is not present
  const shouldModalOpen = !!getCookie(COOKIE_CONSENT)

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
    <div id='cookie-consent' className='cookie-consent' style={{ display: isAlertDialogOpen ? 'block' : 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: colors.blue['500'],
          fontWeight: 600,
          marginBottom: '8px',
        }}
      >
        <span>
          <CookieIcon />
        </span>
        <span style={{ fontSize: '18px' }}>Cookies Consent</span>
      </div>
      <p style={{ fontSize: '14px', color: 'rgb(100, 116, 139)' }}>
        {' '}
        This website use cookies to help you have a superior and more admissible browsing experiance on the website.
      </p>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button id='accept-cookies' className='btn-decline' onClick={() => handleAlert(false)}>
          Decline
        </button>
        <button id='accept-cookies' className='btn-accept' onClick={() => handleAlert(true)}>
          Accept
        </button>
      </div>
    </div>
  )
}
