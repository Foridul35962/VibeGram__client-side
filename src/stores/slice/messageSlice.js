import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/message`

export const sendMessage = createAsyncThunk(
    'message/send',
    async({data, receiver}, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/send-message/${receiver}`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getAllMessages = createAsyncThunk(
    'message/allMessages',
    async(receiver, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/get-message/${receiver}`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getPrevChatPartner = createAsyncThunk(
    'message/getChatPartner',
    async(_, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/prev-chatPartner`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    messageLoading: false,
    messages:[],
    chatPartners: []
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        //send message
        builder
            .addCase(sendMessage.pending, (state)=>{
                state.messageLoading = true
            })
            .addCase(sendMessage.fulfilled, (state, action)=>{
                state.messageLoading = false
                state.messages.push(action.payload.data)
            })
            .addCase(sendMessage.rejected, (state)=>{
                state.messageLoading = false
            })
        //get all message
        builder
            .addCase(getAllMessages.pending, (state)=>{
                state.messageLoading = true
            })
            .addCase(getAllMessages.fulfilled, (state, action)=>{
                state.messageLoading = false
                state.messages = action.payload.data
            })
            .addCase(getAllMessages.rejected, (state)=>{
                state.messageLoading = false
            })
        //get chat partners
        builder
            .addCase(getPrevChatPartner.pending, (state)=>{
                state.messageLoading = true
            })
            .addCase(getPrevChatPartner.fulfilled, (state, action)=>{
                state.messageLoading = false
                state.chatPartners = action.payload.data
            })
            .addCase(getPrevChatPartner.pending, (state)=>{
                state.messageLoading = false
            })
    }
})

export default messageSlice.reducer