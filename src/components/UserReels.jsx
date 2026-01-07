import { Play, SquareUser } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserAllReels, setPrevFetchedUserId } from '../stores/slice/reelSlice'

const UserReels = ({ fetchedUserId }) => {
    const dispatch = useDispatch()
    const { prevFetchedUserId, userReel, reelLoading } = useSelector((state) => state.reel)

    useEffect(() => {
        if (prevFetchedUserId === fetchedUserId) {
            return
        }
        dispatch(getUserAllReels(fetchedUserId))
        dispatch(setPrevFetchedUserId(fetchedUserId))
    }, [fetchedUserId, dispatch, prevFetchedUserId])

    if (reelLoading) {
        return (
            <div className='grid grid-cols-3 gap-1 md:gap-4'>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className='aspect-9/16 bg-zinc-900 animate-pulse rounded-lg' />
                ))}
            </div>
        )
    }

    return (
        <>
            {userReel.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-24 text-zinc-600'>
                    <div className='size-20 rounded-full border-2 border-zinc-800 flex items-center justify-center mb-4'>
                        <SquareUser size={40} strokeWidth={1} />
                    </div>
                    <h3 className='text-2xl font-black text-zinc-400 uppercase tracking-widest'>No Reels Yet</h3>
                </div>
            ) : (
                <div className='grid grid-cols-3 gap-1 md:gap-4 p-1 md:p-4'>
                    {userReel.map((reel) => (
                        <Link
                            to={`/reels/${reel._id}`}
                            key={reel._id}
                            className='relative aspect-3/4 group cursor-pointer overflow-hidden bg-zinc-900 rounded-md md:rounded-lg border border-zinc-900/50'
                        >
                            {/* Video Preview */}
                            <video
                                src={reel.media?.url}
                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                muted
                                onMouseOver={e => e.target.play()}
                                onMouseOut={e => {
                                    e.target.pause();
                                    e.target.currentTime = 0;
                                }}
                            />

                            {/* Center Play Icon (Only on Hover) */}
                            <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity'>
                                <Play size={24} className='text-white fill-white' />
                            </div>

                            {/* Bottom Stats (Left Side) */}
                            <div className='absolute bottom-3 left-3 z-10 flex items-center gap-1 text-white drop-shadow-md'>
                                <Play size={14} className='fill-white' />
                                <span className='text-xs font-bold'>
                                    {reel.likes?.length || 0}
                                </span>
                            </div>

                            {/* Subtle Gradient Shadow */}
                            <div className='absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none' />
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}

export default UserReels