import { useEffect, useState } from 'react';

export function useScrollState() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = totalHeight <= 0 ? 0 : (scrollY / totalHeight) * 100;
  const headerScrolled = scrollY > 50;
  const backToTopVisible = scrollY > 500;

  return { scrollY, scrollProgress, headerScrolled, backToTopVisible };
}
