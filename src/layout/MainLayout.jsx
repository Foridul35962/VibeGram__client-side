import { House, Search, SquarePlus, Youtube } from 'lucide-react'
import React from 'react'
import avatar from '../assets/avatar.png'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <nav className='fixed bottom-4 left-0 right-0 flex justify-center z-50'>
        <div className='w-[90%] lg:w-[45%] h-16 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-around px-6 border border-gray-700'>
          <Link to="/" className="text-white hover:text-blue-400 transition-colors"><House /></Link>
          <Link to="/search" className="text-white hover:text-blue-400 transition-colors"><Search /></Link>
          <div
          onClick={()=>navigate('/upload-post')}
          className="bg-blue-600 p-3 rounded-full -mt-10 border-4 border-white dark:border-gray-800">
            {/* Center Action Button Example */}
            <span className="text-white text-xl cursor-pointer"><SquarePlus /></span>
          </div>
          <Link to="/reels" className="text-white hover:text-blue-400 transition-colors"><Youtube /></Link>
          <Link
            to={`/profile/${user.userName}`}
            className="text-white border-2 rounded-full hover:border-blue-400 transition-colors size-8 overflow-hidden flex items-center justify-center"
          >
            <img
              src={user?.image?.url || avatar}
              alt="user"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default MainLayout