import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../stores/slice/userSlice'

const UseGetUser = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUser())
    })
}

export default UseGetUser