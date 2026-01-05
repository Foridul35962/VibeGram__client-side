import React, { useState } from 'react';
import { ImagePlus, X, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadPost = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle multiple images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full min-h-screen bg-black text-white p-4 md:p-8 overflow-y-auto'>
      <div className='max-w-2xl mx-auto'>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-4'>
            <button onClick={() => navigate(-1)} className='p-2 hover:bg-zinc-900 rounded-full transition'>
              <ArrowLeft size={24} />
            </button>
            <h1 className='text-xl font-bold'>Create New Post</h1>
          </div>
          <button
            disabled={loading || images.length === 0}
            className='text-blue-500 font-bold hover:text-white disabled:text-zinc-600 disabled:cursor-not-allowed transition'
          >
            Share
          </button>
        </div>

        <div className='space-y-6'>

          {/* Caption Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-zinc-400'>Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className='w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-4 h-32 focus:outline-none focus:border-zinc-700 transition resize-none'
            />
          </div>

          {/* Image Upload Area */}
          <div className='w-full min-h-75 bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden'>
            {images.length > 0 ? (
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3 w-full'>
                {images.map((img, index) => (
                  <div key={index} className='relative aspect-square rounded-2xl overflow-hidden border border-zinc-800'>
                    <img src={img.url} alt="preview" className='w-full h-full object-cover' />
                    <button
                      onClick={() => removeImage(index)}
                      className='absolute top-2 right-2 cursor-pointer bg-black/60 p-1 rounded-full hover:bg-red-500 transition'
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {/* Add more button inside grid */}
                <label className='aspect-square rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-900 transition'>
                  <ImagePlus size={24} className='text-zinc-500' />
                  <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            ) : (
              <label className='flex flex-col items-center gap-4 cursor-pointer w-full h-full py-20'>
                <div className='p-5 bg-zinc-900 rounded-full text-blue-500'>
                  <ImagePlus size={40} />
                </div>
                <div className='text-center'>
                  <p className='text-lg font-semibold'>Select photos</p>
                  <p className='text-zinc-500 text-sm'>Upload up to 5-10 images</p>
                </div>
                <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
              </label>
            )}
          </div>

          {/* Action Button */}
          <button
            disabled={loading || images.length === 0}
            className={`w-full py-4 rounded-2xl mb-18 cursor-pointer font-bold text-lg transition flex items-center justify-center gap-3
              ${loading || images.length === 0
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-zinc-200 active:scale-95'}`}
          >
            {loading ? <Loader2 className='animate-spin' /> : 'Upload Post'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default UploadPost;