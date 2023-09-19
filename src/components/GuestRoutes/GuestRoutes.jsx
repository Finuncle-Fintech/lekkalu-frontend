import { Context } from "provider/Provider";
import { useContext } from "react";
import { Navigate } from "react-router";

export default function GuestRoutes({component}){
    const { authToken } = useContext(Context);
    
    if(authToken){
        return <Navigate to={'/'} replace />
    }
    return component
}