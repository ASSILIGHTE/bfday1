import React from 'react';
import { motion } from 'framer-motion';

// SVG 3D Origami Paper Airplane Component
export const PaperAirplane3D = ({
  color = '#C86D51',
  wingColor = '#E8EDE9',
  shadowColor = '#5C4033',
  className = 'w-10 h-10'
}) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Drop shadow */}
    <path d="M6 34L58 14L32 54L28 38L6 34Z" fill={shadowColor} opacity="0.15" />
    {/* Main Left Wing */}
    <path d="M8 30L56 12L28 50L8 30Z" fill={color} />
    {/* Right Folded Wing */}
    <path d="M56 12L28 50L34 35L56 12Z" fill={wingColor} opacity="0.9" />
    {/* Center Crease / Underbelly */}
    <path d="M8 30L56 12L34 35L8 30Z" fill="#3D2B1F" opacity="0.2" />
    {/* Dotted Trail SVG path */}
    <path d="M2 32Q-8 34 -16 38" stroke={color} strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
  </svg>
);

// 3D Floating Particle Layer for Canvas
export default function PaperPlanes3D() {
  const planes = [
    { id: 1, top: '18%', left: '-10%', delay: 0, duration: 18, scale: 0.9, rotateZ: 15 },
    { id: 2, top: '48%', left: '-12%', delay: 6, duration: 22, scale: 1.1, rotateZ: -10 },
    { id: 3, top: '75%', left: '-15%', delay: 12, duration: 20, scale: 0.8, rotateZ: 22 },
    { id: 4, top: '32%', left: '-8%', delay: 3, duration: 24, scale: 0.7, rotateZ: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {planes.map((plane) => (
        <motion.div
          key={plane.id}
          initial={{ x: '-10vw', y: 0, opacity: 0, rotateX: 20, rotateY: 10 }}
          animate={{
            x: ['-10vw', '110vw'],
            y: [0, -30, 20, -10, 0],
            opacity: [0, 0.85, 0.85, 0],
            rotateX: [15, -10, 15],
            rotateY: [10, -5, 10],
            rotateZ: [plane.rotateZ, plane.rotateZ + 10, plane.rotateZ]
          }}
          transition={{
            duration: plane.duration,
            repeat: Infinity,
            delay: plane.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: plane.top,
            scale: plane.scale,
            transformStyle: 'preserve-3d',
            perspective: 800
          }}
          className="flex items-center gap-1 filter drop-shadow-md"
        >
          {/* Dotted Flight Trail */}
          <div className="w-16 sm:w-24 border-b-2 border-dashed border-[#C86D51]/50 opacity-60 mr-[-6px]" />
          
          <PaperAirplane3D
            color={plane.id % 2 === 0 ? '#C86D51' : '#87988A'}
            wingColor={plane.id % 2 === 0 ? '#F7EBE8' : '#E8EDE9'}
            className="w-8 h-8 sm:w-12 sm:h-12 transform -rotate-45"
          />
        </motion.div>
      ))}
    </div>
  );
}
