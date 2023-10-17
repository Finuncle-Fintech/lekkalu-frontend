import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import SupportPopUp from '@/components/Support/PopUp/PopUp'
import { Context } from '@/provider/Provider'

export default function Layout({ children }) {
  const { authToken } = useContext(Context)
  const location = useLocation()

  const isHeroPath = location.pathname === '/'

  if (!authToken || isHeroPath) {
    return (
      <>
        {!isHeroPath && <Header />}
        {children}
        <div />
      </>
    )
  }

  return (
    <div>
      <Header />
      {children}
      <Footer />
      <SupportPopUp />
    </div>
  )
}
