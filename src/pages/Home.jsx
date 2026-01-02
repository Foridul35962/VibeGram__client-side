import React from 'react'
import { useSelector } from 'react-redux'
import LeftHome from '../components/LeftHome'
import Feed from '../components/Feed'
import RightHome from '../components/RightHome'

const Home = () => {
  return (
    <div className='w-full bg-black flex text-white px-5'>
      <LeftHome />
      <Feed />
      <RightHome />
    </div>
  )
}

export default Home