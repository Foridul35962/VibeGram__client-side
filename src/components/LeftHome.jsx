import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { Heart } from 'lucide-react'
import avatar from '../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../stores/slice/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getSuggestedUser } from '../stores/slice/userSlice'

const LeftHome = () => {
    const { user, suggestedUser } = useSelector((state) => state.user)
    console.log(suggestedUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap()
            toast.success('Log out successfully')
            navigate('/login')
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        dispatch(getSuggestedUser())
    }, [])

    return (
        <div className='w-1/4 hidden lg:flex flex-col gap-6 min-h-screen h-screen sticky top-0 p-6 border-r border-gray-800 bg-black'>

            {/* Top Header: Logo & Notifications */}
            <div className='flex justify-between items-center mb-4'>
                <img src={logo} alt="logo" className='w-32 object-contain cursor-pointer' />
                <div className='p-2 hover:bg-gray-900 rounded-full transition duration-300 cursor-pointer'>
                    <Heart size={24} className='text-white' />
                </div>
            </div>

            {/* Current User Profile Section */}
            <div className='flex justify-between items-center p-3 rounded-xl bg-[#121212] border border-gray-800 transition hover:border-gray-700'>
                <div className='flex gap-3 items-center'>
                    <div className='relative'>
                        <img
                            src={user?.image?.url || avatar}
                            alt="userLogo"
                            className='size-12 rounded-full object-cover border border-gray-700'
                        />
                        <span className='absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-black rounded-full'></span>
                    </div>
                    <div className='flex flex-col max-w-30'>
                        <p className='font-bold text-sm text-white truncate'>{user?.userName || "Username"}</p>
                        <p className='text-xs text-gray-500 truncate'>{user?.fullName || "Full Name"}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className='text-xs font-bold text-red-500 hover:text-red-400 transition cursor-pointer'
                >
                    Switch
                </button>
            </div>

            {/* Suggested Users Section */}
            {suggestedUser.length > 0 && (
                <div className='flex flex-col gap-4 mt-2'>
                    <div className='flex items-center justify-between px-1'>
                        <h2 className='font-bold text-sm text-gray-400'>Suggested for you</h2>
                        {/* <button className='text-xs font-semibold text-white hover:text-gray-400 transition'>
                            See All
                        </button> */}
                    </div>

                    <div className='flex flex-col gap-5 mt-2'>
                        {suggestedUser.map((user, idx) => (
                            <div key={idx} className='flex justify-between items-center group'>
                                <div className='flex gap-3 items-center cursor-pointer'>
                                    <div className='p-[1.5px] rounded-full bg-linear-to-tr from-yellow-400 via-orange-500 to-fuchsia-600'>
                                        <img
                                            src={user?.image?.url || avatar}
                                            alt="profile"
                                            className='size-9 rounded-full object-cover border-2 border-black'
                                        />
                                    </div>

                                    <div className='flex flex-col max-w-27.5'>
                                        <p className='font-semibold text-[13px] text-gray-100 hover:underline transition truncate'>
                                            {user?.userName}
                                        </p>
                                        <p className='text-[11px] text-gray-500 font-medium truncate'>
                                            {user?.fullName}
                                        </p>
                                    </div>
                                </div>

                                <button className='text-xs cursor-pointer font-bold text-blue-500 hover:text-white transition-colors duration-200'>
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default LeftHome