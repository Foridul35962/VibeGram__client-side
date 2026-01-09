import React from 'react'
import logo from '../assets/logo.png'
import { Heart } from 'lucide-react'
import StoryDp from './story/StoryDp'
import FeedPosts from './FeedPosts'

const Feed = () => {
  return (
    <div className='w-full lg:w-1/2 min-h-dvh overflow-y-auto p-5'>
      {/* logo */}
      <div className='flex lg:hidden justify-between items-center mb-4'>
        <img src={logo} alt="logo" className='w-32 object-contain cursor-pointer' />
        <div className='p-2 hover:bg-gray-900 rounded-full transition duration-300 cursor-pointer'>
          <Heart size={24} className='text-white' />
        </div>
      </div>
      {/* story */}
      <div className='flex w-full overflow-auto gap-5 p-2 items-center'>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
        <StoryDp userName={'foridsdf'}/>
      </div>
      {/* posts */}
      <div className='w-full min-h-dvh'>
        <FeedPosts />
      </div>
    </div>
  )
}

export default Feed