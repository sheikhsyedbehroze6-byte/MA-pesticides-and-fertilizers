import { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Thermometer, ShieldCheck, AlertCircle, Droplets } from 'lucide-react';

export default function WeatherSprayAlert() {
  // Srinagar Summer / Spray season parameters (defaults based on Kashmir July peak)
  const [weather] = useState({
    location: 'Srinagar, Kashmir',
    season: 'Summer Orchard Peak (July)',
    temp: '26°C',
    condition: 'Partly Sunny',
    wind: '8 km/h',
    rainProbability: 15, // 15% chance
    sprayStatus: 'SAFE', // 'SAFE', 'CAUTION', 'UNSAFE'
    advisory: 'Favorable conditions for fungal & insect sprays. High temperature requires spraying during early morning (6–9 AM) or late evening (5–7 PM) to avoid leaf scorch.'
  });

  const getStatusBadge = () => {
    switch (weather.sprayStatus) {
      case 'SAFE':
        return {
          bg: '#e8f5e9',
          color: '#2e7d32',
          border: '#a5d6a7',
          icon: <ShieldCheck size={18} color="#2e7d32" />,
          label: 'SAFE TO SPRAY / سپرے کے لیے مناسب موسم'
        };
      case 'CAUTION':
        return {
          bg: '#fff8e1',
          color: '#b78103',
          border: '#ffe082',
          icon: <AlertCircle size={18} color="#b78103" />,
          label: 'SPRAY WITH STICKER ADJUVANT / سٹیکر کا استعمال لازمی ہے'
        };
      default:
        return {
          bg: '#ffebee',
          color: '#c62828',
          border: '#ef9a9a',
          icon: <AlertCircle size={18} color="#c62828" />,
          label: 'DO NOT SPRAY — RAIN EXPECTED / بارش کا امکان - سپرے نہ کریں'
        };
    }
  };

  const status = getStatusBadge();

  return (
    <div className="weather-alert-card">
      <div className="weather-alert-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sun size={18} color="#b8923f" />
          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary-color)' }}>
            Srinagar Orchard Weather & Spray Advisory
          </span>
        </div>
        <div 
          className="weather-status-badge"
          style={{ backgroundColor: status.bg, color: status.color, borderColor: status.border }}
        >
          {status.icon}
          <span>{status.label}</span>
        </div>
      </div>

      <div className="weather-metrics-grid">
        <div className="weather-metric">
          <Thermometer size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Temperature</span>
            <strong className="metric-val">{weather.temp}</strong>
          </div>
        </div>
        <div className="weather-metric">
          <CloudRain size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Rain Risk</span>
            <strong className="metric-val">{weather.rainProbability}%</strong>
          </div>
        </div>
        <div className="weather-metric">
          <Wind size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Wind Speed</span>
            <strong className="metric-val">{weather.wind}</strong>
          </div>
        </div>
        <div className="weather-metric">
          <Droplets size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Dry Window</span>
            <strong className="metric-val">6+ Hours</strong>
          </div>
        </div>
      </div>

      <p className="weather-advisory-text">
        💡 <strong>SKUAST-K Rule:</strong> {weather.advisory}
      </p>
    </div>
  );
}
