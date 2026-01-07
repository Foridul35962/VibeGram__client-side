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
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/user-post/${userId}`, {
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
    allPost: [],
    userPosts: [],
    prevFetchedUserId: null,
    commentLoading: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPrevFetchedUserId: (state, action) => {
            state.prevFetchedUserId = action.payload
        }
    },
    extraReducers: (builder) => {
        //uploadpost
        builder
            .addCase(uploadPost.pending, (state) => {
                state.postLoading = true
            })
            .addCase(uploadPost.fulfilled, (state) => {
                state.postLoading = false
                state.prevFetchedUserId = null
            })
            .addCase(uploadPost.rejected, (state) => {
                state.postLoading = false
            })
        //get users posts
        builder
            .addCase(getUserPosts.pending, (state) => {
                state.postLoading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.postLoading = false
                state.userPosts = action.payload.data
            })
            .addCase(getUserPosts.rejected, (state) => {
                state.postLoading = false
            })
        //get post
        builder
            .addCase(getPost.pending, (state) => {
                state.postLoading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postLoading = false
                state.post = action.payload.data
            })
            .addCase(getPost.rejected, (state) => {
                state.postLoading = false
            })
        //delete post
        builder
            .addCase(deletePost.pending, (state) => {
                state.postLoading = true
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.postLoading = false
                state.prevFetchedUserId = null
            })
            .addCase(deletePost.rejected, (state) => {
                state.postLoading = false
            })
        //comment on post
        builder
            .addCase(commentPost.pending, (state) => {
                state.commentLoading = true
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                state.commentLoading = false
                state.post.comments.push(action.payload.data.message)
            })
            .addCase(commentPost.rejected, (state) => {
                state.commentLoading = false
            })
    }
})

export const { setPrevFetchedUserId } = postSlice.actions
export default postSlice.reducer