import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt audio autoplay if trigger received (e.g. clicking "let's go →")
    if (autoPlayTrigger && !isPlaying && audioRef.current) {
      togglePlay(true);
    }
  }, [autoPlayTrigger]);

  const togglePlay = async (forceState = null) => {
    soundFx.playPop();
    soundFx.init();

    const targetState = forceState !== null ? forceState : !isPlaying;

    if (audioRef.current) {
      if (targetState) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (err) {
          console.log('Autoplay blocked by browser policy:', err);
          setIsPlaying(false);
        }
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
      />

      {/* Opening hint badge if not interacted yet */}
      {!hasInteracted && (
        <div className="bg-[#FDFBF7]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F2B5AA]/50 shadow-md text-xs font-handwriting text-[#6B4E3D] animate-bounce hidden sm:block">
          turn the sound on ♡
        </div>
      )}

      {/* Music Toggle Floating Pill */}
      <button
        onClick={() => togglePlay()}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isPlaying
            ? 'bg-[#FAD2E1] border-[#E78878] text-[#6B4E3D]'
            : 'bg-[#FDFBF7]/90 backdrop-blur-md border-[#E8DFD8] text-[#8C6D58]'
        }`}
        title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#E78878] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">music: on</span>
            {/* Cute mini sound equalizer bars */}
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-full bg-[#E78878] animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-0.5 h-2/3 bg-[#E78878] animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-0.5 h-4/5 bg-[#E78878] animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#8C6D58]" />
            <span className="text-xs font-medium">music: off</span>
          </>
        )}
      </button>
    </div>
  );
}
