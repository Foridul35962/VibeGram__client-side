import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/story`


export const uploadStory = createAsyncThunk(
    'story/upload',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/upload`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const deleteStory = createAsyncThunk(
    'story/delete',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.delete(`${SERVER_URL}/delete`,{
                data: data,
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const viewStory = createAsyncThunk(
    'story/view',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${SERVER_URL}/view`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    storyLoading: false,
}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //upload story
        builder
            .addCase(uploadStory.pending,(state)=>{
                state.storyLoading = true
            })
            .addCase(uploadStory.fulfilled, (state)=>{
                state.storyLoading = false
            })
            .addCase(uploadStory.rejected, (state)=>{
                state.storyLoading = false
            })
    }
})

export default storySlice.reducer