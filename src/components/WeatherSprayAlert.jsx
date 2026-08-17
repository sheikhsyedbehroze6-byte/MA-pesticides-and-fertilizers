import { useState, useEffect, memo } from 'react';
import { CloudRain, Sun, Wind, Thermometer, ShieldCheck, AlertCircle, Droplets } from 'lucide-react';

function WeatherSprayAlert() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [weather, setWeather] = useState({
    location: 'Srinagar, Kashmir',
    temp: '20°C',
    wind: '3 km/h',
    rainProbability: 15,
    dryWindow: '6+ Hours',
    sprayStatus: 'SAFE',
    advisory: 'Favorable conditions for fungicide & insecticide application. Morning spray window recommended.'
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

        let dryHours = 0;
        for (let i = 0; i < Math.min(12, hourlyProb.length); i++) {
          if (hourlyProb[i] < 35) {
            dryHours++;
          } else {
            break;
          }
        }
        const dryWindowText = dryHours >= 8 ? '8+ Hours' : dryHours >= 4 ? `${dryHours}+ Hours` : '1-2 Hours';

        let status = 'SAFE';
        if (currentRainProb > 45 || (data.current?.rain ?? 0) > 0.5 || windSpeed > 22) {
          status = 'UNSAFE';
        } else if (currentRainProb >= 25 || windSpeed >= 12 || currentTemp > 30) {
          status = 'CAUTION';
        }

        let advisoryText = '';
        if (status === 'UNSAFE') {
          advisoryText = 'Rain or high wind detected in Srinagar Valley. Postpone chemical sprays to prevent chemical wash-off.';
        } else if (currentTemp > 25) {
          advisoryText = `High temp (${currentTemp}°C). Spray early morning (6–9 AM) to avoid leaf scorch.`;
        } else {
          advisoryText = 'Ideal weather in Srinagar. Excellent rain-fastness window for fungicides & insecticides.';
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
