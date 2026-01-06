import React, { useState } from 'react';
import { ImagePlus, X, Loader2, Info } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { uploadPost } from '../../stores/slice/postSlice';

const UploadPost = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('');
  const { postLoading } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);

    setFile((prev) => {
      const currentFiles = prev ? (Array.isArray(prev) ? prev : [prev]) : [];
      return [...currentFiles, ...files];
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));

    setFile((prev) => {
      if (Array.isArray(prev)) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const handleUploadPost = async () => {
    const formData = new FormData()
    if (file && Array.isArray(file)) {
      file.forEach((singleFile) => {
        formData.append('image', singleFile)
      });
    }

    formData.append('caption', caption)
    try {
      await dispatch(uploadPost(formData)).unwrap()
      toast.success('post uploaded')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full min-h-screen bg-black text-white overflow-y-auto pb-20'>
      <div className='max-w-3xl mx-auto'>

        <div className='p-4 md:p-8 space-y-8'>

          {/* Main Upload Section */}
          <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>

            {/* Left/Top: Image Grid */}
            <div className='md:col-span-7 space-y-4'>
              <div className={`w-full min-h-100 rounded-3xl overflow-hidden transition-all duration-500 border-2 border-dashed ${images.length > 0 ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-700 bg-zinc-900/30'}`}>
                {images.length > 0 ? (
                  <div className='p-3 grid grid-cols-2 gap-3'>
                    {images.map((img, index) => (
                      <div key={index} className='relative group aspect-square rounded-2xl overflow-hidden shadow-2xl'>
                        <img src={img.url} alt="preview" className='w-full h-full object-cover transition duration-500 group-hover:scale-105' />
                        <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all' />
                        <button
                          onClick={() => removeImage(index)}
                          className='absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full hover:bg-red-600 transition cursor-pointer z-10'
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {images.length < 10 && (
                      <label className='aspect-square rounded-2xl bg-zinc-900 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800 transition border-2 border-dashed border-zinc-800 group'>
                        <ImagePlus size={28} className='text-zinc-500 group-hover:text-white transition' />
                        <span className='text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest'>Add More</span>
                        <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
                      </label>
                    )}
                  </div>
                ) : (
                  <label className='flex flex-col items-center justify-center h-100 cursor-pointer group'>
                    <div className='relative'>
                      <div className='absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition' />
                      <ImagePlus size={50} className='text-blue-500 relative transition-transform group-hover:scale-110' />
                    </div>
                    <p className='mt-6 text-xl font-medium'>Drop your photos here</p>
                    <p className='text-zinc-500 text-sm mt-1'>High quality images recommended</p>
                    <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
                  </label>
                )}
              </div>
              <div className='flex items-center gap-2 text-zinc-500 px-2'>
                <Info size={14} />
                <p className='text-[11px] font-medium uppercase tracking-tighter'>You can upload up to 10 photos in one post</p>
              </div>
            </div>

            {/* Right/Bottom: Caption Section */}
            <div className='md:col-span-5 space-y-6 flex flex-col'>
              <div className='bg-zinc-950 border border-zinc-900 rounded-3xl p-5'>
                <label className='block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4'>Caption</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What's on your mind?..."
                  className='w-full bg-transparent text-white placeholder:text-zinc-700 h-20 focus:outline-none resize-none text-base leading-relaxed'
                />
                <div className='flex justify-between items-center mt-4 pt-4 border-t border-zinc-900'>
                  <span className='text-xs font-mono text-zinc-600'>{caption.length} / 2200</span>
                  <button className='text-zinc-400 hover:text-white transition cursor-pointer'>😊</button>
                </div>
              </div>

              {/* Updated Share Button */}
              <button
                onClick={handleUploadPost}
                disabled={postLoading || images.length === 0}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer
                    ${postLoading || images.length === 0 ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/5'
                  }`}
              >
                {postLoading ? (
                  <Loader2 size={24} className='animate-spin' />
                ) : (
                  'Share Post'
                )}
              </button>

              {/* Share Info Card */}
              <div className='bg-zinc-900/20 border border-zinc-900 p-5 rounded-3xl mt-auto'>
                <h4 className='text-sm font-bold mb-2 text-zinc-300'>Sharing settings</h4>
                <p className='text-xs text-zinc-500 leading-relaxed'>
                  Your post will be visible to your followers and appear on their feeds.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPost;