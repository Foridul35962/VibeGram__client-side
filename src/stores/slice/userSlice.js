import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { login, logout } from "./authSlice"


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/user`

export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-user`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getSuggestedUser = createAsyncThunk(
    'user/suggestedUser',
    async (_, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/suggestedUser`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const followUnfollow = createAsyncThunk(
    'user/followUnfollow',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${SERVER_URL}/followUnfollow`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    userLoading: false,
    user: null,
    isFetched: false,
    suggestedUser: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.data
            })
        //logout
        builder
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
        //get user
        builder
            .addCase(getUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false
                state.user = action.payload.data
                state.isFetched = true
            })
            .addCase(getUser.rejected, (state) => {
                state.userLoading = false
                state.isFetched = true
            })
        //suggested user
        builder
            .addCase(getSuggestedUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(getSuggestedUser.fulfilled, (state, action) => {
                state.userLoading = false
                state.suggestedUser = action.payload.data
            })
            .addCase(getSuggestedUser.rejected, (state) => {
                state.userLoading = false
            })
        //follow unfollow user
        builder
            .addCase(followUnfollow.pending, (state) => {
                state.userLoading = true
            })
            .addCase(followUnfollow.fulfilled, (state, action) => {
                state.userLoading = false
                const message = action.payload.message
                const data = action.payload.data
                if (message === 'unfollow') {
                    state.user.followings = state.user.followings.filter(id=>id !== data)
                } else {
                    state.user.followings.push(data)
                }
            })
            .addCase(followUnfollow.rejected, (state) => {
                state.userLoading = false
            })
    }
})

export default userSlice.reducer