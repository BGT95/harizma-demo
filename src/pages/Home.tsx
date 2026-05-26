import { lazy, Suspense, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuOverlay from '../components/MenuOverlay';
import Hero from '../sections/Hero';
import SectionFallback from '../components/SectionFallback';
import { useScrollState } from '../hooks/useScrollState';

const Halls = lazy(() => import('../sections/Halls'));
const Advantages = lazy(() => import('../sections/Advantages'));
const BookingSteps = lazy(() => import('../sections/BookingSteps'));
const FAQ = lazy(() => import('../sections/FAQ'));

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const { scrollProgress, headerScrolled, backToTopVisible } = useScrollState();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-yz-black text-white">
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-yz-border/20">
        <div
          className="h-full bg-gradient-to-r from-yz-orange to-yz-pink transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header
        onMenuOpen={() => setMenuOpen(true)}
        scrolled={headerScrolled}
        menuButtonRef={menuBtnRef}
      />

      <MenuOverlay isOpen={menuOpen} onClose={closeMenu} menuTriggerRef={menuBtnRef} />

      <main>
        <Hero />
        <Suspense fallback={<SectionFallback minHeight="28rem" />}>
          <Halls />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="24rem" />}>
          <Advantages />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="20rem" />}>
          <BookingSteps />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight="20rem" />}>
          <FAQ />
        </Suspense>
      </main>

      <Footer />

      <BackToTop visible={backToTopVisible} />
    </div>
  );
}

function BackToTop({ visible }: { visible: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Наверх"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full btn-gradient flex items-center justify-center shadow-neon transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
