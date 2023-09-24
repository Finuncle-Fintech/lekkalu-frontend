import useRefreshToken from "hooks/useRefresh";
import { useContext, useEffect, useState } from "react";
import { Context } from "provider/Provider";
import React from 'react'
import { Outlet } from "react-router-dom";

export default function PersistGuest() {
    const { authToken } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyIfHasToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        !authToken ? verifyIfHasToken() : setIsLoading(false)

    }, [])

    return (
        <>
            {
                isLoading ? <p className="text-center mt-5">Loading...</p> : <Outlet />
            }
        </>
    )
}
