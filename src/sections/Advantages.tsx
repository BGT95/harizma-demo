import { useEffect, useRef } from 'react';
import { Shirt, Music, DoorOpen, Wallet, MapPin, Wine } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/config/site';
import { assetUrl } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: Shirt,
    title: 'Никакого дресс-кода',
    description: 'Приходи в чём удобно. Мы ценим твой комфорт и свободу самовыражения.',
    color: 'yz-orange' as const,
  },
  {
    icon: Music,
    title: 'Более 50 000 песен в сет-листе',
    description: 'Более 50 000 студийных фонограмм. Ежемесячное обновление репертуара.',
    color: 'yz-purple' as const,
  },
  {
    icon: DoorOpen,
    title: 'Индивидуальные залы',
    description: 'Только Ваша компания. Полная приватность и уединённая атмосфера.',
    color: 'yz-orange' as const,
  },
  {
    icon: Wallet,
    title: 'Без депозита',
    description: 'Мы не берём депозит. Оплата происходит за человека в час. Честно и прозрачно.',
    color: 'yz-purple' as const,
  },
  {
    icon: MapPin,
    title: 'В самом центре Москвы',
    description: `${SITE.metro}. Удобное расположение в сердце столицы.`,
    color: 'yz-orange' as const,
  },
  {
    icon: Wine,
    title: 'Нет пробкового сбора',
    description: 'Можно приносить с собой еду, напитки и алкоголь без пробкового сбора.',
    color: 'yz-purple' as const,
  },
];

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.adv-title',
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
        '.adv-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.adv-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="advantages"
      className="relative py-20 md:py-28 bg-yz-dark grid-pattern overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yz-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="adv-title mb-12 md:mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-3">
            НАШИ <span className="text-yz-orange">ПРЕИМУЩЕСТВА</span>
          </h2>
          <p className="text-yz-gray text-sm md:text-base uppercase tracking-widest">
            ПОЧЕМУ ГОСТИ ВЫБИРАЮТ НАС
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="adv-grid flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              const iconWrapClass =
                adv.color === 'yz-orange'
                  ? 'w-12 h-12 rounded-xl bg-yz-orange/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'
                  : 'w-12 h-12 rounded-xl bg-yz-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300';
              const iconClass =
                adv.color === 'yz-orange' ? 'w-6 h-6 text-yz-orange' : 'w-6 h-6 text-yz-purple';
              return (
                <div
                  key={index}
                  className="adv-card group relative p-6 md:p-8 rounded-2xl bg-yz-card/50 border border-yz-border/30 hover:border-yz-orange/50 transition-all duration-500 hover:-translate-y-1 opacity-0"
                >
                  <div className={iconWrapClass}>
                    <Icon className={iconClass} />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-yz-orange transition-colors">
                    {adv.title}
                  </h3>

                  <p className="text-yz-gray text-sm leading-relaxed">{adv.description}</p>

                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow:
                        adv.color === 'yz-orange'
                          ? '0 0 30px rgba(255, 107, 43, 0.1)'
                          : '0 0 30px rgba(212, 165, 255, 0.1)',
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:w-[300px] xl:w-[350px] flex-col items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-yz-orange/10 to-yz-purple/10 rounded-3xl blur-2xl" />
              <img
                src={assetUrl('/images/hero-girl.png')}
                alt=""
                className="relative w-full h-auto max-h-[500px] object-contain opacity-80"
                width={350}
                height={500}
                loading="lazy"
                decoding="async"
              />
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 btn-gradient px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white"
            >
              ЗАБРОНИРОВАТЬ ЗАЛ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
