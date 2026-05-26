import type { RefObject } from 'react';
import { MapPin, Phone, Menu } from 'lucide-react';
import { SITE } from '@/config/site';

interface HeaderProps {
  onMenuOpen: () => void;
  scrolled: boolean;
  menuButtonRef?: RefObject<HTMLButtonElement | null>;
}

export default function Header({ onMenuOpen, scrolled, menuButtonRef }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center"
          >
            <span className="font-display text-2xl md:text-3xl tracking-wider text-yz-orange">
              {SITE.name}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2 text-yz-gray text-sm">
              <MapPin className="w-4 h-4 text-yz-orange" aria-hidden />
              <span>{SITE.metro}</span>
            </div>
            <a
              href={SITE.phone.href}
              className="flex items-center gap-2 text-yz-gray text-sm hover:text-yz-orange transition-colors"
            >
              <Phone className="w-4 h-4 text-yz-orange" aria-hidden />
              <span>{SITE.phone.display}</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('halls')}
              className="btn-outline px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white"
            >
              НАШИ ЗАЛЫ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="btn-gradient px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white"
            >
              ЗАБРОНИРОВАТЬ
            </button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={onMenuOpen}
            aria-label="Открыть меню навигации"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:border-yz-orange transition-colors"
          >
            <Menu className="w-5 h-5 text-white" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
