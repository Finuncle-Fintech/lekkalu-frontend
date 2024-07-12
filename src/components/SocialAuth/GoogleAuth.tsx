import * as React from 'react'
import { Button } from '../ui/button'
import GoogleIcon from '../../assets/loginImages/google-icon.svg'

export default function GoogleAuth({ buttonText }: { buttonText: string }) {
  return (
    <Button
      variant='outline'
      onClick={() => {
        window.open(
          'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://finuncle.com&prompt=consent&response_type=code&client_id=' +
            process.env.REACT_APP_GOOGLE_CLIENT_ID +
            '&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&access_type=offline&include_granted_scopes=true',
          '_self',
        )
      }}
      className='w-full'
    >
      <img src={GoogleIcon} alt='google' className='w-4 h-4 mr-2' />
      {buttonText}
    </Button>
  )
}
