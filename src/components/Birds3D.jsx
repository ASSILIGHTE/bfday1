import React from 'react';
import { motion } from 'framer-motion';

// SVG 3D Flying Bird Component in Sky Blue Theme
export const Bird3D = ({
  color = '#4A88C7',
  wingColor = '#EDF4F8',
  shadowColor = '#1E3A5F',
  className = 'w-10 h-10'
}) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <path d="M12 40 C22 42, 34 46, 52 32 C38 48, 24 52, 12 40 Z" fill={shadowColor} opacity="0.15" />
    
    {/* Bird Body & Tail */}
    <path d="M10 32 C 20 30, 36 28, 54 20 C 38 40, 24 44, 10 32 Z" fill={color} />
    <path d="M10 32 C 6 36, 2 40, 0 44 C 4 40, 8 36, 10 32 Z" fill={color} />
    
    {/* Flapping Wing Left */}
    <motion.path
      d="M26 30 C 20 12, 32 2, 42 6 C 36 18, 30 26, 26 30 Z"
      fill={wingColor}
      animate={{
        d: [
          "M26 30 C 20 12, 32 2, 42 6 C 36 18, 30 26, 26 30 Z",
          "M26 30 C 18 36, 30 46, 40 40 C 34 34, 30 32, 26 30 Z",
          "M26 30 C 20 12, 32 2, 42 6 C 36 18, 30 26, 26 30 Z"
        ]
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    {/* Beak & Head Detail */}
    <path d="M54 20 L58 21 L53 23 Z" fill="#F59E0B" />
    <circle cx="48" cy="22" r="1.5" fill="#1E3A5F" />
  </svg>
);

// 3D Flying Birds Floating Particles Layer
export default function Birds3D() {
  const birds = [
    { id: 1, top: '15%', left: '-10%', delay: 0, duration: 16, scale: 1, rotateZ: 5 },
    { id: 2, top: '42%', left: '-12%', delay: 5, duration: 20, scale: 1.15, rotateZ: -8 },
    { id: 3, top: '70%', left: '-15%', delay: 10, duration: 18, scale: 0.85, rotateZ: 12 },
    { id: 4, top: '28%', left: '-8%', delay: 3, duration: 22, scale: 0.75, rotateZ: 2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          initial={{ x: '-10vw', y: 0, opacity: 0, rotateX: 10, rotateY: 5 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: [0, -25, 15, -10, 0],
            opacity: [0, 0.9, 0.9, 0],
            rotateX: [10, -8, 10],
            rotateY: [5, -5, 5],
            rotateZ: [bird.rotateZ, bird.rotateZ + 6, bird.rotateZ]
          }}
          transition={{
            duration: bird.duration,
            repeat: Infinity,
            delay: bird.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: bird.top,
            scale: bird.scale,
            transformStyle: 'preserve-3d',
            perspective: 800
          }}
          className="flex items-center gap-1 filter drop-shadow-md"
        >
          {/* Air Trail */}
          <div className="w-12 sm:w-20 border-b border-dashed border-[#5B9BD5]/40 opacity-50 mr-[-4px]" />

          <Bird3D
            color={bird.id % 2 === 0 ? '#4A88C7' : '#3A75B4'}
            wingColor={bird.id % 2 === 0 ? '#EDF4F8' : '#D0E3F0'}
            className="w-8 h-8 sm:w-12 sm:h-12"
          />
        </motion.div>
      ))}
    </div>
  );
}
