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

export const verifyRegi = createAsyncThunk(
    'auth/verifyRegi',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/verify-regi`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/login`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const forgetPass = createAsyncThunk(
    'auth/forgetPass',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/forget-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const verifyPass = createAsyncThunk(
    'auth/verifyPass',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/verify-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const resetPass = createAsyncThunk(
    'auth/resetPass',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/reset-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const resendOtp = createAsyncThunk(
    'auth/resendOtp',
    async (data, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${SERVER_URL}/resend-otp`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    authLoading: false,
    otpLoading: false
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
        //verify register
        builder
            .addCase(verifyRegi.pending, (state) => {
                state.authLoading = true
            })
            .addCase(verifyRegi.fulfilled, (state) => {
                state.authLoading = false
            })
            .addCase(verifyRegi.rejected, (state) => {
                state.authLoading = false
            })
        //login
        builder
            .addCase(login.pending, (state) => {
                state.authLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authLoading = false
            })
            .addCase(login.rejected, (state) => {
                state.authLoading = false
            })
        //forgetPass
        builder
            .addCase(forgetPass.pending, (state) => {
                state.authLoading = true
            })
            .addCase(forgetPass.fulfilled, (state, action) => {
                state.authLoading = false
            })
            .addCase(forgetPass.rejected, (state) => {
                state.authLoading = false
            })
        //verifyPass
        builder
            .addCase(verifyPass.pending, (state) => {
                state.authLoading = true
            })
            .addCase(verifyPass.fulfilled, (state, action) => {
                state.authLoading = false
            })
            .addCase(verifyPass.rejected, (state) => {
                state.authLoading = false
            })
        //resetPass
        builder
            .addCase(resetPass.pending, (state) => {
                state.authLoading = true
            })
            .addCase(resetPass.fulfilled, (state, action) => {
                state.authLoading = false
            })
            .addCase(resetPass.rejected, (state) => {
                state.authLoading = false
            })
        //resend otp
        builder
            .addCase(resendOtp.pending, (state) => {
                state.otpLoading = true
            })
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.otpLoading = false
            })
            .addCase(resendOtp.rejected, (state) => {
                state.otpLoading = false
            })
    }
})

export default authSlice.reducer