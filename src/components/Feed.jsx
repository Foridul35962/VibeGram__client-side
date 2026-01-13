import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { CirclePlus, Heart, MessageCircle } from 'lucide-react'
import StoryDp from './story/StoryDp'
import FeedPosts from './FeedPosts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFollowingUserStory } from '../stores/slice/storySlice'
import StoryViewer from './story/StoryViewer'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allStory, myStory } = useSelector((state) => state.story)
  const { user } = useSelector((state) => state.user)

  const [openStory, setOpenStory] = useState(false)
  const [activeGroup, setActiveGroup] = useState(null) // {author, stories}

  useEffect(() => {
    dispatch(getAllFollowingUserStory())
  }, [dispatch])

  const handleOpenStory = (group) => {
    if (!group?.stories?.length) return
    setActiveGroup(group)
    setOpenStory(true)
  }

  const handleCloseStory = () => {
    setOpenStory(false)
    setActiveGroup(null)
  }

  return (
    <div className='w-full lg:w-1/2 min-h-dvh overflow-y-auto p-5'>
      <div className='flex lg:hidden justify-between items-center mb-4'>
        <img src={logo} alt="logo" className='w-32 object-contain cursor-pointer' />
        <div className='flex gap-3 items-center p-2 hover:bg-gray-900 rounded-full transition duration-300 cursor-pointer'>
          <MessageCircle onClick={()=>navigate('/messages')} size={24} className='text-white' />
          <Heart size={24} className='text-white' />
        </div>
      </div>

      {/* Story Section */}
      <div className='flex w-full overflow-x-auto gap-5 p-2 items-center no-scrollbar mb-6'>
        {/* My Story */}
        {
          myStory ? (
            <StoryDp
              userName={'My Story'}
              image={user?.image}
              onClick={() => handleOpenStory(myStory)} // ✅ click open
            />
          ) : (
            <div
              className='relative'
              onClick={() => navigate('/upload-post')}
            >
              <StoryDp
                userName={'My Story'}
                image={user?.image}
              />
              <CirclePlus className='absolute bottom-4 right-0 fill-black cursor-pointer' />
            </div>
          )
        }


        {/* Following */}
        {allStory?.map((group) => (
          <StoryDp
            key={group?.author?._id}
            userName={group.author?.userName}
            image={group.author?.image}
            onClick={() => handleOpenStory(group)} // ✅ click open
          />
        ))}
      </div>

      {/* Posts */}
      <div className='w-full min-h-dvh'>
        <FeedPosts />
      </div>

      {/* Story Viewer Modal */}
      {openStory && activeGroup && (
        <StoryViewer
          group={activeGroup}
          onClose={handleCloseStory}
        />
      )}
    </div>
  )
}

export default Feed
