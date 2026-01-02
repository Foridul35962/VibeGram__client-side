import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const { user, isFetched } = useSelector((state) => state.user)
    
    if (isFetched || user) {
        if (user) {
            return <Navigate to={'/'} replace/>
        }
    
        return <Outlet />
    }
}

export default PublicRoutes