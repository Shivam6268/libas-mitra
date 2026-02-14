import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useUserAuthStatus = () => {

       const { user } = useSelector(state => state.auth)

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {

        user ? setIsAuthenticated(true) : setIsAuthenticated(false)
        setAuthLoading(false)

    }, [user])


    return { isAuthenticated, authLoading }


}

export default useUserAuthStatus