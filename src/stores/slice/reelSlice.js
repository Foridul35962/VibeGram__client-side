import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/reel`

export const uploadReel = createAsyncThunk(
    'reel/upload',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/upload-reel`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const deleteReel = createAsyncThunk(
    'reel/delete',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.delete(`${SERVER_URL}/delete-reel`,{
                data,
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getUserAllReels = createAsyncThunk(
    'reel/getAll',
    async(userId, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/user-reel/${userId}`,{
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getReel =createAsyncThunk(
    'reel/get',
    async(reelId, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/get-reel/${reelId}`,{
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const likedUnlikedReel = createAsyncThunk(
    'reel/likeUnlike',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${SERVER_URL}/like-unlike`, data,{
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const commentReel = createAsyncThunk(
    'reel/comment',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${SERVER_URL}/comment`, data,{
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    reelLoading: false,
    reel: null,
    allReels: []
}

const reelSlice = createSlice({
    name: 'reel',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //upload reel
        builder
            .addCase(uploadReel.pending,(state)=>{
                state.reelLoading = true
            })
            .addCase(uploadReel.fulfilled, (state)=>{
                state.reelLoading = false
            })
            .addCase(uploadReel.rejected, (state)=>{
                state.reelLoading = false
            })
    }
})

export default reelSlice.reducer