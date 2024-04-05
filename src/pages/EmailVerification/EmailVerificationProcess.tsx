import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const EmailVerificationProcess = () => {
  const { code } = useParams()
  const [verificationMessage, setVerificationMessage] = useState('')

  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_ACCOUNTS_BASE_URL,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    const verifyEmail = async () => {
      try {
        const response = await api.post<{ key: string }>('/dj-rest-auth/registration/verify-email/', { key: code })

        if (response.status === 200) {
          setVerificationMessage('Email Verification successful!')
        } else {
          setVerificationMessage('Email Verification failed.')
        }
      } catch (error) {
        setVerificationMessage('An error occurred during Email verification.')
      }
    }
    verifyEmail().then(() => {
    })
  }, [code])
  return (
    <div>
      <p>{verificationMessage}</p>
    </div>
  )
}

export default EmailVerificationProcess
