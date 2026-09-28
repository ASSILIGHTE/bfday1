import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { HeartDoodle, SparkleDoodle } from './Doodles';

const ROMANTIC_QUOTES = [
  "You're my favorite human! 🧢",
  "Jantung aku selalu deg-degan buat kamu! ☁️",
  "So lucky to have you in my life ✨",
  "Kamu selalu bikin hariku warm & cozy ☕",
  "Forever my favorite notification!",
  "Best partner in crime aku 🤝",
  "Kamu langit biru favorit aku ☁️",
  "1000/10 best boyfriend ever! 🏆"
];

export default function PolaroidCard({
  src,
  caption,
  rotation = 0,
  tapePosition = 'top-center',
  tapeColor = 'skyblue',
  subText = '',
  className = '',
  style = {},
  priority = false,
  customQuote = null
}) {
  const [activeQuote, setActiveQuote] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  const handleTap = () => {
    soundFx.playHeartChime();
    setLikeCount((prev) => prev + 1);

    const quote = customQuote || ROMANTIC_QUOTES[Math.floor(Math.random() * ROMANTIC_QUOTES.length)];
    setActiveQuote(quote);

    setTimeout(() => {
      setActiveQuote(null);
    }, 2200);
  };

  const getTapeClass = () => {
    if (tapeColor === 'skyblue') return 'washi-tape-skyblue';
    if (tapeColor === 'navy') return 'washi-tape-navy';
    return 'washi-tape-cloud';
  };

  return (
    <motion.div
      style={{ rotate: rotation, ...style }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleTap}
      className={`relative bg-[#FAFCFF] p-1.5 xs:p-2 sm:p-3.5 pt-2 xs:pt-2.5 sm:pt-4 pb-2 xs:pb-2.5 sm:pb-5 rounded-xs polaroid-shadow border border-[#D0E3F0] cursor-pointer group transition-shadow duration-300 select-none ${className}`}
    >
      {/* Paper Washi Tape Overlay */}
      {tapePosition === 'top-center' && (
        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 xs:w-12 sm:w-20 h-3.5 sm:h-5 transform -rotate-1 z-20 ${getTapeClass()}`} />
      )}
      {tapePosition === 'top-left' && (
        <div className={`absolute -top-2 -left-1.5 sm:-left-3 w-8 xs:w-10 sm:w-16 h-3.5 sm:h-5 transform -rotate-12 z-20 ${getTapeClass()}`} />
      )}
      {tapePosition === 'top-right' && (
        <div className={`absolute -top-2 -right-1.5 sm:-right-3 w-8 xs:w-10 sm:w-16 h-3.5 sm:h-5 transform rotate-12 z-20 ${getTapeClass()}`} />
      )}
      {tapePosition === 'cross' && (
        <>
          <div className={`absolute -top-2 -left-1.5 sm:-left-3 w-7 xs:w-9 sm:w-14 h-3.5 sm:h-5 transform -rotate-15 z-20 ${getTapeClass()}`} />
          <div className={`absolute -top-2 -right-1.5 sm:-right-3 w-7 xs:w-9 sm:w-14 h-3.5 sm:h-5 transform rotate-15 z-20 ${getTapeClass()}`} />
        </>
      )}

      {/* TAPPED FLOATING ROMANTIC QUOTE POPUP */}
      <AnimatePresence>
        {activeQuote && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, y: -35, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className="absolute -top-5 left-1/2 -translate-x-1/2 z-50 bg-[#EDF4F8] text-[#1E3A5F] font-handwriting text-xs xs:text-sm sm:text-2xl px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full border border-1.5 sm:border-2 border-[#5B9BD5] shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-1 font-bold"
          >
            <span>{activeQuote}</span>
            <SparkleDoodle className="w-3 h-3 sm:w-4 sm:h-4 text-[#F59E0B] inline" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Frame Container */}
      <div className="relative overflow-hidden bg-[#E6F0F6] rounded-xs aspect-square">
        <img
          src={src}
          alt={caption || 'Memori foto'}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover filter contrast-[1.03] brightness-[1.02] transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10 pointer-events-none" />
      </div>

      {/* Handwritten Caption */}
      {caption && (
        <div className="mt-1 sm:mt-3 text-center px-0.5">
          <p className="font-handwriting text-xs xs:text-sm sm:text-2xl text-[#1E3A5F] leading-tight select-none font-bold">
            {caption}
          </p>
          {subText && (
            <p className="text-[8px] xs:text-[9px] sm:text-xs text-[#4A88C7] font-rounded mt-0.5 opacity-90 font-medium">
              {subText}
            </p>
          )}
        </div>
      )}

      {/* Heart count indicator if clicked */}
      {likeCount > 0 && (
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 text-[10px] sm:text-[11px] font-handwriting text-[#3A75B4] bg-[#EDF4F8] px-2 py-0.5 rounded-full shadow-xs border border-[#B8D5EA]">
          <span>♡</span> {likeCount}
        </div>
      )}
    </motion.div>
  );
}
