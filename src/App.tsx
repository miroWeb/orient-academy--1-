/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Send, 
  Users, 
  GraduationCap, 
  Star, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Navigation, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Clock, 
  CalendarDays, 
  ChevronDown, 
  Menu, 
  X, 
  Instagram, 
  Check, 
  ChevronRight,
  TrendingUp,
  FileText,
  Moon,
  Leaf
} from 'lucide-react';

import { 
  CONTACT_INFO, 
  COURSES, 
  TEACHERS, 
  SUPPORT_TEACHERS, 
  REVIEWS, 
  FAQS 
} from './data';
import { Course, Teacher, FAQ } from './types';

// Components
import TeacherCard from './components/TeacherCard';
import TeacherModal from './components/TeacherModal';
import CourseCard from './components/CourseCard';
import ContactForm from './components/ContactForm';
import MapEmbed from './components/MapEmbed';
import Atmosphere from './components/Atmosphere';
import OrientLogo from './components/OrientLogo';
import ResultsSlider from './components/ResultsSlider';
import { motion, AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function App() {
  const [introLoading, setIntroLoading] = useState(true);

  // Stop background scroll during preloader
  useEffect(() => {
    if (introLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introLoading]);

  // Navigation active links & mobile menu state
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theme State: 'emerald' (traditional high-fidelity green) or 'dark' (slate-blue)
  const [theme, setTheme] = useState<'emerald' | 'dark'>(() => {
    const saved = localStorage.getItem('orient-theme');
    if (saved === 'dark' || saved === 'emerald') return saved as 'dark' | 'emerald';
    return 'emerald';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('orient-theme', theme);
  }, [theme]);

  // Form Pre-fill handlers
  const [selectedCourseForForm, setSelectedCourseForForm] = useState<Course | null>(null);
  const [selectedTeacherForForm, setSelectedTeacherForForm] = useState<Teacher | null>(null);

  // Full Details popup modal handler (User clicking a teacher)
  const [selectedTeacherForDetails, setSelectedTeacherForDetails] = useState<Teacher | null>(null);

  // FAQ accordion open IDs
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Custom Toast notifications
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'info' }>({
    show: false,
    msg: '',
    type: 'success'
  });

  // Scroll detection to update header styling & active links
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracker
      const sections = ['home', 'why', 'courses', 'atmosphere', 'teachers', 'results', 'faq', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 6000);
  };

  const handleBookFromTeacher = (teacher: Teacher) => {
    setSelectedTeacherForForm(teacher);
    // Auto-select corresponding course if possible
    if (teacher.isSupport) {
      // support teachers assist with General english and speaking practice, we can auto select a default
      const defaultCourse = COURSES.find(c => c.id === 'pre-ielts');
      if (defaultCourse) setSelectedCourseForForm(defaultCourse);
    } else {
      const bestCourseMatch = COURSES.find(c => c.id === 'ielts') || COURSES[0];
      setSelectedCourseForForm(bestCourseMatch);
    }
    
    // Close teacher modal and scroll to contact form
    setSelectedTeacherForDetails(null);
    scrollToSection('contact');
    triggerToast(`Siz darsni ${teacher.name} guruhida band qilmoqchisiz! Ariza formasini to'ldiring.`);
  };

  const handleEnrollFromCourse = (course: Course) => {
    setSelectedCourseForForm(course);
    setSelectedTeacherForForm(null); // Clear teacher override to allow natural grid match
    
    scrollToSection('contact');
    triggerToast(`Siz ${course.title} darsini tanladingiz! Bepul sinov darsi uchun arizani to'ldiring.`);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {introLoading && (
          <Preloader key="preloader" onComplete={() => setIntroLoading(false)} theme={theme} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-brand-bg font-sans antialiased text-brand-text select-none">
      
      {/* BACKGROUND DECORATIONS (GLOW ORBS) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-orb-1 absolute -right-20 -top-20 h-[800px] w-[800px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, var(--glow-strong) 0%, transparent 70%)' }} />
        <div className="animate-orb-2 absolute -left-40 bottom-10 h-[600px] w-[600px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(247, 224, 43, 0.04) 0%, transparent 70%)' }} />
      </div>

      {/* HEADER SECTION */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-bg/85 backdrop-blur-md py-4 border-b border-brand-border shadow-[0_10px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <span 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-4 cursor-pointer group select-none"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-2xl bg-brand-card/80 border border-brand-border-bright shadow-[0_4px_20px_rgba(247,224,43,0.15)] group-hover:border-[#f7e02b]/50 group-hover:shadow-[0_8px_30px_rgba(247,224,43,0.3)] transition-all overflow-hidden p-2">
              <OrientLogo className="animate-spin-logo" size={80} />
            </div>
            <div className="leading-tight">
              <h1 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white mb-0.5">
                Orient<span className="text-[#f7e02b]">Academy</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-accent m-0 font-extrabold uppercase">IELTS & CEFR CENTER</p>
            </div>
          </span>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide">
            {[
              { id: 'why', label: 'Farqimiz' },
              { id: 'courses', label: 'Kurslar' },
              { id: 'atmosphere', label: 'Atmosfera' },
              { id: 'teachers', label: 'Ustozlar' },
              { id: 'results', label: 'Natijalar' },
              { id: 'faq', label: 'S&J (FAQ)' },
              { id: 'contact', label: 'Bog\'lanish' },
            ].map(link => (
              <span
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`cursor-pointer transition-colors hover:text-white ${
                  activeSection === link.id ? 'text-brand-accent font-bold' : 'text-brand-muted'
                }`}
              >
                {link.label}
              </span>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(prev => prev === 'emerald' ? 'dark' : 'emerald')}
              className="relative h-10 px-3.5 flex items-center justify-center gap-2 rounded-xl bg-brand-card/60 hover:bg-brand-card/90 border border-brand-border text-brand-accent transition-all cursor-pointer shadow-md select-none group"
              title="Mavzuni almashtirish"
            >
              {theme === 'emerald' ? (
                <>
                  <Moon size={15} className="text-amber-400" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Dark Mode</span>
                </>
              ) : (
                <>
                  <Leaf size={15} className="text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">Emerald Mode</span>
                </>
              )}
            </button>

            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-2 font-mono text-xs font-extrabold text-brand-accent hover:text-brand-accent transition-colors ml-2"
            >
              <Phone size={14} />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="cursor-pointer rounded-xl bg-[#f7e02b] px-4.5 py-2.5 font-sans text-xs font-extrabold text-[#020617] hover:bg-amber-400 hover:shadow-[0_4px_15px_rgba(247,224,43,0.25)] transition-all"
            >
              Bepul dars olish
            </button>
          </div>

          {/* Mobile responsive toggler */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setTheme(prev => prev === 'emerald' ? 'dark' : 'emerald')}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card/60 border border-brand-border-light text-brand-accent"
              title="Mavzuni almashtirish"
            >
              {theme === 'emerald' ? <Moon size={16} className="text-amber-400" /> : <Leaf size={16} className="text-emerald-400" />}
            </button>

            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`} 
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card/60 border border-brand-border-light text-brand-accent"
            >
              <Phone size={16} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card/60 border border-brand-border-light text-brand-accent"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-brand-bg/98 border-b border-brand-border/1.3 p-6 space-y-4 animate-fade-in z-50">
            <div className="flex flex-col gap-4 font-sans text-sm font-semibold text-brand-text text-center">
              {[
                { id: 'why', label: 'Nima uchun biz?' },
                { id: 'courses', label: 'Barcha Oliy Kurslarimiz' },
                { id: 'atmosphere', label: 'Akademiya Muhiti' },
                { id: 'teachers', label: 'Ekspert Ustozlar' },
                { id: 'results', label: 'Bitiruvchilar Natijalari' },
                { id: 'faq', label: 'Ko\'p beriladigan savollar' },
                { id: 'contact', label: 'Manzil & Bog\'lanish' },
              ].map(link => (
                <div
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`py-2 border-b border-brand-border cursor-pointer ${
                    activeSection === link.id ? 'text-[#f7e02b] font-bold' : 'text-brand-text'
                  }`}
                >
                  {link.label}
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full cursor-pointer rounded-xl bg-[#f7e02b] py-3.5 font-sans text-sm font-extrabold text-[#020617]"
            >
              🚀 Bepul sinov darsga yozilish
            </button>
          </div>
        )}
      </header>

      {/* TOAST NOTIFICATION CONTAINER */}
      <div className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3.5 rounded-3xl border border-brand-accent bg-brand-bg-sec/95 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-brand-card/60 text-brand-accent flex-shrink-0">
          <CheckCircle2 size={18} />
        </div>
        <p className="font-sans text-xs font-semibold leading-relaxed text-slate-100">
          {toast.msg}
        </p>
      </div>

      {/* HERO SECTION / LANDING */}
      <section id="home" className="relative min-h-screen pt-36 pb-20 px-6 flex flex-col justify-center max-w-7xl mx-auto z-10 overflow-hidden">
        
        {/* Dynamic decorative element */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/40 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-brand-accent w-fit mb-6">
          <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
          Toshkentdagi litsenziyalangan eng mashhur o'quv markazi
        </div>

        {/* Hero Headlines */}
        <div className="max-w-4xl space-y-6">
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white leading-[1.05]">
            IELTS-dan yuqori <br className="hidden sm:inline" />
            ballga qisqa vaqtda <span className="text-[#f7e02b] underline decoration-[#38bdf8] decoration-4 underline-offset-8">erishamiz!</span>
          </h2>
          <p className="font-sans text-brand-text text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            Cambridge akkreditatsiyasidan o'tgan, IELTS 8.5–9.0 professional o'qituvchilar va 3 ta professional assistent support ustozlar yordamida ishonchli natijaga erishing.
          </p>
        </div>

        {/* Interactive Actions CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto cursor-pointer rounded-2xl bg-[#f7e02b] px-8 py-4.5 font-sans text-sm font-extrabold tracking-wide text-black hover:bg-amber-400 active:scale-98 hover:shadow-[0_8px_30px_rgba(247,224,43,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>🚀 Bepul birinchi sinov darsi</span>
          </button>
          <button
            onClick={() => scrollToSection('courses')}
            className="w-full sm:w-auto cursor-pointer rounded-2xl border border-[rgba(56, 189, 248,0.3)] bg-brand-card/20 px-8 py-4.5 font-sans text-sm font-extrabold tracking-wide text-brand-accent hover:bg-[#38bdf8] hover:text-white hover:border-brand-accent transition-all flex items-center justify-center gap-2"
          >
            <span>O'quv kurslarini ko'rish</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Animated Key Statistics Blocks */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 border-t border-brand-border pt-10">
          {[
            { value: '1,500+', label: 'Successful Students', desc: '7.0 va undan yuqori olgan o\'quvchilar soni' },
            { value: '8.5', label: 'Average IELTS score', desc: 'Ustozlarimizning o\'rtacha IELTS imtihon ballari' },
            { value: '3 Ta', label: 'Yordamchi Support', desc: 'Har darsdan keyin individual yordamchilar' },
            { value: '10 Yillik', label: 'Metodik Tajriba', desc: 'Samaradorligi isbotlangan unikal tizim' }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1.5 p-3 rounded-2xl hover:bg-brand-card/10 transition-colors">
              <span className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
                {stat.value}
                <TrendingUp size={16} className="text-brand-accent" />
              </span>
              <p className="font-sans text-xs font-bold text-[#faf0cc] tracking-wide m-0">{stat.label}</p>
              <p className="text-[10px] text-brand-muted font-medium leading-relaxed m-0">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US SECTION? (FARQIMIZ) */}
      <section id="why" className="py-24 border-t border-brand-border max-w-7xl mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Header left */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">Nima uchun biz?</span>
            <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Boshqa o'quv <br />
              markazlaridan <br />
              <span className="text-[#f7e02b]">tubdan farq qilamiz!</span>
            </h3>
            <p className="font-sans text-sm text-brand-muted font-medium leading-relaxed">
              Biz shunchaki ingliz tilini o'rgatuvchi darslar o'tmaymiz. Bizda har bir guruhda 1 ta asosiy professional ustoz va darsdan tashqari siz bilan shug'ullanadigan 3 ta yordamchi support mutaxassisi bor.
            </p>
          </div>

          {/* Cards Right */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🎓', title: 'Top IELTS 8.5–9.0 Ustozlar', desc: 'Barcha darslarni IELTS darajasi tasdiqlangan, xalqaro metodik sertifikatlarga (TKT, CELTA) ega mutaxassislar olib borishadi.' },
              { icon: '👥', title: '3 ta yordamchi Support', desc: 'Dars tugaganidan so\'ng darsxonada sizga biriktirilgan Maftuna, Bekzod va Rayhona siz bilan individual speaking, uy vazifalari va grammatikani mutlaqo bepul tahlil qiladilar.' },
              { icon: '📈', title: 'Yozma Natija Kafolati', desc: 'Ikkala tomonlama rasmiy kafolat shartnomasi imzolanadi. Agar darslarga to\'liq qatnashib, maqsaddagi ballga yetolmasangiz, maqsadga yetguncha bepul qayta o\'qiysiz.' },
              { icon: '🖥️', title: 'Real CD Mock Imtihonlar', desc: 'Kompyuterlashtirilgan haqiqiy imtihon xonasida mock testlar topshirasiz, bu esa haqiqiy test oldidagi barcha hayajonlarni mutlaqo bartaraf etadi.' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-brand-border/60 bg-brand-bg-sec p-6 shadow-md hover:border-brand-border-bright transition-all flex flex-col gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h4 className="font-sans text-base font-bold text-white tracking-tight">{item.title}</h4>
                <p className="text-xs text-brand-muted font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES CATALOGUE */}
      <section id="courses" className="py-24 bg-brand-bg-sec/[0.01] border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          
          {/* Section title header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">O'QUV DASTURLARIMIZ</span>
            <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ingliz tili va IELTS guruhlari
            </h3>
            <p className="font-sans text-sm text-brand-muted font-medium leading-relaxed">
              O'spirinlar va kattalar uchun maxsus ishlab chiqilgan, unikal dars soatlariga ega barcha o'quv dasturlarimiz bilan batafsil tanishing.
            </p>
          </div>

          {/* Grid list of courses */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5"
          >
            {COURSES.map(course => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard 
                  course={course} 
                  onEnroll={handleEnrollFromCourse} 
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* INTERACTIVE ATMOSPHERE & VIDEO SECTION */}
      <Atmosphere />

      {/* EXPERT TEACHERS SECTION */}
      <section id="teachers" className="py-24 max-w-7xl mx-auto px-6 z-10 relative">
        
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">MUTAXASSISLAR JAMOOASI</span>
            <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white block">
              Professional <br className="hidden sm:inline" />
              <span className="text-[#f7e02b]">ustozlarimiz</span> tarkibi
            </h3>
            <p className="font-sans text-sm text-brand-muted font-medium max-w-xl">
              Natijalari xalqaro darajada tasdiqlangan va yillik malakaga ega bo'lgan o'qituvchilarimiz sizga to'g'ri strategiya bilan ta'lim beradilar.
            </p>
          </div>
          <div className="font-mono text-center md:text-right border-l md:border-l-0 md:border-r border-brand-accent/20 pl-4 md:pr-4 py-1">
            <p className="text-base font-extrabold text-[#faf2cc]">IELTS 8.0 - 9.0</p>
            <p className="text-[10px] uppercase font-bold text-brand-accent">Bizga rish ko'rsatkichi</p>
          </div>
        </div>

        {/* 1. Main Professional Teachers row */}
        <div className="space-y-4">
          <h4 className="font-display text-lg font-extrabold tracking-tight text-brand-accent flex items-center gap-2">
            <Award className="text-amber-400" size={18} />
            Asosiy IELTS & General English O'qituvchilari
          </h4>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TEACHERS.map(teacher => (
              <motion.div key={teacher.id} variants={itemVariants}>
                <TeacherCard 
                  teacher={teacher} 
                  onClick={(t) => setSelectedTeacherForDetails(t)} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 2. visual separation line */}
        <div className="my-16 h-px bg-[linear-gradient(90deg,transparent,rgba(56, 189, 248,0.2),transparent)]" />

        {/* 3. Support Teachers list */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-display text-lg font-extrabold tracking-tight text-[#f7e02b] flex items-center gap-2">
                <Compass className="text-[#f7e02b]" size={18} />
                Yordamchi Support Ustozlar Jamoasi
              </h4>
              <p className="text-xs text-brand-muted font-medium leading-relaxed mt-0.5 max-w-2xl">
                O'quvchilar guruhida har dars davomida individual lug'at so'rash, speaking chat, uy vazifasini mustaqil tahlil qilish va qo'shimcha grammar yordam ko'rsatish uchun mas'ul bo'lgan mutaxassislar.
              </p>
            </div>
            
            <span className="font-mono text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider block w-fit">
              Har bir darsdan so'ng bepul yordam
            </span>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3"
          >
            {SUPPORT_TEACHERS.map(teacher => (
              <motion.div key={teacher.id} variants={itemVariants}>
                <TeacherCard 
                  teacher={teacher} 
                  onClick={(t) => setSelectedTeacherForDetails(t)} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* STUDENT SUCCESS REVIEWS / RESULTS */}
      <section id="results" className="py-24 bg-brand-bg-sec/[0.01] border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">O'QUVCHILAR NATIJALARI</span>
            <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
              Tarixiy yuqori <span className="text-[#f7e02b]">IELTS rasm/ballari</span>
            </h3>
            <p className="font-sans text-sm text-brand-muted font-medium leading-relaxed">
              Shunchaki va'da bermaymiz! Haqiqiy bitiruvchilarning real olgan yuqori ballari va rasmiy IELTS sertifikatlari bilan yaqindan tanishing.
            </p>
          </div>

          {/* New 2-Column Split Stage: Slide Certificates Left, Text Testimonials Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Hand: High fidelity Interactive Swipeable Certificates Slider */}
            <div className="lg:col-span-6 w-full">
              <div className="p-1 rounded-3xl bg-gradient-to-br from-[#38bdf8]/10 via-transparent to-transparent">
                <ResultsSlider />
              </div>
            </div>

            {/* Right Hand: Structured Student Testimonials Deck */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <h4 className="font-display text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f7e02b]" />
                O'quvchilarimiz fikrlari va yutuqlari
              </h4>

              {REVIEWS.map(review => (
                <div 
                  key={review.id} 
                  className="rounded-3xl border border-[rgba(56, 189, 248,0.12)] bg-brand-bg-sec p-6.5 shadow-sm relative flex flex-col justify-between hover:border-sky-900/50 transition-all"
                >
                  <div>
                    {/* Score badge indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-brand-accent bg-brand-card/40 border border-brand-border-light px-3 py-1 rounded-lg">
                        O'sish: {review.fromScore} → {review.toScore}
                      </span>
                      <span className="text-[#f7e02b] text-xs">★★★★★</span>
                    </div>

                    {/* Body testimonial text */}
                    <p className="text-xs sm:text-sm leading-relaxed text-brand-text italic font-medium m-0">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Author Block */}
                  <div className="mt-5 flex items-center gap-3.5 border-t border-brand-border/60 pt-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card text-brand-accent border border-brand-border-light font-display font-extrabold text-xs shadow-md shrink-0">
                      {review.avatarInitials}
                    </div>
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-extrabold text-white">{review.author}</h4>
                      <p className="text-[10px] text-brand-muted font-bold mt-0.5 leading-relaxed">
                        {review.year} • {review.destination}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Quick legal notice for quality stamp */}
          <div className="mt-14 text-center text-xs text-brand-muted font-medium max-w-lg mx-auto leading-relaxed border border-slate-800/80 bg-brand-card/10 rounded-2xl p-4">
            🎓 Barcha IELTS va daraja sertifikatlari haqiqiydir va ofisimizda osib qo'yilgan. Istalgan vaqtda markazimizga kelib shaxsan tekshirishingiz mumkin.
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6 z-10 relative">
        
        {/* Title header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">KO'P BERILADIGAN SAVOLLAR</span>
          <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Savol-Javoblar (FAQ)
          </h3>
          <p className="font-sans text-sm text-brand-muted font-medium leading-relaxed max-w-lg mx-auto">
            Kursga yozilishdan oldin o'zingizni to'liq qiziqtirgan barcha asosiy texnik savollarga tushunarli sodda javoblarni oling.
          </p>
        </div>

        {/* Dynamic Interactive Accordion */}
        <div className="space-y-4">
          {FAQS.map(faq => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-brand-accent bg-brand-bg-sec' 
                    : 'border-[rgba(56, 189, 248,0.12)] bg-brand-bg-sec hover:border-brand-border-bright'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none"
                >
                  <span className="font-sans text-sm sm:text-base font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`h-8 w-8 flex items-center justify-center rounded-full border border-sky-900/30 text-brand-accent bg-brand-card/20 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#f7e02b] border-[#f7e02b]/40' : ''
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Animated expand body */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-brand-border-light pt-4 animate-slide-down">
                    <p className="text-xs sm:text-sm leading-relaxed text-brand-text/80 font-medium whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* CORE CONTACT / REGISTRATION / MAP AREA */}
      <section id="contact" className="py-24 border-t border-[rgba(56, 189, 248,0.12)] bg-brand-bg-sec/[0.01]">
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          
          {/* Main Layout Split wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side Address + Coordinates + Support handle */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">RO'YXATDAN O'TISH</span>
                <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight block">
                  Kelajagingiz uchun <br className="hidden sm:inline" />
                  <span className="text-[#f7e02b]">ilk qadamni</span> qo'ying!
                </h3>
                <p className="font-sans text-sm text-brand-muted font-medium leading-relaxed">
                  Har qanday savolingiz bo'lsa yoki qaysi kurs to'g'ri kelishiga tushuna olmayotgan bo'lsangiz, formani to'ldiring. Biz sizga bog'lanib, bepul maslahat beramiz.
                </p>
              </div>

              {/* Icon Links card */}
              <div className="space-y-4 rounded-3xl border border-brand-border/60 bg-brand-bg-sec p-6 shadow-sm">
                
                {/* 1. Phone */}
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card text-brand-accent border border-brand-border-bright flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Aloqa telefoni</p>
                    <a 
                      href={`tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`} 
                      className="font-mono text-base font-bold text-white hover:text-brand-accent"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* 2. Telegram Support */}
                <div className="flex items-start gap-4 border-t border-brand-border-light pt-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card text-brand-accent border border-brand-border-bright flex-shrink-0">
                    <Send size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Telegram Support (24/7)</p>
                    <a 
                      href={`https://t.me/${CONTACT_INFO.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-base font-bold text-brand-accent hover:text-white block"
                    >
                      {CONTACT_INFO.telegram}
                    </a>
                  </div>
                </div>

                {/* 3. Instagram page */}
                <div className="flex items-start gap-4 border-t border-brand-border-light pt-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card text-brand-accent border border-brand-border-bright flex-shrink-0">
                    <Instagram size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Instagram kanali</p>
                    <a 
                      href={CONTACT_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-base font-bold text-white hover:text-amber-400 block"
                    >
                      {CONTACT_INFO.instagram}
                    </a>
                  </div>
                </div>

                {/* 4. Real Address */}
                <div className="flex items-start gap-4 border-t border-brand-border-light pt-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-card text-brand-accent border border-brand-border-bright flex-shrink-0 font-display font-black text-xs text-center">
                    📍
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Mo'ljal va manzilimiz</p>
                    <span className="font-sans text-xs text-brand-text/90 font-medium leading-relaxed block mt-0.5">
                      {CONTACT_INFO.address}
                    </span>
                  </div>
                </div>

              </div>

              {/* Map embedded */}
              <MapEmbed />

            </div>

            {/* Right side contact form with status override callbacks */}
            <div className="lg:col-span-7">
              <ContactForm 
                initialCourse={selectedCourseForForm}
                initialTeacher={selectedTeacherForForm}
                onClearInitials={() => {
                  setSelectedCourseForForm(null);
                  setSelectedTeacherForForm(null);
                }}
                onSubmitSuccess={(msg) => triggerToast(msg, 'success')}
              />
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER AREA */}
      <footer className="bg-brand-bg border-t border-brand-border py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo brand */}
          <span 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-2xl bg-brand-card/80 border border-brand-border-bright shadow-[0_4px_20px_rgba(247,224,43,0.15)] group-hover:border-[#f7e02b]/50 transition-all overflow-hidden p-2">
              <OrientLogo className="animate-spin-logo" size={80} />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white mb-0.5">
                Orient<span className="text-[#f7e02b]">Academy</span>
              </h1>
              <p className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-accent m-0 font-extrabold uppercase">LICENSED ACADEMY</p>
            </div>
          </span>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-muted font-semibold">
            <span onClick={() => scrollToSection('why')} className="cursor-pointer hover:text-white">Farqlarimiz</span>
            <span onClick={() => scrollToSection('courses')} className="cursor-pointer hover:text-white">Darsliklar</span>
            <span onClick={() => scrollToSection('atmosphere')} className="cursor-pointer hover:text-white">Atmosfera</span>
            <span onClick={() => scrollToSection('teachers')} className="cursor-pointer hover:text-white">Jamoamiz</span>
            <span onClick={() => scrollToSection('results')} className="cursor-pointer hover:text-white">Natijalar</span>
            <span onClick={() => scrollToSection('faq')} className="cursor-pointer hover:text-white">FAQ</span>
            <a href={CONTACT_INFO.yandexMapUrl} target="_blank" rel="noreferrer" className="hover:text-brand-accent">Yandex Maps</a>
          </div>

          {/* Copyrights */}
          <div className="text-center md:text-right text-[11px] text-brand-muted font-medium leading-relaxed">
            <p className="m-0">© 2026 Orient Academy. Barcha huquqlar himoyalangan.</p>
            <p className="m-0 text-slate-700 mt-0.5">Xizmatlar litsenziyalangan. Toshkent shahri.</p>
          </div>

        </div>
      </footer>

      {/* EXTRAS: GLOBAL TEACHER SPECIFICS popup modal */}
      <TeacherModal 
        teacher={selectedTeacherForDetails}
        onClose={() => setSelectedTeacherForDetails(null)}
        onBook={handleBookFromTeacher}
      />

      </div>
    </>
  );
}
