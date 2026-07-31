import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (barRef.current) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
        barRef.current.style.width = `${progress}%`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ width: '0%' }} />;
}
