import { useEffect, useRef, type RefObject } from 'react';
import { X, MapPin, Phone, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { SITE } from '@/config/site';
import { assetUrl } from '@/lib/assets';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  menuTriggerRef?: RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

export default function MenuOverlay({ isOpen, onClose, menuTriggerRef }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevOpenRef = useRef(false);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.1,
          ease: 'power3.out',
        }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.visibility = 'hidden';
          }
        },
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 200);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;
    const root = overlayRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = getFocusableElements(root);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (prevOpenRef.current && !isOpen) {
      window.requestAnimationFrame(() => {
        menuTriggerRef?.current?.focus();
      });
    }
    prevOpenRef.current = isOpen;
  }, [isOpen, menuTriggerRef]);

  const scrollToSection = (id: string) => {
    onClose();
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Меню навигации"
      className="fixed inset-0 z-[100] opacity-0 invisible"
      style={{ visibility: 'hidden' }}
    >
      <div className="absolute inset-0 bg-yz-black/98 backdrop-blur-xl" aria-hidden />

      <div className="absolute inset-0" aria-hidden>
        <img
          src={assetUrl('/images/hero-girl.png')}
          alt=""
          className="absolute bottom-0 right-0 w-[50%] h-auto max-h-[80%] object-contain opacity-20"
          width={400}
          height={480}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/60" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col px-6 md:px-16 py-6"
      >
        <div className="flex items-center justify-between mb-12">
          <span className="font-display text-3xl tracking-wider text-yz-orange">
            {SITE.name}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="w-10 h-10 rounded-full bg-yz-orange flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X className="w-5 h-5 text-white" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center" aria-label="Разделы сайта">
          <div className="space-y-6 md:space-y-8 mb-12">
            {[
              { label: 'НАШИ ЗАЛЫ', id: 'halls' },
              { label: 'ПРЕИМУЩЕСТВА', id: 'advantages' },
              { label: 'КАК ЗАБРОНИРОВАТЬ', id: 'booking' },
              { label: 'ВОПРОСЫ И ОТВЕТЫ', id: 'faq' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white hover:text-yz-orange transition-colors duration-300 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-yz-gray">
              <MapPin className="w-5 h-5 text-yz-orange" aria-hidden />
              <span className="text-base">{SITE.metro}</span>
            </div>
            <a
              href={SITE.phone.href}
              className="flex items-center gap-3 text-yz-gray hover:text-yz-orange transition-colors"
            >
              <Phone className="w-5 h-5 text-yz-orange" aria-hidden />
              <span className="text-base">{SITE.phone.display}</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('halls')}
              className="btn-outline px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white"
            >
              НАШИ ЗАЛЫ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="btn-gradient px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white inline-flex items-center gap-2"
            >
              ЗАБРОНИРОВАТЬ
              <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
          </div>
        </nav>

        <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-6 border-t border-yz-border/20">
          {['Отдохнуть после работы', 'Хорошо провести время'].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-yz-gray text-sm">
              <Check className="w-4 h-4 text-yz-orange" aria-hidden />
              <span>{text}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <span className="bg-yz-purple px-3 py-1 rounded-full text-white text-xs font-bold">
              Можно шуметь
            </span>
            <span className="bg-yz-yellow px-3 py-1 rounded-full text-black text-xs font-bold">
              Круглосуточно
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
