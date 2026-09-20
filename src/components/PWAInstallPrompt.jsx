import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Check, ShieldCheck, Share, Sparkles } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS] = useState(
    () => typeof window !== 'undefined' && /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
  );
  const [isInstalled] = useState(
    () => typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true)
  );

  useEffect(() => {
    if (isInstalled) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleCustomTrigger = () => {
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('trigger-pwa-install', handleCustomTrigger);

    // Auto-display prompt after 2 seconds if not explicitly dismissed today
    const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('trigger-pwa-install', handleCustomTrigger);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('trigger-pwa-install', handleCustomTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instructions if native prompt isn't directly triggerable
      alert('To install MA Pesticides:\n\n• On Mobile: Tap your browser menu (⋮ or Share) and select "Add to Home Screen".\n• On Desktop Chrome/Edge: Click the Install icon in the right side of the address bar.');
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div
      className="pwa-install-banner"
      style={{
        position: 'fixed',
        bottom: '84px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9995,
        width: 'calc(100% - 32px)',
        maxWidth: '520px',
        backgroundColor: 'var(--surface-paper)',
        borderRadius: '16px',
        boxShadow: '0 16px 40px rgba(23, 25, 28, 0.2), 0 4px 12px rgba(23, 25, 28, 0.1)',
        border: '1.5px solid var(--color-pine-green)',
        padding: '18px 20px',
        animation: 'pwaSlideUp 0.4s ease-out'
      }}
    >
      <style>{`
        @keyframes pwaSlideUp {
          from { opacity: 0; transform: translate(-50%, 24px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-pine-green)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(28,71,42,0.3)'
          }}
        >
          <Smartphone size={22} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <h4 style={{ fontFamily: 'var(--font-sohne)', fontSize: '16px', fontWeight: 600, color: 'var(--color-ink-black)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Install MA Pesticides App</span>
              <span className="badge-green" style={{ fontSize: '11px', padding: '2px 8px' }}>Offline Ready</span>
            </h4>
            <button
              onClick={handleDismiss}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-slate-gray)',
                padding: '4px',
                display: 'flex'
              }}
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--color-slate-gray)', margin: '0 0 14px', lineHeight: 1.45 }}>
            Install for instant offline access to SKUAST spray schedules, dosage calculator, and crop disease guide in your orchard.
          </p>

          {isIOS ? (
            <div style={{ fontSize: '12px', color: 'var(--color-pine-green)', backgroundColor: 'rgba(28,71,42,0.06)', padding: '10px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(28,71,42,0.15)' }}>
              <Share size={15} />
              <span>Tap <strong>Share</strong> in Safari & choose <strong>Add to Home Screen</strong></span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleInstallClick}
                className="pill-button-filled pill-button-sm"
                style={{ fontSize: '13px', padding: '8px 18px', backgroundColor: 'var(--color-pine-green)' }}
              >
                <Download size={14} />
                <span>Install Mobile App</span>
              </button>
              <button
                onClick={handleDismiss}
                className="pill-button-ghost pill-button-sm"
                style={{ fontSize: '13px', padding: '8px 14px' }}
              >
                Not Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
