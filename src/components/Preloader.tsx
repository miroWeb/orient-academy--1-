/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, GraduationCap } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  theme: 'emerald' | 'dark';
  key?: string;
}

export default function Preloader({ onComplete, theme }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Premium tizim yuklanmoqda...');

  useEffect(() => {
    // Elegant incremental progress loader with variable steps
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const increment = Math.floor(Math.random() * 8) + 4; // realistic ticks
        const next = Math.min(prev + increment, 100);

        // Update motivational/educational messages based on progress
        if (next < 25) {
          setLoadingText("Premium o'quv dasturlari yuklanmoqda...");
        } else if (next >= 25 && next < 50) {
          setLoadingText("IELTS 7.0+ metodologiyasi tayyorlanmoqda...");
        } else if (next >= 50 && next < 75) {
          setLoadingText("Mukammal atmosferamiz sozlanyapti...");
        } else if (next >= 75 && next < 95) {
          setLoadingText("Professional o'qituvchilar jamoasi...");
        } else {
          setLoadingText("Kutib oling: Orient Academy sizga eshik ochadi!");
        }

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100, trigger onComplete after a tiny aesthetic gap
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Framer Motion drawing path options
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "spring" as const, duration: 1.8, bounce: 0 },
        opacity: { delay: i * 0.2, duration: 0.5 }
      }
    })
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.6 }
    }
  };

  const textLetterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  // Standard brand text
  const brandName = "ORIENT ACADEMY".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: "blur(8px)",
        transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-brand-bg select-none"
    >
      {/* Background radial soft light depending on current theme selection */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-35 filter blur-3xl transition-colors duration-1000"
          style={{ 
            backgroundImage: theme === 'emerald' 
              ? 'radial-gradient(circle, rgba(13, 212, 205, 0.2) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)' 
          }} 
        />
        <div className="absolute top-10 right-10 h-96 w-96 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(247,224,43,0.15)_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md px-6 text-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8 flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-mono font-bold tracking-widest text-[#f7e02b] uppercase shadow-[0_4px_12px_rgba(247,224,43,0.06)]"
        >
          <Sparkles size={11} className="animate-spin-slow" />
          <span>IELTS N1 Metodologiyasi</span>
          <Sparkles size={11} className="animate-spin-slow" />
        </motion.div>

        {/* LOGO CONTAINER: Drawing vector paths in high fidelity */}
        <div className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-3xl bg-brand-bg-sec border border-brand-border-bright p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          {/* Decorative spinning background circles */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute inset-[3px] rounded-[22px] border border-dashed border-brand-border/40"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-[8px] rounded-[18px] border border-dotted border-brand-border/20"
          />

          {/* Golden Vector Paths representing the official Orient Logo, drawing dynamically */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_4px_12px_rgba(247,224,43,0.4)]"
          >
            {/* Stroke 1 */}
            <motion.path
              d="M 26 44 L 43 34 C 45 33, 47 33, 49 33.5 L 72 39"
              stroke="#f7e02b"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={0}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Stroke 2 */}
            <motion.path
              d="M 35 52 L 44 46 C 46 45, 48 45, 49 45.2 L 62 48"
              stroke="#f7e02b"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={1}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            {/* Stroke 3 */}
            <motion.path
              d="M 27 61 L 43 62 C 45 62, 47 61, 49 59.5 L 53 56"
              stroke="#f7e02b"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={2}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </div>

        {/* Multi-stagger letter animated title */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="mb-2 flex items-center justify-center gap-[0.08em] font-display text-2xl sm:text-3xl font-black tracking-wider text-white"
        >
          {brandName.map((l, i) => (
            <motion.span 
              key={i} 
              variants={ l === " " ? {} : textLetterVariants }
              className={l === " " ? "w-2" : i >= 7 ? "text-[#f7e02b]" : "text-white"}
            >
              {l}
            </motion.span>
          ))}
        </motion.div>

        {/* Short Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mb-10 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-brand-muted uppercase font-bold"
        >
          Kuzgi shinamlik & Oliy sifatli darslar
        </motion.p>

        {/* Elegant Loading Section */}
        <div className="w-64 space-y-3">
          {/* Progress Percent & Text Indicator */}
          <div className="flex items-center justify-between font-mono text-[10px] font-bold">
            <motion.span 
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-muted truncate max-w-[200px]"
            >
              {loadingText}
            </motion.span>
            <span className="text-[#f7e02b]">{progress}%</span>
          </div>

          {/* Futuristic linear progress track */}
          <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-brand-bg-sec border border-brand-border-light">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
              className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-brand-accent to-[#f7e02b] shadow-[0_0_12px_rgba(247,224,43,0.5)]"
            />
          </div>
        </div>

        {/* Small academic security emblem */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex items-center gap-1.5 text-[9px] tracking-wide font-mono uppercase font-bold text-brand-text justify-center"
        >
          <GraduationCap size={12} />
          <span>LICENSED ACADEMY IN TASHKENT</span>
        </motion.div>

      </div>
    </motion.div>
  );
}
