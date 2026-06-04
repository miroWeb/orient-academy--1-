/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Maximize2, 
  ExternalLink,
  Info,
  Library,
  Coffee,
  Monitor,
  HeartHandshake,
  Film,
  Swords,
  MapPin,
  Flame,
  Volume
} from 'lucide-react';

interface VideoSource {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  src: string;
  isHls: boolean;
  poster: string;
}

export default function Atmosphere() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  
  const [activeTab, setActiveTab] = useState<'autumn' | 'battle' | 'yandex'>('autumn');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);

  // Fallbacks & video sources
  const posterUrl = 'https://avatars.mds.yandex.net/get-vh/16135000/2a0000019d59a09ef95a88862bf6c32766b0/1080x1920q15';
  const yandexGalleryUrl = 'https://yandex.uz/maps/org/orient_academy/68184074655/gallery/?photos[id]=vplvwfbwiojgd3w7nn6s';

  const videos: VideoSource[] = [
    {
      id: 'autumn',
      title: "🍂 Kuzgi Atmosfera (Cinematic)",
      badge: "Cinematic Film",
      icon: <Film size={16} className="text-brand-accent" />,
      description: "Orient Academy Chilonzor binosining kuzgi sehrli go'zalligi, toza shinam dars xonalari va oliy darajali muhiti.",
      src: 'https://assets.mixkit.co/videos/preview/mixkit-girl-reading-a-book-in-a-cozy-library-40540-large.mp4',
      isHls: false,
      poster: posterUrl
    },
    {
      id: 'battle',
      title: "⚔️ IELTS Word Battle",
      badge: "Quvnoq Bellashuv",
      icon: <Swords size={16} className="text-[#f7e02b]" />,
      description: "O'quvchilar o'rtasida darsdan tashqari so'z boyligini oshiruvchi jiddiy va quvnoq 'Word Chain' bellashuvi. G'olibga 1 oy bepul o'qish!",
      src: 'https://assets.mixkit.co/videos/preview/mixkit-joyful-students-cooperating-in-class-43016-large.mp4',
      isHls: false,
      poster: posterUrl
    },
    {
      id: 'yandex',
      title: "📍 Yandex Jonli Panorama",
      badge: "Live View",
      icon: <MapPin size={16} className="text-brand-accent" />,
      description: "Yandex Maps dagi premium dars xonalarining panoramik tizimi. Sifatli dars shaklini jonli his eting.",
      src: 'https://strm.yandex.ru/vod/vh-maps-social-ugc-unit-converted/vod-content/vplvwfbwiojgd3w7nn6s/a15db653-b653-4cc2-87d6-7406671bb13f/kaltura/desc_32a6c97140ee6d3639a36b0bdeda5d37/x/ysign1=193a3acccbfb437302b8ad7c3d9fd95de28444edeb916f8bd2c2dc1698b51c5c,abcID=1238,bstrat=strm,chID=vplc3e5cm3yjfdqx32ya,pfx,sfx,ts=6a215f85,video=vplvwfbwiojgd3w7nn6s/master.m3u8?packager=1&packman=1&vsid=d5c48dc101384c2e4f467cb879bf21187d743b323a93xWEBx4200x1780399236&vpuid=xjj3vmytkk&source_index=0',
      isHls: true,
      poster: posterUrl
    }
  ];

  const currentVideo = videos.find(v => v.id === activeTab) || videos[0];

  // Reload or re-evaluate stream when tab switches
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset states
    setIsPlaying(false);
    setShowIndicator(true);
    setVideoError(false);

    // Clean up older Hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (currentVideo.isHls) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Apple Safari
        video.src = currentVideo.src;
        video.load();
      } else if (Hls.isSupported()) {
        const hls = new Hls({
          maxMaxBufferLength: 8,
          enableWorker: true,
          lowLatencyMode: true
        });
        hlsRef.current = hls;
        hls.loadSource(currentVideo.src);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            console.warn('HLS.js stream failed. Falling back to Yandex embed gallery.');
            setVideoError(true);
          }
        });
      } else {
        setVideoError(true);
      }
    } else {
      // Local or standard direct static MP4
      video.src = currentVideo.src;
      video.load();
    }

    // Auto quiet starting
    video.muted = isMuted;

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [activeTab]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play()
        .then(() => {
          setIsPlaying(true);
          setShowIndicator(false);
        })
        .catch(() => {
          setVideoError(true);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <section id="atmosphere" className="py-24 max-w-7xl mx-auto px-6 z-10 relative">
      <div className="absolute left-1/3 top-0 -translate-x-1/2 -z-10 h-64 w-[600px] rounded-full bg-[radial-gradient(circle,rgba(56, 189, 248,0.06)_0%,transparent_70%)] animate-pulse" />

      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent flex items-center justify-center gap-1.5 matches">
          <Sparkles size={14} className="text-[#f7e02b]" />
          AKADEMIYAMIZ MUHITI & JONLI HAYOT
        </span>
        <h3 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Haqiqiy dars va <span className="text-[#f7e02b]">maxsus atmosfera</span>
        </h3>
        <p className="font-sans text-sm text-brand-muted font-medium leading-relaxed">
          Bizda o'quvchilar nafaqat professional IELTS bilimini oladilar, balki chinakam intellektual oilaning a'zosiga aylanadilar. Quyidagi video darslari va o'yinlarimizni tanlab tomosha qiling!
        </p>
      </div>

      {/* Main Container: Tab-Selector Top Bar + Side-by-side Video Player System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Panel (7 Columns): Tab Controllers & Premium Video Center */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl border border-brand-accent/20 bg-brand-bg-sec p-4.5 sm:p-6 shadow-2xl relative overflow-hidden group min-h-[520px]">
          
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#020617]/80 to-transparent pointer-events-none z-10" />

          {/* Premium Selector Headers inside Player Wrap */}
          <div className="flex flex-wrap gap-2.5 mb-5 z-20 relative">
            {videos.map(v => (
              <button
                key={v.id}
                onClick={() => setActiveTab(v.id as any)}
                className={`cursor-pointer px-4 py-2.5 rounded-xl font-sans text-xs font-extrabold transition-all flex items-center gap-2 border ${
                  activeTab === v.id 
                    ? 'bg-[#f7e02b] text-black border-[#f7e02b] shadow-[0_4px_12px_rgba(247,224,43,0.25)] scale-[1.02]' 
                    : 'bg-brand-card/60 text-[#c2eae6] border-brand-accent/15 hover:border-brand-accent/40 hover:bg-brand-card/40'
                }`}
              >
                {v.icon}
                <span>{v.title}</span>
              </button>
            ))}
          </div>

          {/* Video Playback Stage */}
          <div 
            onClick={handlePlayPause}
            className="relative flex-1 rounded-2xl overflow-hidden bg-[#030c0b] border border-brand-accent/10 flex items-center justify-center cursor-pointer min-h-[340px]"
          >
            {!videoError ? (
              <video
                key={currentVideo.id} // Forces fresh player load on tab change
                ref={videoRef}
                poster={currentVideo.poster}
                playsInline
                muted={isMuted}
                loop
                className="w-full h-full object-cover rounded-2xl filter brightness-95"
              />
            ) : (
              /* Fallback Beautiful UI for expired HLS or player errors */
              <div 
                className="absolute inset-0 bg-cover bg-center flex flex-col justify-end p-6"
                style={{ backgroundImage: `linear-gradient(to top, rgba(3,13,12,0.95) 20%, rgba(3,13,12,0.4) 60%), url(${posterUrl})` }}
              >
                <div className="space-y-4 mb-4">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 text-xs text-amber-400 font-bold font-sans w-fit">
                    <Info size={14} />
                    <span>{currentVideo.badge}</span>
                  </div>
                  <h4 className="font-display text-lg sm:text-2xl font-black text-white leading-tight">
                    {currentVideo.title}
                  </h4>
                  <p className="text-xs text-brand-text/90 max-w-md leading-relaxed m-0 font-medium">
                    {currentVideo.description}
                  </p>
                </div>
                
                <a
                  href={yandexGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-fit cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#f7e02b] px-6 py-3.5 font-sans text-xs font-black text-black hover:bg-amber-400 hover:shadow-lg transition-all"
                >
                  <span>Yandex Xaritasida to'liq ko'rish</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}

            {/* Custom Playback Overlay Indicator */}
            {!videoError && showIndicator && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px] transition-all">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
                  className="h-16 w-16 cursor-pointer flex items-center justify-center rounded-full bg-[#f7e02b] text-black shadow-[0_0_30px_rgba(247,224,43,0.5)] hover:scale-105 active:scale-95 transition-all animate-pulse"
                >
                  <Play size={24} fill="currentColor" className="ml-1" />
                </button>
              </div>
            )}

            {/* Bottom Controls Bar for player (Visible on hover inside player container) */}
            {!videoError && isPlaying && (
              <div className="absolute bottom-4 inset-x-4 bg-brand-bg-sec/90 backdrop-blur-md border border-brand-border-bright/40 rounded-xl px-4 py-2 bg-gradient-to-r from-[#0f172a] to-slate-800 flex items-center justify-between pointer-events-auto z-20 transition-all opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
                    className="text-brand-accent hover:text-white cursor-pointer"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                  </button>

                  <button 
                    onClick={toggleMute}
                    className="text-brand-accent hover:text-white cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span className="font-mono text-[10px] text-brand-muted uppercase tracking-widest font-extrabold">{currentVideo.badge} • Loop</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleFullscreen}
                    className="text-brand-accent hover:text-white cursor-pointer"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Description Text Info Section */}
          <div className="mt-4.5 p-3.5 bg-brand-card/20 border border-brand-accent/10 rounded-xl flex items-start gap-3">
            <Flame size={16} className="text-[#f7e02b] mt-0.5 shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-white font-sans">{currentVideo.badge}: {currentVideo.title}</span>
              <p className="text-xs text-brand-muted font-medium leading-relaxed m-0">{currentVideo.description}</p>
            </div>
          </div>

        </div>

        {/* Right Column: Key Study Environment Spotlights (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {[
            {
              icon: <Monitor size={20} className="text-brand-accent" />,
              title: "CD IELTS Mock Test Xonasi",
              desc: "Haqiqiy Computer-Delivered formatidagi sinov imtihonlari va maxsus quloqchinlar bilan ta'minlangan labaratoriya."
            },
            {
              icon: <Library size={20} className="text-[#f7e02b]" />,
              title: "Mustaqil Dars & Study Room",
              desc: "Sokin muhit, shirin bepul kofe/choy va darsdan so'ng support professional assistent ko'magi."
            },
            {
              icon: <Coffee size={20} className="text-brand-accent" />,
              title: "Serene Rest & Coffee Zone",
              desc: "Speaking muloqotlari, intellektual mini-games va charchoqni chiqarish uchun maxsus shinam dam olish joyi."
            },
            {
              icon: <HeartHandshake size={20} className="text-[#f7e02b]" />,
              title: "24/7 Shaxsiy Assistentlik Tizimi",
              desc: "Speaking ravonligini oshirish va uy vazifalarini kunlik nazorat qilish bo'yicha kuchli tizim."
            }
          ].map((facility, idx) => (
            <div 
              key={idx} 
              className="flex-1 rounded-2xl border border-[rgba(56, 189, 248,0.12)] bg-brand-bg-sec p-5.5 hover:border-sky-900/60 hover:shadow-lg transition-all flex items-start gap-4"
            >
              <div className="h-11 w-11 rounded-1.5xl bg-brand-card/60 border border-brand-border-bright flex items-center justify-center flex-shrink-0 shadow-inner">
                {facility.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-sans text-sm font-extrabold text-white tracking-tight">
                  {facility.title}
                </h4>
                <p className="text-xs text-brand-muted font-medium leading-relaxed">
                  {facility.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
