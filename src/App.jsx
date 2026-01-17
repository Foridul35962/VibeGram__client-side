import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ForgetPass from './pages/ForgetPass'
import UseGetUser from './hooks/UseGetUser'
import ProtectedRoutes from './routes/ProtectedRoutes'
import PublicRoutes from './routes/PublicRoutes'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import UploadAllPost from './pages/UploadAllPost'
import Post from './pages/Post'
import Reels from './pages/Reels'
import Chat from './pages/Chat'
import RightHome from './components/RightHome'
import UseSocket from './hooks/UseSocket'
import Search from './pages/Search'
import UseNotification from './hooks/UseNotification'
import Notification from './pages/Notification'


const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/profile/:userName',
            element: <Profile />
          },
          {
            path: '/update-profile',
            element: <UpdateProfile />
          },
          {
            path: '/upload-post',
            element: <UploadAllPost />
          },
          {
            path: '/post/:postId',
            element: <Post />
          },
          {
            path: '/reels/:reelId',
            element: <Reels />
          },
          {
            path: '/reels',
            element: <Reels />
          },
          {
            path: '/messages',
            element: <RightHome />
          },
          {
            path: '/search',
            element: <Search />
          },
          {
            path: '/notification',
            element: <Notification />
          },
        ]
      },
      {
        path: '/chat/:partnerId',
        element: <Chat />
      }
    ]
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/forget-pass',
        element: <ForgetPass />
      }
    ]
  }
])

const App = () => {

  //hooks
  UseGetUser()
  UseNotification()
  UseSocket()

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App