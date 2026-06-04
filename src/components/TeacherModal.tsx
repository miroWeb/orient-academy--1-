/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Teacher } from '../types';
import { X, Award, Users, GraduationCap, Quote, Compass, Calendar } from 'lucide-react';

interface TeacherModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  onBook: (teacher: Teacher) => void;
}

export default function TeacherModal({ teacher, onClose, onBook }: TeacherModalProps) {
  if (!teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-[#020a09]/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-accent/30 bg-brand-bg-sec text-brand-text shadow-[0_25px_60px_-15px_rgba(56, 189, 248,0.25)] transition-all duration-300 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-brand-border/1.3 bg-brand-card/40 text-brand-accent transition-all hover:bg-[#38bdf8] hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-32 w-1/2 rounded-full" style={{ backgroundImage: 'radial-gradient(circle, var(--glow-strong) 0%, transparent 80%)' }} />

        <div className="p-8">
          
          {/* Top Info Area: Photo + Essential Stats */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start text-center md:text-left">
            {/* Elegant Ring Photo */}
            <div className="mx-auto flex-shrink-0 relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-brand-accent p-1">
                <img 
                  src={teacher.avatar} 
                  alt={teacher.name} 
                  referrerPolicy="no-referrer"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-mono font-bold text-black shadow-lg">
                {teacher.isSupport ? 'SUPPORT' : teacher.ieltsScore}
              </span>
            </div>

            {/* Title / Role Block */}
            <div className="flex-1 space-y-2">
              <span className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider ${
                teacher.isSupport ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-sky-500/10 text-brand-accent border border-brand-border'
              }`}>
                {teacher.isSupport ? 'Yordamchi Support O\'qituvchi' : 'Asosiy Professional O\'qituvchi'}
              </span>
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white">
                {teacher.name}
              </h2>
              <p className="text-brand-accent font-mono text-sm font-semibold">{teacher.role}</p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-brand-bg-sec/40 p-4 text-center border border-brand-border/60">
            <div className="space-y-1">
              <div className="flex items-center justify-center text-brand-accent gap-1">
                <Calendar size={14} />
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider hidden sm:inline">Tajriba</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">{teacher.experience}</p>
              <p className="text-[10px] text-brand-accent/40">Ish faoliyati</p>
            </div>
            <div className="space-y-1 border-x border-brand-border/60">
              <div className="flex items-center justify-center text-brand-accent gap-1">
                <Users size={14} />
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider hidden sm:inline">Guruhlar</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">{teacher.activeGroups} ta</p>
              <p className="text-[10px] text-brand-accent/40">Faol sinflar</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center text-brand-accent gap-1">
                <GraduationCap size={14} />
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider hidden sm:inline">O'quvchilar</span>
              </div>
              <p className="text-lg font-bold text-[#f7e02b] font-mono">{teacher.successfulStudents}+</p>
              <p className="text-[10px] text-brand-accent/40">7+ IELTS ballar</p>
            </div>
          </div>

          {/* IELTS Skills Breakdown Slider Rows */}
          {!teacher.isSupport && (
            <div className="mt-8 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1">
                <Award size={14} className="text-amber-400" />
                IELTS Ko'rsatkichlari bo'yicha kuchli tomonlari
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl bg-brand-card/20 p-5 border border-brand-border-light">
                {teacher.skills.map((skill) => {
                  const percentage = (skill.value / 9.0) * 100;
                  return (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-brand-text/90">{skill.name}</span>
                        <span className="font-mono text-amber-400">{skill.value.toFixed(1)} Band</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#051c1b]">
                        <div 
                          className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#f7e02b)] transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Specialties Block */}
          <div className="mt-8 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1">
              <Compass size={14} className="text-brand-accent" />
              Pedagogik Mutaxassisligi dars doirasida
            </h4>
            <div className="flex flex-wrap gap-2">
              {teacher.specialties.map((specialty, idx) => (
                <span 
                  key={idx} 
                  className="rounded-xl bg-brand-card/30 px-3.5 py-1.5 text-xs text-brand-text font-medium border border-brand-border-light"
                >
                  🚀 {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Bio text */}
          <div className="mt-8 space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-muted">O'qituvchi haqida batafsil ma'lumot</h4>
            <p className="text-sm leading-relaxed text-brand-text">
              {teacher.bio}
            </p>
          </div>

          {/* Author Quote */}
          {teacher.quote && (
            <div className="mt-8 relative rounded-2xl bg-amber-500/[0.03] border border-amber-500/10 p-5 italic">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-amber-400/10" />
              <p className="text-sm leading-relaxed text-amber-200 relative z-10 pl-4 font-serif">
                "{teacher.quote}"
              </p>
            </div>
          )}

          {/* Direct call to action to select this teacher on contact form */}
          <button 
            onClick={() => onBook(teacher)}
            className="mt-8 w-full cursor-pointer rounded-2xl bg-[#f7e02b] py-4 text-center font-sans text-sm font-extrabold tracking-wide text-black hover:bg-amber-400 active:scale-98 transition-all hover:shadow-[0_10px_30px_rgba(247,224,43,0.25)]"
          >
            {teacher.name} guruhiga bepul dars yozilish →
          </button>

        </div>
      </div>
    </div>
  );
}
