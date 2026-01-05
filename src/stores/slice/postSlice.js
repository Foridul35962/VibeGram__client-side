import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/post`

export const uploadPost = createAsyncThunk(
    'post/upload',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/upload-post`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const deletePost = createAsyncThunk(
    'post/delete',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/delete-post`, {
                data: data,
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getPost = createAsyncThunk(
    'post/get',
    async (postId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-post/${postId}`, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getUserPosts = createAsyncThunk(
    'post/getAllPost',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/user-post`, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const savedUnsavedPosts = createAsyncThunk(
    'post/save',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/save-post`, data,
                { withCredentials: true }
            )
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const likedUnlikedPost = createAsyncThunk(
    'post/likeUnlike',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/like-unlike`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const commentPost = createAsyncThunk(
    'post/comment',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/comment`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    postLoading: false,
    post: null,
    allPost: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //uploadpost
        builder
            .addCase(uploadPost.pending,(state)=>{
                state.postLoading = true
            })
            .addCase(uploadPost.fulfilled, (state)=>{
                state.postLoading = false
            })
            .addCase(uploadPost.rejected, (state)=>{
                state.postLoading = false
            })
    }
})

export default postSlice.reducer