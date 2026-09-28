import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { SmileyDoodle, HeartDoodle, SparkleDoodle } from './Doodles';
import { X, MessageCircle } from 'lucide-react';

// Runaway Smiley Mini Game
export function RunawaySmiley() {
  const [isCaught, setIsCaught] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleHover = () => {
    if (isCaught) return;
    soundFx.playPop();

    // Random dodge away on hover
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 60;
    setPos({ x: randomX, y: randomY });
  };

  const handleClick = () => {
    soundFx.playHeartChime();
    setIsCaught(true);
  };

  return (
    <div className="relative inline-block my-1 sm:my-4">
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onMouseEnter={handleHover}
        onClick={handleClick}
        className="cursor-pointer group flex items-center gap-1.5 sm:gap-2 bg-[#FAF6EE] px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full border border-[#F2B5AA] shadow-md hover:shadow-lg select-none"
      >
        {isCaught ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1.1, rotate: 0 }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <HeartDoodle className="w-4 h-4 sm:w-6 sm:h-6 text-[#E78878] glow-heart" fill="#E78878" />
            <span className="font-handwriting text-base sm:text-xl text-[#E78878]">Yay! Caught my heart ♡</span>
            <SparkleDoodle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          </motion.div>
        ) : (
          <>
            <SmileyDoodle className="w-4 h-4 sm:w-6 sm:h-6 text-[#8C6D58] group-hover:scale-110 transition-transform" />
            <span className="font-handwriting text-sm sm:text-lg text-[#6B4E3D]">
              Hey, come back... <span className="text-[10px] sm:text-xs font-rounded text-[#8C6D58] opacity-75">(Tap me!)</span>
            </span>
          </>
        )}
      </motion.div>
    </div>
  );
}

// Notification Bubble Popover Moment
export function NotificationBubble({ photoSrc }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundFx.playHeartChime();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    soundFx.playPop();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block my-1 sm:my-4">
      {/* Floating Pill Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl border border-[#FAD2E1] text-left group"
      >
        <div className="relative bg-[#FFE5D9] p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-[#E78878]">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-[#E78878]/20" />
          <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-ping" />
        </div>
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-[#8C6D58]">iMessage</p>
          <p className="text-xs sm:text-sm font-rounded text-[#6B4E3D] font-medium group-hover:text-[#E78878] transition-colors">
            You received a message ♡
          </p>
        </div>
      </motion.button>

      {/* Popover Modal Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 top-16 z-50 w-72 bg-[#FAF8F5] p-4 rounded-2xl polaroid-shadow-lg border border-[#F2B5AA]"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 text-[#8C6D58] hover:text-[#6B4E3D] rounded-full hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="rounded-xl overflow-hidden mb-3 aspect-4/3 bg-[#E8DFD8]">
              <img
                src={photoSrc || '/photos/photo3.jpeg'}
                alt="Favorite notification"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-handwriting text-2xl text-center text-[#6B4E3D]">
              yep... still my favorite.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
