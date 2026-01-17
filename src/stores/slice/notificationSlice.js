import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/notification`

export const getAllNotification = createAsyncThunk(
    'notification/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/user-notification`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const markAsReadNoti = createAsyncThunk(
    'notification/markAsRead',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/markAsRead`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    notificationData: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification: (state, action) => {
            state.notificationData.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        //fetch notification data
        builder
            .addCase(getAllNotification.fulfilled, (state, action) => {
                state.notificationData = action.payload.data
            })
    }
})

export const { updateNotification } = notificationSlice.actions
export default notificationSlice.reducer