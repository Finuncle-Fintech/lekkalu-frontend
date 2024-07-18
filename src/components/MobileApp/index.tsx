/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import { mobileRoutes } from '@/utils/mobile-routes'

const MobileApp = () => {
  // const [showDialog, setShowDialog] = useState(false)
  const location = useLocation()
  const params = useParams()
  const IS_MOBILE = navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone')

  // useEffect(() => {
  //   const SHOW_DIALOG = localStorage.getItem('show-mobile-dialog')
  //   if (SHOW_DIALOG === 'false') {
  //     setShowDialog(false)
  //   } else if (SHOW_DIALOG === null) {
  //     setShowDialog(true)
  //   }
  // }, [])

  // function handleCloseClick() {
  //   localStorage.setItem('show-mobile-dialog', 'false')
  //   setShowDialog(false)
  // }

  function getMobileRoute(params?: string) {
    const routeIndex = mobileRoutes.findIndex((each) => location.pathname.includes(each?.id))
    if (routeIndex > -1) {
      const route = params
        ? mobileRoutes[routeIndex].mobile.replace('[id]', params)
        : mobileRoutes[routeIndex].mobile.replace('[id]', '')
      return route
    } else {
      return '/login'
    }
  }

  function handleUseAppClick() {
    const link = getMobileRoute(params.id)
    const deeplink = `com.lekkalu-app.lekkalu-app://${link}`
    try {
      window.location.replace(deeplink)
    } catch (e) {
      console.log('we have an error')
    }
  }

  if (IS_MOBILE) {
    return (
      <div className='flex bg-primary justify-between md:hidden sticky bottom-0 w-full p-5 gap-10'>
        {/* <XCircleIcon
          className='absolute right-3 top-[-10px] text-white bg-red-500 rounded-xl hover:cursor-pointer'
          onClick={handleCloseClick}
        /> */}
        <h1 className='self-center text-white text-sm'>Use Mobile App for better experience.</h1>
        <Button onClick={handleUseAppClick} className='bg-blue-400 hover:bg-blue-500 text-xs w-32'>
          Use App
        </Button>
      </div>
    )
  } else {
    return <></>
  }
}

export default MobileApp
