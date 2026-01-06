import React from 'react'

const PostLoading = () => {
    return (
        <div className='w-full min-h-screen bg-black text-white p-0 md:p-10 flex items-center justify-center'>
            <div className='w-full max-w-6xl bg-black border border-zinc-900 md:rounded-sm flex flex-col md:flex-row h-full md:h-[85vh] animate-pulse'>
                
                {/* Left Side: Media Carousel Skeleton */}
                <div className='w-full md:w-[60%] bg-zinc-950 flex items-center justify-center relative border-r border-zinc-900 aspect-square md:aspect-auto'>
                    <div className='w-full h-full bg-zinc-900/50' />
                </div>

                {/* Right Side: Details Skeleton */}
                <div className='w-full md:w-[40%] flex flex-col bg-black h-full'>
                    
                    {/* Header Skeleton */}
                    <div className='p-4 border-b border-zinc-900 flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='size-8 rounded-full bg-zinc-900' />
                            <div className='h-3 w-24 bg-zinc-900 rounded' />
                        </div>
                        <div className='size-5 bg-zinc-900 rounded' />
                    </div>

                    {/* Scrollable Caption & Comments Area Skeleton */}
                    <div className='flex-1 p-4 space-y-6'>
                        <div className='flex gap-3 items-start'>
                            <div className='size-8 rounded-full bg-zinc-900 shrink-0' />
                            <div className='space-y-2 w-full'>
                                <div className='h-3 w-3/4 bg-zinc-900 rounded' />
                                <div className='h-3 w-1/2 bg-zinc-900 rounded' />
                                <div className='h-2 w-16 bg-zinc-900 rounded mt-2' />
                            </div>
                        </div>

                        {/* Middle Spacer for Comments */}
                        <div className='pt-5 border-t border-zinc-900/50 space-y-4'>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className='flex gap-3 items-start opacity-50'>
                                    <div className='size-7 rounded-full bg-zinc-900 shrink-0' />
                                    <div className='h-3 w-full bg-zinc-900 rounded' />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Action Area Skeleton */}
                    <div className='p-4 border-t border-zinc-900 space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='size-6 bg-zinc-900 rounded' />
                                <div className='size-6 bg-zinc-900 rounded' />
                                <div className='size-6 bg-zinc-900 rounded' />
                            </div>
                            <div className='size-6 bg-zinc-900 rounded' />
                        </div>
                        <div className='h-3 w-20 bg-zinc-900 rounded' />
                        
                        <div className='flex items-center gap-2 pt-2 border-t border-zinc-900/50'>
                            <div className='h-4 w-full bg-zinc-900 rounded' />
                            <div className='h-4 w-12 bg-zinc-900 rounded' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostLoading