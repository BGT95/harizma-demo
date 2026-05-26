import { useEffect, useRef, useState } from 'react';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { SITE } from '@/config/site';
import { assetUrl } from '@/lib/assets';

const HERO_PROMO_ITEMS = [
  {
    icon: '/images/promo-micro.svg',
    alt: 'Микрофон',
    lines: ['Профессиональное караоке', 'AST-50'],
  },
  {
    icon: '/images/promo-champagne.svg',
    alt: 'Шампанское',
    lines: ['Без пробкового сбора'],
  },
  {
    icon: '/images/promo-cash.svg',
    alt: 'Оплата',
    lines: ['Без депозита'],
  },
  {
    icon: '/images/promo-confetti.svg',
    alt: 'Праздник',
    lines: ['Скидка в День', 'Рождения'],
  },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', sync);
      return () => mq.removeEventListener('change', sync);
    }
    if (typeof mq.addListener === 'function') {
      mq.addListener(sync);
      return () => {
        if (typeof mq.removeListener === 'function') {
          mq.removeListener(sync);
        }
      };
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const saveData = 'connection' in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (mobile || saveData) return;

    const enable = () => setVideoEnabled(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = globalThis.setTimeout(enable, 1500);
    return () => globalThis.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          '.hero-title-line',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.5'
        )
        .fromTo(
          '.hero-location',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-check',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.hero-btn',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1 },
          '-=1'
        )
        .fromTo(
          '.hero-badge',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const showVideo = videoEnabled && !reduceMotion && !videoFailed;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pb-44 sm:pb-36 md:pb-28"
    >
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            poster={assetUrl('/images/hall-1.jpg')}
            onError={() => setVideoFailed(true)}
          >
            <source src={assetUrl('/videos/hero-bg.mp4')} type="video/mp4" />
          </video>
        ) : (
          <img
            src={assetUrl('/images/hall-1.jpg')}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="low"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          <div ref={textRef} className="w-full lg:w-[55%]">
            <p className="hero-subtitle text-yz-orange text-sm md:text-base font-bold uppercase tracking-widest mb-4 opacity-0">
              АРЕНДУЙ КАРАОКЕ-ЗАЛ ДО 10 ЧЕЛОВЕК
            </p>

            <h1 className="mb-6">
              <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wide text-yz-orange neon-text-orange opacity-0">
                ВОЗЬМИ АЛКОГОЛЬ
              </span>
              <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wide text-yz-orange neon-text-orange opacity-0">
                И ЕДУ С СОБОЙ
              </span>
            </h1>

            <div className="hero-location flex items-center gap-2 text-yz-gray mb-8 opacity-0">
              <MapPin className="w-4 h-4 text-yz-orange" aria-hidden />
              <span className="text-sm">{SITE.metro}</span>
            </div>

            <div className="space-y-3 mb-8">
              {[
                'Если хочешь петь и оторваться',
                'Отдохнуть после работы',
                'Хорошо провести время',
              ].map((text, i) => (
                <div key={i} className="hero-check flex items-center gap-3 opacity-0">
                  <div className="w-5 h-5 rounded-full bg-yz-orange/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-yz-orange" aria-hidden />
                  </div>
                  <span className="text-white/80 text-sm md:text-base">{text}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn btn-gradient px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white inline-flex items-center gap-2 opacity-0 animate-pulse-glow"
            >
              ЗАБРОНИРОВАТЬ ОНЛАЙН
              <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
          </div>

          <div ref={imageRef} className="w-full lg:w-[45%] relative flex justify-center lg:justify-end opacity-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-yz-orange/20 via-yz-purple/10 to-transparent blur-3xl scale-110" />

              <img
                src={assetUrl(SITE.lcpImagePath)}
                alt="Девушка с микрофоном в караоке-клубе harizma"
                className="relative z-10 w-full max-w-[450px] lg:max-w-[500px] h-auto object-contain drop-shadow-2xl"
                width={500}
                height={600}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />

              <div
                ref={badgeRef}
                className="hero-badge absolute top-[25%] left-0 lg:-left-4 z-20 bg-yz-purple px-4 py-2 rounded-2xl shadow-neon-purple opacity-0"
              >
                <span className="text-white text-xs font-bold">Можно шуметь</span>
              </div>

              <div className="hero-badge absolute top-[40%] left-[10%] lg:left-[5%] z-20 bg-yz-yellow px-4 py-2 rounded-2xl opacity-0">
                <span className="text-black text-xs font-bold">Круглосуточно</span>
              </div>

              <button
                type="button"
                onClick={() => document.getElementById('halls')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Перейти к залам"
                className="hero-badge absolute bottom-[15%] right-[5%] z-20 w-12 h-12 rounded-full btn-gradient flex items-center justify-center opacity-0 hover:scale-110 transition-transform"
              >
                <ArrowRight className="w-5 h-5 text-white" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-promo-bar absolute bottom-0 left-0 right-0 z-10">
        <div className="hero-promo-bar__inner max-w-7xl mx-auto px-4 sm:px-5 md:px-10">
          <div className="hero-promo-grid" role="list">
            {HERO_PROMO_ITEMS.map((item, i) => (
              <div
                key={item.icon}
                role="listitem"
                className="hero-promo-item animate-fade-in-up"
                style={{ animationDelay: `${0.8 + i * 0.1}s`, animationFillMode: 'both' }}
              >
                <img
                  src={assetUrl(item.icon)}
                  alt=""
                  className="hero-promo-icon"
                  width={55}
                  height={68}
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                />
                <p className="hero-promo-text">
                  {item.lines.map((line) => (
                    <span key={line} className="hero-promo-text-line">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
