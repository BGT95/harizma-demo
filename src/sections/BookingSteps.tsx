import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Users, Clock, Calendar, Timer } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '@/config/site';
import DemoNoticeDialog from '@/components/DemoNoticeDialog';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: 1,
    icon: MessageCircle,
    title: 'Перейти в чат-бот',
    description: SITE.bookingStep1Description,
    color: 'yz-orange',
  },
  {
    number: 2,
    icon: Users,
    title: 'Выбрать количество человек',
    description: 'Укажите, сколько гостей будет в вашей компании',
    color: 'yz-purple',
  },
  {
    number: 3,
    icon: Clock,
    title: 'Выбрать длительность',
    description: 'Выберите, сколько часов вы планируете провести у нас',
    color: 'yz-orange',
  },
  {
    number: 4,
    icon: Calendar,
    title: 'Выбрать дату',
    description: 'Укажите удобную для вас дату посещения',
    color: 'yz-purple',
  },
  {
    number: 5,
    icon: Timer,
    title: 'Выбрать время',
    description: 'Выберите время начала вашей брони',
    color: 'yz-orange',
  },
];

export default function BookingSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-title',
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
        '.step-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.steps-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <section ref={sectionRef} id="booking" className="relative py-20 md:py-28 bg-yz-black overflow-hidden">
      <DemoNoticeDialog open={demoOpen} onOpenChange={setDemoOpen} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yz-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yz-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="booking-title mb-12 md:mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-3">
            КАК <span className="text-yz-orange">ЗАБРОНИРОВАТЬ</span> ЗАЛ?
          </h2>
          <p className="text-yz-gray text-sm md:text-base uppercase tracking-widest">
            БРОНИРОВАНИЕ ПО ШАГАМ В ЧАТ-БОТЕ
          </p>
        </div>

        <div className="steps-grid hidden md:grid grid-cols-5 gap-4 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            return (
              <div
                key={step.number}
                className={`step-card relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer opacity-0 ${
                  isActive
                    ? 'bg-yz-card border-yz-orange/50 shadow-neon'
                    : 'bg-yz-card/30 border-yz-border/20 hover:border-yz-border/50'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold text-sm ${
                    isActive ? 'bg-yz-orange text-white' : 'bg-yz-border/30 text-yz-gray'
                  }`}
                >
                  {step.number}
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    isActive ? 'bg-yz-orange/20' : 'bg-yz-border/20'
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${isActive ? 'text-yz-orange' : 'text-yz-gray-dark'}`}
                  />
                </div>

                <h3 className={`text-base font-bold mb-2 ${isActive ? 'text-white' : 'text-yz-gray'}`}>
                  {step.title}
                </h3>

                <p className="text-yz-gray-dark text-sm leading-relaxed">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute top-10 -right-3 lg:-right-4 w-6 lg:w-8 h-[2px] bg-yz-border/30 hidden xl:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <div className="step-card relative p-6 rounded-2xl bg-yz-card border border-yz-orange/50 shadow-neon opacity-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-yz-orange text-white flex items-center justify-center font-bold text-sm">
                {steps[currentStep].number}
              </div>
              <div className="w-14 h-14 rounded-xl bg-yz-orange/20 flex items-center justify-center">
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return <Icon className="w-7 h-7 text-yz-orange" />;
                })()}
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{steps[currentStep].title}</h3>
            <p className="text-yz-gray text-sm leading-relaxed">{steps[currentStep].description}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              aria-label="Предыдущий шаг"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center disabled:opacity-30 hover:border-yz-orange transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" aria-hidden />
            </button>
            <span className="text-white text-sm font-medium">
              {currentStep + 1} <span className="text-yz-gray-dark">/ {steps.length}</span>
            </span>
            <button
              type="button"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              aria-label="Следующий шаг"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center disabled:opacity-30 hover:border-yz-orange transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white animate-pulse-glow"
          >
            <MessageCircle className="w-5 h-5" aria-hidden />
            ОТКРЫТЬ ЧАТ-БОТ
          </button>
        </div>
      </div>
    </section>
  );
}
