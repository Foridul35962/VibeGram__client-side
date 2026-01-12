import React, { useEffect, useMemo, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, Eye, Users, Trash2 } from "lucide-react"
import avatar from '../../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux"
import { deleteStory, viewStory } from "../../stores/slice/storySlice"
import { toast } from "react-toastify"

const DEFAULT_DURATION_MS = 6000
const VIDEO_FALLBACK_MS = 10000

const StoryViewer = ({ group, onClose }) => {
    const stories = group?.stories || []
    const author = group?.author
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [idx, setIdx] = useState(0)
    const [progress, setProgress] = useState(0)
    const [showViewers, setShowViewers] = useState(false)

    const rafRef = useRef(null)
    const startRef = useRef(null)
    const durationRef = useRef(DEFAULT_DURATION_MS)

    const current = useMemo(() => stories[idx], [stories, idx])

    // Logic: Stop/Pause
    const stop = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = null
        startRef.current = null
    }

    // Logic: Next & Prev
    const next = () => {
        stop()
        if (idx + 1 < stories.length) {
            setIdx(idx + 1)
            setProgress(0)
        } else {
            onClose?.()
        }
    }

    const prev = () => {
        stop()
        setProgress(0)
        if (idx > 0) {
            setIdx(idx - 1)
        } else {
            startProgress(durationRef.current)
        }
    }

    const startProgress = (durationMs) => {
        stop()
        durationRef.current = durationMs || DEFAULT_DURATION_MS

        const tick = (t) => {
            if (!startRef.current) startRef.current = t
            const elapsed = t - startRef.current
            const pct = Math.min(100, (elapsed / durationRef.current) * 100)

            setProgress(pct)
            if (pct >= 100) {
                next()
            } else {
                rafRef.current = requestAnimationFrame(tick)
            }
        }
        rafRef.current = requestAnimationFrame(tick)
    }

    // Progress control based on current story & Viewers overlay
    useEffect(() => {
        if (!showViewers) {
            const initialDur = current?.mediaTypes === "video" ? VIDEO_FALLBACK_MS : DEFAULT_DURATION_MS
            startProgress(initialDur)
        } else {
            stop() // Pause story when viewing viewers list
        }
        return () => stop()
    }, [idx, current, showViewers])

    // Keyboard support
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose?.()
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [idx])

    const handleVideoLoadedMeta = (e) => {
        const dur = e.currentTarget?.duration
        if (dur) startProgress(dur * 1000)
    }

    //view functionality
    useEffect(() => {
        if (author._id !== user?._id && current) {
            dispatch(viewStory({ storyId: current._id }))
        }
    }, [idx])

    //delete functionality
    const handleDeleteStory = async () => {
        if (window.confirm('Are you want to delete this story?') && current) {
            try {
                await dispatch(deleteStory({ storyId: current._id })).unwrap()
                toast.success('story delete successfully')
                onClose()
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    if (!current) return null

    return (
        <div className="fixed inset-0 z-999 bg-black/90 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
            <div className="relative w-full max-w-112.5 h-[80vh] md:h-[90vh] bg-black md:rounded-xl overflow-hidden shadow-2xl">

                {/* Progress Bars */}
                <div className="absolute top-0 left-0 right-0 z-50 p-3 bg-linear-to-b from-black/70 to-transparent">
                    <div className="flex gap-1.5 mb-4">
                        {stories.map((_, i) => (
                            <div key={i} className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white transition-none"
                                    style={{ width: i === idx ? `${progress}%` : i < idx ? '100%' : '0%' }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={author?.image?.url || avatar} className="w-10 h-10 rounded-full object-cover border border-white/20" alt="" />
                            <span className="text-white font-medium text-sm">{author?.userName || "User"}</span>
                        </div>
                        <div>
                            {
                                author?._id === user?._id &&
                                <button
                                    onClick={handleDeleteStory}
                                    className="text-white cursor-pointer p-1 hover:bg-white/10 rounded-full"
                                >
                                    <Trash2 size={24} />
                                </button>
                            }
                            <button onClick={onClose} className="text-white p-1 cursor-pointer hover:bg-white/10 rounded-full"><X size={24} /></button>
                        </div>
                    </div>
                </div>

                {/* Viewers Button & List */}
                {author?._id === user?._id && (
                    <div className="absolute bottom-6 left-4 z-50">
                        <button
                            onClick={() => setShowViewers(!showViewers)}
                            className="bg-black/50 backdrop-blur-md text-white flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-black/70 transition"
                        >
                            <Eye size={18} />
                            <span className="text-sm font-medium">{current.viewers?.length || 0}</span>
                        </button>

                        {showViewers && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowViewers(false)} />
                                <div className="absolute bottom-14 left-0 w-64 max-h-80 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="p-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 mb-2">Viewed by</div>
                                    {current.viewers?.length > 0 ? current.viewers.map((viewer, i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition">
                                            <img src={viewer?.image?.url || avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                                            <span className="text-white text-sm truncate">{viewer.userName}</span>
                                        </div>
                                    )) : (
                                        <div className="p-4 text-center text-zinc-500 text-sm">No views yet</div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Media Content */}
                <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                    {current.mediaTypes === "video" ? (
                        <video
                            src={current?.media?.url}
                            className="w-full h-full object-contain"
                            autoPlay muted playsInline
                            onLoadedMetadata={handleVideoLoadedMeta}
                            onEnded={next}
                        />
                    ) : (
                        <img src={current?.media?.url} className="w-full h-full object-contain" alt="story" />
                    )}
                </div>

                {/* Navigation */}
                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white"><ChevronLeft size={28} /></button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white"><ChevronRight size={28} /></button>

                {/* Touch Zones */}
                <div className="absolute inset-0 flex z-40">
                    <div className="w-1/3 h-full cursor-pointer" onClick={prev} />
                    <div className="w-2/3 h-full cursor-pointer" onClick={next} />
                </div>
            </div>
        </div>
    )
}

export default StoryViewer