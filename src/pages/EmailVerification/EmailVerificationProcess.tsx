/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Ban, CircleCheck } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useAuthContext } from '@/hooks/use-auth'
import Page from '@/components/Page/Page'
import DottedAnimatedText from '@/components/DottedAnimatedText'

const api = axios.create({
  baseURL: process.env.REACT_APP_ACCOUNTS_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})
const verifyEmail = async (code: string) => {
  const { data } = await api.post<{ key: string }>('/dj-rest-auth/registration/verify-email/', { key: code })
  return { data }
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col items-center w-full gap-5'>{children}</div>
}

export const EmailVerificationProcess = () => {
  const { code } = useParams()
  const { userData } = useAuthContext()

  const { isPending, isSuccess, mutate, isError } = useMutation({
    mutationFn: (code: string) => verifyEmail(code),
  })

  useEffect(() => {
    if (userData && !userData?.email_verified) {
      code && mutate(code as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, code])

  if (userData && userData?.email_verified) {
    return (
      <Page className='flex items-center'>
        <Wrapper>
          <CircleCheck size={50} className='text-success' />
          <h1>This email address is already verified.</h1>
        </Wrapper>
      </Page>
    )
  }

  if (isPending) {
    return (
      <Page className='flex items-center'>
        <Wrapper>
          <DottedAnimatedText>
            <h1>Verfifying email</h1>
          </DottedAnimatedText>
        </Wrapper>
      </Page>
    )
  }

  if (isError) {
    return (
      <Page className='flex items-center'>
        <Wrapper>
          <Ban size={50} className='text-error' />
          <p className='text-slate-600'>Email verification failed.</p>
        </Wrapper>
      </Page>
    )
  }

  if (isSuccess) {
    return (
      <Page className='flex items-center'>
        <Wrapper>
          {<CircleCheck size={50} className='text-success' />}
          {<p>Email verification successful.</p>}
        </Wrapper>
      </Page>
    )
  }

  return <></>
}

export default EmailVerificationProcess
