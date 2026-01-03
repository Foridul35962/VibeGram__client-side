import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import FirstLoad from '../components/loading/FirstLoad'

const ProtectedRoutes = () => {
    const { user, isFetched } = useSelector((state) => state.user)

    if (isFetched) {
        if (!user) {
            return <Navigate to={'/login'} replace />
        }

        return <Outlet />
    } else{
        return <FirstLoad />
    }
}

export default ProtectedRoutes