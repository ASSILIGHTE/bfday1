import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';
import { HeartDoodle, SparkleDoodle } from './Doodles';
import { X, Heart } from 'lucide-react';

// -----------------------------------------------------------------------------
// 1. INTERACTIVE LOVE LETTER ENVELOPE (AMPLOP SURAT CINTA SKY BLUE BOYFRIEND)
// -----------------------------------------------------------------------------
export function LoveLetterEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [tapMessage, setTapMessage] = useState('');

  const handleOpen = (e) => {
    if (e) e.stopPropagation();
    soundFx.playHeartChime();
    setIsOpen(true);
    setTapMessage("Opening my love letter for you... ✉️");
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    soundFx.playPop();
    setIsOpen(false);
    setTapMessage('');
  };

  const handleLetterTap = (e) => {
    if (e) e.stopPropagation();
    soundFx.playHeartChime();
    const sweetMsgs = [
      "I'm so lucky to have you ♡",
      "Pahlawan tanpa jubahku ✨",
      "Kamu tempat ternyaman aku! ☁️",
      "Happy Boyfriend Day, my love! 💖",
      "1000/10 best boyfriend award! 🏆"
    ];
    const randomMsg = sweetMsgs[Math.floor(Math.random() * sweetMsgs.length)];
    setTapMessage(randomMsg);
  };

  return (
    <div className="relative inline-block my-4 z-40 pointer-events-auto">
      {/* Envelope Interactive Sky Blue Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleOpen}
        className="relative bg-[#EDF4F8] p-4 sm:p-5 rounded-xl border-2 border-[#B8D5EA] shadow-lg cursor-pointer group flex flex-col items-center justify-center w-64 sm:w-72 select-none z-30 pointer-events-auto text-center font-sans"
      >
        {/* Envelope Top Flap Simulation */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-[#D0E3F0] rounded-t-xl border-b border-[#B8D5EA]/60 flex justify-center items-end pb-1 pointer-events-none" />

        {/* Postage Stamp */}
        <div className="absolute top-2 right-2 rotate-6 pointer-events-none">
          <PostageStamp text="SKY MAIL ☁️" date="03 OCT" />
        </div>

        {/* Sky Blue Wax Seal Button */}
        <div className="relative z-10 my-3 bg-[#5B9BD5] text-white p-3.5 rounded-full shadow-md group-hover:scale-110 transition-transform flex items-center justify-center pointer-events-none">
          <Heart className="w-6 h-6 fill-white animate-pulse" />
        </div>

        <p className="font-handwriting text-2xl text-[#1E3A5F] font-bold z-10 mt-1 pointer-events-none">
          A Special Letter For You 💌
        </p>
        <span className="text-xs font-rounded text-[#3A75B4] bg-[#D0E3F0] px-3.5 py-1 rounded-full z-10 mt-1.5 font-bold animate-bounce pointer-events-none border border-[#B8D5EA]">
          tap untuk buka surat cinta ♡
        </span>
      </motion.button>

      {/* Love Letter Modal Popover */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={handleLetterTap}
              className="relative bg-[#F4F8FA] p-6 sm:p-8 rounded-2xl max-w-md w-full polaroid-shadow-lg border-4 border-[#5B9BD5] paper-texture overflow-hidden text-center select-none cursor-pointer pointer-events-auto"
            >
              {/* Floating Tap Message Toast */}
              {tapMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 inline-block bg-[#EDF4F8] text-[#1E3A5F] px-3.5 py-1 rounded-full text-sm font-handwriting border border-[#7CB5EC] font-bold"
                >
                  {tapMessage}
                </motion.div>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 bg-[#D0E3F0] hover:bg-[#B8D5EA] text-[#1E3A5F] rounded-full transition-colors z-30 cursor-pointer pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <PostageStamp text="EXPRESS MAIL ✈️" date="BOYFRIEND DAY" />
                <HeartDoodle className="w-10 h-10 text-[#4A88C7] glow-heart" fill="#D0E3F0" />
              </div>

              <h3 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#3A75B4] mb-3">
                To My Favorite Person 🧢
              </h3>

              {/* Love Letter Body */}
              <div className="space-y-3 font-handwriting text-xl sm:text-2xl text-[#1E3A5F] leading-relaxed text-left bg-[#EDF4F8] p-4 sm:p-5 rounded-xl border border-[#B8D5EA] shadow-inner">
                <p>Dear favorite human,</p>
                <p>
                  Happy Boyfriend Day to my favorite human in the world!
                </p>
                <p>
                  Terima kasih ya udah selalu jadi tempat ternyaman, pahlawan tanpa jubahku, dan alasan aku tersenyum setiap hari.
                </p>
                <p>
                  Every ordinary day rasanya jauh lebih warm, sweet, and happy selama ada kamu di samping aku. I'm so lucky to have you ♡
                </p>
                <p className="text-right font-bold text-[#3A75B4] pt-2">
                  Forever & always yours, <br />
                  Happy Boyfriend Day ♡
                </p>
              </div>

              {/* Interactive hint */}
              <p className="mt-4 font-rounded text-xs text-[#4A88C7] opacity-90 font-medium">
                (Tap di mana aja untuk kirim cinta! ☁️)
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. CANVA STICKERS & BADGES (SKY BLUE BOYFRIEND AESTHETIC)
// -----------------------------------------------------------------------------
export function CanvaBadge({ text = 'FAVORITE', variant = 'skyblue', className = '', customQuote = null }) {
  const [activeMsg, setActiveMsg] = useState(null);

  const handleTap = (e) => {
    if (e) e.stopPropagation();
    soundFx.playPop();
    const msg = customQuote || `Verified: ${text} ♡`;
    setActiveMsg(msg);
    setTimeout(() => setActiveMsg(null), 1800);
  };

  const styles = {
    skyblue: 'bg-[#EDF4F8] text-[#1E3A5F] border-[#5B9BD5]',
    navy: 'bg-[#1E3A5F] text-white border-[#3A75B4]',
    cloud: 'bg-[#D0E3F0] text-[#3A75B4] border-[#7CB5EC]',
    amber: 'bg-[#FEF9C3] text-[#713F12] border-[#F59E0B]',
  };

  return (
    <div className="relative inline-block pointer-events-auto">
      <AnimatePresence>
        {activeMsg && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: -30, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EDF4F8] text-[#1E3A5F] text-sm font-handwriting font-bold px-3 py-1 rounded-full border border-[#5B9BD5] shadow-md whitespace-nowrap z-30 pointer-events-none"
          >
            {activeMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border-2 border-dashed shadow-xs font-handwriting font-bold text-lg select-none cursor-pointer transform hover:scale-105 transition-transform ${styles[variant] || styles.skyblue} ${className}`}
      >
        <span>✦</span>
        <span>{text}</span>
      </motion.button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. POSTAGE STAMP
// -----------------------------------------------------------------------------
export function PostageStamp({ text = 'LOVE MAIL', date = '2026' }) {
  return (
    <div className="inline-block bg-[#EDF4F8] p-1.5 rounded-xs border-2 border-dashed border-[#5B9BD5] shadow-xs select-none">
      <div className="bg-[#D0E3F0] px-2 py-1 text-center border border-[#7CB5EC]">
        <p className="font-rounded text-[9px] font-bold text-[#1E3A5F] tracking-widest uppercase">{text}</p>
        <p className="font-mono text-[8px] text-[#4A88C7]">{date}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 4. CANVA STICKY NOTE (SKY BLUE / CLOUD POST-IT)
// -----------------------------------------------------------------------------
export function StickyNote({ text = 'remember this ♡', rotation = 3, color = 'skyblue' }) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = (e) => {
    if (e) e.stopPropagation();
    soundFx.playHeartChime();
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 2000);
  };

  const bg = color === 'skyblue' ? 'bg-[#EDF4F8] text-[#1E3A5F] border-[#5B9BD5]' : 'bg-[#FEF9C3] text-[#713F12] border-[#FDE047]';

  return (
    <div className="relative inline-block pointer-events-auto">
      <AnimatePresence>
        {isTapped && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -35 }}
            exit={{ opacity: 0 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#3A75B4] font-handwriting text-lg px-3 py-0.5 rounded-full border border-[#5B9BD5] shadow-lg whitespace-nowrap z-30 pointer-events-none font-bold"
          >
            Selalu ingat kamu! ☁️
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        style={{ rotate: `${rotation}deg` }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTap}
        className={`relative p-4 rounded-xs shadow-md border-t-4 ${bg} w-44 font-handwriting text-xl select-none cursor-pointer hover:rotate-0 transition-transform text-left`}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full shadow-xs border border-sky-700 pointer-events-none" />
        <p className="text-center">{text}</p>
      </motion.button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 5. PAPER CLIP SVG
// -----------------------------------------------------------------------------
export function PaperClip({ className = 'w-6 h-10 text-[#5B9BD5]' }) {
  return (
    <svg viewBox="0 0 24 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M7 12 v20 a5 5 0 0 0 10 0 v-24 a8 8 0 0 0 -16 0 v26 a11 11 0 0 0 22 0 v-20" />
    </svg>
  );
}
