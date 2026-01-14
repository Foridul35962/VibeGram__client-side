import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../socket'
import { setSocketConnected } from '../stores/slice/userSlice'
import { updatePresence } from '../stores/slice/messageSlice'

const UseSocket = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        if (!user?._id) return

        if (!socket.connected) {
            socket.connect()
        }

        const onConnect = () => {
            dispatch(setSocketConnected(true))
            socket.emit('identity', { userId: user._id })
        }

        const onDisconnect = () => {
            dispatch(setSocketConnected(false))
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [user?._id, dispatch])

    useEffect(() => {
        socket.on('presence:update', ({ userId, online }) => {
            dispatch(updatePresence({ userId, online }))
        })

        return () => socket.off('presence:update')
    }, [dispatch])

    useEffect(() => {
        socket.on('presence:initial', ({ onlineUsers }) => {
            onlineUsers.forEach(userId => {
                dispatch(updatePresence({ userId, online: true }))
            })
        })

        return () => socket.off('presence:initial')
    }, [dispatch])


    return null
}

export default UseSocket