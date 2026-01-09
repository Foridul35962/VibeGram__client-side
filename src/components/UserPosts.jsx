import { Grid, Copy, Heart, MessageCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts, setPrevFetchedUserId } from '../stores/slice/postSlice'
import { Link, useNavigate } from 'react-router-dom'

const UserPosts = ({ fetchedUserId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userPosts, postLoading, prevFetchedUserId } = useSelector((state) => state.post)

    useEffect(() => {
        if (prevFetchedUserId === fetchedUserId) {
            return
        }
        dispatch(getUserPosts(fetchedUserId))
        dispatch(setPrevFetchedUserId(fetchedUserId))
    }, [fetchedUserId, dispatch, prevFetchedUserId])

    if (postLoading) {
        return (
            <div className='grid grid-cols-3 gap-1 md:gap-4 animate-pulse p-1'>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className='aspect-square bg-zinc-900 rounded-sm md:rounded-lg' />
                ))}
            </div>
        )
    }

    return (
        <>
            {userPosts.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-24 text-zinc-600'>
                    <div className='size-20 rounded-full border-2 border-zinc-800 flex items-center justify-center mb-4'>
                        <Grid size={40} strokeWidth={1} />
                    </div>
                    <h3 className='text-2xl font-black text-zinc-400 uppercase tracking-widest'>No Posts Yet</h3>
                </div>
            ) : (
                <div className='grid grid-cols-3 gap-1 md:gap-4 p-1 md:p-4'>
                    {userPosts.map((post) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            className='relative aspect-square group cursor-pointer overflow-hidden bg-zinc-900 rounded-sm md:rounded-lg'
                        >
                            {/* First Media Preview */}
                            <img
                                src={post.media[0]?.url}
                                alt={post.caption}
                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                            />

                            {/* Multiple Media Indicator (Instagram Style) */}
                            {post.media?.length > 1 && (
                                <div className='absolute top-2 right-2 text-white drop-shadow-md z-10'>
                                    <Copy size={18} className='rotate-180 drop-shadow-2xl' />
                                </div>
                            )}

                            {/* Hover Overlay with Stats (Standard View) */}
                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 md:gap-8'>
                                <div className='flex items-center gap-1 text-white font-bold'>
                                    <Heart size={20} className='fill-white' />
                                    <span className='text-xs md:text-sm'>{post.likes?.length || 0}</span>
                                </div>
                                <div className='flex items-center gap-1 text-white font-bold'>
                                    <MessageCircle size={20} className='fill-white' />
                                    <span className='text-xs md:text-sm'>{post.comments?.length || 0}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}

export default UserPosts