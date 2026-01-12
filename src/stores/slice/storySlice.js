import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/story`


export const uploadStory = createAsyncThunk(
    'story/upload',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/upload`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const deleteStory = createAsyncThunk(
    'story/delete',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/delete`, {
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/view`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getAllFollowingUserStory = createAsyncThunk(
    'story/allStory',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/allStory`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    storyLoading: false,
    allStory: [],
    myStory: null
}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //upload story
        builder
            .addCase(uploadStory.pending, (state) => {
                state.storyLoading = true
            })
            .addCase(uploadStory.fulfilled, (state, action) => {
                state.storyLoading = false
                const story = action.payload.data
                if (state.myStory) {
                    state.myStory.stories.push(story.media)
                } else {
                    state.myStory = story
                }
            })
            .addCase(uploadStory.rejected, (state) => {
                state.storyLoading = false
            })
        //get all story
        builder
            .addCase(getAllFollowingUserStory.pending, (state) => {
                state.storyLoading = true
            })
            .addCase(getAllFollowingUserStory.fulfilled, (state, action) => {
                state.storyLoading = false
                const { stories, myStory } = action.payload.data
                state.allStory = stories
                state.myStory = myStory
            })
            .addCase(getAllFollowingUserStory.rejected, (state) => {
                state.storyLoading = false
            })
        //delete story
        builder
            .addCase(deleteStory.fulfilled, (state, action) => {
                if (state.myStory?.stories.length > 1) {
                    const storyId = action.payload.data
                    state.myStory.stories = state.myStory.stories.filter(story => story._id !== storyId)
                } else {
                    state.myStory = null
                }
            })
    }
})

export default storySlice.reducer