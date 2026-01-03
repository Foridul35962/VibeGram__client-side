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
        ]
      },
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

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App