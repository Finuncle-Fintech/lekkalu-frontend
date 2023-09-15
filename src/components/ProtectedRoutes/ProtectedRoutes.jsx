import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from 'provider/Provider';

// High order component
export const ProtectedRoutes = ({ component }) => {
    const { authToken } = useContext(Context);

    if (!authToken) {
        return <Navigate to="/signin" replace />
    }
    return component
}

export default ProtectedRoutes;