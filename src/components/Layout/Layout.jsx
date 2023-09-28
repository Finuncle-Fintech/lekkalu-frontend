import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import SupportPopUp from "components/Support/PopUp/PopUp";
import { Context } from "provider/Provider";
import { useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export default function Layout({ children }) {
  const { authToken, fetchNotifications } = useContext(Context);
  const location = useLocation();

  const isHeroPath = location.pathname === '/';

  // Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 2000)
    return () => clearInterval(interval)
  }, []);
  // 
  if (!authToken || isHeroPath) {
    return (
      <>
        {!isHeroPath && <Header />}
        {children}
        <div></div>
      </>
    );
  }


  return (
    <div>
      <ReactNotifications />
      <Header />
      {children}
      <Footer />
      <SupportPopUp />
    </div>
  );
}