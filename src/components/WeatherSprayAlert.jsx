import { useState, useEffect, memo } from 'react';
import { fetchLiveWeatherData } from '../utils/weatherService';

function WeatherSprayAlert() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [weather, setWeather] = useState({
    location: 'Srinagar, Kashmir',
    temp: '18°C',
    wind: '4 km/h',
    rainProbability: 15,
    dryWindow: '6+ Hours',
    sprayStatus: 'SAFE',
    advisory: 'Favorable conditions for fungicide & insecticide application. Morning spray window recommended.'
  });

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchLiveWeatherData();
        if (isMounted && data) {
          setWeather(data);
          setIsLive(data.isLive);
        }
      } catch (err) {
        console.warn('Weather fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadWeather();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="floating-product-artifact" style={{ padding: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="tag-label" style={{ margin: 0 }}>Srinagar Orchard Weather</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <h4 style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 500, margin: 0 }}>
              Live Spraying Conditions
            </h4>
            {isLive && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '2px 8px',
                borderRadius: '9999px'
              }}>
                • LIVE
              </span>
            )}
          </div>
        </div>

        <span style={{
          fontSize: '13px',
          fontFamily: 'var(--font-sohne)',
          fontWeight: 500,
          color: weather.sprayStatus === 'SAFE' ? 'var(--color-sienna-brown)' : '#c2410c',
          backgroundColor: 'var(--surface-accent-blush)',
          padding: '6px 14px',
          borderRadius: '9999px'
        }}>
          {weather.sprayStatus === 'SAFE' ? 'SAFE TO SPRAY' : 'EXERCISING CAUTION'}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="weather-metrics-grid">
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-ash-gray)', display: 'block' }}>Temp</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 500 }}>{loading ? '...' : weather.temp}</strong>
        </div>
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-ash-gray)', display: 'block' }}>Rain Risk</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 500 }}>{loading ? '...' : `${weather.rainProbability}%`}</strong>
        </div>
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-ash-gray)', display: 'block' }}>Wind</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 500 }}>{loading ? '...' : weather.wind}</strong>
        </div>
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-ash-gray)', display: 'block' }}>Dry Window</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 500 }}>{loading ? '...' : weather.dryWindow}</strong>
        </div>
      </div>

      <p style={{ fontSize: '14px', color: 'var(--color-slate-gray)', margin: 0, lineHeight: 1.4 }}>
        <strong>SKUAST-K Rule:</strong> {weather.advisory}
      </p>
    </div>
  );
}

export default memo(WeatherSprayAlert);
