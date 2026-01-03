import React from 'react'
import icon from '../../assets/icon.png'
import logo from '../../assets/logo.png'

const FirstLoad = () => {
  return (
    <div className='fixed inset-0 z-999 bg-black flex flex-col items-center justify-center'>
      
      {/* Top section: Pulsing Icon */}
      <div className='flex-1 flex flex-col items-center justify-center'>
        <div className='relative'>
          {/* Outer Glow Effect */}
          <div className='absolute inset-0 bg-fuchsia-600/20 blur-3xl rounded-full animate-pulse'></div>
          
          <img 
            src={icon} 
            alt="VibeGram Icon" 
            className='size-32 md:size-40 object-contain relative animate-bounce duration-2000' 
            style={{ animationIterationCount: 'infinite' }}
          />
        </div>
      </div>

      {/* Bottom section: Logo and Loader */}
      <div className='pb-12 flex flex-col items-center gap-6'>
        {/* Progress Bar (Instagram Style) */}
        <div className='w-40 h-0.5 bg-zinc-800 rounded-full overflow-hidden'>
          <div className='h-full bg-linear-to-r from-yellow-400 via-orange-500 to-fuchsia-600 animate-progress'></div>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <span className='text-zinc-500 text-[10px] uppercase tracking-[4px] font-medium'>from</span>
          <img 
            src={logo} 
            alt="VibeGram Logo" 
            className='h-12 object-contain brightness-110' 
          />
        </div>
      </div>

      {/* Custom Styles for Animation */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>

    </div>
  )
}

export default FirstLoad