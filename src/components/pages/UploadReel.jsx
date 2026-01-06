import React, { useState, useRef } from 'react';
import { Clapperboard, X, ArrowLeft, Loader2, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { uploadReel } from '../../stores/slice/reelSlice';
import { toast } from 'react-toastify'

const UploadReel = () => {
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [caption, setCaption] = useState('');
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const {reelLoading} = useSelector((state)=>state.reel)

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setVideo(null);
        setVideoPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUploadReel = async()=>{
        const formData = new FormData()
        formData.append('video', video)
        formData.append('caption', caption)
        try {
            await dispatch(uploadReel(formData)).unwrap()
            toast.success('Reels uploaded')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full min-h-screen bg-black text-white p-4 md:p-8 overflow-y-auto'>
            <div className='max-w-2xl mx-auto'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-20'>

                    {/* Left: Video Preview Area (Portrait 9:16) */}
                    <div className='w-full aspect-9/16 bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group'>
                        {videoPreview ? (
                            <>
                                <video
                                    src={videoPreview}
                                    className='w-full h-full object-center'
                                    controls
                                />
                                <button
                                    onClick={removeVideo}
                                    className='absolute top-4 right-4 bg-black/60 p-2 rounded-full hover:bg-red-500 transition z-10'
                                >
                                    <X className='cursor-pointer' size={20} />
                                </button>
                            </>
                        ) : (
                            <label className='flex flex-col items-center gap-4 cursor-pointer w-full h-full justify-center p-6 text-center'>
                                <div className='p-5 bg-zinc-900 rounded-full text-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.2)]'>
                                    <Clapperboard size={40} />
                                </div>
                                <div>
                                    <p className='text-lg font-semibold'>Select Video</p>
                                    <p className='text-zinc-500 text-sm mt-1'>MP4 or WebM (Max 60s)</p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    hidden
                                    onChange={handleVideoChange}
                                    accept="video/*"
                                />
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className='mt-4 cursor-pointer bg-zinc-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-zinc-700 transition'
                                >
                                    Choose from device
                                </button>
                            </label>
                        )}
                    </div>

                    {/* Right: Info Section */}
                    <div className='flex flex-col gap-6 h-full'>
                        {/* Caption */}
                        <div className='space-y-2 grow'>
                            <label className='text-sm font-medium text-zinc-400'>Caption</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Write a caption for your reel..."
                                className='w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-4 h-48 md:h-full focus:outline-none focus:border-fuchsia-500 transition resize-none'
                            />
                        </div>

                        {/* Share Button Section */}
                        <div className='pt-6'>
                            <button
                                onClick={handleUploadReel}
                                disabled={reelLoading || !video}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3
                                        ${reelLoading || !video ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'cursor-pointer bg-linear-to-r from-fuchsia-600 to-purple-600 text-white hover:opacity-90 active:scale-95 shadow-lg shadow-fuchsia-500/20'}`}
                            >
                                {reelLoading ? <Loader2 className='animate-spin' /> : (
                                    <>
                                        <Video size={20} />
                                        Share Reel
                                    </>
                                )}
                            </button>
                            <p className='text-center text-zinc-500 text-[10px] mt-4 uppercase tracking-widest'>
                                Reels disappear only if you delete them
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UploadReel;