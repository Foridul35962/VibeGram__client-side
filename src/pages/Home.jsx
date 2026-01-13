import React from 'react'
import { useSelector } from 'react-redux'
import LeftHome from '../components/LeftHome'
import Feed from '../components/Feed'
import RightHome from '../components/RightHome'

const Home = () => {
  return (
    <div className='w-full bg-black flex text-white px-0 sm:px-5'>
      <LeftHome />
      <Feed />
      <div className='w-1/4 hidden lg:block sticky top-0 h-screen overflow-hidden'>
        <RightHome />
      </div>
    </div>
  )
}

export default Home