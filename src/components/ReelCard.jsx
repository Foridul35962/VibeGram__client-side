import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Heart, MessageCircle, Share2, Music2, MoreVertical, Send, VolumeX, Volume2 } from 'lucide-react'
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollow, toggleFollow } from '../stores/slice/userSlice'
import { toast } from 'react-toastify'
import { commentReel, likedUnlikedReel, reelsLikeOptimistic, reelsLikeRollBack } from '../stores/slice/reelSlice'

const ReelCard = forwardRef(({ r, isMuted, setIsMuted }, ref) => {
  const videoRef = useRef(null)
  const { user } = useSelector((state) => state.user)
  const { reelCommentLoading } = useSelector((state) => state.reel)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showCommentBox, setShowCommentBox] = useState(false)

  // Auto play/pause based on visibility
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            el.play().catch(() => { })
          } else {
            el.pause()
          }
        })
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => { })
    else v.pause()
  }

  const followArr = Array.isArray(user?.followings) ? user.followings : [];

  const isfollow = followArr.some(
    follow => String(follow) === String(r?.author?._id)
  );

  const handleFollow = async () => {
    dispatch(toggleFollow(r?.author?._id))
    try {
      dispatch(followUnfollow({ followingUserId: r?.author?._id }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const isLiked = (r.likes || []).some(l => String(l?._id ?? l) === String(user._id))
  const handleLike = async () => {
    const prevLikes = (r.likes || []).map(l => String(l?._id ?? l))
    dispatch(reelsLikeOptimistic({ user, reelId: r._id }))

    try {
      await dispatch(likedUnlikedReel({ reelId: r._id })).unwrap()
    } catch (e) {
      dispatch(reelsLikeRollBack({ reelId: r._id, prevLikes }))
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    const message = e.target.message.value
    const reelId = r._id
    try {
      await dispatch(commentReel({ message, reelId })).unwrap()
      e.target.message.value = ""
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center snap-start bg-black"
    >
      {/* --- Video Player Section --- */}
      <div className="relative h-full w-full max-w-112.5 bg-neutral-900 overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={r?.media?.url}
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
        />

        {/* Shadow overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-10 right-6 z-10 p-2 cursor-pointer bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-all"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* --- Sidebar Actions (Right Side) --- */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 text-white z-20">
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={handleLike}
        >
          <div
            className={`p-3 rounded-full transition-all bg-white/10 backdrop-blur-md ${isLiked ? 'text-red-500 scale-110' : 'text-white'
              }`}
          >
            <Heart size={28} fill={isLiked ? 'currentColor' : 'none'} />
          </div>
          <span className="text-[12px] font-medium mt-1">{r?.likes?.length || 0}</span>
        </div>

        <div className='relative'>
          {/* Comment Icon Button */}
          <div onClick={() => setShowCommentBox(!showCommentBox)} className="flex flex-col items-center cursor-pointer group">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:bg-white/20 transition-all duration-300">
              <MessageCircle size={28} />
            </div>
            <span className="text-[12px] font-medium mt-1 text-white/80">{r?.comments?.length || 0}</span>
          </div>

          {/* Comment Box Modal/Dropdown */}
          {showCommentBox && (
            <div className='absolute right-0 bottom-0  mb-4 z-50'>
              {/* Overlay to close on click outside */}
              <div className='fixed inset-0 z-[-1]' onClick={() => setShowCommentBox(false)} />

              <div className='w-72 md:w-80 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200'>

                {/* Header */}
                <div className="p-4 border-b border-zinc-800">
                  <h3 className="text-white font-semibold text-sm">Comments</h3>
                </div>

                {/* Comments List */}
                <div className='max-h-30 lg:max-h-40 overflow-y-auto p-4 space-y-4 custom-scrollbar'>
                  {r?.comments && r.comments.length > 0 ? (
                    r.comments.map((comment, index) => (
                      <div key={index} className="flex gap-3">
                        <img
                          src={comment.author?.image?.url || avatar}
                          className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                          alt="avatar"
                        />
                        <div className="flex-1">
                          <p className="text-zinc-400 text-xs font-bold">{comment.author?.userName}</p>
                          <p className="text-zinc-200 text-sm leading-relaxed">{comment.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-zinc-500 text-sm italic">No comments yet. Be the first!</p>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleComment} className="p-3 bg-zinc-900/50 border-t border-zinc-800 flex items-center gap-2">
                  <input
                    type="text"
                    name='message'
                    placeholder="Add a comment..."
                    className="flex-1 bg-zinc-800 border-none rounded-full px-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <button
                    disabled={reelCommentLoading}
                    className="p-2 bg-blue-600 disabled:bg-blue-400 cursor-pointer hover:bg-blue-500 text-white rounded-full transition-colors flex items-center justify-center min-w-8 min-h-8"
                  >
                    {!reelCommentLoading ? (
                      <Send size={16} />
                    ) : (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center cursor-pointer">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white">
            <Share2 size={28} />
          </div>
          <span className="text-[12px] font-medium mt-1">Share</span>
        </div>

        <div className="cursor-pointer opacity-70 hover:opacity-100">
          <MoreVertical size={24} />
        </div>
      </div>

      {/* --- Bottom Info (Caption & Author) --- */}
      <div className="absolute bottom-10 left-4 right-16 text-white z-20">
        {/* User info */}
        <div className="flex items-center space-x-3 mb-3">
          <div onClick={() => navigate(`/profile/${r?.author?.userName}`)} className="h-10 w-10 rounded-full cursor-pointer border-2 border-pink-500 p-px">
            <img
              src={r?.author?.image?.url || avatar}
              className="h-full w-full rounded-full object-cover bg-gray-800"
              alt="profile"
            />
          </div>

          <div onClick={() => navigate(`/profile/${r?.author?.userName}`)} className="flex flex-col cursor-pointer">
            <h3 className="font-bold text-sm tracking-wide">@{r?.author?.userName || 'unknown'}</h3>
            <span className="text-[10px] opacity-70">{r?.author?.fullName || ''}</span>
          </div>

          {
            user?._id !== r?.author?._id &&
            <button
              onClick={handleFollow}
              className="ml-2 text-xs cursor-pointer font-semibold bg-white/20 px-4 py-1.5 rounded-lg border border-white/20 hover:bg-white/30 transition">
              {isfollow ? 'Unfollow' : 'Follow'}
            </button>
          }
        </div>

        {/* Caption */}
        <p className="text-sm font-normal mb-4 line-clamp-2 leading-snug max-w-[85%] text-gray-100">
          {r?.caption || ''}
        </p>

        {/* Music badge */}
        <div className="flex items-center space-x-2 text-xs bg-black/30 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
          <Music2 size={12} className="animate-spin-slow" />
          <div className="overflow-hidden w-28 whitespace-nowrap">
            <p className="animate-marquee inline-block">
              Original audio - {r?.author?.userName || ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ReelCard
