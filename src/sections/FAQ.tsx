import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Какое у вас караоке?',
    answer:
      'Более 50,000 студийных фонограмм. Из них 80% — оригинальные минусовки в качестве PRO (mp3 - WAV). Ежемесячное обновление репертуара. Более 10,000 специальных фонограмм в сопровождении оригинальных видеоклипов.',
  },
  {
    question: 'Есть ли у вас английские песни?',
    answer:
      'Да, в нашем репертуаре есть песни на английском, испанском, французском и других языках.',
  },
  {
    question: 'Можно ли подключить телефон?',
    answer:
      'Да, вы можете подключить свой телефон или другой источник звука через Bluetooth или AUX.',
  },
  {
    question: 'Сколько микрофонов в каждом зале?',
    answer: 'В каждом зале от 2 до 4 профессиональных беспроводных микрофонов.',
  },
  {
    question: 'Есть ли оплата картой?',
    answer: 'Да, мы принимаем оплату картами Visa, Mastercard, МИР.',
  },
  {
    question: 'Можно приносить с собой алкоголь и еду?',
    answer: 'Да, вы можете приносить с собой еду и напитки без пробкового сбора.',
  },
  {
    question: 'Как рассчитывается стоимость?',
    answer:
      'Стоимость рассчитывается за человека в час. Чем больше компания и дольше время — тем выгоднее!',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-title',
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
        '.faq-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.faq-sidebar',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-sidebar',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="relative py-20 md:py-28 bg-yz-black overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-yz-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="faq-title mb-12 md:mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-3">
            ВОПРОСЫ <span className="text-yz-orange">И ОТВЕТЫ</span>
          </h2>
          <p className="text-yz-gray text-sm md:text-base uppercase tracking-widest">
            МЫ ПОДГОТОВИЛИ ОТВЕТЫ НА ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="faq-list flex-1">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-trigger-${index}`;
              return (
                <div key={index} className="faq-item border-b border-yz-border/30 opacity-0">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                  >
                    <span
                      className={`text-base md:text-lg font-semibold pr-4 transition-colors duration-300 ${
                        isOpen ? 'text-yz-orange' : 'text-white group-hover:text-yz-orange'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-yz-orange' : 'text-yz-gray-dark'
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="text-yz-gray text-sm md:text-base leading-relaxed pb-6 pr-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-sidebar lg:w-[380px] flex-shrink-0 opacity-0">
            <div className="p-6 md:p-8 rounded-2xl bg-yz-card border border-yz-border/30">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                В нашем заведении Бельгийский ковролин. На входе выдают{' '}
                <span className="text-yz-orange">индивидуально запакованные тапочки</span>, в которые
                необходимо переобуться.
              </h3>

              <div className="mt-6 mb-6 rounded-xl overflow-hidden">
                <img
                  src={assetUrl('/images/slippers.jpg')}
                  alt="Индивидуально запакованные тапочки"
                  className="w-full h-auto object-cover"
                  width={380}
                  height={240}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full btn-gradient py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white"
              >
                ЗАБРОНИРОВАТЬ ЗАЛ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
