import React from 'react';
import { Camera, Battery, Circle } from 'lucide-react';

export default function CameraViewfinder({ isActive = false, photoSrc, photoCaption }) {
  return (
    <div className={`relative transition-all duration-700 p-4 sm:p-6 rounded-2xl ${
      isActive ? 'backdrop-blur-sm bg-black/5 shadow-2xl border border-[#E78878]/30' : ''
    }`}>
      {/* Viewfinder UI Corner Brackets */}
      {isActive && (
        <>
          {/* Top Left Bracket */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#E78878] rounded-tl-sm pointer-events-none" />
          {/* Top Right Bracket */}
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#E78878] rounded-tr-sm pointer-events-none" />
          {/* Bottom Left Bracket */}
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#E78878] rounded-bl-sm pointer-events-none" />
          {/* Bottom Right Bracket */}
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#E78878] rounded-br-sm pointer-events-none" />

          {/* REC Status Bar */}
          <div className="absolute top-4 left-5 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs tracking-widest font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">REC</span>
            <span className="opacity-80">● 00:08</span>
          </div>

          {/* Camera Info right */}
          <div className="absolute top-4 right-5 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono">
            <Battery className="w-3.5 h-3.5 text-green-400" />
            <span>4K 60FPS</span>
          </div>

          {/* Center Crosshair Focus */}
          <div className="absolute inset-0 m-auto w-12 h-12 border border-white/40 rounded-full flex items-center justify-center pointer-events-none z-20">
            <div className="w-2 h-2 bg-[#E78878] rounded-full animate-ping" />
          </div>

          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-white" />
            <div className="border-r border-white" />
            <div />
          </div>
        </>
      )}

      {/* Frame content */}
      <div className="relative z-10 bg-white p-3 rounded-lg shadow-xl border border-amber-900/10">
        <div className="overflow-hidden rounded aspect-4/5 sm:aspect-square max-w-sm mx-auto">
          <img
            src={photoSrc}
            alt="Camera focus photo"
            className="w-full h-full object-cover transform transition-transform duration-700 scale-100 hover:scale-105"
          />
        </div>
        <p className="font-handwriting text-center text-xl sm:text-2xl text-[#6B4E3D] mt-3">
          {photoCaption}
        </p>
      </div>
    </div>
  );
}
