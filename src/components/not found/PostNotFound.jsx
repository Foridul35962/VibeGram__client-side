import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

const PostNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center'>
            {/* Aesthetic Icon with Glow */}
            <div className='relative mb-8'>
                <div className='absolute inset-0 bg-zinc-500/20 blur-3xl rounded-full'></div>
                <div className='relative size-24 md:size-32 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center shadow-2xl'>
                    <FileQuestion size={50} className='text-zinc-600' strokeWidth={1.5} />
                </div>
            </div>

            {/* Error Message */}
            <h1 className='text-2xl md:text-4xl font-black tracking-tighter uppercase mb-3'>
                Post Not Found
            </h1>
            <p className='text-zinc-500 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10'>
                The link you followed may be broken, or the post may have been removed. 
                Don't worry, it happens to the best of us!
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm'>
                <button 
                    onClick={() => navigate(-1)}
                    className='w-full flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-2xl font-bold hover:bg-zinc-200 transition active:scale-95 cursor-pointer'
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
                
                <button 
                    onClick={() => navigate('/')}
                    className='w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-3.5 rounded-2xl font-bold hover:bg-zinc-800 border border-zinc-800 transition active:scale-95 cursor-pointer'
                >
                    <Home size={18} />
                    Back to Feed
                </button>
            </div>

            {/* Footer Brand */}
            <div className='absolute bottom-10'>
                <p className='text-[10px] text-zinc-700 font-bold uppercase tracking-[0.5em]'>
                    VibeGram
                </p>
            </div>
        </div>
    );
};

export default PostNotFound;