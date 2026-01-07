import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { commentPost, deletePost, getPost, likedUnlikedPost, likeOptimisticSingle, likeRollbackSingle, savedUnsavedPosts } from '../stores/slice/postSlice'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react'
import avatar from '../assets/avatar.png'
import PostLoading from '../components/loading/PostLoading'
import PostNotFound from '../components/not found/PostNotFound'
import { toast } from 'react-toastify'

const Post = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { postId } = useParams()
    const { post, postLoading, commentLoading } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.user)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [showLikeUser, setShowLikeUser] = useState(false)
    const [showDeleteMenu, setShowDeleteMenu] = useState(false)
    const likesArr = Array.isArray(post?.likes) ? post.likes : [];
    const isLiked = likesArr.some(like => String(like?._id ?? like) === String(user?._id));

    useEffect(() => {
        dispatch(getPost(postId))
    }, [postId, dispatch])

    const handleDeletePost = async () => {
        if (window.confirm('Are you want to delete this post?')) {
            try {
                await dispatch(deletePost({ postId })).unwrap()
                toast.success('Post Deleted')
                navigate(`/profile/${user.userName}`)
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const handleCommentPost = async () => {
        try {
            await dispatch(commentPost({ postId, message })).unwrap()
            setMessage('')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleLikePost = async () => {
        const prevLikes = Array.isArray(post.likes) ? [...post.likes] : [];
        dispatch(likeOptimisticSingle(user));
        try {
            await dispatch(likedUnlikedPost({ postId })).unwrap()
        } catch (error) {
            dispatch(likeRollbackSingle(prevLikes));
            toast.error(error.message)
        }
    }

    const handlesavedPost = async () => {
        try {
            await dispatch(savedUnsavedPosts({ postId })).unwrap()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const nextImage = () => {
        if (currentIndex < post.media.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    if (postLoading) {
        return (
            <PostLoading />
        )
    }

    if (!post) return <PostNotFound />

    return (
        <div className='w-full min-h-screen bg-black text-white p-0 md:p-10 flex items-center justify-center'>
            <div className='w-full relative mb-20 max-w-6xl bg-black border border-zinc-900 md:rounded-sm flex flex-col md:flex-row h-full md:h-[85vh]'>

                {/* Left Side: Image Carousel */}
                <div className='flex md:hidden p-4 border-b border-zinc-900 items-center justify-between'>
                    <Link to={`/profile/${post.author?.userName}`} className='flex items-center gap-3 group'>
                        <div className='p-0.5 rounded-full bg-linear-to-tr from-yellow-500 to-fuchsia-600'>
                            <img src={post.author?.image?.url || avatar} className='size-8 rounded-full object-cover border-2 border-black' />
                        </div>
                        <span className='font-bold text-sm group-hover:text-zinc-400 transition'>{post.author?.userName}</span>
                    </Link>
                    {
                        user?.userName === post?.author?.userName &&
                        <div className='relative inline-block'>
                            <MoreHorizontal
                                onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                                className='cursor-pointer text-zinc-400 hover:text-white transition' size={20} />
                            {
                                showDeleteMenu &&
                                <>
                                    <div className='fixed inset-0 z-40' onClick={() => setShowDeleteMenu(!showDeleteMenu)} />
                                    <div className='absolute w-40 right-0 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200'>
                                        <button
                                            onClick={handleDeletePost}
                                            className='w-full cursor-pointer text-left px-4 py-2 text-sm text-red-500 rounded-xl hover:bg-zinc-700 transition'>
                                            Delete Post
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
                <div className='w-full md:w-[60%] bg-zinc-950 flex items-center justify-center relative group overflow-hidden border-r border-zinc-900'>
                    {/* Media Display */}
                    <div className='w-full h-full flex items-center justify-center bg-black'>
                        <img
                            src={post.media[currentIndex]?.url}
                            alt="post-media"
                            className='max-w-full max-h-full object-contain transition-all duration-500 ease-in-out'
                        />
                    </div>

                    {/* Navigation Arrows */}
                    {post.media?.length > 1 && (
                        <>
                            {currentIndex > 0 && (
                                <button onClick={prevImage} className='absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 rounded-full hover:bg-black transition cursor-pointer z-10'>
                                    <ChevronLeft size={24} />
                                </button>
                            )}
                            {currentIndex < post.media.length - 1 && (
                                <button onClick={nextImage} className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 rounded-full hover:bg-black transition cursor-pointer z-10'>
                                    <ChevronRight size={24} />
                                </button>
                            )}
                        </>
                    )}

                    {/* Media Dots Indicator */}
                    {post.media?.length > 1 && (
                        <div className='absolute bottom-4 flex gap-1.5 z-10'>
                            {post.media.map((_, i) => (
                                <div
                                    key={i}
                                    className={`size-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-white w-3' : 'bg-white/40'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Details & Interaction */}
                <div className='w-full md:w-[40%] flex flex-col bg-black h-full'>

                    {/* Header */}
                    <div className='hidden md:flex p-4 border-b border-zinc-900 items-center justify-between'>
                        <Link to={`/profile/${post.author?.userName}`} className='flex items-center gap-3 group'>
                            <div className='p-0.5 rounded-full bg-linear-to-tr from-yellow-500 to-fuchsia-600'>
                                <img src={post.author?.image?.url || avatar} className='size-8 rounded-full object-cover border-2 border-black' />
                            </div>
                            <span className='font-bold text-sm group-hover:text-zinc-400 transition'>{post.author?.userName}</span>
                        </Link>
                        {
                            user?.userName === post?.author?.userName &&
                            <div className='relative inline-block'>
                                <MoreHorizontal
                                    onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                                    className='cursor-pointer text-zinc-400 hover:text-white transition' size={20} />
                                {
                                    showDeleteMenu &&
                                    <>
                                        <div className='fixed inset-0 z-40' onClick={() => setShowDeleteMenu(!showDeleteMenu)} />
                                        <div className='absolute w-40 right-0 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200'>
                                            <button
                                                onClick={handleDeletePost}
                                                className='w-full cursor-pointer text-left px-4 py-2 text-sm text-red-500 rounded-xl hover:bg-zinc-700 transition'>
                                                Delete Post
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    </div>

                    {/* Scrollable Caption & Comments Area */}
                    <div className='flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar'>
                        <div className='flex gap-3 items-start'>
                            <img src={post.author?.image?.url || avatar} className='size-8 rounded-full object-cover border border-zinc-800' />
                            <div>
                                <p className='text-[13px] leading-relaxed'>
                                    <span className='font-bold mr-2'>{post.author?.userName}</span>
                                    {post.caption}
                                </p>
                                <p className='text-[10px] text-zinc-500 mt-2 uppercase tracking-wide'>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Comments Section Placeholder */}
                        <div className='pt-5 border-t border-zinc-900/50'>
                            {post.comments?.length === 0 ? (
                                <div className='flex flex-col items-center justify-center py-10 opacity-30'>
                                    <MessageCircle size={32} strokeWidth={1} />
                                    <p className='text-xs mt-2'>No comments yet.</p>
                                </div>
                            ) : (
                                <div className='space-y-6'>
                                    {post.comments.map((comment, idx) => (
                                        <div key={idx} className='flex gap-3 items-start group'>
                                            {/* Commenter Avatar */}
                                            <Link to={`/profile/${comment.author?.userName}`} className='shrink-0'>
                                                <img
                                                    src={comment.author?.image?.url || avatar}
                                                    alt="commenter"
                                                    className='size-8 rounded-full object-cover border border-zinc-900'
                                                />
                                            </Link>

                                            {/* Comment Content */}
                                            <div className='flex flex-col gap-1 flex-1'>
                                                <p className='text-[13px] leading-relaxed'>
                                                    <Link
                                                        to={`/profile/${comment.author?.userName}`}
                                                        className='font-bold mr-2 text-white hover:underline'
                                                    >
                                                        {comment.author?.userName}
                                                    </Link>
                                                    <span className='text-zinc-300'>{comment.message}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className='p-4 border-t border-zinc-900 space-y-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div onClick={handleLikePost} className="cursor-pointer">
                                    {isLiked ? (
                                        <Heart className='text-red-500 fill-red-500 transition' size={24} />
                                    ) : (
                                        <Heart className='hover:text-zinc-500 text-white transition' size={24} />
                                    )}
                                </div>
                                <MessageCircle
                                    onClick={() => setShowMessage(!showMessage)}
                                    className='hover:text-zinc-500 transition cursor-pointer' size={24} />
                                {/* <Send className='hover:text-zinc-500 transition cursor-pointer' size={24} /> */}
                            </div>

                            {/* save post */}
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
                        <div className='relative inline-block mb-2'>
                            <p onClick={() => setShowLikeUser(!showLikeUser)} className='text-sm font-bold cursor-pointer hover:underline'>
                                {post.likes?.length || 0} likes
                            </p>
                            {showLikeUser && (
                                <>
                                    <div className='fixed inset-0 z-40' onClick={() => setShowLikeUser(false)} />
                                    <div className='absolute bottom-full left-0 mb-2 w-64 max-h-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-2 duration-200'>
                                        <div className='p-2 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900'>
                                            <span className='text-[10px] font-black uppercase text-zinc-500 px-2'>Liked by</span>
                                            <X size={14} className='cursor-pointer' onClick={() => setShowLikeUser(false)} />
                                        </div>
                                        {post.likes.map(lu => (
                                            <Link key={lu._id} to={`/profile/${lu.userName}`} className='flex items-center gap-3 p-2.5 hover:bg-zinc-800 transition'>
                                                <img src={lu.image?.url || avatar} className='size-8 rounded-full object-cover' />
                                                <span className='text-xs font-bold'>{lu.userName}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Inline Comment Input */}
                        {
                            showMessage &&
                            <div className='flex items-center gap-2 pt-2'>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Add a comment..."
                                    className='w-full py-1 px-2 bg-transparent border-none text-sm focus:ring-0 placeholder:text-zinc-600'
                                />
                                <button
                                    onClick={handleCommentPost}
                                    disabled={commentLoading || message.trim() === ''}
                                    className='flex items-center justify-center p-2 rounded-full transition-all duration-200  disabled:opacity-30 disabled:cursor-not-allowed group' >
                                    {commentLoading ? (
                                        <Loader2
                                            size={20}
                                            className='animate-spin text-zinc-500 cursor-not-allowed'
                                        />
                                    ) : (
                                        <Send
                                            size={22}
                                            className={`transition-transform cursor-pointer duration-200  ${message.trim() !== '' ? 'text-blue-500 scale-110 rotate-[-10deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'text-zinc-600'}`}
                                        />
                                    )}
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post