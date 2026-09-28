import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from './utils/sound';
import AudioPlayer from './components/AudioPlayer';
import PolaroidCard from './components/PolaroidCard';
import CameraViewfinder from './components/CameraViewfinder';
import { RunawaySmiley, NotificationBubble } from './components/InteractiveMoments';
import Birds3D from './components/Birds3D';
import {
  LoveLetterEnvelope,
  CanvaBadge,
  PostageStamp,
  StickyNote,
  PaperClip
} from './components/CanvaElements';
import {
  HeartDoodle,
  StarDoodle,
  FlowerDoodle,
  CloudDoodle,
  BowDoodle,
  SparkleDoodle,
  FloatingDoodle
} from './components/Doodles';
import { ArrowDown, RefreshCw } from 'lucide-react';

const TAP_MESSAGES = [
  "i love u so much ♡",
  "kamu ganteng banget! 🧢",
  "my favorite human!",
  "always with you ☁️",
  "sweetest boyfriend ever!",
  "partner in crime aku 🤝",
  "so lucky to have you!",
  "peluk aku kenceng! 🤗"
];

export default function App() {
  const containerRef = useRef(null);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [tapBursts, setTapBursts] = useState([]);

  // Track global scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Gentle spring animation for camera panning
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Background Color Shift (Sky Ice Cream -> Soft Cloud Ambient -> Sky Ice White)
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    ['#F4F8FA', '#EDF4F8', '#D0E3F0', '#F4F8FA']
  );

  // Global Tap Anywhere Effect: Pops floating love words at tap coordinates!
  const handleGlobalTap = (e) => {
    // Ignore clicks on buttons, inputs, envelopes, polaroids, badges, or interactive elements
    if (
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('.cursor-pointer') ||
      e.target.closest('[role="button"]')
    ) return;

    soundFx.playPop();
    const x = e.clientX;
    const y = e.clientY;
    const text = TAP_MESSAGES[Math.floor(Math.random() * TAP_MESSAGES.length)];
    const id = Date.now() + Math.random();

    setTapBursts((prev) => [...prev.slice(-6), { id, x, y, text }]);

    setTimeout(() => {
      setTapBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1500);
  };

  // Subtle camera pan & zoom
  const cameraX = useTransform(smoothProgress, [0, 0.3, 0.6, 0.9, 1], ['0%', '-2%', '2%', '-1%', '0%']);
  const cameraScale = useTransform(smoothProgress, [0, 0.3, 0.6, 0.9, 1], [1, 1.02, 1.03, 1, 1]);

  // Scene Opacities & Transforms
  const openingOpacity = useTransform(smoothProgress, [0, 0.12, 0.20], [1, 1, 0]);
  const openingY = useTransform(smoothProgress, [0, 0.20], [0, -80]);
  const openingPointerEvents = useTransform(smoothProgress, (val) => (val < 0.18 ? 'auto' : 'none'));

  const sec1Opacity = useTransform(smoothProgress, [0.12, 0.20, 0.38, 0.46], [0, 1, 1, 0]);
  const sec1Y = useTransform(smoothProgress, [0.12, 0.46], [60, -60]);
  const sec1PointerEvents = useTransform(smoothProgress, (val) => (val >= 0.14 && val <= 0.44 ? 'auto' : 'none'));

  const sec2Opacity = useTransform(smoothProgress, [0.38, 0.46, 0.60, 0.68], [0, 1, 1, 0]);
  const sec2Y = useTransform(smoothProgress, [0.38, 0.68], [60, -60]);
  const sec2PointerEvents = useTransform(smoothProgress, (val) => (val >= 0.40 && val <= 0.66 ? 'auto' : 'none'));

  const isCameraActive = useTransform(smoothProgress, [0.42, 0.62], [true, false]);
  const [cameraActiveState, setCameraActiveState] = useState(false);

  useEffect(() => {
    const unsubscribe = isCameraActive.on('change', (val) => {
      if (val && !cameraActiveState) {
        soundFx.playShutter();
      }
      setCameraActiveState(val);
    });
    return () => unsubscribe();
  }, [isCameraActive, cameraActiveState]);

  const sec3Opacity = useTransform(smoothProgress, [0.60, 0.68, 0.80, 0.86], [0, 1, 1, 0]);
  const sec3Y = useTransform(smoothProgress, [0.60, 0.86], [60, -60]);
  const sec3PointerEvents = useTransform(smoothProgress, (val) => (val >= 0.62 && val <= 0.84 ? 'auto' : 'none'));

  const sec4Opacity = useTransform(smoothProgress, [0.80, 0.88, 1], [0, 1, 1]);
  const sec4Y = useTransform(smoothProgress, [0.80, 1], [40, 0]);
  const sec4PointerEvents = useTransform(smoothProgress, (val) => (val >= 0.82 ? 'auto' : 'none'));

  // Confetti trigger (Sky Blue & Cloud Colors)
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (val) => {
      if (val >= 0.84 && !hasTriggeredConfetti) {
        setHasTriggeredConfetti(true);
        soundFx.playFanfare();

        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#5B9BD5', '#4A88C7', '#7CB5EC', '#F59E0B', '#1E3A5F']
        });
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, hasTriggeredConfetti]);

  const handleStartClick = () => {
    soundFx.playPop();
    setAutoPlayTrigger(true);
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  const handleReplayClick = () => {
    soundFx.playPop();
    setHasTriggeredConfetti(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      onClick={handleGlobalTap}
      className="relative min-h-[450vh] w-full text-[#1E3A5F] selection:bg-[#D0E3F0] selection:text-[#1E3A5F]"
    >
      {/* Texture Overlays */}
      <div className="fixed inset-0 paper-texture pointer-events-none z-0" />
      <div className="fixed inset-0 noise-overlay pointer-events-none z-0" />

      {/* 3D Flying Birds Particles Layer */}
      <Birds3D />

      {/* Floating Love Word Bursts on Tap */}
      <AnimatePresence>
        {tapBursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ left: burst.x - 40, top: burst.y - 20 }}
            className="fixed z-[9999] pointer-events-none bg-[#EDF4F8] text-[#1E3A5F] font-handwriting text-2xl font-bold px-3.5 py-1 rounded-full border border-[#5B9BD5] shadow-xl whitespace-nowrap"
          >
            {burst.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Audio Controller */}
      <AudioPlayer autoPlayTrigger={autoPlayTrigger} />

      {/* Floating Canva Ambient Elements Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatingDoodle className="absolute top-[12%] left-[5%]" delay={0}>
          <HeartDoodle className="w-8 h-8 text-[#4A88C7] opacity-50" fill="#EDF4F8" />
        </FloatingDoodle>
        <FloatingDoodle className="absolute top-[25%] right-[6%]" delay={1}>
          <StarDoodle className="w-6 h-6 text-[#F59E0B] opacity-60" />
        </FloatingDoodle>
        <FloatingDoodle className="absolute top-[45%] left-[4%]" delay={2}>
          <FlowerDoodle className="w-9 h-9 text-[#5B9BD5] opacity-60" />
        </FloatingDoodle>
        <FloatingDoodle className="absolute top-[68%] right-[5%]" delay={0.5}>
          <CloudDoodle className="w-12 h-8 text-[#7CB5EC] opacity-60" />
        </FloatingDoodle>
        <FloatingDoodle className="absolute top-[82%] left-[6%]" delay={1.5}>
          <BowDoodle className="w-10 h-10 text-[#4A88C7] opacity-50" />
        </FloatingDoodle>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* FIXED VIEWPORT FRAME                                              */}
      {/* ----------------------------------------------------------------- */}
      <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden z-10 px-2 xs:px-4 sm:px-8 pointer-events-none">
        
        <motion.div
          style={{
            x: cameraX,
            scale: cameraScale
          }}
          className="w-full max-w-5xl h-full relative flex items-center justify-center pointer-events-none"
        >

          {/* --------------------------------------------------------------- */}
          {/* PHASE 0: OPENING SCENE                                          */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: openingOpacity,
              y: openingY,
              pointerEvents: openingPointerEvents
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 xs:p-6 z-30"
          >
            <div className="absolute top-4 left-3 sm:top-10 sm:left-6 rotate-[-12deg] z-30 scale-75 xs:scale-90 sm:scale-100 origin-top-left">
              <PostageStamp text="SKY MAIL ☁️" date="03 OCT" />
            </div>
            <div className="absolute top-4 right-3 sm:top-14 sm:right-8 rotate-[8deg] z-30 scale-75 xs:scale-90 sm:scale-100 origin-top-right">
              <CanvaBadge text="MY FAVORITE BOY 🧢" variant="skyblue" customQuote="My favorite boy in the whole world! 🧢" />
            </div>

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [-4, 4, -4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              onClick={() => soundFx.playHeartChime()}
              className="cursor-pointer mb-2 xs:mb-3 group"
            >
              <HeartDoodle className="w-14 h-14 sm:w-20 sm:h-20 text-[#4A88C7] glow-heart transform group-hover:scale-110 transition-transform" fill="#EDF4F8" />
            </motion.div>

            <h1 className="font-handwriting text-3xl xs:text-5xl sm:text-7xl font-bold text-[#1E3A5F] tracking-tight drop-shadow-sm">
              Just Us Being Us <span className="text-[#4A88C7]">♡</span>
            </h1>

            <p className="mt-2 sm:mt-3 text-sm xs:text-lg sm:text-2xl font-rounded text-[#3A75B4] max-w-xs sm:max-w-md opacity-90 leading-relaxed font-medium">
              Happy Boyfriend Day! Ini koleksi kecil momen-momen favoritku bersamamu ♡
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartClick}
              className="mt-5 sm:mt-8 group flex items-center gap-2 bg-[#EDF4F8] hover:bg-[#D0E3F0] text-[#1E3A5F] font-medium px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full border border-[#5B9BD5] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="font-rounded text-sm sm:text-base font-bold">let's go</span>
              <span className="group-hover:translate-x-1 transition-transform font-bold text-base sm:text-lg text-[#4A88C7]">→</span>
            </motion.button>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-3 sm:bottom-6 flex flex-col items-center text-[10px] sm:text-xs font-handwriting text-[#3A75B4] opacity-80"
            >
              <span>scroll down untuk masuk ke dunia memori kita ♡</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 text-[#4A88C7]" />
            </motion.div>
          </motion.div>

          {/* --------------------------------------------------------------- */}
          {/* SECTION 1: MEMORY WORLD (Photos 1, 2, 3 + Canva Badges)        */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: sec1Opacity,
              y: sec1Y,
              pointerEvents: sec1PointerEvents
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-1 xs:px-3 sm:px-4 z-20"
          >
            <div className="absolute top-2 left-2 sm:top-4 sm:left-10 z-30 scale-75 xs:scale-90 sm:scale-100 origin-top-left">
              <StickyNote text="remember to smile ya! 😊" rotation={-5} color="skyblue" />
            </div>

            <div className="absolute top-2 right-2 sm:top-6 sm:right-12 z-30 scale-75 xs:scale-90 sm:scale-100 origin-top-right">
              <CanvaBadge text="100% BEST BOYFRIEND 🏆" variant="navy" customQuote="100% official best boyfriend award 🏆" />
            </div>

            <div className="grid grid-cols-3 gap-1.5 xs:gap-3 sm:gap-8 items-center w-full max-w-4xl mt-10 sm:mt-0 px-0.5 sm:px-4">
              <PolaroidCard
                src="/photos/photo1.jpeg"
                caption="first silly laugh"
                subText="♡ warm coffee date"
                rotation={-5}
                tapePosition="top-left"
                tapeColor="skyblue"
                customQuote="The day I fell in love with your laugh ☕"
                priority
              />
              <PolaroidCard
                src="/photos/photo2.jpeg"
                caption="my favorite human"
                subText="selalu bikin senyum"
                rotation={3}
                tapePosition="top-center"
                tapeColor="cloud"
                customQuote="My favorite smile in the whole world! ✨"
                priority
              />
              <PolaroidCard
                src="/photos/photo3.jpeg"
                caption="tempat paling aman"
                subText="just us being cozy"
                rotation={-3}
                tapePosition="top-right"
                tapeColor="navy"
                customQuote="Safe & warm whenever I'm with you ♡"
                priority
              />
            </div>
          </motion.div>

          {/* --------------------------------------------------------------- */}
          {/* SECTION 2: PHOTO CAMERA VIEWFINDER MOMENT                        */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: sec2Opacity,
              y: sec2Y,
              pointerEvents: sec2PointerEvents
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4 z-20"
          >
            <div className="w-full max-w-[260px] xs:max-w-xs sm:max-w-md relative flex flex-col items-center">
              {/* TOP ROW BADGES */}
              <div className="mb-1.5 sm:mb-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 z-30 w-full scale-90 sm:scale-100">
                <CanvaBadge text="COMFORT PERSON ☁️" variant="amber" customQuote="Checked & verified: My comfort person!" />
                <PostageStamp text="EXPRESS LOVE" date="REC" />
                <CanvaBadge text="MY HAPPY PLACE 🌅" variant="skyblue" customQuote="My happy place is with you ♡" />
              </div>

              {/* MAIN VIEWFINDER CARD */}
              <div className="relative w-full">
                {/* Paper Clip in Top-Left Corner */}
                <div className="absolute -top-3 -left-3 z-30 rotate-[-12deg] hidden sm:block">
                  <PaperClip className="w-7 h-11 text-[#5B9BD5]" />
                </div>

                <CameraViewfinder
                  isActive={cameraActiveState}
                  photoSrc="/photos/photo4.jpeg"
                  photoCaption="capturing moment favorit kita 📸"
                />

                {/* BOTTOM ROW BADGES */}
                <div className="mt-1.5 sm:mt-3 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 z-30 w-full px-1 scale-90 sm:scale-100">
                  <CanvaBadge text="100% PERFECT 📸" variant="navy" customQuote="100% picture perfect moment!" />
                  <CanvaBadge text="FILM 35MM 🎞️" variant="cloud" customQuote="Picture perfect moment 📸" />
                </div>

                {/* Twinkle Sparkles Background Layer */}
                <FloatingDoodle className="absolute -top-6 left-1/4 z-10" delay={0.3}>
                  <SparkleDoodle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />
                </FloatingDoodle>
                <FloatingDoodle className="absolute -bottom-6 right-1/4 z-10" delay={0.7}>
                  <SparkleDoodle className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B9BD5]" />
                </FloatingDoodle>
              </div>
            </div>
          </motion.div>

          {/* --------------------------------------------------------------- */}
          {/* SECTION 3: PLAYFUL MOMENTS & LOVE LETTER ENVELOPE              */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: sec3Opacity,
              y: sec3Y,
              pointerEvents: sec3PointerEvents
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4 text-center z-40"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-0.5 sm:my-1 scale-90 xs:scale-95 sm:scale-100">
              <RunawaySmiley />
              <NotificationBubble photoSrc="/photos/photo5.jpeg" />
            </div>

            <div className="my-1 sm:my-2 z-50">
              <LoveLetterEnvelope />
            </div>

            <div className="flex justify-center items-center gap-2 xs:gap-4 sm:gap-6 my-1 sm:my-2">
              <PolaroidCard
                src="/photos/photo5.jpeg"
                caption="pelukan hangat"
                rotation={-6}
                tapePosition="top-left"
                tapeColor="skyblue"
                customQuote="Peluk aku lebih kenceng! 🤗"
                className="w-26 xs:w-32 sm:w-44"
              />
              <PolaroidCard
                src="/photos/photo6.jpeg"
                caption="favorite human"
                rotation={5}
                tapePosition="top-right"
                tapeColor="navy"
                customQuote="You & me against the world 🤝"
                className="w-26 xs:w-32 sm:w-44"
              />
            </div>
          </motion.div>

          {/* --------------------------------------------------------------- */}
          {/* SECTION 4: FINAL SCENE & SCRAPBOOK COLLAGE WALL                 */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: sec4Opacity,
              y: sec4Y,
              pointerEvents: sec4PointerEvents
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-2 xs:p-4 z-30"
          >
            <motion.div
              animate={{
                y: [0, -6, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-20 w-full max-w-[210px] xs:max-w-[260px] sm:max-w-md mx-auto"
            >
              <PolaroidCard
                src="/photos/photo_main.jpeg"
                caption="Just us. Just being us. ♡"
                subText="Happy Boyfriend Day!"
                rotation={0}
                tapePosition="cross"
                tapeColor="skyblue"
                customQuote="You are my forever & always! ♡"
                className="shadow-2xl border-2 border-[#5B9BD5]/40"
              />

              <div className="absolute -top-5 -left-6 rotate-[-12deg] z-30 scale-75 sm:scale-100 origin-top-left">
                <CanvaBadge text="PARTNER IN CRIME 🤝" variant="skyblue" customQuote="Partners in crime selamanya 🤝" />
              </div>
              <div className="absolute -bottom-5 -right-6 rotate-[12deg] z-30 scale-75 sm:scale-100 origin-bottom-right">
                <CanvaBadge text="SKY FULL OF STARS ✨" variant="amber" customQuote="You make my sky full of stars ♡" />
              </div>
            </motion.div>

            <div className="text-center mt-3 sm:mt-5 z-30 max-w-lg px-2">
              <p className="font-handwriting text-lg xs:text-2xl sm:text-3xl text-[#3A75B4]">
                Life is a little more fun & warm with you.
              </p>
              <h2 className="font-handwriting text-2xl xs:text-4xl sm:text-6xl font-bold text-[#4A88C7] mt-0.5 sm:mt-1 drop-shadow-sm">
                Happy Boyfriend Day ♡
              </h2>
              <p className="font-rounded text-[11px] xs:text-xs sm:text-sm text-[#1E3A5F] mt-1 sm:mt-2 tracking-wide font-medium leading-relaxed max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
                Happy Boyfriend Day to my favorite human in the world! Terima kasih ya udah selalu jadi tempat ternyaman, pahlawan tanpa jubahku, dan alasan aku tersenyum setiap hari. I'm so lucky to have you ♡
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReplayClick}
              className="mt-3 sm:mt-5 z-30 flex items-center gap-2 bg-[#EDF4F8] hover:bg-[#D0E3F0] text-[#1E3A5F] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#5B9BD5] shadow-md font-rounded text-xs sm:text-sm font-bold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A88C7]" />
              <span>replay memory journey ✨</span>
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
