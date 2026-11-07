import { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import FloatingCartButton from './components/FloatingCartButton';
import BottomNav from './components/BottomNav';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatusBanner from './components/NetworkStatusBanner';
import { trackPageView } from './utils/analytics';
import {
  About,
  Products,
  DiseaseGuide,
  SprayCalendar,
  VideoGallery,
  DosageCalculatorPage,
  Contact,
  Search,
  PrivacyPolicy,
  PoisonControl,
  NotFound,
  preloadAllRoutes
} from './utils/routePreloader';

const AdvisorChatbot = lazy(() => import('./components/AdvisorChatbot'));
const PWAInstallPrompt = lazy(() => import('./components/PWAInstallPrompt'));
const SprayOrderDrawer = lazy(() => import('./components/SprayOrderDrawer'));
const AgriSafetyModal = lazy(() => import('./components/AgriSafetyModal'));

function RouteFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      flexDirection: 'column',
      gap: '1rem',
      color: 'var(--primary-color)'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--secondary-color)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
        Loading Kashmir Crop Guide...
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/disease-guide" element={<DiseaseGuide />} />
            <Route path="/dosage-calculator" element={<DosageCalculatorPage />} />
            <Route path="/calculator" element={<DosageCalculatorPage />} />
            <Route path="/spray-calendar" element={<SprayCalendar />} />
            <Route path="/calendar" element={<SprayCalendar />} />
            <Route path="/videos" element={<VideoGallery />} />
            <Route path="/video-gallery" element={<VideoGallery />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/poison-control" element={<PoisonControl />} />
            <Route path="/safety" element={<PoisonControl />} />
            <Route path="/emergency" element={<PoisonControl />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    let idleId;
    const preloadOverlays = () => {
      preloadAllRoutes();
      import('./components/AdvisorChatbot');
      import('./components/SprayOrderDrawer');
      import('./components/PWAInstallPrompt');
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(preloadOverlays, { timeout: 1500 });
    } else {
      const timer = setTimeout(preloadOverlays, 300);
      return () => clearTimeout(timer);
    }
    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <BackToTop />
            <NetworkStatusBanner />
            <div className="App">
              <ScrollProgressBar />

              <Header />

              <main>
                <AnimatedRoutes />
              </main>

              <Footer />

              {/* lazy overlays */}
              <Suspense fallback={null}>
                <AdvisorChatbot />
                <PWAInstallPrompt />
                <SprayOrderDrawer />
                <AgriSafetyModal />
              </Suspense>

              <FloatingCartButton />
              <BottomNav />
            </div>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
