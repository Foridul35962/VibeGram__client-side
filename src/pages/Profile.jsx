import React, { useEffect, useState } from 'react';
import { Settings, Grid, Bookmark, SquareUser, X } from 'lucide-react';
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchedUser, followUnfollow, toggleFollow } from '../stores/slice/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileLoad from '../components/loading/ProfileLoad';
import ProfileNotFound from '../components/not found/ProfileNotFound';
import UserPosts from '../components/UserPosts';
import UserSavedPosts from '../components/UserSavedPosts';
import UserReels from '../components/UserReels';
import { logout } from '../stores/slice/authSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const { fetchedUserData, user, userLoading, userFetchLoading } = useSelector((state) => state.user)
    const { userPosts } = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userName } = useParams()
    const [showGrid, setShowGrid] = useState('posts')
    const [showLogout, setShowLogout] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)

    const handleLogOut = async () => {
        if (window.confirm('Are you want to Logged Out?')) {
            try {
                await dispatch(logout()).unwrap()
                toast.success('Log out successfully')
                navigate('/login')
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchedUser(userName))
    }, [userName, dispatch])

    const followArr = Array.isArray(user?.followings) ? user.followings : [];

    const isfollow = followArr.some(
        follow => String(follow) === String(fetchedUserData?._id)
    );

    const handleFollow = async (followingUserId) => {
        dispatch(toggleFollow(followingUserId))
        try {
            dispatch(followUnfollow({ followingUserId }))
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            {
                userFetchLoading ? <ProfileLoad /> : !fetchedUserData ? <ProfileNotFound /> :
                    <div className='w-full min-h-screen bg-black text-white overflow-y-auto'>
                        <div className='max-w-5xl mx-auto px-4 py-8'>

                            {/* Header Section */}
                            <header className='flex flex-col relative md:flex-row items-center md:items-start gap-10 mb-12 px-2'>
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
                                                <button
                                                    onClick={() => navigate('/update-profile')}
                                                    className='bg-zinc-800 cursor-pointer hover:bg-zinc-700 px-5 py-1.5 rounded-lg text-sm font-semibold transition'>
                                                    Edit Profile
                                                </button>
                                                <div className='relative inline-block'>
                                                    <button
                                                        onClick={() => setShowLogout(!showLogout)}
                                                        className='bg-zinc-800 cursor-pointer hover:bg-zinc-700 p-2 rounded-lg transition'>
                                                        <Settings size={18} />
                                                    </button>
                                                    {
                                                        showLogout &&
                                                        <div className='absolute right-0'>
                                                            <div className='fixed inset-0 z-40' onClick={() => setShowLogout(!showLogout)} />
                                                            <div className='absolute w-40 right-0 -bottom-12 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200'>
                                                                <button
                                                                    onClick={handleLogOut}
                                                                    className='w-full cursor-pointer text-left px-4 py-2 text-sm text-red-500 rounded-xl hover:bg-zinc-700 transition'>
                                                                    Log Out
                                                                </button>
                                                            </div>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        }

                                        {/* follow unfollow */}
                                        {
                                            fetchedUserData._id !== user._id &&
                                            <button
                                                disabled={userLoading}
                                                onClick={() => handleFollow(fetchedUserData?._id)}
                                                className='bg-zinc-800 cursor-pointer hover:bg-zinc-700 px-5 py-1.5 rounded-lg text-sm font-semibold transition'>
                                                {isfollow ? 'Unfollow' : 'Follow'}
                                            </button>
                                        }
                                    </div>

                                    {/* Stats for Desktop */}
                                    <div className='hidden md:flex gap-10'>
                                        {/* Posts Count */}
                                        <div><span className='font-bold'>{userPosts?.length || 0}</span> posts</div>

                                        {/* Followers Section */}
                                        <div className='relative'>
                                            <span
                                                onClick={() => {
                                                    setShowFollowers(!showFollowers);
                                                    setShowFollowings(false);
                                                }}
                                                className='font-bold hover:underline cursor-pointer'
                                            >
                                                {fetchedUserData?.followers?.length || 0} followers
                                            </span>

                                            {showFollowers && (
                                                <>
                                                    <div className='fixed inset-0 z-40' onClick={() => setShowFollowers(false)} />
                                                    <div className='absolute left-0 top-full mt-2 w-64 max-h-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-200'>
                                                        <div className='p-2 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900'>
                                                            <span className='text-[10px] font-black uppercase text-zinc-500 px-2'>Followers</span>
                                                            <X
                                                                size={14} className='cursor-pointer'
                                                                onClick={() => setShowFollowers(false)}
                                                            />
                                                        </div>
                                                        {fetchedUserData?.followers?.length > 0 ? (
                                                            fetchedUserData.followers.map(lu => (
                                                                <Link
                                                                    key={lu._id}
                                                                    to={`/profile/${lu.userName}`}
                                                                    onClick={() => setShowFollowers(!showFollowers)}
                                                                    className='flex items-center gap-3 p-2.5 hover:bg-zinc-800 transition'>
                                                                    <img
                                                                        src={lu?.image?.url || avatar}
                                                                        className='size-8 rounded-full object-cover bg-zinc-800'
                                                                        alt="profile"
                                                                    />
                                                                    <span className='text-xs font-bold text-white'>
                                                                        {lu.userName}
                                                                    </span>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div className='p-4 text-center text-xs text-zinc-500'>No followers found</div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Followings Section */}
                                        <div className='relative'>
                                            <span
                                                onClick={() => {
                                                    setShowFollowings(!showFollowings);
                                                    setShowFollowers(false);
                                                }}
                                                className='font-bold hover:underline cursor-pointer'
                                            >
                                                {fetchedUserData?.followings?.length || 0} following
                                            </span>

                                            {showFollowings && (
                                                <>
                                                    <div className='fixed inset-0 z-40' onClick={() => setShowFollowings(false)} />
                                                    <div className='absolute left-0 top-full mt-2 w-64 max-h-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-200'>
                                                        <div className='p-2 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900'>
                                                            <span className='text-[10px] font-black uppercase text-zinc-500 px-2'>Following</span>
                                                            <X size={14} className='cursor-pointer' onClick={() => setShowFollowings(false)} />
                                                        </div>
                                                        {fetchedUserData?.followings?.length > 0 ? (
                                                            fetchedUserData.followings.map(lu => (
                                                                <Link
                                                                    key={lu._id}
                                                                    onClick={() => setShowFollowings(!showFollowings)}
                                                                    to={`/profile/${lu.userName}`}
                                                                    className='flex items-center gap-3 p-2.5 hover:bg-zinc-800 transition'>
                                                                    <img
                                                                        src={lu?.image?.url || avatar}
                                                                        className='size-8 rounded-full object-cover bg-zinc-800'
                                                                        alt="profile"
                                                                    />
                                                                    <span className='text-xs font-bold text-white'>{lu.userName}</span>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div className='p-4 text-center text-xs text-zinc-500'>Not following anyone</div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
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
                                                    <p className='text-white text-sm uppercase'>{fetchedUserData?.gender}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Stats for Mobile (shown only on small screens) */}
                            <div className='flex md:hidden justify-around py-4 border-t border-zinc-900 mb-4'>
                                {/* Posts Count */}
                                <div className='text-center'>
                                    <p className='font-bold'>{userPosts?.length || 0}</p>
                                    <p className='text-zinc-500 text-xs'>posts</p>
                                </div>

                                {/* Followers Section - Mobile */}
                                <div className='text-center relative'>
                                    <div
                                        onClick={() => {
                                            setShowFollowers(!showFollowers);
                                            setShowFollowings(false);
                                        }}
                                        className='cursor-pointer active:opacity-50'
                                    >
                                        <p className='font-bold'>{fetchedUserData?.followers?.length || 0}</p>
                                        <p className='text-zinc-500 text-xs'>followers</p>
                                    </div>

                                    {showFollowers && (
                                        <>
                                            <div className='fixed inset-0 z-40'
                                                onClick={() => setShowFollowers(false)} />
                                            <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 max-h-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-200'>
                                                <div className='p-2 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900'>
                                                    <span className='text-[10px] font-black uppercase text-zinc-500 px-2'>Followers</span>
                                                    <X
                                                        size={14}
                                                        className='cursor-pointer'
                                                        onClick={() => setShowFollowers(false)}
                                                    />
                                                </div>
                                                {fetchedUserData?.followers?.length > 0 ? (
                                                    fetchedUserData.followers.map(lu => (
                                                        <Link
                                                            key={lu._id}
                                                            to={`/profile/${lu.userName}`}
                                                            className='flex items-center gap-3 p-2.5 hover:bg-zinc-800 transition text-left'
                                                        >
                                                            <img
                                                                src={lu?.image?.url || avatar}
                                                                className='size-8 rounded-full object-cover bg-zinc-800'
                                                                alt=""
                                                            />
                                                            <span className='text-xs font-bold text-white truncate'>{lu.userName}</span>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className='p-4 text-[10px] text-zinc-500'>No followers found</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Following Section - Mobile */}
                                <div className='text-center relative'>
                                    <div
                                        onClick={() => {
                                            setShowFollowings(!showFollowings);
                                            setShowFollowers(false);
                                        }}
                                        className='cursor-pointer active:opacity-50'
                                    >
                                        <p className='font-bold'>{fetchedUserData?.followings?.length || 0}</p>
                                        <p className='text-zinc-500 text-xs'>following</p>
                                    </div>

                                    {showFollowings && (
                                        <>
                                            <div className='fixed inset-0 z-40' onClick={() => setShowFollowings(false)} />
                                            <div className='absolute -left-14 -translate-x-1/2 top-full mt-2 w-64 max-h-60 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-200'>
                                                <div className='p-2 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900'>
                                                    <span className='text-[10px] font-black uppercase text-zinc-500 px-2'>Following</span>
                                                    <X size={14} className='cursor-pointer' onClick={() => setShowFollowings(false)} />
                                                </div>
                                                {fetchedUserData?.followings?.length > 0 ? (
                                                    fetchedUserData.followings.map(lu => (
                                                        <Link
                                                            key={lu._id}
                                                            to={`/profile/${lu.userName}`}
                                                            className='flex items-center gap-3 p-2.5 hover:bg-zinc-800 transition text-left'
                                                        >
                                                            <img
                                                                src={lu?.image?.url || avatar}
                                                                className='size-8 rounded-full object-cover bg-zinc-800'
                                                                alt=""
                                                            />
                                                            <span className='text-xs font-bold text-white truncate'>{lu.userName}</span>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className='p-4 text-[10px] text-zinc-500'>Not following anyone</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Main Content Area (Similar to your Feed layout) */}
                            <div className='w-full min-h-[50vh] rounded-t-3xl bg-zinc-950 border-x border-t border-zinc-900'>

                                {/* Tabs Navigation */}
                                <div className='flex justify-center gap-5 sm:gap-12 border-b border-zinc-900/50 *:cursor-pointer'>

                                    {/* Posts Tab */}
                                    <button
                                        onClick={() => setShowGrid('posts')}
                                        className={`flex items-center gap-2 py-4 border-t-2 -mt-px text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out ${showGrid === 'posts' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-white'}`}
                                    >
                                        <Grid size={16} /> Posts
                                    </button>

                                    {/* Saved Tab (Conditional) */}
                                    {fetchedUserData?._id === user?._id && (
                                        <button
                                            onClick={() => setShowGrid('saved')}
                                            className={`flex items-center gap-2 py-4 border-t-2 -mt-px text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out ${showGrid === 'saved' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-white'}`}
                                        >
                                            <Bookmark size={16} /> Saved
                                        </button>
                                    )}

                                    {/* Photos Tab */}
                                    <button
                                        onClick={() => setShowGrid('reels')}
                                        className={`flex items-center gap-2 py-4 border-t-2 -mt-px text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-in-out ${showGrid === 'reels' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-white'}`} >
                                        <SquareUser size={16} /> Reels
                                    </button>

                                </div>

                                {/* Grid Content */}
                                <div className='p-1 md:p-4'>
                                    {
                                        showGrid === 'posts' ?
                                            <UserPosts fetchedUserId={fetchedUserData?._id} /> :
                                            showGrid === 'saved' ?
                                                <UserSavedPosts posts={fetchedUserData?.savedPosts} /> :
                                                <UserReels fetchedUserId={fetchedUserData?._id} />
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </>
    );
};

export default Profile;