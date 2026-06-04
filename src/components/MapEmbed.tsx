/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function MapEmbed() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-bg-sec p-6 shadow-xl">
      {/* Map Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h4 className="font-sans text-sm font-bold text-white flex items-center gap-1.5">
            <MapPin size={16} className="text-brand-accent" />
            Orient Academy Manzili
          </h4>
          <p className="text-xs text-brand-muted font-medium leading-relaxed mt-0.5">
            Toshkent sh., Chilonzor tumani, Novza metro bekati yaqinida
          </p>
        </div>
        
        {/* Yandex External Link */}
        <a 
          href={CONTACT_INFO.yandexMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-card/50 border border-brand-border-light px-3.5 py-2 font-sans text-xs font-bold text-brand-accent hover:bg-[#38bdf8] hover:text-white transition-all"
        >
          <Navigation size={13} />
          Xaritada ochish
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Embedded Map Container */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-brand-border/60 bg-[#030c0b]">
        <iframe
          src={`https://yandex.ru/map-widget/v1/?ll=${CONTACT_INFO.coordinates.lng}%2C${CONTACT_INFO.coordinates.lat}&z=16&pt=${CONTACT_INFO.coordinates.lng}%2C${CONTACT_INFO.coordinates.lat},pm2rdm`}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%) grayscale(10%) brightness(95%)' }}
          allowFullScreen={true}
          title="Orient Academy Yandex Map"
          loading="lazy"
        />
        
        {/* Floating Coordinates Tag */}
        <div className="absolute bottom-4 left-4 rounded-lg bg-[rgba(3,13,12,0.92)] backdrop-blur-sm border border-brand-accent/20 px-3 py-1.5 font-mono text-[10px] font-bold text-brand-accent pointer-events-none">
          📍 Coordinates: {CONTACT_INFO.coordinates.lat}, {CONTACT_INFO.coordinates.lng}
        </div>
      </div>

      {/* Transport directions advice */}
      <div className="mt-4 rounded-xl bg-[#030c0b]/40 p-4 border border-brand-border-light text-xs text-brand-muted leading-relaxed">
        <strong>Mo'ljal:</strong> Lutfiy ko'chasida, Novza metrosidan 5 daqiqalik piyoda yo'l. Avtoturargoh mavjud. Bizga qo'ng'iroq qilsangiz, administratorlarimiz yo'naltirib berishadi. Telegram: <strong className="text-brand-accent font-mono">{CONTACT_INFO.telegram}</strong>
      </div>
    </div>
  );
}
