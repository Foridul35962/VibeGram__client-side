import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getPost } from '../stores/slice/postSlice'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import avatar from '../assets/avatar.png'
import PostLoading from '../components/loading/PostLoading'
import PostNotFound from '../components/not found/PostNotFound'

const Post = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const { post, postLoading } = useSelector((state) => state.post)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        dispatch(getPost(postId))
    }, [postId, dispatch])

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
            <div className='w-full mb-20 max-w-6xl bg-black border border-zinc-900 md:rounded-sm flex flex-col md:flex-row h-full md:h-[85vh]'>

                {/* Left Side: Image Carousel */}
                <div className='flex md:hidden p-4 border-b border-zinc-900 items-center justify-between'>
                    <Link to={`/profile/${post.author?.userName}`} className='flex items-center gap-3 group'>
                        <div className='p-0.5 rounded-full bg-linear-to-tr from-yellow-500 to-fuchsia-600'>
                            <img src={post.author?.image?.url || avatar} className='size-8 rounded-full object-cover border-2 border-black' />
                        </div>
                        <span className='font-bold text-sm group-hover:text-zinc-400 transition'>{post.author?.userName}</span>
                    </Link>
                    <MoreHorizontal className='cursor-pointer text-zinc-400 hover:text-white transition' size={20} />
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
                        <MoreHorizontal className='cursor-pointer text-zinc-400 hover:text-white transition' size={20} />
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
                                    {post.comments.map((comment) => (
                                        <div key={comment._id} className='flex gap-3 items-start group'>
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
                                                    <span className='text-zinc-300'>{comment.comment}</span>
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
                                <Heart className='hover:text-zinc-500 transition cursor-pointer' size={24} />
                                <MessageCircle className='hover:text-zinc-500 transition cursor-pointer' size={24} />
                                {/* <Send className='hover:text-zinc-500 transition cursor-pointer' size={24} /> */}
                            </div>
                            <Bookmark className='hover:text-zinc-500 transition cursor-pointer' size={24} />
                        </div>
                        <p className='text-sm font-bold'>{post.likes?.length || 0} likes</p>

                        {/* Inline Comment Input */}
                        <div className='flex items-center gap-2 pt-2'>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className='w-full py-1 px-2 bg-transparent border-none text-sm focus:ring-0 placeholder:text-zinc-600'
                            />
                            <button className='text-blue-500 text-sm font-bold opacity-50 hover:opacity-100 cursor-pointer'>Post</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post