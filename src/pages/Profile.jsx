import React, { useEffect } from 'react';
import { Settings, Grid, Bookmark, SquareUser } from 'lucide-react';
import avatar from '../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchedUser } from '../stores/slice/userSlice';
import { useParams } from 'react-router-dom';
import ProfileLoad from '../components/loading/ProfileLoad';
import ProfileNotFound from '../components/not found/ProfileNotFound';

const Profile = () => {
    const { fetchedUserData, user, userFetchLoading } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { userName } = useParams()
    useEffect(() => {
        dispatch(fetchedUser(userName))
    }, [userName, dispatch])

    return (
        <>
            {
                userFetchLoading ? <ProfileLoad /> : !fetchedUserData ? <ProfileNotFound /> :
                    <div className='w-full min-h-screen bg-black text-white overflow-y-auto'>
                        <div className='max-w-5xl mx-auto px-4 py-8'>

                            {/* Header Section */}
                            <header className='flex flex-col md:flex-row items-center md:items-start gap-10 mb-12 px-2'>
                                {/* Avatar Container */}
                                <div className='relative group'>
                                    <div className='size-32 md:size-44 rounded-full p-0.75 bg-linear-to-tr from-yellow-500 to-fuchsia-600'>
                                        <div className='w-full h-full rounded-full bg-black p-1'>
                                            <img
                                                src={fetchedUserData?.image?.url || avatar}
                                                alt="profile"
                                                className='w-full h-full object-cover rounded-full'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* User Info & Stats */}
                                <div className='flex-1 flex flex-col gap-6'>
                                    <div className='flex flex-col md:flex-row items-center gap-5'>
                                        <h2 className='text-xl font-light'>@{fetchedUserData?.userName}</h2>
                                        {
                                            fetchedUserData?._id === user?._id &&
                                            <div className='flex gap-2'>
                                                <button className='bg-zinc-800 hover:bg-zinc-700 px-5 py-1.5 rounded-lg text-sm font-semibold transition'>
                                                    Edit Profile
                                                </button>
                                                <button className='bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg transition'>
                                                    <Settings size={18} />
                                                </button>
                                            </div>
                                        }
                                    </div>

                                    {/* Stats for Desktop */}
                                    <div className='hidden md:flex gap-10'>
                                        <div><span className='font-bold'>{fetchedUserData?.posts.length}</span> posts</div>
                                        <div><span className='font-bold'>0</span> followers</div>
                                        <div><span className='font-bold'>{fetchedUserData?.followings.length}</span> following</div>
                                    </div>

                                    {/* Bio */}
                                    <div className='text-center md:text-left'>
                                        <h1 className='font-bold text-sm'>{fetchedUserData?.fullName}</h1>
                                        <p className='text-zinc-400 text-sm mt-1'>{fetchedUserData?.email}</p>
                                        <p className='text-white text-sm mt-1'>{fetchedUserData?.bio}</p>
                                        <div className='flex gap-2'>
                                            <p className='text-white text-sm'>{fetchedUserData?.profession}</p>
                                            {
                                                fetchedUserData?.gender &&
                                                <>
                                                    <div className='border-2 h-5' />
                                                    <p className='text-white text-sm'>{fetchedUserData?.gender}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Stats for Mobile (shown only on small screens) */}
                            <div className='flex md:hidden justify-around py-4 border-t border-zinc-900 mb-4'>
                                <div className='text-center'><p className='font-bold'>{fetchedUserData?.posts?.length}</p><p className='text-zinc-500 text-xs'>posts</p></div>
                                <div className='text-center'><p className='font-bold'>0</p><p className='text-zinc-500 text-xs'>followers</p></div>
                                <div className='text-center'><p className='font-bold'>{fetchedUserData?.followings?.length}</p><p className='text-zinc-500 text-xs'>following</p></div>
                            </div>

                            {/* Main Content Area (Similar to your Feed layout) */}
                            <div className='w-full min-h-[50vh] rounded-t-3xl bg-zinc-950 border-x border-t border-zinc-900'>

                                {/* Tabs Navigation */}
                                <div className='flex justify-center gap-5 sm:gap-12 border-b border-zinc-900/50 *:cursor-pointer'>
                                    <button className='flex items-center gap-2 py-4 border-t border-white -mt-px text-xs font-bold uppercase tracking-widest'>
                                        <Grid size={16} /> Posts
                                    </button>
                                    <button className='flex items-center gap-2 py-4 text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition'>
                                        <Bookmark size={16} /> Saved
                                    </button>
                                    <button className='flex items-center gap-2 py-4 text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition'>
                                        <SquareUser size={16} /> Photo
                                    </button>
                                </div>

                                {/* Grid Content */}
                                <div className='p-1 md:p-4'>
                                    {fetchedUserData?.posts.length === 0 ? (
                                        <div className='flex flex-col items-center justify-center py-24 text-zinc-600'>
                                            <div className='size-20 rounded-full border-2 border-zinc-800 flex items-center justify-center mb-4'>
                                                <Grid size={40} strokeWidth={1} />
                                            </div>
                                            <h3 className='text-2xl font-black text-zinc-400'>NO POSTS YET</h3>
                                        </div>
                                    ) : (
                                        <div className='grid grid-cols-3 gap-1 md:gap-6'>
                                            {/* Posts mapping goes here */}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </>
    );
};

export default Profile;