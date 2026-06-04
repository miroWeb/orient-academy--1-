/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Teacher } from '../types';

interface TeacherCardProps {
  key?: React.Key;
  teacher: Teacher;
  onClick: (teacher: Teacher) => void;
}

export default function TeacherCard({ teacher, onClick }: TeacherCardProps) {
  return (
    <div
      onClick={() => onClick(teacher)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-sec p-6 transition-all duration-300 hover:-translate-y-2 hover:border-brand-accent hover:shadow-[0_20px_40px_rgba(56, 189, 248,0.1)]"
    >
      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full transition-all duration-300 group-hover:scale-150" style={{ backgroundImage: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)' }} />

      {/* Ribbon */}
      <div className="absolute right-4 top-4">
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
          teacher.isSupport 
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
            : 'bg-[#38bdf8]/10 text-brand-accent border border-brand-accent/30'
        }`}>
          {teacher.isSupport ? 'Support' : teacher.ieltsScore}
        </span>
      </div>

      {/* Avatar with Ring */}
      <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-4 border-brand-border/1.3 p-[2px] transition-all duration-300 group-hover:border-brand-accent group-hover:scale-105">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          referrerPolicy="no-referrer"
          className="h-full w-full rounded-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
        />
      </div>

      {/* Name and Role */}
      <h3 className="text-center font-sans text-xl font-bold tracking-tight text-[#ffffff] transition-colors group-hover:text-brand-accent">
        {teacher.name}
      </h3>
      <p className="mt-1 text-center font-mono text-xs font-semibold text-brand-accent/80">
        {teacher.role}
      </p>

      {/* Quick stats on card */}
      <div className="my-4 grid grid-cols-2 gap-2 border-y border-brand-border/60 py-3 text-center">
        <div>
          <p className="font-sans text-xs text-brand-accent/60 font-medium">Guruhlar soni</p>
          <p className="font-mono text-sm font-bold text-white mt-0.5">{teacher.activeGroups} ta</p>
        </div>
        <div>
          <p className="font-sans text-xs text-brand-accent/60 font-medium">Yulduz o'quvchi</p>
          <p className="font-mono text-sm font-bold text-amber-400 mt-0.5">{teacher.successfulStudents}+</p>
        </div>
      </div>

      {/* Short Bio */}
      <p className="mt-2 line-clamp-2 text-center text-xs leading-relaxed text-brand-muted group-hover:text-brand-text transition-colors">
        {teacher.bio}
      </p>

      {/* "Batafsil ma'lumot" button overlay indicator */}
      <div className="mt-4 flex items-center justify-center gap-1 font-sans text-xs font-bold text-brand-accent opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
        <span>Batafsil ma'lumot</span>
        <span>→</span>
      </div>
    </div>
  );
}
