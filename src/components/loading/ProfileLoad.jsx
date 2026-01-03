import React from 'react';

const ProfileLoad = () => {
    return (
        <div className='w-full min-h-screen bg-black text-white overflow-hidden'>
            <div className='max-w-5xl mx-auto px-4 py-8'>

                {/* Header Section */}
                <header className='flex flex-col md:flex-row items-center md:items-start gap-10 mb-12 px-2'>
                    <div className='size-32 md:size-44 rounded-full bg-zinc-900 animate-pulse' />

                    <div className='flex-1 flex flex-col gap-6 w-full'>
                        <div className='flex flex-col md:flex-row items-center gap-5'>
                            {/* Username placeholder */}
                            <div className='h-7 w-40 bg-zinc-900 rounded animate-pulse' />
                            <div className='flex gap-2'>
                                <div className='h-9 w-24 bg-zinc-900 rounded-lg animate-pulse' />
                                <div className='h-9 w-9 bg-zinc-900 rounded-lg animate-pulse' />
                            </div>
                        </div>

                        {/* Stats placeholder */}
                        <div className='hidden md:flex gap-10'>
                            <div className='h-5 w-16 bg-zinc-900 rounded animate-pulse' />
                            <div className='h-5 w-16 bg-zinc-900 rounded animate-pulse' />
                            <div className='h-5 w-16 bg-zinc-900 rounded animate-pulse' />
                        </div>

                        {/* Bio placeholder */}
                        <div className='flex flex-col items-center md:items-start gap-2'>
                            <div className='h-4 w-32 bg-zinc-900 rounded animate-pulse' />
                            <div className='h-3 w-56 bg-zinc-900 rounded animate-pulse' />
                        </div>
                    </div>
                </header>

                {/* Content Area Skeleton */}
                <div className='w-full min-h-[50vh] rounded-t-3xl bg-zinc-950 border-x border-t border-zinc-900'>

                    {/* Tabs */}
                    <div className='flex justify-center gap-12 border-b border-zinc-900/50 py-4'>
                        <div className='h-4 w-12 bg-zinc-900 rounded animate-pulse' />
                        <div className='h-4 w-12 bg-zinc-900 rounded animate-pulse' />
                        <div className='h-4 w-12 bg-zinc-900 rounded animate-pulse' />
                    </div>

                    {/* Grid Skeleton */}
                    <div className='p-1 md:p-4 grid grid-cols-3 gap-1 md:gap-4'>
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className='aspect-square bg-zinc-900 animate-pulse rounded-sm'
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileLoad;