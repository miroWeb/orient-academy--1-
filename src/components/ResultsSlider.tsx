/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Sparkles, 
  Trophy, 
  X,
  Plus
} from 'lucide-react';

import resultOverall7 from '../assets/images/orient_result_overall_7_1780401985003.png';
import resultAmirbek from '../assets/images/result_amirbek_1780402010222.png';
import resultDilshod from '../assets/images/result_dilshod_1780402028928.png';
import resultSadoqat from '../assets/images/result_sadoqat_1780402046689.png';
import resultDilnura from '../assets/images/result_dilnura_1780402065097.png';

interface CertificateResult {
  id: number;
  image: string;
  studentName: string;
  subTitle: string;
  overallBand: string;
  cropPosition: string; // CSS position to center the certificate content
  scores: {
    listening: string;
    reading: string;
    writing: string;
    speaking: string;
  };
}

export default function ResultsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  
  // Touch Swiping State Variables
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const results: CertificateResult[] = [
    {
      id: 2,
      image: resultOverall7,
      studentName: "🏆 ORIENT RESULTS",
      subTitle: "Naqd 4 ta 7.0 Overall Tantanasi!",
      overallBand: "IELTS 7.0+",
      cropPosition: "object-center",
      scores: { listening: "8.5", reading: "7.5", writing: "6.5", speaking: "6.5" }
    },
    {
      id: 3,
      image: resultAmirbek,
      studentName: "Amirbek Kholmatov",
      subTitle: "Muvaffaqiyatli Bitiruvchimiz",
      overallBand: "Overall 7.0",
      cropPosition: "object-center",
      scores: { listening: "8.5", reading: "6.5", writing: "6.0", speaking: "6.0" }
    },
    {
      id: 4,
      image: resultDilshod,
      studentName: "Dilshod Abdugapparov",
      subTitle: "Muvaffaqiyatli Bitiruvchimiz",
      overallBand: "Overall 7.0",
      cropPosition: "object-center",
      scores: { listening: "7.5", reading: "7.0", writing: "6.0", speaking: "6.5" }
    },
    {
      id: 5,
      image: resultSadoqat,
      studentName: "Sadoqatxon Nabijonova",
      subTitle: "Muvaffaqiyatli Bitiruvchimiz",
      overallBand: "Overall 7.0",
      cropPosition: "object-center",
      scores: { listening: "7.5", reading: "7.5", writing: "6.5", speaking: "6.0" }
    },
    {
      id: 6,
      image: resultDilnura,
      studentName: "Dilnura Tursoatova",
      subTitle: "Muvaffaqiyatli Bitiruvchimiz",
      overallBand: "Overall 7.0",
      cropPosition: "object-center",
      scores: { listening: "7.0", reading: "7.0", writing: "6.5", speaking: "6.5" }
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === results.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? results.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  return (
    <div className="space-y-10" id="results-slider-root">
      {/* Dynamic Slide Stage Wrapper */}
      <div 
        className="relative max-w-lg mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glow behind the active slide */}
        <div className="absolute inset-0 bg-[#f7e02b]/5 rounded-[36px] blur-2xl -z-10 animate-pulse" />

        {/* Carousel Items Container */}
        <div className="relative h-[560px] w-full rounded-[36px] border border-brand-accent/25 bg-brand-bg shadow-2xl p-4.5 flex flex-col justify-between overflow-hidden group select-none">
          
          {/* Main Visual Rendering with Custom CSS Inner Cropper of unnecessary borders */}
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-brand-bg border border-brand-accent/15">
            <img 
              referrerPolicy="no-referrer"
              src={results[activeIndex].image}
              alt={results[activeIndex].studentName}
              className={`w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-110 ${results[activeIndex].cropPosition}`}
            />
            {/* Top Overlay Grid to hide status bar artifacts beautifully */}
            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#020617]/70 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#020617]/90 to-transparent pointer-events-none" />

            {/* Quick zoom lens icon */}
            <button 
              onClick={() => openLightbox(results[activeIndex].image)}
              className="absolute top-4 right-4 h-9 w-9 cursor-pointer flex items-center justify-center rounded-xl bg-black/75 text-white hover:bg-[#f7e02b] hover:text-black transition-all shadow-lg active:scale-95"
              title="To'liq sertifikatni ko'rish"
            >
              <Eye size={16} />
            </button>

            {/* Active Band Score Overlaid Badge */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-xl bg-[#f7e02b] px-3.5 py-1.5 text-xs font-black text-black shadow-lg">
              <Award size={14} />
              <span>{results[activeIndex].overallBand}</span>
            </div>
          </div>

          {/* Student Info Card Deck */}
          <div className="p-2 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg sm:text-xl font-black text-white leading-tight">
                  {results[activeIndex].studentName}
                </h4>
                <p className="text-xs text-brand-muted font-medium">
                  {results[activeIndex].subTitle}
                </p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#f7e02b]/10 border border-[#f7e02b]/20">
                <Trophy size={18} className="text-[#f7e02b]" />
              </div>
            </div>

            {/* IELTS Breakdown Section */}
            <div className="grid grid-cols-4 gap-2 border-t border-brand-accent/10 pt-3">
              {[
                { label: "LISTENING", val: results[activeIndex].scores.listening },
                { label: "READING", val: results[activeIndex].scores.reading },
                { label: "WRITING", val: results[activeIndex].scores.writing },
                { label: "SPEAKING", val: results[activeIndex].scores.speaking }
              ].map((sc, index) => (
                <div key={index} className="text-center rounded-xl bg-brand-card/30 p-1.5 border border-brand-accent/5">
                  <span className="block font-mono text-[9px] text-brand-muted uppercase tracking-wide font-extrabold">{sc.label}</span>
                  <span className="block font-display text-sm font-black text-white mt-0.5">{sc.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe Indicator lines at the top of bottom card */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {results.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-5 bg-[#f7e02b]' : 'w-1.5 bg-[#38bdf8]/20 hover:bg-[#38bdf8]/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Side Arrow buttons for Desktop ease */}
        <button 
          onClick={handlePrev}
          className="absolute left-[-24px] sm:left-[-54px] top-1/2 -translate-y-1/2 h-11 w-11 cursor-pointer flex items-center justify-center rounded-full bg-brand-bg-sec hover:bg-brand-card text-brand-accent hover:text-white border border-brand-accent/20 transition-all shadow-xl active:scale-95"
          title="Oldingisi"
        >
          <ChevronLeft size={22} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-[-24px] sm:right-[-54px] top-1/2 -translate-y-1/2 h-11 w-11 cursor-pointer flex items-center justify-center rounded-full bg-brand-bg-sec hover:bg-brand-card text-brand-accent hover:text-white border border-brand-accent/20 transition-all shadow-xl active:scale-95"
          title="Keyingisi"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Swipe visual guideline label */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#38bdf8]/5 px-3.5 py-1.5 border border-brand-accent/10 text-[11px] text-brand-accent font-bold font-mono">
          <Sparkles size={11} className="text-[#f7e02b]" />
          MOBIL QURILMADA CHAPGA YOKI ONGGA SWIPE QILING
        </span>
      </div>

      {/* Lightbox Modal View for zoom-in certificate details */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 z-50 animate-fade-in backdrop-blur-md"
        >
          {/* Modal Block wrapper */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-brand-bg rounded-3xl border border-brand-accent/30 p-4 shadow-2xl flex flex-col items-center"
          >
            {/* Close button */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 h-10 w-10 cursor-pointer flex items-center justify-center rounded-xl bg-brand-card text-white hover:bg-rose-600 transition-all border border-brand-accent/15"
              title="Yopish"
            >
              <X size={18} />
            </button>

            {/* IELTS image scroll */}
            <div className="w-full max-h-[80vh] overflow-y-auto rounded-2xl scrollbar-thin border border-brand-accent/10 bg-black mt-10">
              <img 
                referrerPolicy="no-referrer"
                src={lightboxImage} 
                alt="IELTS Report zoom input" 
                className="w-full h-auto object-contain object-top"
              />
            </div>

            {/* Hint */}
            <p className="text-[11px] font-mono font-extrabold text-brand-muted mt-4 uppercase tracking-widest text-center">
              ZOOM-IN: Rasmdagi barcha IELTS ballari YUZ FOIZ HAQIQIY TIZIMIDANDIR!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
