import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { verifyPass, verifyRegi } from '../../stores/slice/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = ({ email, mode, setIsverified }) => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const { authLoading } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'register') {
            try {
                await dispatch(verifyRegi({ email, otp })).unwrap()
                toast.success('registration successful')
                navigate('/login')
            } catch (error) {
                toast.error(error.message)
            }
        } else {
            try {
                await dispatch(verifyPass({ email, otp })).unwrap()
                setIsverified(true)
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className='bg-linear-to-br from-black via-gray-900 to-black min-h-screen flex justify-center items-center p-4 font-sans'>
            {/* Main Card */}
            <div className='bg-white w-full max-w-4xl rounded-[2.5rem] flex overflow-hidden shadow-2xl min-h-137.5'>

                {/* Left Side: Visual Section */}
                <div className='hidden lg:flex w-2/5 bg-black relative flex-col items-center justify-center p-8 overflow-hidden'>
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#1a1a1a_0deg,#000_360deg)] opacity-50"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img src={icon} alt="icon" className='w-10' />
                        </div>
                        <h2 className="text-white text-2xl font-bold tracking-tight">Security First</h2>
                        <p className="text-gray-400 text-sm mt-3 px-8 leading-relaxed opacity-80">
                            Protecting your account is our top priority. Please enter the code to continue.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className='w-full lg:w-3/5 p-10 md:p-16 flex flex-col justify-center bg-white'>

                    {/* Header */}
                    <div className='mb-10 text-center lg:text-left'>
                        <div className='flex items-center justify-center lg:justify-start mb-8'>
                            <img src={logo} alt="logo" className='h-8 object-contain' />
                        </div>
                        <h1 className='text-3xl font-black text-gray-900 tracking-tight mb-3'>Verify your email</h1>
                        <p className='text-gray-500 font-medium'>
                            We've sent a code to <span className="text-black font-bold">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full max-w-sm mx-auto lg:mx-0'>
                        {/* Single Modern Text Input */}
                        <div className='mb-6'>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                                6-Digit Verification Code
                            </label>
                            <input
                                type="text"
                                required
                                maxLength="6"
                                placeholder="0 0 0 0 0 0"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-center text-2xl font-black tracking-[1em] placeholder:tracking-normal placeholder:text-gray-300 focus:border-black focus:bg-white focus:ring-0 outline-none transition-all duration-300 shadow-inner"
                            />
                        </div>

                        {/* Verify Button */}
                        <button
                            type='submit'
                            disabled={authLoading}
                            className={`w-full py-4 mt-2 rounded-2xl font-bold shadow-xl transition-all duration-200 flex items-center justify-center
                                            ${authLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white cursor-pointer hover:shadow-2xl hover:bg-gray-800 active:scale-95'
                                }`}
                        >
                            {authLoading ? (
                                <div className='flex gap-2 items-center justify-center'>
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Please Wait...</span>
                                </div>
                            ) : (
                                'Verify Account'
                            )}
                        </button>
                    </form>

                    {/* Resend & Back Option */}
                    <div className='mt-10 pt-6 border-t border-gray-50 text-center lg:text-left'>
                        <p className='text-gray-500 text-sm font-medium'>
                            Didn't receive the code?
                            <button className='ml-2 text-black font-black hover:underline underline-offset-4 decoration-2'>
                                Resend Code
                            </button>
                        </p>
                        {
                            mode === 'register' && <button
                                onClick={() => navigate('/login')}
                                className="mt-4 text-gray-400 text-xs font-bold hover:text-black transition-colors">
                                ← Back to Login
                            </button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VerifyEmail