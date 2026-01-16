import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark, Send, ChevronLeft, ChevronRight } from 'lucide-react'
import avatar from '../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { likedUnlikedPost, likeOptimistic, savedUnsavedPosts, updatePostLikeRealTime } from '../stores/slice/postSlice'
import { toast } from 'react-toastify'
import { followUnfollow, toggleFollow, toggleSavePost } from '../stores/slice/userSlice'
import { useEffect } from 'react'
import socket from '../socket'

const PostCard = ({ post }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { user, userLoading } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //realtime like
    useEffect(() => {
        if (!post) return

        socket.emit('join:post', post._id)

        return () => {
            socket.emit('leave:post', post._id)
        }
    }, [post])

    useEffect(() => {
        const handleLikePost = ({ postId, postLikes }) => {
            if (!post || post._id !== postId) return

            dispatch(updatePostLikeRealTime({ postId, postLikes }))
        }

        socket.on('update:post-like', handleLikePost)

        return () => {
            socket.off('update:post-like', handleLikePost)
        }
    }, [dispatch, post])

    const likesArr = Array.isArray(post?.likes) ? post.likes : [];

    const isLiked = likesArr.some(
        like => String(like?._id ?? like) === String(user?._id)
    );

    const followArr = Array.isArray(user?.followings) ? user.followings : [];

    const isfollow = followArr.some(
        follow => String(follow) === String(post.author?._id)
    );

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const s = Math.floor(diff / 1000);
        const m = Math.floor(s / 60);
        const h = Math.floor(m / 60);
        const d = Math.floor(h / 24);

        if (s < 60) return `${s}s ago`;
        if (m < 60) return `${m}m ago`;
        if (h < 24) return `${h}h ago`;
        return `${d}d ago`;
    };

    const handleFollow = async (followingUserId) => {
        dispatch(toggleFollow(followingUserId))
        try {
            dispatch(followUnfollow({ followingUserId }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    const nextMedia = (e) => {
        e.preventDefault()
        if (currentIndex < post.media.length - 1) setCurrentIndex(prev => prev + 1)
    }

    const prevMedia = (e) => {
        e.preventDefault()
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
    }

    const handleLikePost = async () => {
        const prevLikes = Array.isArray(post.likes) ? [...post.likes] : [];

        dispatch(likeOptimistic({ user, postId: post._id }));

        try {
            await dispatch(likedUnlikedPost({ postId: post._id })).unwrap();
        } catch (error) {
            dispatch(likeRollback({ postId: post._id, prevLikes }));
            toast.error(error.message)
        }
    };

    const handlesavedPost = async () => {
        dispatch(toggleSavePost(post._id))
        try {
            await dispatch(savedUnsavedPosts({ postId: post._id })).unwrap()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full max-w-117.5 mx-auto mb-6 border-b border-zinc-900 pb-4'>
            {/* 1. Post Header */}
            <div className='flex items-center justify-between py-3 px-1'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.author?.userName}`} className='p-[1.5px] rounded-full bg-linear-to-tr from-yellow-400 to-fuchsia-600'>
                        <img src={post.author?.image?.url || avatar} className='size-8 rounded-full object-cover border-2 border-black' />
                    </Link>
                    <Link to={`/profile/${post.author?.userName}`} className='text-[13px] font-bold hover:text-zinc-400 transition'>
                        {post.author?.userName}
                    </Link>
                    <span className='text-zinc-500 text-xs'>• {timeAgo(post.createdAt)}</span>
                </div>
                {
                    post.author?._id !== user._id &&
                    <button
                        disabled={userLoading}
                        onClick={() => handleFollow(post.author?._id)}
                        className='text-xs cursor-pointer font-bold text-blue-500 hover:text-white transition-colors duration-200'>
                        {isfollow ? 'Unfollow' : 'Follow'}
                    </button>
                }
            </div>

            {/* 2. Media Carousel */}
            <div className='relative aspect-square w-full bg-black rounded-sm overflow-hidden border border-zinc-900 group'>
                <img
                    src={post.media[currentIndex]?.url}
                    className='w-full h-full object-contain select-none'
                    alt="post content"
                />

                {post.media.length > 1 && (
                    <>
                        {currentIndex > 0 && (
                            <button onClick={prevMedia} className='absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black transition z-10'>
                                <ChevronLeft size={18} />
                            </button>
                        )}
                        {currentIndex < post.media.length - 1 && (
                            <button onClick={nextMedia} className='absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black transition z-10'>
                                <ChevronRight size={18} />
                            </button>
                        )}
                        {/* Dot Indicators */}
                        <div className='absolute bottom-3 flex w-full justify-center gap-1.5'>
                            {post.media.map((_, i) => (
                                <div key={i} className={`size-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-white w-3' : 'bg-white/30'}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* 3. Actions Bar */}
            <div className='flex items-center justify-between py-3 px-1'>
                <div className='flex items-center gap-4 text-white'>
                    <div onClick={handleLikePost} className="cursor-pointer">
                        {isLiked ? (
                            <Heart className='text-red-500 fill-red-500 transition' size={24} />
                        ) : (
                            <Heart className='hover:text-zinc-500 text-white transition' size={24} />
                        )}
                    </div>
                    <Link to={`/post/${post._id}`}><MessageCircle className='cursor-pointer hover:text-zinc-500 transition' size={24} /></Link>
                    {/* <Send className='cursor-pointer hover:text-zinc-500 transition' size={24} /> */}
                </div>
                {
                    post?.author?.userName !== user.userName &&
                    <div onClick={handlesavedPost} className="cursor-pointer">
                        {user.savedPosts.includes(post?._id) ? (
                            <Bookmark className='text-white fill-white transition' size={24} />
                        ) : (
                            <Bookmark className='hover:text-zinc-500 transition cursor-pointer' size={24} />
                        )}
                    </div>
                }
            </div>

            {/* 4. Likes & Caption */}
            <div className='space-y-1.5 px-1'>
                <p onClick={() => navigate(`/post/${post._id}`)} className='text-sm cursor-pointer hover:underline font-bold'>{post.likes?.length || 0} likes</p>
                <div className='text-sm leading-relaxed'>
                    <span className='font-bold mr-2'>{post.author?.userName}</span>
                    {post.caption}
                </div>
                {post.comments?.length > 0 && (
                    <Link to={`/post/${post._id}`} className='text-zinc-500 text-[13px] block py-1 hover:underline'>
                        View all {post.comments.length} comments
                    </Link>
                )}
            </div>
        </div>
    )
}

export default PostCard