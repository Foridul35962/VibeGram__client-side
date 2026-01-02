import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { login } from "./authSlice"


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/user`

export const getUser = createAsyncThunk(
    'auth/getUser',
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

const initialState = {
    userLoading: false,
    user: null
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
        //get user
        builder
            .addCase(getUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false
                state.user = action.payload.data
            })
            .addCase(getUser.rejected, (state) => {
                state.userLoading = false
            })
    }
})

export default userSlice.reducer