import { useState, useEffect, memo } from 'react';
import { CloudRain, Sun, Wind, Thermometer, ShieldCheck, AlertCircle, Droplets, RefreshCw } from 'lucide-react';

function WeatherSprayAlert() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [weather, setWeather] = useState({
    location: 'Srinagar, Kashmir',
    temp: '20°C',
    wind: '3 km/h',
    rainProbability: 15,
    dryWindow: '6+ Hours',
    sprayStatus: 'SAFE', // 'SAFE', 'CAUTION', 'UNSAFE'
    advisory: 'Favorable conditions for fungal & insect sprays. High temperature requires spraying during early morning (6–9 AM) or late evening (5–7 PM) to avoid leaf scorch.'
  });

  useEffect(() => {
    let isMounted = true;
    const fetchLiveWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=34.0837&longitude=74.7973&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=precipitation_probability,temperature_2m,wind_speed_10m'
        );
        if (!res.ok) throw new Error('Weather API error');
        const data = await res.json();

        if (!isMounted) return;

        const currentTemp = Math.round(data.current?.temperature_2m ?? 20);
        const windSpeed = Math.round(data.current?.wind_speed_10m ?? 4);
        const hourlyProb = data.hourly?.precipitation_probability || [];
        const currentRainProb = Math.max(
          data.current?.rain > 0 ? 85 : 0,
          hourlyProb[0] ?? 10
        );

        // Calculate dry window (consecutive upcoming hours with low rain chance < 35%)
        let dryHours = 0;
        for (let i = 0; i < Math.min(12, hourlyProb.length); i++) {
          if (hourlyProb[i] < 35) {
            dryHours++;
          } else {
            break;
          }
        }
        const dryWindowText = dryHours >= 8 ? '8+ Hours' : dryHours >= 4 ? `${dryHours}+ Hours` : '1-2 Hours';

        // Determine spray status
        let status = 'SAFE';
        if (currentRainProb > 45 || (data.current?.rain ?? 0) > 0.5 || windSpeed > 22) {
          status = 'UNSAFE';
        } else if (currentRainProb >= 25 || windSpeed >= 12 || currentTemp > 30) {
          status = 'CAUTION';
        }

        // Determine SKUAST-K Rule advisory
        let advisoryText = '';
        if (status === 'UNSAFE') {
          advisoryText = 'Rain or high wind detected in Srinagar. Postpone chemical sprays to prevent runoff and poor fungicide deposition.';
        } else if (currentTemp > 25) {
          advisoryText = `High temperature (${currentTemp}°C) detected. Spray during early morning (6–9 AM) or late evening (5–7 PM) to avoid leaf scorch.`;
        } else if (status === 'CAUTION') {
          advisoryText = 'Moderate rain risk or wind. Always mix non-ionic sticker adjuvant (e.g. Wet-Out) for fungicide adhesion.';
        } else {
          advisoryText = 'Ideal spraying weather in Srinagar Valley. Excellent rain-fastness window for fungicides & insecticides.';
        }

        setWeather({
          location: 'Srinagar, Kashmir',
          temp: `${currentTemp}°C`,
          wind: `${windSpeed} km/h`,
          rainProbability: currentRainProb,
          dryWindow: dryWindowText,
          sprayStatus: status,
          advisory: advisoryText
        });
        setIsLive(true);
      } catch (err) {
        console.warn('Using seasonal weather fallback:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveWeather();
    return () => { isMounted = false; };
  }, []);

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
          {isLive && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(37, 211, 102, 0.15)',
              color: '#25d366',
              fontSize: '0.65rem',
              fontWeight: '800',
              padding: '0.15rem 0.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(37, 211, 102, 0.3)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#25d366', boxShadow: '0 0 6px #25d366' }} />
              LIVE
            </span>
          )}
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
            <strong className="metric-val">{loading ? '...' : weather.temp}</strong>
          </div>
        </div>
        <div className="weather-metric">
          <CloudRain size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Rain Risk</span>
            <strong className="metric-val">{loading ? '...' : `${weather.rainProbability}%`}</strong>
          </div>
        </div>
        <div className="weather-metric">
          <Wind size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Wind Speed</span>
            <strong className="metric-val">{loading ? '...' : weather.wind}</strong>
          </div>
        </div>
        <div className="weather-metric">
          <Droplets size={16} className="metric-icon" />
          <div>
            <span className="metric-label">Dry Window</span>
            <strong className="metric-val">{loading ? '...' : weather.dryWindow}</strong>
          </div>
        </div>
      </div>

      <p className="weather-advisory-text">
        💡 <strong>SKUAST-K Rule:</strong> {weather.advisory}
      </p>
    </div>
  );
}

export default memo(WeatherSprayAlert);

