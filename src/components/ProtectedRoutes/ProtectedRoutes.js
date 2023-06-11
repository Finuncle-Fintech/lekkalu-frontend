import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({ authToken, children }) => {
    if (!authToken) {
        return <Navigate to="/signin" replace />
    }
    return children
}

export default ProtectedRoutes;