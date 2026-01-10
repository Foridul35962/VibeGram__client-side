import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllReels, getReel } from '../stores/slice/reelSlice'
import ReelCard from '../components/ReelCard'

const Reels = () => {
  const dispatch = useDispatch()
  const { reelId } = useParams()

  const { reel, allReels, page, limit, loading, reelLoading, hasMore, error } = useSelector((state) => state.reel)

  const sentinelRef = useRef(null)
  const firstReelRef = useRef(null)

  useEffect(() => {
    if (reelId) dispatch(getReel(reelId))
  }, [dispatch, reelId])

  useEffect(() => {
    dispatch(getAllReels({ page: 1, limit }))
  }, [dispatch, limit])

  const mergedReels = useMemo(() => {
    if (!reel) return allReels
    return [reel, ...allReels.filter((r) => r?._id !== reel?._id)]
  }, [reel, allReels])

  useEffect(() => {
    if (!reelId) return

    const t = requestAnimationFrame(() => {
      firstReelRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start'
      })
    })
    return () => cancelAnimationFrame(t)
  }, [reelId, reel])

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        if (loading || !hasMore) return

        dispatch(getAllReels({ page: page + 1, limit }))
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [dispatch, page, limit, loading, hasMore])

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {/* Fullscreen Loader */}
      {(reelLoading || loading) && mergedReels.length === 0 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black text-white">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium animate-pulse">Fetching video...</p>
        </div>
      )}

      {/* Error */}
      {error && mergedReels.length === 0 && (
        <div className="h-screen w-full flex items-center justify-center text-white">
          <div className="max-w-md text-center px-6">
            <p className="text-lg font-semibold mb-2">Something went wrong</p>
            <p className="text-sm opacity-70 wrap-break-word">{String(error)}</p>
          </div>
        </div>
      )}

      {/* Reels */}
      {mergedReels.map((r, index) => (
        <ReelCard
          key={r?._id}
          r={r}
          ref={index === 0 ? firstReelRef : null}
        />
      ))}

      {/* Infinite Scroll Loader */}
      <div ref={sentinelRef} className="h-28 flex items-center justify-center bg-black">
        {loading && mergedReels.length > 0 && (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
      </div>
    </div>
  )
}

export default Reels
