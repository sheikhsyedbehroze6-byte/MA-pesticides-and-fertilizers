import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AdvisorChatbot from './components/AdvisorChatbot';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

// Lazy-loaded routes for code-splitting & ultra-fast initial bundle
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const DiseaseGuide = lazy(() => import('./pages/DiseaseGuide'));
const SprayCalendar = lazy(() => import('./pages/SprayCalendar'));
const VideoGallery = lazy(() => import('./pages/VideoGallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
  return (
    <ThemeProvider>
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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
