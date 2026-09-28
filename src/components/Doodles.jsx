import React from 'react';
import { motion } from 'framer-motion';

export const HeartDoodle = ({ className = 'w-6 h-6', color = '#4A88C7', fill = 'none' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const StarDoodle = ({ className = 'w-5 h-5', color = '#F59E0B' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
  </svg>
);

export const FlowerDoodle = ({ className = 'w-7 h-7', color = '#5B9BD5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
    <circle cx="16" cy="16" r="3" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
    <circle cx="16" cy="9" r="3.5" fill="#D0E3F0" />
    <circle cx="23" cy="16" r="3.5" fill="#D0E3F0" />
    <circle cx="16" cy="23" r="3.5" fill="#D0E3F0" />
    <circle cx="9" cy="16" r="3.5" fill="#D0E3F0" />
    <circle cx="21" cy="11" r="3" fill="#EDF4F8" />
    <circle cx="21" cy="21" r="3" fill="#EDF4F8" />
    <circle cx="11" cy="21" r="3" fill="#EDF4F8" />
    <circle cx="11" cy="11" r="3" fill="#EDF4F8" />
  </svg>
);

export const CloudDoodle = ({ className = 'w-10 h-6', color = '#7CB5EC' }) => (
  <svg viewBox="0 0 32 20" className={className} fill="#EDF4F8" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M7 16a5 5 0 0 1-.9-9.9A7 7 0 0 1 19 8a5 5 0 0 1 9 2 4 4 0 0 1-2 7.8H7z" />
  </svg>
);

export const SmileyDoodle = ({ className = 'w-8 h-8', color = '#1E3A5F' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#FEF3C7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10h.01M15 10h.01" strokeWidth="3" />
    <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
  </svg>
);

export const BowDoodle = ({ className = 'w-8 h-8', color = '#4A88C7' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="#D0E3F0" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="14" r="2.5" fill="#4A88C7" />
    <path d="M13.5 14C8 9 5 13 6 16c1.5 4.5 7.5-.5 7.5-2z" />
    <path d="M18.5 14C24 9 27 13 26 16c-1.5 4.5-7.5-.5-7.5-2z" />
    <path d="M14.5 16.5L10 25M17.5 16.5L22 25" />
  </svg>
);

export const SparkleDoodle = ({ className = 'w-5 h-5', color = '#F59E0B' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={color}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export const FloatingDoodle = ({ children, delay = 0, duration = 4, className = '', rotateRange = [-5, 5] }) => (
  <motion.div
    className={`inline-block pointer-events-none select-none ${className}`}
    animate={{
      y: [0, -12, 0],
      rotate: rotateRange,
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay,
    }}
  >
    {children}
  </motion.div>
);
