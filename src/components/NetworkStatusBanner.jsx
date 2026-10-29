import { useState, useEffect, memo } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function NetworkStatusBanner() {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    let timer;

    const handleOffline = () => {
      setIsOffline(true);
      setShowRestored(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowRestored(true);
      timer = setTimeout(() => {
        setShowRestored(false);
      }, 3500);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!isOffline && !showRestored) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-live="polite"
        role="status"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: '64px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          maxWidth: '92vw',
          width: 'max-content',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          borderRadius: '9999px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.2px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundColor: isOffline
            ? 'rgba(30, 26, 18, 0.94)'
            : 'rgba(18, 40, 24, 0.94)',
          color: isOffline ? '#fef3c7' : '#dcfce7',
          border: isOffline
            ? '1px solid rgba(245, 158, 11, 0.45)'
            : '1px solid rgba(34, 197, 94, 0.45)'
        }}
      >
        {isOffline ? (
          <>
            <WifiOff size={15} color="#f59e0b" strokeWidth={2.4} />
            <span>Offline Mode Active — Spray guides & dosage formulas remain accessible.</span>
          </>
        ) : (
          <>
            <Wifi size={15} color="#22c55e" strokeWidth={2.4} />
            <span>Connection Restored — You are back online.</span>
          </>
        )}
      </motion.aside>
    </AnimatePresence>
  );
}

export default memo(NetworkStatusBanner);
