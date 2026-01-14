import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPrevChatPartner } from '../stores/slice/messageSlice'
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom'

const RightHome = () => {
  const { chatPartners, onlineUsers } = useSelector((state) => state.message)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPrevChatPartner())
  }, [dispatch])

  return (
    <div className="h-full min-h-screen flex flex-col bg-black py-8 px-4 border-l border-gray-900 shadow-2xl">
      {/* Header with Counter */}
      <div className="mb-8 px-2 flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-white tracking-tight">Messages</h2>
        {chatPartners?.length > 0 && (
          <span className="bg-blue-600/20 text-blue-500 text-[10px] px-2 py-1 rounded-full font-bold">
            {chatPartners.length} NEW
          </span>
        )}
      </div>

      {/* Chat Partners List */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
        {chatPartners && chatPartners.length > 0 ? (
          chatPartners.map((partner, idx) => {
            const isOnline = onlineUsers?.[partner?.user?._id]
            return (
              <div
                key={idx}
                onClick={() => navigate(`/chat/${partner?.user?._id}`)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#0f0f0f] border border-transparent hover:border-gray-800 transition-all duration-300 cursor-pointer group"
              >
                {/* Avatar with Glow Effect */}
                <div className="relative shrink-0">
                  <div className="size-12 rounded-full p-0.5 bg-linear-to-tr from-gray-800 to-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    <img
                      src={partner?.user?.image?.url || avatar}
                      alt="user"
                      className="w-full h-full rounded-full object-cover border-2 border-black"
                    />
                  </div>
                  <span className={`absolute bottom-0 right-0 size-3.5 border-[3px] border-black rounded-full shadow-lg ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-600'} `} ></span>
                </div>

                {/* Info Section */}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-bold text-[14px] text-gray-100 truncate group-hover:text-blue-400 transition-colors">
                      {partner.user?.fullName || partner.user?.userName}
                    </p>
                  </div>
                  <p className="text-[13px] text-gray-500 truncate leading-tight group-hover:text-gray-400 transition-colors">
                    {partner.lastMessage?.text || "Click to start chatting"}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 opacity-40">
            <div className="size-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[2px]">Empty Inbox</p>
          </div>
        )}
      </div>

      {/* Clean Footer */}
      <div className="mt-auto pt-6 px-2">
        <div className="bg-linear-to-r from-gray-900/50 to-transparent p-4 rounded-2xl border border-gray-800/50">
          <p className="text-[11px] font-bold text-gray-400 mb-1">Explore</p>
          <p className="text-[10px] text-gray-600 leading-relaxed">Discover more people and start interesting conversations.</p>
        </div>
      </div>
    </div>
  )
}

export default RightHome