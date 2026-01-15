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
            return res.data
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

const toggleLike = (likes, user) => {
    const uid = String(user?._id);
    const arr = Array.isArray(likes) ? likes : [];

    const already = arr.some(l => String(l?._id ?? l) === uid);

    if (already) return arr.filter(l => String(l?._id ?? l) !== uid);

    return [...arr, user];
};

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-allPost?page=${page}&limit=${limit}`, {
                withCredentials: true
            })
            return res.data.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    postLoading: false,
    post: null,
    userPosts: [],
    prevFetchedUserId: null,
    commentLoading: false,
    items: [],  //fetch feed post
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
    loading: false,
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPrevFetchedUserId: (state, action) => {
            state.prevFetchedUserId = action.payload
        },

        likeOptimisticSingle: (state, action) => {
            const user = action.payload;
            if (!state.post) return;
            state.post.likes = toggleLike(state.post.likes, user);
        },

        likeRollbackSingle: (state, action) => {
            const prevLikes = action.payload;
            if (!state.post) return;
            state.post.likes = prevLikes;
        },

        updatePostLikeRealtimeSingle: (state, action) => {
            const { postId, postLikes } = action.payload;

            if (state.post && state.post._id === postId) {
                state.post.likes = postLikes;
            }
        },

        likeOptimistic: (state, action) => {
            const { user, postId } = action.payload;
            if (!Array.isArray(state.items)) return;

            const idx = state.items.findIndex(p => String(p._id) === String(postId));
            if (idx === -1) return;

            state.items[idx].likes = toggleLike(state.items[idx].likes, user);
        },

        likeRollback: (state, action) => {
            const { postId, prevLikes } = action.payload;
            if (!Array.isArray(state.items)) return;

            const idx = state.items.findIndex(p => String(p._id) === String(postId));
            if (idx === -1) return;

            state.items[idx].likes = prevLikes;
        },

        updatePostComment: (state, action) => {
            if (!state.post) return;
            const { comment } = action.payload;
            state.post.comments.push(comment);
        },

        resetPosts: (state) => {
            state.items = []
            state.page = 1
            state.total = 0
            state.hasMore = true
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        //uploadpost
        builder
            .addCase(uploadPost.pending, (state) => {
                state.postLoading = true
            })
            .addCase(uploadPost.fulfilled, (state, action) => {
                state.postLoading = false
                state.prevFetchedUserId = null

                const newPost = action.payload.data
                state.items = [newPost, ...state.items]
                state.total += 1
                state.hasMore = state.items.length < state.total
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
            })
            .addCase(commentPost.rejected, (state) => {
                state.commentLoading = false
            })
        //like unlike
        builder.addCase(likedUnlikedPost.fulfilled, (state, action) => {
            const { postId, postLikes } = action.payload.data;

            if (Array.isArray(state.items)) {
                const idx = state.items.findIndex(p => String(p._id) === String(postId));
                if (idx !== -1) state.items[idx].likes = postLikes;
            }

            if (state.post && String(state.post._id) === String(postId)) {
                state.post.likes = postLikes;
            }
        });

        //fetch all post for feed
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                const { posts, page, limit, total } = action.payload

                state.page = page
                state.limit = limit
                state.total = total

                if (page === 1) {
                    state.items = posts
                } else {
                    state.items.push(...posts)
                }
                state.hasMore = state.items.length < total
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const {
    setPrevFetchedUserId,
    likeOptimisticSingle,
    likeOptimistic,
    likeRollbackSingle,
    resetPosts,
    updatePostLikeRealtimeSingle,
    updatePostComment
} = postSlice.actions
export default postSlice.reducer