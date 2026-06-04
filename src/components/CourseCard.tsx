/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Course } from '../types';
import { Check, Flame, Trophy, Clock, CalendarDays } from 'lucide-react';

interface CourseCardProps {
  key?: React.Key;
  course: Course;
  onEnroll: (course: Course) => void;
}

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <div 
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all duration-300 ${
        course.popular 
          ? 'border-[#f7e02b] bg-brand-popular-bg shadow-[0_15px_30px_rgba(247,224,43,0.06)] hover:shadow-[0_20px_50px_rgba(247,224,43,0.12)] hover:-translate-y-2' 
          : 'border-brand-border bg-brand-bg-sec hover:border-brand-accent hover:shadow-[0_15px_40px_rgba(56, 189, 248,0.08)] hover:-translate-y-2'
      }`}
    >
      {/* Decorative Popular Banner */}
      {course.popular && (
        <span className="absolute -right-14 top-5 rotate-45 bg-[#f7e02b] px-14 py-1 text-center font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#020617] shadow-sm">
          ENG KOP SO'RALGAN
        </span>
      )}

      {/* Course Detail Top */}
      <div>
        {/* Category Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
            course.popular 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
              : 'bg-[#38bdf8]/10 text-brand-accent border border-brand-border'
          }`}>
            🎯 Goal: {course.aim.split(' ')[0]}
          </span>
          <span className="font-mono text-xs font-bold text-brand-accent bg-brand-card/40 px-3 py-1 rounded-lg border border-brand-border-light">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-2xl font-bold tracking-tight text-white group-hover:text-brand-accent transition-colors">
          {course.title}
        </h3>
        
        {/* Tagline */}
        <p className="mt-2 text-sm text-brand-muted font-medium leading-relaxed">
          {course.tagline}
        </p>

        {/* Course Core Specifications */}
        <div className="mt-5 space-y-2 border-t border-brand-border/60 pt-4">
          <div className="flex items-center gap-2.5 text-xs text-brand-text/90">
            <Clock size={15} className="text-brand-accent" />
            <span className="font-medium text-brand-text">Davomiyligi: <strong className="text-white font-mono">{course.duration}</strong></span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-brand-text/90">
            <CalendarDays size={15} className="text-brand-accent" />
            <span className="font-medium text-brand-text">Dars jadvali: <strong className="text-white font-mono">{course.frequency}</strong></span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-brand-text/90">
            <Trophy size={15} className="text-amber-400" />
            <span className="font-medium text-brand-text">Asosiy maqsad: <strong className="text-[#f5ebd3]">{course.aim}</strong></span>
          </div>
        </div>

        {/* Key Features Bullet List */}
        <div className="mt-6 space-y-2.5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Kurs tarkibi va afzalliklari:</h4>
          {course.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-brand-text/80">
              <Check size={14} className="mt-0.5 text-brand-accent flex-shrink-0" />
              <span className="text-slate-200">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & Interactive CTA Button */}
      <div className="mt-8 border-t border-brand-border/60 pt-6">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs text-brand-muted font-medium font-sans">Oylik to'lov:</span>
          <div className="text-right">
            <span className="font-mono text-2xl font-bold text-white tracking-tight">{course.price}</span>
            <span className="text-xs text-brand-muted font-medium font-sans ml-1">so'm/oy</span>
          </div>
        </div>

        <button 
          onClick={() => onEnroll(course)}
          className={`w-full cursor-pointer rounded-2xl py-3.5 text-center font-sans text-sm font-extrabold tracking-wide transition-all active:scale-98 ${
            course.popular 
              ? 'bg-[#f7e02b] text-black hover:bg-amber-400 hover:shadow-[0_8px_20px_rgba(247,224,43,0.18)]' 
              : 'bg-brand-card/30 text-brand-accent border border-brand-accent/40 hover:bg-[#38bdf8] hover:text-white hover:border-brand-accent hover:shadow-[0_8px_20px_rgba(56, 189, 248,0.15)]'
          }`}
        >
          {course.popular ? '🔥 Hozir ro\'yxatdan o\'tish' : 'Bepul darsga yozilish →'}
        </button>
      </div>
    </div>
  );
}
