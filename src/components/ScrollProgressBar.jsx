import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    let cachedTotal = 0;

    const measureTotal = () => {
      cachedTotal = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const updateProgress = () => {
      if (barRef.current) {
        if (cachedTotal <= 0) measureTotal();
        const ratio = cachedTotal > 0 ? Math.min(1, Math.max(0, window.scrollY / cachedTotal)) : 0;
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    const handleResize = () => {
      measureTotal();
      handleScroll();
    };

    measureTotal();
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar no-print"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: 'var(--color-pine-green, #1c472a)',
        zIndex: 99999,
        transformOrigin: '0 50%',
        transform: 'scaleX(0)',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    />
  );
}
