import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import SupportPopUp from "components/Support/PopUp/PopUp";
import { Context } from "provider/Provider";
import { useContext } from "react";

export default function Layout({children}){
    const { authToken } = useContext(Context)

    if(!authToken){
        return children
    }

    return(
        <div>
            <Header  />
            {children}
            <Footer />
            <SupportPopUp />
        </div>
    )
}