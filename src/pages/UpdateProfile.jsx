import React, { useState } from 'react';
import { Camera, ArrowLeft, User, Briefcase, FileText, VenusAndMars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../stores/slice/userSlice';
import { toast } from 'react-toastify'

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user, userLoading } = useSelector((state) => state.user)


    const [preview, setPreview] = useState(null);
    const [fullName, setFullName] = useState(user.fullName || "")
    const [bio, setBio] = useState(user.bio || "")
    const [profession, setProfession] = useState(user.profession || "")
    const [gender, setGender] = useState(user.gender || "male")
    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setImage(file)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('bio', bio)
        formData.append('profession', profession)
        formData.append('gender', gender)
        if (image) {
            formData.append('image', image)
        }
        try {
            await dispatch(updateUserProfile(formData)).unwrap()
            toast.success('Profile Update successful')
            navigate(`/profile/${user.userName}`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full min-h-screen bg-black text-white p-4 md:p-8 overflow-y-auto'>
            <div className='max-w-2xl mx-auto'>

                {/* Header */}
                <div className='flex items-center gap-4 mb-10'>
                    <button onClick={() => navigate(-1)} className='p-2 hover:bg-zinc-900 rounded-full transition'>
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className='text-xl font-bold'>Edit Profile</h1>
                </div>

                <form onSubmit={handleSubmit} className='space-y-8'>

                    {/* Profile Image Update */}
                    <div className='flex flex-col items-center gap-4 border-b border-zinc-900 pb-8'>
                        <div className='relative group'>
                            <div className='size-24 md:size-32 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900'>
                                <img
                                    src={preview || user?.image?.url || avatar}
                                    alt="preview"
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <label htmlFor="imageInput" className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-full'>
                                <Camera size={24} />
                            </label>
                            <input
                                type="file"
                                id="imageInput"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <label htmlFor="imageInput" className='text-blue-500 text-sm font-semibold cursor-pointer hover:text-blue-400'>
                            Change profile photo
                        </label>
                    </div>

                    {/* Form Fields */}
                    <div className='space-y-6'>

                        {/* Full Name */}
                        <div className='space-y-2'>
                            <label className='text-sm text-white flex items-center gap-2'><User size={16} /> Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className='w-full bg-zinc-950 border text-white border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition'
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Profession */}
                        <div className='space-y-2'>
                            <label className='text-sm text-white flex items-center gap-2'><Briefcase size={16} /> Profession</label>
                            <input
                                type="text"
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                                className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition'
                                placeholder="Software Engineer, Designer, etc."
                            />
                        </div>

                        {/* Bio */}
                        <div className='space-y-2'>
                            <label className='text-sm text-white flex items-center gap-2'><FileText size={16} /> Bio</label>
                            <textarea
                                rows="4"
                                maxLength="150"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition resize-none'
                                placeholder="Write something about yourself..."
                            />
                            <p className='text-right text-[10px] text-zinc-500 font-mono'>{bio.length} / 150</p>
                        </div>

                        {/* Gender Selection */}
                        <div className='space-y-2'>
                            <label className='text-sm text-white flex items-center gap-2'><VenusAndMars size={16} /> Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer'>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className='pt-2 pb-18'>
                        <button
                            disabled={userLoading}
                            type="submit"
                            className={`w-full font-bold py-3 rounded-xl transition flex items-center justify-center gap-3
                                ${userLoading ? 'bg-zinc-600 cursor-not-allowed opacity-70 text-zinc-300' : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98]'
                            }`}
                        >
                            {userLoading ? (
                                <>
                                    <div className="size-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                'Update Profile'
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;