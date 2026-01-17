import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllNotification, updateNotification } from '../stores/slice/notificationSlice'
import socket from '../socket'

const UseNotification = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllNotification())
    }, [dispatch])

    useEffect(() => {
        const handleNotification = ({ notification }) => {
            dispatch(updateNotification(notification))
        }

        socket.on('update:notification', handleNotification)

        return () => {
            socket.off('update:notification', handleNotification)
        }
    }, [dispatch])
}

export default UseNotification