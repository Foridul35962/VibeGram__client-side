import React, { useState } from 'react'
import logo from '../assets/logo.png'
import icon from '../assets/icon.png'
import { useForm } from 'react-hook-form'
import { Circle, CircleCheckBig } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { registration } from '../stores/slice/authSlice'
import VerifyEmail from '../components/pages/VerifyEmail'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const { authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    //password validation
    const passwordValue = watch("password", "");
    const alphabetValidate = /^(?=.*[a-zA-Z])/.test(passwordValue);
    const numberValidate = /^(?=.*\d)/.test(passwordValue);
    const lengthValidate = /^(?=.{8,})/.test(passwordValue);

    const onSubmit = async (data) => {
        try {
            await dispatch(registration(data)).unwrap()
            setEmail(data.email)
            reset()
        } catch (err) {
            toast.error(err?.message || "Something went wrong")
        }
    }


    return (
        <>
            {
                email ? <VerifyEmail email={email} mode={'register'} /> :
                    <div className='bg-linear-to-br from-black via-gray-900 to-black min-h-screen flex justify-center items-center p-4'>
                        {/* Main Container */}
                        <div className='bg-white w-full max-w-5xl rounded-3xl flex overflow-hidden shadow-2xl min-h-162.5'>

                            {/* Left Side: Visual Section (Switch side for variety) */}
                            <div className='hidden lg:flex w-2/5 bg-black relative flex-col items-center justify-center p-12 overflow-hidden'>
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-[100px] opacity-40"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-700 rounded-full blur-[100px] opacity-30"></div>

                                {/* Floating Brand Card */}
                                <div className="relative z-10 backdrop-blur-2xl bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center shadow-2xl w-full">
                                    <img src={logo} alt="logo" className='w-38 mb-10 filter brightness-200 contrast-125' />

                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-linear-to-r from-gray-600 to-gray-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                        <div className="relative w-28 h-28 bg-white rounded-3xl rotate-6 flex items-center justify-center shadow-2xl transition-transform hover:rotate-0 duration-500">
                                            <img src={icon} alt="icon" className='w-16 -rotate-6 group-hover:rotate-0 transition-transform duration-500' />
                                        </div>
                                    </div>

                                    <div className="mt-10 text-center">
                                        <h2 className="text-white text-2xl font-bold tracking-tight">Create Your Legacy</h2>
                                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                                            Join our community and experience the next generation of creative tools.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Form Section */}
                            <div className='w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white'>
                                <div className='mb-8 text-center lg:text-left'>
                                    <h1 className='text-3xl font-black text-gray-900 tracking-tight'>Create Account</h1>
                                    <p className='text-gray-500 mt-1'>Please fill in the details to sign up.</p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full max-w-md mx-auto lg:mx-0'>
                                    {/* Full Name Field */}
                                    <div className='relative group'>
                                        <input
                                            type="text"
                                            id="fullName"
                                            placeholder=" "
                                            {
                                            ...register('fullName', {
                                                required: 'fullName is required'
                                            })
                                            }
                                            className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-200 focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                                        />
                                        <label htmlFor="fullName" className="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold">
                                            Full Name
                                        </label>
                                    </div>
                                    {
                                        errors.fullName &&
                                        <div className='text-red-600'>
                                            {errors.fullName.message}
                                        </div>
                                    }

                                    {/* User Name Field */}
                                    <div className='relative group'>
                                        <input
                                            type="text"
                                            id="userName"
                                            placeholder=" "
                                            {
                                            ...register('userName', {
                                                required: 'userName is required'
                                            })
                                            }
                                            className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-200 focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                                        />
                                        <label htmlFor="userName" className="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold">
                                            Username
                                        </label>
                                    </div>
                                    {
                                        errors.userName &&
                                        <div className='text-red-600'>
                                            {errors.userName.message}
                                        </div>
                                    }

                                    {/* Email Field */}
                                    <div className='relative group'>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder=" "
                                            {
                                            ...register('email', {
                                                required: 'email is required'
                                            })
                                            }
                                            className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-200 focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                                        />
                                        <label htmlFor="email" className="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold">
                                            Email Address
                                        </label>
                                    </div>
                                    {
                                        errors.email &&
                                        <div className='text-red-600'>
                                            {errors.email.message}
                                        </div>
                                    }

                                    {/* Password Field */}
                                    <div className='relative group'>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder=" "
                                            {
                                            ...register('password', {
                                                required: 'password is required',
                                                minLength: {
                                                    value: 8,
                                                    message: 'password must contain 8 characters'
                                                },
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-zA-Z])/,
                                                    message: "password must include alphabet and number"
                                                }
                                            })
                                            }
                                            className="peer block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-xl border-b-2 border-gray-200 focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                                        />
                                        <label htmlFor="password" className="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-black font-semibold">
                                            Password
                                        </label>
                                    </div>
                                    {
                                        errors.password &&
                                        <div className='text-red-600'>
                                            {errors.password.message}
                                        </div>
                                    }
                                    {/* password validation */}
                                    <div className='flex gap-1 flex-col *:flex *:gap-1 *:items-center'>
                                        <div className={`${alphabetValidate ? 'text-green-600' : 'text-black'}`}>
                                            <p>
                                                {alphabetValidate ? <CircleCheckBig className='size-4' /> : <Circle className='size-4' />}
                                            </p>
                                            <p>
                                                At least one Alphabet
                                            </p>
                                        </div>
                                        <div className={`${numberValidate ? 'text-green-600' : 'text-black'}`}>
                                            <p>
                                                {numberValidate ? <CircleCheckBig className='size-4' /> : <Circle className='size-4' />}
                                            </p>
                                            <p>
                                                At least one number
                                            </p>
                                        </div>
                                        <div className={`${lengthValidate ? 'text-green-600' : 'text-black'}`}>
                                            <p>
                                                {lengthValidate ? <CircleCheckBig className='size-4' /> : <Circle className='size-4' />}
                                            </p>
                                            <p>
                                                Minimum lenght 8 characters
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
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
                                            'Create Account'
                                        )}
                                    </button>
                                </form>

                                {/* Footer */}
                                <div className='mt-2 pt-6 border-t border-gray-100 text-center lg:text-left'>
                                    <p className='text-gray-500 font-medium'>
                                        Already have an account?
                                        <button
                                            onClick={() => navigate('/login')}
                                            className='ml-2 cursor-pointer text-black font-black hover:underline underline-offset-4'>
                                            Log In
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Registration