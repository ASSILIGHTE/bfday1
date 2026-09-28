import React from 'react';
import { Battery } from 'lucide-react';

export default function CameraViewfinder({ isActive = false, photoSrc, photoCaption }) {
  return (
    <div className={`relative transition-all duration-700 p-3 sm:p-5 rounded-2xl ${
      isActive ? 'backdrop-blur-sm bg-black/5 shadow-2xl border border-[#5B9BD5]/30' : ''
    }`}>
      {/* Viewfinder UI Corner Brackets */}
      {isActive && (
        <>
          <div className="absolute top-2 left-2 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#5B9BD5] rounded-tl-sm pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#5B9BD5] rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#5B9BD5] rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#5B9BD5] rounded-br-sm pointer-events-none" />

          {/* REC Status Bar */}
          <div className="absolute top-3 left-4 sm:left-5 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-white text-[10px] sm:text-xs tracking-widest font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">REC</span>
            <span className="opacity-80">● 00:08</span>
          </div>

          {/* Camera Info right */}
          <div className="absolute top-3 right-4 sm:right-5 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-mono">
            <Battery className="w-3 h-3 text-green-400" />
            <span>4K</span>
          </div>

          {/* Center Crosshair Focus */}
          <div className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 border border-white/40 rounded-full flex items-center justify-center pointer-events-none z-20">
            <div className="w-2 h-2 bg-[#5B9BD5] rounded-full animate-ping" />
          </div>
        </>
      )}

      {/* Frame content */}
      <div className="relative z-10 bg-white p-2.5 sm:p-3.5 rounded-lg shadow-xl border border-sky-900/10">
        <div className="overflow-hidden rounded aspect-square max-w-[240px] sm:max-w-sm mx-auto">
          <img
            src={photoSrc}
            alt="Camera focus photo"
            className="w-full h-full object-cover transform transition-transform duration-700 scale-100 hover:scale-105"
          />
        </div>
        <p className="font-handwriting text-center text-lg sm:text-2xl text-[#1E3A5F] mt-2 sm:mt-3 font-bold">
          {photoCaption}
        </p>
      </div>
    </div>
  );
}
