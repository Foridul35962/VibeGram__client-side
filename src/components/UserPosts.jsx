import { Grid, Copy } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts, setPrevFetchedUserId } from '../stores/slice/postSlice'
import { useNavigate } from 'react-router-dom'

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
                        <div 
                            key={post._id}
                            onClick={()=>navigate(`/post/${post._id}`)}
                            className='relative aspect-square group cursor-pointer overflow-hidden bg-zinc-900 rounded-sm md:rounded-lg'
                        >
                            {/* Main Image (Always take the first media) */}
                            <img 
                                src={post.media[0]?.url} 
                                alt={post.caption} 
                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                            />

                            {post.media.length > 1 && (
                                <div className='absolute top-2 right-2 text-white drop-shadow-lg pointer-events-none'>
                                    <Copy size={18} className='rotate-180' />
                                </div>
                            )}

                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>
                                <div className='flex items-center gap-1 text-white font-bold'>
                                   <span className='text-sm'>View</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default UserPosts