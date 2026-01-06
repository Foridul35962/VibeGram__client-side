import React, { useState } from 'react';
import { ImagePlus, X, Loader2, Send, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { uploadStory } from '../../stores/slice/storySlice';

const UploadStory = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch()
    const { storyLoading } = useSelector((state) => state.story)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleUploadStory = async () => {
        const formData = new FormData()
        formData.append('image', image)
        try {
            await dispatch(uploadStory(formData)).unwrap()
            toast.success('Story Uploaded')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full min-h-screen bg-black text-white p-4 pb-24 flex flex-col items-center'>

            {/* Story Preview Area (Portrait 9:16) */}
            <div className='w-full max-w-95 aspect-9/16 bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-fuchsia-500/10'>

                {preview ? (
                    <>
                        <img src={preview} alt="Story preview" className='w-full h-full object-cover' />

                        {/* Overlay Gradient */}
                        <div className='absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 pointer-events-none' />

                        <button
                            onClick={removeImage}
                            className='absolute top-6 right-6 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-red-500 transition z-10'
                        >
                            <X className='cursor-pointer' size={20} />
                        </button>

                        {/* Floating Info */}
                        <div className='absolute bottom-10 left-6 right-6 flex items-center gap-3'>
                            <div className='p-2 bg-fuchsia-600 rounded-full'>
                                <Zap size={16} fill="white" />
                            </div>
                            <p className='text-xs font-medium text-zinc-200'>Story will disappear after 24 hours.</p>
                        </div>
                    </>
                ) : (
                    <label className='flex flex-col items-center gap-5 cursor-pointer p-10 text-center group'>
                        <div className='p-6 bg-zinc-900 rounded-full text-zinc-400 group-hover:text-fuchsia-500 group-hover:bg-zinc-800 transition duration-500'>
                            <ImagePlus size={48} />
                        </div>
                        <div>
                            <p className='text-xl font-bold'>Select Photo</p>
                            <p className='text-zinc-500 text-sm mt-2 px-4'>Best resolution: 1080 x 1920 pixels</p>
                        </div>
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </label>
                )}
            </div>

            {/* Action Buttons */}
            <div className='w-full max-w-95 mt-8 flex flex-col gap-3'>
                <button
                    onClick={handleUploadStory}
                    disabled={storyLoading || !image}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3
                        ${storyLoading || !image ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'cursor-pointer bg-linear-to-r from-orange-500 to-fuchsia-600 text-white hover:opacity-90 active:scale-95 shadow-lg shadow-fuchsia-500/20'}`}
                >
                    {storyLoading ? <Loader2 className='animate-spin' /> : (
                        <>
                            <Send size={20} />
                            Post to Story
                        </>
                    )}
                </button>
            </div>

        </div>
    );
};

export default UploadStory;