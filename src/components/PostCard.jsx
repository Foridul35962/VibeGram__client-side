import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import avatar from '../assets/avatar.png'

const PostCard = ({ post }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextMedia = (e) => {
        e.preventDefault()
        if (currentIndex < post.media.length - 1) setCurrentIndex(prev => prev + 1)
    }

    const prevMedia = (e) => {
        e.preventDefault()
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
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
                    <span className='text-zinc-500 text-xs'>• 1d</span>
                </div>
                <MoreHorizontal className='cursor-pointer text-zinc-400' size={18} />
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
                    <Heart className='cursor-pointer hover:text-zinc-500 transition' size={24} />
                    <Link to={`/post/${post._id}`}><MessageCircle className='cursor-pointer hover:text-zinc-500 transition' size={24} /></Link>
                    {/* <Send className='cursor-pointer hover:text-zinc-500 transition' size={24} /> */}
                </div>
                <Bookmark className='cursor-pointer hover:text-zinc-500 transition' size={24} />
            </div>

            {/* 4. Likes & Caption */}
            <div className='space-y-1.5 px-1'>
                <p className='text-sm font-bold'>{post.likes?.length || 0} likes</p>
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