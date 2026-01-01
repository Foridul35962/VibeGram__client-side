import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const registration = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/register`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    authLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //register
        builder
            .addCase(registration.pending, (state) => {
                state.authLoading = true
            })
            .addCase(registration.fulfilled, (state) => {
                state.authLoading = false
            })
            .addCase(registration.rejected, (state) => {
                state.authLoading = false
            })
    }
})

export default authSlice.reducer