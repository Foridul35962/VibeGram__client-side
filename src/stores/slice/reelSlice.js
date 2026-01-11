import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/reel`

export const uploadReel = createAsyncThunk(
    'reel/upload',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/upload-reel`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const deleteReel = createAsyncThunk(
    'reel/delete',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/delete-reel`, {
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
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/user-reel/${userId}`, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getReel = createAsyncThunk(
    'reel/get',
    async (reelId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-reel/${reelId}`, {
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/like-unlike`, data, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getAllReels = createAsyncThunk(
    'reel/getAllReels',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/all-reels?page=${page}&limit=${limit}`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const commentReel = createAsyncThunk(
    'reel/comment',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/comment`, data, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const toggleLike = (likes, user) => {
    const uid = String(user?._id || user)
    const arr = Array.isArray(likes) ? likes : []

    const normalized = arr.map(l => String(l?._id ?? l))

    const already = normalized.includes(uid)
    if (already) {
        return normalized.filter(id => id !== uid)
    }
    return [...normalized, uid]
}

const initialState = {
    reelLoading: false,
    reel: null,
    reelCommentLoading: false,
    userReel: [],
    prevFetchedUserId: null,
    allReels: [],
    page: 1,
    limit: 5,
    total: 0,
    hasMore: true,
    loading: false,
    error: null
}

const reelSlice = createSlice({
    name: 'reel',
    initialState,
    reducers: {
        setPrevFetchedUserId: (state, action) => {
            state.prevFetchedUserId = action.payload
        },
        reelsLikeOptimistic: (state, action) => {
            const { user, reelId } = action.payload
            if (!Array.isArray(state.allReels)) return

            const idx = state.allReels.findIndex(r => String(r?._id) === String(reelId))
            if (idx === -1) return

            state.allReels[idx].likes = toggleLike(state.allReels[idx].likes, user)
        },

        reelsLikeRollBack: (state, action) => {
            const { reelId, prevLikes } = action.payload
            if (!Array.isArray(state.allReels)) return

            const idx = state.allReels.findIndex(r => String(r?._id) === String(reelId))
            if (idx === -1) return

            state.allReels[idx].likes = Array.isArray(prevLikes)
                ? prevLikes.map(l => String(l?._id ?? l))
                : []
        },
    },
    extraReducers: (builder) => {
        //upload reel
        builder
            .addCase(uploadReel.pending, (state) => {
                state.reelLoading = true
            })
            .addCase(uploadReel.fulfilled, (state) => {
                state.reelLoading = false
                state.prevFetchedUserId = null
            })
            .addCase(uploadReel.rejected, (state) => {
                state.reelLoading = false
            })
        //get user all reels
        builder
            .addCase(getUserAllReels.pending, (state) => {
                state.reelLoading = true
            })
            .addCase(getUserAllReels.fulfilled, (state, action) => {
                state.reelLoading = false
                state.userReel = action.payload.data
            })
            .addCase(getUserAllReels.rejected, (state) => {
                state.reelLoading = false
            })

        //fetch all reels
        builder
            .addCase(getAllReels.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllReels.fulfilled, (state, action) => {
                state.loading = false
                const { reels, page, limit, total } = action.payload.data

                state.page = page
                state.limit = limit
                state.total = total

                if (page === 1) {
                    state.allReels = reels
                } else {
                    state.allReels.push(...reels)
                }
                state.hasMore = state.allReels.length < total
            })
            .addCase(getAllReels.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        //get reel
        builder
            .addCase(getReel.pending, (state) => {
                state.reelLoading = true
            })
            .addCase(getReel.fulfilled, (state, action) => {
                state.reelLoading = false
                state.reel = action.payload.data
            })
            .addCase(getReel.rejected, (state) => {
                state.reelLoading = false
            })
        //reel comment
        builder
            .addCase(commentReel.pending, (state) => {
                state.reelCommentLoading = true
            })
            .addCase(commentReel.fulfilled, (state, action) => {
                state.reelCommentLoading = false
                const { reelId, comment } = action.payload.data
                const idx = state.allReels.findIndex(r => String(r?._id) === String(reelId))
                if (idx === -1) return

                state.allReels[idx].comments.push(comment)
            })
            .addCase(commentReel.rejected, (state) => {
                state.reelCommentLoading = false
            })
    }
})

export const { setPrevFetchedUserId, reelsLikeOptimistic, reelsLikeRollBack } = reelSlice.actions
export default reelSlice.reducer