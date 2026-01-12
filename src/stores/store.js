import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import userReducer from './slice/userSlice.js'
import postReducer from './slice/postSlice.js'
import reelReducer from './slice/reelSlice.js'
import storyReducer from './slice/storySlice.js'
import messageReducer from './slice/messageSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        reel: reelReducer,
        story: storyReducer,
        message: messageReducer
    }
})

export default store