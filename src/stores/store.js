import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import userReducer from './slice/userSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})

export default store