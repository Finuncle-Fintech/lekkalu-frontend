import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import SupportPopUp from "components/Support/PopUp/PopUp";
import { Context } from "provider/Provider";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const { authToken } = useContext(Context);
  const location = useLocation();

  const isHeroPath = location.pathname === '/' || location.pathname === '/subscription';

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
      <Header />
      {children}
      <Footer />
      <SupportPopUp />
    </div>
  );
}