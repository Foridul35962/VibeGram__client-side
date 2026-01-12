import React from 'react'
import avatar from '../../assets/avatar.png'

const StoryDp = ({ image, userName, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className='flex flex-col items-center gap-1 w-12 shrink-0'
    >
      <div className='size-13 p-0.5 bg-linear-to-tr from-yellow-400 via-orange-500 to-fuchsia-600 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform'>
        <div className='bg-black p-0.5 rounded-full w-full h-full'>
          <div className='w-full h-full rounded-full overflow-hidden'>
            <img
              src={image?.url || avatar}
              alt={userName}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>

      <div className='text-[12px] text-center truncate w-full text-white px-1'>
        {userName || "User"}
      </div>
    </button>
  )
}

export default StoryDp
