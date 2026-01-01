import React from 'react'
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'

const ForgetPassDesign = () => {
    return (
        <div className='bg-linear-to-br from-black via-gray-900 to-black min-h-screen flex justify-center items-center p-4'>
            {/* Main Card: Height is much more compact for a single field */}
            <div className='bg-white w-full max-w-4xl rounded-[2.5rem] flex overflow-hidden shadow-2xl min-h-125'>
                
                {/* Left Side: Visual Section (Black) */}
                <div className='hidden lg:flex w-2/5 bg-black relative flex-col items-center justify-center p-8 overflow-hidden'>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent opacity-50"></div>
                    
                    <div className="relative z-10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/20 shadow-inner">
                            <img src={icon} alt="icon" className='w-10 brightness-200' />
                        </div>
                        <h2 className="text-white text-xl font-bold">Secure Access</h2>
                        <p className="text-gray-400 text-xs mt-2 px-6 leading-relaxed">
                            We'll help you get back into your account safely and quickly.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className='w-full lg:w-3/5 p-10 md:p-14 flex flex-col justify-center bg-white'>
                    
                    {/* Header */}
                    <div className='mb-8 text-center lg:text-left'>
                        <div className='flex items-center justify-center lg:justify-start gap-3 mb-4'>
                            <img src={logo} alt="logo" className='h-7 object-contain' />
                        </div>
                        <h1 className='text-3xl font-black text-gray-900 tracking-tight'>Forgot Password?</h1>
                        <p className='text-gray-500 mt-2 font-medium'>
                            Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form className='space-y-6 w-full max-w-sm mx-auto lg:mx-0'>
                        {/* Email Field */}
                        <div className='relative group'>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder=" " 
                                className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-100 appearance-none focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                            />
                            <label 
                                htmlFor="email" 
                                className="absolute cursor-text text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold"
                            >
                                Registered Email Address
                            </label>
                        </div>

                        {/* Reset Button */}
                        <button className='w-full bg-black text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-gray-800 transform transition-all active:scale-[0.98] duration-200'>
                            Send Reset Link
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className='mt-10 text-center lg:text-left'>
                        <button className='group flex items-center justify-center lg:justify-start gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all mx-auto lg:mx-0'>
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            Back to Login
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ForgetPassDesign