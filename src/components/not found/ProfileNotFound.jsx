import React from 'react'
import { UserX, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProfileNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6'>

            {/* Icon Section */}
            <div className='relative mb-8'>
                <div className='size-32 rounded-full bg-zinc-900 flex items-center justify-center border-2 border-zinc-800 shadow-[0_0_50px_rgba(255,255,255,0.05)]'>
                    <UserX size={60} className='text-zinc-500' />
                </div>
                <div className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter'>
                    404 Not Found
                </div>
            </div>

            {/* Text Section */}
            <div className='text-center max-w-md'>
                <h1 className='text-3xl font-black mb-3 tracking-tight'>SORRY, THIS PAGE ISN'T AVAILABLE.</h1>
                <p className='text-zinc-400 text-sm leading-relaxed mb-8'>
                    The link you followed may be broken, or the account may have been removed.
                    Double-check the username and try again.
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 w-full max-w-xs'>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center cursor-pointer justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition active:scale-95'
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>

                <button
                    onClick={() => navigate('/')}
                    className='bg-white cursor-pointer text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition active:scale-95'
                >
                    Go to Home
                </button>
            </div>
        </div>
    )
}

export default ProfileNotFound