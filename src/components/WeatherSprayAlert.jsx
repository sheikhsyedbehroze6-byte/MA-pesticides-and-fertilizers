import { useState, useEffect, memo } from 'react';
import { fetchLiveWeatherData, KASHMIR_DISTRICTS } from '../utils/weatherService';
import { MapPin, RefreshCw } from 'lucide-react';

function WeatherSprayAlert() {
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ma_orchard_district') || 'srinagar';
    }
    return 'srinagar';
  });
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [weather, setWeather] = useState({
    districtId: 'srinagar',
    location: 'Srinagar, Kashmir',
    zone: 'Central Valley',
    temp: '18°C',
    wind: '4 km/h',
    rainProbability: 15,
    condition: { text: 'Mainly Clear', emoji: '🌤️' },
    dryWindow: '6+ Hours',
    sprayStatus: 'SAFE',
    advisory: 'Favorable conditions for fungicide & insecticide application. Morning spray window recommended.'
  });

  const loadWeather = async (districtId, force = false) => {
    try {
      setLoading(true);
      const data = await fetchLiveWeatherData(districtId, force);
      if (data) {
        setWeather(data);
        setIsLive(data.isLive);
      }
    } catch (err) {
      console.warn('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedDistrict);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ma_orchard_district', selectedDistrict);
      } catch {
        // Ignore
      }
    }
  }, [selectedDistrict]);

  return (
    <div className="floating-product-artifact" style={{ padding: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="tag-label" style={{ margin: 0 }}>Valley Microclimate &amp; Spray Window</span>
            {isLive && (
              <span style={{
                fontSize: '10.5px',
                fontWeight: 700,
                color: '#047857',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                padding: '1px 7px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                LIVE
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
            <h4 style={{ fontFamily: 'var(--font-sohne)', fontSize: '18px', fontWeight: 600, margin: 0, color: 'var(--color-ink-black)' }}>
              {weather.location} <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-slate-gray)' }}>({weather.zone})</span>
            </h4>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => loadWeather(selectedDistrict, true)}
            title="Refresh live satellite data"
            style={{
              background: 'none',
              border: '1px solid rgba(23, 25, 28, 0.12)',
              borderRadius: '8px',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              color: 'var(--color-slate-gray)'
            }}
          >
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
            <span>Sync</span>
          </button>

          <span style={{
            fontSize: '12.5px',
            fontFamily: 'var(--font-sohne)',
            fontWeight: 600,
            color: weather.sprayStatus === 'SAFE' ? '#047857' : weather.sprayStatus === 'CAUTION' ? '#b45309' : '#dc2626',
            backgroundColor: weather.sprayStatus === 'SAFE' ? 'rgba(16, 185, 129, 0.12)' : weather.sprayStatus === 'CAUTION' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            padding: '5px 12px',
            borderRadius: '9999px'
          }}>
            {weather.sprayStatus === 'SAFE' ? 'SAFE TO SPRAY' : weather.sprayStatus === 'CAUTION' ? 'EXERCISE CAUTION' : 'UNSAFE (POSTPONE)'}
          </span>
        </div>
      </div>

      {/* District Selector Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-ash-gray)', display: 'inline-flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
          <MapPin size={12} /> Belt:
        </span>
        {Object.values(KASHMIR_DISTRICTS).map((d) => {
          const isSelected = selectedDistrict === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDistrict(d.id)}
              style={{
                border: isSelected ? '1.5px solid var(--color-pine-green)' : '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: isSelected ? 'rgba(28, 71, 42, 0.1)' : 'var(--surface-card-mist, #ffffff)',
                color: isSelected ? 'var(--color-pine-green)' : 'var(--color-ink-black)',
                fontWeight: isSelected ? 600 : 500,
                fontSize: '11.5px',
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{d.name.split(' ')[0]}</span>
              <span style={{ opacity: 0.65, fontSize: '10.5px', marginLeft: '4px', fontFamily: 'urdu, serif' }}>{d.nameUrdu}</span>
            </button>
          );
        })}
      </div>

      {/* Metrics Row */}
      <div className="weather-metrics-grid">
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--color-ash-gray)', display: 'block' }}>Temperature</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 600, color: 'var(--color-ink-black)' }}>
            {loading ? '...' : weather.temp}
          </strong>
        </div>
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--color-ash-gray)', display: 'block' }}>Rain Risk</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 600, color: weather.rainProbability > 30 ? '#dc2626' : 'var(--color-ink-black)' }}>
            {loading ? '...' : `${weather.rainProbability}%`}
          </strong>
        </div>
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--color-ash-gray)', display: 'block' }}>Wind Speed</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 600, color: 'var(--color-ink-black)' }}>
            {loading ? '...' : weather.wind}
          </strong>
        </div>
        <div style={{ backgroundColor: 'var(--surface-card-mist)', padding: '12px 14px', borderRadius: 'var(--radius-smallcards)' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--color-ash-gray)', display: 'block' }}>Drying Window</span>
          <strong style={{ fontSize: '16px', fontFamily: 'var(--font-sohne)', fontWeight: 600, color: 'var(--color-pine-green)' }}>
            {loading ? '...' : weather.dryWindow}
          </strong>
        </div>
      </div>

      <p style={{ fontSize: '13.5px', color: 'var(--color-slate-gray)', margin: '14px 0 0', lineHeight: 1.45 }}>
        <strong style={{ color: 'var(--color-ink-black)' }}>SKUAST-K Field Rule:</strong> {weather.advisory}
      </p>
    </div>
  );
}

export default memo(WeatherSprayAlert);
