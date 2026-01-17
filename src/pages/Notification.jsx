import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, MessageCircle, Bell, Clock } from 'lucide-react';
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom'
import { markAsReadNoti } from '../stores/slice/notificationSlice';

const Notification = () => {
  const { notificationData } = useSelector((state) => state.notification)
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnClick = (item) => {
    if (item.type === 'like') {
      item.posts ? navigate(`/post/${item.posts}`) : (item.reels && navigate(`/reels/${item.reels}`))
    } else if (item.type === 'comment') {
      item.posts ? navigate(`/post/${item.posts}`) : (item.reels && navigate(`/reels/${item.reels}`))
    } else if (item.type === 'follow') {
      navigate(`/profile/${user.userName}`)
    }
  }

  const unreadIds = (notificationData ?? [])
    .filter(n => !n.isRead)
    .map(n => n._id);

  useEffect(() => {
    if (unreadIds.length > 0) {
      dispatch(markAsReadNoti({ notificationId: unreadIds }));
    }
  }, [dispatch, unreadIds.join(",")]);

  //created time
  const getTimeAgo = (date) => {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return 'just now';

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;

    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}d ago`;
  };


  return (
    <div className="min-h-screen bg-[#000000] text-white p-2 sm:p-6 font-sans">
      <div className="max-w-xl mx-auto">

        {/* Simple Header */}
        <div className="flex items-center justify-between mb-10 px-4">
          <h1 className="text-3xl font-extrabold bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Activity
          </h1>
        </div>

        {/* Notifications Loop */}
        <div className="space-y-2">
          {notificationData && notificationData.length > 0 ? (
            notificationData.map((item) => (
              <div
                key={item._id}
                onClick={() => handleOnClick(item)}
                className={`group relative flex cursor-pointer items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${!item.isRead
                  ? 'bg-zinc-900/80 border border-zinc-800'
                  : 'bg-transparent hover:bg-zinc-900/40 border border-transparent hover:border-zinc-800'
                  }`}
              >
                {/* Left Side: Avatar & Icon */}
                <div className="relative">
                  <img
                    src={item.sender.image?.url || avatar}
                    className="h-12 w-12 rounded-full border border-zinc-700 object-cover"
                  />

                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-black flex items-center justify-center ${item.type === 'like' ? 'bg-red-500' :
                    item.type === 'comment' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}>

                    {item.type === 'like' && (
                      <Heart size={10} className="text-white fill-current" />
                    )}

                    {item.type === 'comment' && (
                      <MessageCircle size={10} className="text-white fill-current" />
                    )}

                    {item.type === 'follow' && (
                      <UserPlus size={10} className="text-white fill-current" />
                    )}

                  </div>
                </div>

                {/* Middle: Content */}
                <div className="flex-1">
                  <p className="text-[15px] leading-snug">
                    <span className="font-bold text-zinc-100 cursor-pointer">
                      {item.sender?.userName}
                    </span>
                    <span className="text-zinc-400 ml-1.5">
                      {item.message}
                    </span>
                  </p>
                  <span className="text-[12px] text-zinc-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> {getTimeAgo(item.createdAt)}
                  </span>
                </div>

                {/* Right Side: Action/Indicator */}
                <div className="flex flex-col items-end gap-2">
                  {!item.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            /* Minimalist Empty State */
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative mb-6">
                <Bell size={64} className="text-zinc-800" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-zinc-800 rounded-full border-4 border-black"></div>
              </div>
              <p className="text-zinc-500 font-medium">No activity yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;