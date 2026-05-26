import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, MapPin, Users, Maximize } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { HALLS } from '@/data/halls';
import { assetUrl } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

export default function Halls() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.halls-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
      gsap.fromTo(
        '.halls-slider',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section ref={sectionRef} id="halls" className="relative py-20 md:py-28 bg-yz-black">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="halls-title mb-8 opacity-0">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-3">
            НАШИ <span className="text-yz-orange">ЗАЛЫ</span>
          </h2>
          <p className="text-yz-gray text-sm md:text-base uppercase tracking-widest">
            ОЗНАКОМЬТЕСЬ С АТМОСФЕРОЙ ПРАЗДНИКА
          </p>
        </div>

        <div className="halls-title flex flex-wrap gap-4 md:gap-8 mb-8 opacity-0">
          {HALLS.map((hall, index) => (
            <button
              key={hall.id}
              type="button"
              onClick={() => handleTabChange(index)}
              className={`text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 pb-2 border-b-2 ${
                activeTab === index
                  ? 'text-yz-orange border-yz-orange'
                  : 'text-yz-gray-dark border-transparent hover:text-white'
              }`}
            >
              {hall.name}
            </button>
          ))}
        </div>

        <div className="halls-slider relative opacity-0">
          <Swiper
            modules={[EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
            className="rounded-2xl overflow-hidden"
          >
            {HALLS.map((hall, slideIndex) => (
              <SwiperSlide key={hall.id}>
                <div className="relative h-[350px] md:h-[500px]">
                  <img
                    src={assetUrl(hall.image)}
                    alt={`${hall.name}, ${hall.area}, ${hall.capacity}`}
                    className="w-full h-full object-cover"
                    width={1200}
                    height={675}
                    decoding="async"
                    loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-4 h-4 text-yz-orange" aria-hidden />
                        <span className="text-sm font-bold">№ {hall.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <Maximize className="w-4 h-4 text-yz-orange" aria-hidden />
                        <span className="text-sm">{hall.area}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <Users className="w-4 h-4 text-yz-orange" aria-hidden />
                        <span className="text-sm">{hall.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="btn-outline px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white"
                    >
                      ЗАБРОНИРОВАТЬ
                    </button>
                  </div>

                  <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-yz-orange/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-xs font-bold uppercase">{hall.name}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Предыдущий зал"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-yz-orange hover:bg-yz-orange/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white" aria-hidden />
              </button>
              <span className="text-white text-sm font-medium">
                {activeTab + 1} <span className="text-yz-gray-dark">/ {HALLS.length}</span>
              </span>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Следующий зал"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-yz-orange hover:bg-yz-orange/10 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
