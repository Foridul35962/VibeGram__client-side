import React from 'react'
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'

const ResetPass = () => {
    return (
        <div className='bg-linear-to-br from-black via-gray-900 to-black min-h-screen flex justify-center items-center p-4'>
            {/* Main Container */}
            <div className='bg-white w-full max-w-4xl rounded-[2.5rem] flex overflow-hidden shadow-2xl min-h-137.5'>
                
                {/* Left Side: Visual Section */}
                <div className='hidden lg:flex w-2/5 bg-black relative flex-col items-center justify-center p-8 overflow-hidden'>
                    <div className="absolute inset-0 bg-linear-to-b from-gray-800/20 to-transparent"></div>
                    
                    <div className="relative z-10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/5 backdrop-blur-3xl rounded-4xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl transition-transform hover:scale-110 duration-500">
                            <img src={icon} alt="icon" className='w-10 brightness-200' />
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">Set New Password</h2>
                        <p className="text-gray-400 text-xs mt-3 px-8 leading-relaxed opacity-80">
                            Your security is our priority. Please choose a strong password to protect your account.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form Section */}
                <div className='w-full lg:w-3/5 p-10 md:p-14 flex flex-col justify-center bg-white'>
                    
                    {/* Header */}
                    <div className='mb-10 text-center lg:text-left'>
                        <div className='flex items-center justify-center lg:justify-start gap-3 mb-4'>
                            <img src={logo} alt="logo" className='h-7 object-contain' />
                        </div>
                        <h1 className='text-3xl font-black text-gray-900 tracking-tight'>Reset Password</h1>
                        <p className='text-gray-500 mt-2 font-medium'>
                            Enter your new password below.
                        </p>
                    </div>

                    <form className='space-y-5 w-full max-w-sm mx-auto lg:mx-0'>
                        {/* New Password Field */}
                        <div className='relative group'>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder=" " 
                                className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-100 appearance-none focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                            />
                            <label 
                                htmlFor="password" 
                                className="absolute cursor-text text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold"
                            >
                                New Password
                            </label>
                        </div>

                        {/* Confirm Password Field */}
                        <div className='relative group'>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                placeholder=" " 
                                className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-100 appearance-none focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                            />
                            <label 
                                htmlFor="confirmPassword" 
                                className="absolute cursor-text text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold"
                            >
                                Confirm New Password
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button className='w-full bg-black text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-gray-800 transform transition-all active:scale-[0.98] duration-200 mt-4'>
                            Update Password
                        </button>
                    </form>

                    {/* Footer Tip */}
                    <div className='mt-8 flex items-center gap-2 text-gray-400 text-xs font-semibold justify-center lg:justify-start bg-gray-50 p-3 rounded-lg w-fit'>
                        <div className='w-2 h-2 bg-black rounded-full'></div>
                        Password must include numbers and symbols.
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPass