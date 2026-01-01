import React from 'react'
import logo from '../assets/logo.png'
import icon from '../assets/icon.png'

const Login = () => {
    return (
        <div className='bg-linear-to-br from-black via-gray-900 to-black min-h-screen flex justify-center items-center p-4'>
            {/* Main Container */}
            <div className='bg-white w-full max-w-5xl rounded-3xl flex overflow-hidden shadow-2xl min-h-150'>

                {/* Left Side: Form Section */}
                <div className='w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-center'>
                    <div className='mb-10 text-center lg:text-left'>
                        <img src={logo} alt="logo" className='h-10 mb-4 object-contain mx-auto lg:mx-0' />
                        <h1 className='text-4xl font-black text-gray-900 tracking-tighter'>
                            Welcome Back
                        </h1>
                        <p className='text-gray-400 mt-2 font-medium'>
                            Sign in to your account to continue
                        </p>
                    </div>

                    <form className='space-y-6 w-full max-w-md mx-auto lg:mx-0'>
                        {/* Email Field */}
                        <div className='relative group'>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                placeholder=" "
                                className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-200 appearance-none focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                            />
                            <label
                                htmlFor="email"
                                className="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Password Field */}
                        <div className='relative group'>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                placeholder=" "
                                className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-200 appearance-none focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                            />
                            <label
                                htmlFor="password"
                                className="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold"
                            >
                                Password
                            </label>
                        </div>

                        {/* Forget Password */}
                        <div className="flex justify-end">
                            <span className="text-sm font-bold text-gray-700 hover:text-black cursor-pointer transition-colors">
                                Forgot Password?
                            </span>
                        </div>

                        {/* Action Button */}
                        <button className='w-full cursor-pointer bg-black text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:bg-gray-800 transform transition-all active:scale-95 duration-200'>
                            Sign In
                        </button>
                    </form>

                    {/* Registration Footer */}
                    <div className='mt-12 pt-6 border-t border-gray-100 text-center lg:text-left'>
                        <p className='text-gray-500 font-medium'>
                            Don't have an account?
                            <button className='ml-2 text-black font-black cursor-pointer hover:underline underline-offset-4'>
                                Create Account
                            </button>
                        </p>
                    </div>
                </div>

                {/* Right Side: Visual Section */}
                <div className='hidden lg:flex w-2/5 bg-black relative flex-col items-center justify-center p-12 overflow-hidden'>
                    {/* Background Decorative Circles */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-gray-700 rounded-full blur-3xl opacity-30"></div>

                    {/* Glassmorphic Card for Icons */}
                    <div className="relative z-10 backdrop-blur-xl bg-white/10 p-10 rounded-[3rem] border border-white/20 flex flex-col items-center shadow-2xl">
                        <img src={logo} alt="logo" className='w-40 mb-8 filter brightness-200' />
                        <div className="w-24 h-24 bg-linear-to-tr from-white to-gray-400 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                            <img src={icon} alt="icon" className='w-14 -rotate-12' />
                        </div>
                        <div className="mt-8 text-center">
                            <h2 className="text-white text-xl font-bold">Future of Branding</h2>
                            <p className="text-gray-400 text-sm mt-2">Join thousands of creators today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login