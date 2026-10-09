import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import BackToTop from './components/BackToTop';
import AdvisorChatbot from './components/AdvisorChatbot';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import SprayOrderDrawer from './components/SprayOrderDrawer';
import FloatingCartButton from './components/FloatingCartButton';
import './App.css';
import {
  About,
  Products,
  DiseaseGuide,
  SprayCalendar,
  VideoGallery,
  DosageCalculatorPage,
  Contact,
  Search,
  NotFound,
  preloadAllRoutes
} from './utils/routePreloader';

// Smooth Route Loading Fallback
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

function App() {
  useEffect(() => {
    // Preload all dynamic routes during idle time after initial render
    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => {
        preloadAllRoutes();
      }, { timeout: 1500 });
    } else {
      const timer = setTimeout(preloadAllRoutes, 200);
      return () => clearTimeout(timer);
    }
    return () => {
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <BackToTop />
          <div className="App">
            <ScrollProgressBar />

            <Header />

            <main>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/disease-guide" element={<DiseaseGuide />} />
                  <Route path="/dosage-calculator" element={<DosageCalculatorPage />} />
                  <Route path="/calculator" element={<DosageCalculatorPage />} />
                  <Route path="/spray-calendar" element={<SprayCalendar />} />
                  <Route path="/videos" element={<VideoGallery />} />
                  <Route path="/video-gallery" element={<VideoGallery />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />

            {/* Interactive Agricultural Crop Advisor Chatbot */}
            <AdvisorChatbot />

            {/* Installable PWA Mobile App Prompt Banner */}
            <PWAInstallPrompt />

            {/* Spray Order WhatsApp Drawer & Cart */}
            <SprayOrderDrawer />

            {/* Floating Quick Order Cart Button */}
            <FloatingCartButton />

            {/* Mobile Bottom Navigation Bar */}
            <BottomNav />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
