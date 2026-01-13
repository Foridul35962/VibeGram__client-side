import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/message`

export const sendMessage = createAsyncThunk(
    'message/send',
    async ({ data, receiver }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/send-message/${receiver}`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getAllMessages = createAsyncThunk(
    'message/allMessages',
    async (receiver, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-message/${receiver}`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getPrevChatPartner = createAsyncThunk(
    'message/getChatPartner',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/prev-chatPartner`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    messageLoading: false,
    messages: [],
    chatPartners: [],
    partnerData: null
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messageOptimisticAdd: (state, action) => {
            state.messages.push(action.payload);
        },
        messageOptimisticFail: (state, action) => {
            const { tempId, error } = action.payload;
            const idx = state.messages.findIndex((m) => m._id === tempId);
            if (idx !== -1) {
                state.messages[idx].error = error;
            }
        }
    },
    extraReducers: (builder) => {
        //send message
        builder
            .addCase(sendMessage.pending, (state) => {
                state.messageLoading = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messageLoading = false
            })
            .addCase(sendMessage.rejected, (state) => {
                state.messageLoading = false
                const payload = action.payload;
                if (payload?.tempId) {
                    const idx = state.messages.findIndex((m) => m._id === payload.tempId);
                    if (idx !== -1) {
                        state.messages[idx].error = payload.message;
                    }
                }
            })
        //get all message
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.messageLoading = true
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.messageLoading = false
                state.messages = action.payload.data.messages
                state.partnerData = action.payload.data.partner
            })
            .addCase(getAllMessages.rejected, (state) => {
                state.messageLoading = false
            })
        //get chat partners
        builder
            .addCase(getPrevChatPartner.pending, (state) => {
                state.messageLoading = true
            })
            .addCase(getPrevChatPartner.fulfilled, (state, action) => {
                state.messageLoading = false
                state.chatPartners = action.payload.data
            })
            .addCase(getPrevChatPartner.rejected, (state) => {
                state.messageLoading = false
            })
    }
})

export const { messageOptimisticAdd, messageOptimisticFail } = messageSlice.actions
export default messageSlice.reducer