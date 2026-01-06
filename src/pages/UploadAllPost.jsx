import React, { useState } from 'react';
import UploadPost from '../components/pages/UploadPost';
import UploadReel from '../components/pages/UploadReel';
import UploadStory from '../components/pages/UploadStory';
import { LayoutGrid, Clapperboard, Zap, PlusCircle } from 'lucide-react';

const UploadAllPost = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts', icon: <LayoutGrid size={18} /> },
    { id: 'reels', label: 'Reels', icon: <Clapperboard size={18} /> },
    { id: 'story', label: 'Story', icon: <Zap size={18} /> },
  ];

  return (
    <div className='w-full min-h-screen bg-black text-white'>
      <div className='max-w-3xl mx-auto pt-10 px-4'>
        
        {/* Main Heading */}
        <div className='flex items-center gap-3 mb-2'>
          <PlusCircle size={28} className='text-zinc-400' />
          <h1 className='text-3xl font-black tracking-tight uppercase'>Create</h1>
        </div>
        <p className='text-zinc-500 text-sm mb-8'>Share your moments with the world.</p>

        {/* Tab Navigation Switcher */}
        <div className='flex items-center justify-center p-1.5 bg-zinc-950 border border-zinc-900 rounded-2xl mb-10'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer
                ${activeTab === tab.id 
                  ? 'bg-zinc-900 text-white border border-zinc-800 shadow-xl' 
                  : 'text-zinc-600 hover:text-zinc-400'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className='w-full'>
        {activeTab === 'posts' && <UploadPost />}
        {activeTab === 'reels' && <UploadReel />}
        {activeTab === 'story' && <UploadStory />}
      </div>
    </div>
  );
};

export default UploadAllPost;