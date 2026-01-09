import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, resetPosts } from '../stores/slice/postSlice'
import PostCard from './PostCard'
import { Heart, Loader2 } from 'lucide-react'

const FeedPosts = () => {
    const dispatch = useDispatch()
    const { items, page, limit, loading, hasMore, error } = useSelector((state) => state.post)

    const sentinelRef = useRef(null)

    //first load
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchPosts({ page: 1, limit }));
        }
    }, [dispatch, limit, items.length])

    //infinite scroll
    useEffect(() => {
        const el = sentinelRef.current
        if (!el) {
            return
        }

        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                return
            }
            if (loading || !hasMore) {
                return
            }
            dispatch(fetchPosts({ page: page + 1, limit }))
        }, { threshold: 0.2 })

        observer.observe(el)
        return () => observer.disconnect()
    }, [dispatch, page, limit, loading, hasMore])

    return (
        <div className='w-full min-h-screen bg-black text-white pt-5 pb-20'>
            <div className='flex flex-col items-center'>
                {items.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}

                {/* --- Scroll Trigger & Loading Status --- */}
                <div ref={sentinelRef} className='w-full max-w-117.5 py-10 flex flex-col items-center gap-4'>
                    {loading && (
                        <div className='flex flex-col items-center gap-2'>
                            <Loader2 className='animate-spin text-zinc-600' size={30} />
                            <p className='text-xs text-zinc-500 font-medium italic'>Bringing more vibes...</p>
                        </div>
                    )}

                    {error && <p className='text-red-500 text-sm font-bold bg-red-500/10 px-4 py-2 rounded-lg'>{error}</p>}

                    {!hasMore && items.length > 0 && (
                        <div className='flex flex-col items-center gap-2 pt-5 border-t border-zinc-900 w-full'>
                            <div className='size-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600'>
                                <Heart size={20} />
                            </div>
                            <p className='text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]'>You've seen it all</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FeedPosts