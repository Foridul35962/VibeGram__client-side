import React, { useRef } from 'react'
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'

const VerifyEmail = () => {

    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className='bg-linear-to-br from-black via-gray-900 to-black min-h-screen flex justify-center items-center p-4'>
            {/* Main Card: Ultra Compact for OTP */}
            <div className='bg-white w-full max-w-4xl rounded-[2.5rem] flex overflow-hidden shadow-2xl min-h-125'>

                {/* Left Side: Visual Section */}
                <div className='hidden lg:flex w-2/5 bg-black relative flex-col items-center justify-center p-8 overflow-hidden'>
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#1a1a1a_0deg,#000_360deg)] opacity-50"></div>

                    <div className="relative z-10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-4xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            <img src={icon} alt="icon" className='w-10' />
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">Verify Identity</h2>
                        <p className="text-gray-400 text-xs mt-2 px-6 leading-relaxed">
                            One last step to secure your account and join our community.
                        </p>
                    </div>
                </div>

                {/* Right Side: OTP Section */}
                <div className='w-full lg:w-3/5 p-10 md:p-14 flex flex-col justify-center bg-white'>

                    {/* Header */}
                    <div className='mb-8 text-center lg:text-left'>
                        <div className='flex items-center justify-center lg:justify-start gap-3 mb-4'>
                            <img src={logo} alt="logo" className='h-7 object-contain' />
                        </div>
                        <h1 className='text-3xl font-black text-gray-900 tracking-tight'>Check your email</h1>
                        <p className='text-gray-500 mt-2 font-medium leading-relaxed'>
                            We've sent a 6-digit verification code to your email address.
                        </p>
                    </div>

                    <form className='w-full max-w-sm mx-auto lg:mx-0'>
                        {/* OTP Input Container */}
                        <div className='flex justify-between gap-2 mb-8'>
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border-b-4 border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none transition-all duration-300"
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <button className='w-full bg-black text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-gray-800 transform transition-all active:scale-[0.98] duration-200'>
                            Verify Account
                        </button>
                    </form>

                    {/* Resend Option */}
                    <div className='mt-8 text-center lg:text-left'>
                        <p className='text-gray-500 text-sm font-medium'>
                            Didn't receive the code?
                            <button className='ml-2 text-black font-black hover:underline underline-offset-4 decoration-2'>
                                Resend Code
                            </button>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VerifyEmail