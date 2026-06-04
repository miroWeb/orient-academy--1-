/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Course, Teacher } from '../types';
import { COURSES, CONTACT_INFO, TEACHERS } from '../data';
import { Send, CheckCircle2, AlertCircle, Phone, Loader2, Sparkles } from 'lucide-react';

interface ContactFormProps {
  initialCourse?: Course | null;
  initialTeacher?: Teacher | null;
  onSubmitSuccess: (message: string) => void;
  onClearInitials: () => void;
}

export default function ContactForm({ 
  initialCourse, 
  initialTeacher, 
  onSubmitSuccess,
  onClearInitials 
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [time, setTime] = useState('');
  const [msg, setMsg] = useState('');
  const [teacherChoice, setTeacherChoice] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Restore draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem('orient_form_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setName(parsed.name || '');
        setPhone(parsed.phone || '');
        setCourse(parsed.course || '');
        setLevel(parsed.level || '');
        setTime(parsed.time || '');
        setMsg(parsed.msg || '');
      } catch (e) {
        // Safe fail
      }
    }
  }, []);

  // Save draft to localStorage on form interaction
  useEffect(() => {
    const payload = { name, phone, course, level, time, msg };
    localStorage.setItem('orient_form_draft', JSON.stringify(payload));
  }, [name, phone, course, level, time, msg]);

  // Adjust pre-filled values based on user clicking Course Cards or Teacher Modals
  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse.id);
      // Auto fill a comment about booking specific course
      setMsg(`Xayrli kun! Meni ${initialCourse.title} (Level: ${initialCourse.level}) kursingiz qiziqtirmoqda.`);
    }
  }, [initialCourse]);

  useEffect(() => {
    if (initialTeacher) {
      setTeacherChoice(initialTeacher.id);
      setMsg((prev) => 
        prev.includes('ustoz') 
          ? prev 
          : `${prev}\n\n[Darsni ${initialTeacher.name} guruhlarida olib bormoqchiman]`
      );
    }
  }, [initialTeacher]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'To\'liq ismingizni kiriting';
    if (name.trim().length < 3) nextErrors.name = 'Ism kamida 3 ta harfdan iborat bo\'lishi lozim';
    
    // Validate phone number format (at least 7 numbers)
    const normalizedPhone = phone.replace(/[^0-9]/g, '');
    if (!phone) {
      nextErrors.phone = 'Telefon raqamingizni kiriting';
    } else if (normalizedPhone.length < 9) {
      nextErrors.phone = 'Iltimos, haqiqiy telefon raqamini kiriting (masalan, 953830777 kunlik formatda)';
    }

    if (!course) nextErrors.course = 'Iltimos, o\'quv kursini tanlang';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Auto prefix on focus/empty if needed, or just let users write
    if (val === '') {
      val = '+998 ';
    } else if (!val.startsWith('+998') && !val.startsWith('+')) {
      val = '+998 ' + val.replace(/[^0-9]/g, '');
    }
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    
    // Simulate API connection back-end
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onSubmitSuccess(`Arizangiz muvaffaqiyatli qabul qilindi! Tez orada administrator ${CONTACT_INFO.phone} raqamidan siz yoki ota-onangiz bilan bog'lanadi.`);
      
      // Clear form inputs
      setName('');
      setPhone('');
      setCourse('');
      setLevel('');
      setTime('');
      setMsg('');
      setTeacherChoice('');
      setErrors({});
      localStorage.removeItem('orient_form_draft');
      onClearInitials();

      // Reset success banner after 5 sec
      setTimeout(() => setSuccess(false), 6000);
    }, 1800);
  };

  return (
    <div className="rounded-3xl border border-brand-border bg-brand-bg-sec p-8 shadow-2xl relative">
      <div className="absolute right-6 top-6 animate-pulse text-amber-500/20">
        <Sparkles size={30} />
      </div>

      <h3 className="font-sans text-2xl font-extrabold text-white tracking-tight">
        Bepul dars va konsultatsiya
      </h3>
      <p className="text-xs text-brand-muted font-medium leading-relaxed mt-1.5 mb-6">
        Malakali darajani aniqlash diagnostika testi va birinchi dars mutlaqo bepul. Ariza yuborish munosabati bilan biz sizga 30 daqiqa ichida aloqaga chiqamiz.
      </p>

      {success && (
        <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-emerald-400">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-xs font-bold font-sans">Ariza muvaffaqiyatli jo'natildi!</p>
              <p className="text-[11px] leading-relaxed text-emerald-300/80 mt-1">
                Sizning ma'lumotlaringiz xavfsiz tarzda saqlandi. Mutaxassislarimiz tezkorlik bilan sizga aloqaga chiqishadi.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Full name and Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
              Ism va Familiya *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Masalan, Nodir Alimov"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl bg-brand-bg-sec/30 border p-3.5 text-sm font-medium text-white placeholder-teal-600/60 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-all ${
                  errors.name ? 'border-red-500/40 bg-red-500/[0.02]' : 'border-brand-border focus:border-brand-accent'
                }`}
              />
              {errors.name && (
                <div className="flex items-center gap-1 text-[10px] font-semibold text-red-400 mt-1">
                  <AlertCircle size={12} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
              Telefon raqami *
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+998 95 383-07-77"
                value={phone}
                onFocus={() => { if (!phone) setPhone('+998 '); }}
                onChange={handlePhoneChange}
                className={`w-full rounded-xl bg-brand-bg-sec/30 border p-3.5 text-sm font-medium text-white placeholder-teal-600/60 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-all ${
                  errors.phone ? 'border-red-500/40 bg-red-500/[0.02]' : 'border-brand-border focus:border-brand-accent'
                }`}
              />
              {errors.phone && (
                <div className="flex items-center gap-1 text-[10px] font-semibold text-red-400 mt-1">
                  <AlertCircle size={12} />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Selected Course and Chosen Teacher */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Course select */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
              Sizga kerakli Kurs *
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={`w-full rounded-xl bg-brand-bg border p-3.5 text-sm font-medium text-teal-100 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] transition-all cursor-pointer ${
                errors.course ? 'border-red-500/40 bg-red-500/[0.02]' : 'border-brand-border focus:border-brand-accent'
              }`}
            >
              <option value="" className="text-slate-800 bg-brand-bg">Kursni tanlang...</option>
              {COURSES.map((c) => (
                <option key={c.id} value={c.id} className="text-teal-100 bg-brand-bg">
                  {c.title} ({c.level}) — {c.price} so'm
                </option>
              ))}
            </select>
            {errors.course && (
              <div className="flex items-center gap-1 text-[10px] font-semibold text-red-400 mt-1">
                <AlertCircle size={12} />
                <span>{errors.course}</span>
              </div>
            )}
          </div>

          {/* Choice of Teacher */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
              Xohlagan o'qituvchingiz (Tanlov)
            </label>
            <select
              value={teacherChoice}
              onChange={(e) => setTeacherChoice(e.target.value)}
              className="w-full rounded-xl bg-brand-bg border border-brand-border p-3.5 text-sm font-medium text-teal-100 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] focus:border-brand-accent transition-all cursor-pointer"
            >
              <option value="" className="text-slate-800 bg-brand-bg">Istalgan bo'sh jamoa a'zosi</option>
              {TEACHERS.map((t) => (
                <option key={t.id} value={t.id} className="text-teal-100 bg-brand-bg">
                  {t.name} ({t.ieltsScore})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Current English level and Ideal studies timings */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Level select */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
              Hozirgi taxminiy darajangiz
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl bg-brand-bg border border-brand-border p-3.5 text-sm font-medium text-teal-100 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] focus:border-brand-accent transition-all cursor-pointer"
            >
              <option value="">Aniq bilmayman (test topshiraman)</option>
              <option value="A1">Boshlang'ich (Beginner / A1)</option>
              <option value="A2">Quyi O'rta (Pre-Intermediate / A2)</option>
              <option value="B1">O'rta (Intermediate / B1)</option>
              <option value="B2">Yuqori O'rta (Upper-Intermediate / B2)</option>
              <option value="C1">Ilg'or (Advanced / C1)</option>
            </select>
          </div>

          {/* Time select */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
              Dars o'tiladigan qulay vaqt oralig'i
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl bg-brand-bg border border-brand-border p-3.5 text-sm font-medium text-teal-100 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] focus:border-brand-accent transition-all cursor-pointer"
            >
              <option value="">Farqi yo'q (istalgan qulay vaqt)</option>
              <option value="morning">Ertalabki darslar (08:30 – 12:00)</option>
              <option value="afternoon">Tushdan keyingi guruhlar (13:00 – 17:00)</option>
              <option value="evening">Kechki maxsus guruhlar (17:30 – 21:00)</option>
            </select>
          </div>
        </div>

        {/* Comments textarea */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block">
            Maqsadingiz yoki savollaringiz (Ixtiyoriy)
          </label>
          <textarea
            placeholder="Masalan, 3 oy ichida IELTSdan 7.0 ball olish yoki CEFR tushuntirishlarini bilmoqchiman..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={3}
            className="w-full rounded-xl bg-brand-bg-sec/30 border border-brand-border p-3.5 text-sm font-medium text-white placeholder-teal-600/60 focus:outline-none focus:ring-1 focus:ring-[#38bdf8] focus:border-brand-accent transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-2xl bg-[#f7e02b] py-4 text-center font-sans text-sm font-extrabold tracking-wide text-[#020617] hover:bg-amber-400 active:scale-98 transition-all hover:shadow-[0_10px_30px_rgba(247,224,43,0.25)] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin text-black" size={18} />
              <span>Ma'lumotlar yuborilmoqda...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Ariza yuborish, Bepul darsga yozilish</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
