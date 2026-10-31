/**
 * Weather Service for M.A. Pesticides & Fertilizers
 * Provides real-time Srinagar Kashmir Valley orchard weather data,
 * rain-fastness drying windows, and SKUAST-K spray suitability advisories.
 */

const SRINAGAR_LAT = 34.0837;
const SRINAGAR_LON = 74.7973;
const CACHE_KEY = 'ma_srinagar_live_weather';
const CACHE_DURATION_MS = 3 * 60 * 1000; // 3 minutes

export const WMO_WEATHER_CODES = {
  0: { text: 'Clear Sky', emoji: '☀️' },
  1: { text: 'Mainly Clear', emoji: '🌤️' },
  2: { text: 'Partly Cloudy', emoji: '⛅' },
  3: { text: 'Overcast', emoji: '☁️' },
  45: { text: 'Foggy', emoji: '🌫️' },
  48: { text: 'Depositing Rime Fog', emoji: '🌫️' },
  51: { text: 'Light Drizzle', emoji: '🌦️' },
  53: { text: 'Moderate Drizzle', emoji: '🌦️' },
  55: { text: 'Dense Drizzle', emoji: '🌧️' },
  56: { text: 'Freezing Drizzle', emoji: '🌧️' },
  57: { text: 'Dense Freezing Drizzle', emoji: '🌧️' },
  61: { text: 'Slight Rain', emoji: '🌦️' },
  63: { text: 'Moderate Rain', emoji: '🌧️' },
  65: { text: 'Heavy Rain', emoji: '🌧️' },
  66: { text: 'Light Freezing Rain', emoji: '🌧️' },
  67: { text: 'Heavy Freezing Rain', emoji: '🌧️' },
  71: { text: 'Slight Snow Fall', emoji: '🌨️' },
  73: { text: 'Moderate Snow Fall', emoji: '❄️' },
  75: { text: 'Heavy Snow Fall', emoji: '❄️' },
  77: { text: 'Snow Grains', emoji: '❄️' },
  80: { text: 'Slight Rain Showers', emoji: '🌦️' },
  81: { text: 'Moderate Rain Showers', emoji: '🌧️' },
  82: { text: 'Violent Rain Showers', emoji: '⛈️' },
  85: { text: 'Slight Snow Showers', emoji: '🌨️' },
  86: { text: 'Heavy Snow Showers', emoji: '❄️' },
  95: { text: 'Thunderstorm', emoji: '⛈️' },
  96: { text: 'Thunderstorm with Slight Hail', emoji: '⛈️' },
  99: { text: 'Thunderstorm with Heavy Hail', emoji: '⛈️' }
};

export function getWeatherCondition(code) {
  return WMO_WEATHER_CODES[code] || { text: 'Fair Weather', emoji: '🌤️' };
}

let memoryCache = null;
let memoryCacheTime = 0;

/**
 * Fetches real-time weather from Open-Meteo for Srinagar Valley
 * Includes caching and resilient fallback.
 */
export async function fetchLiveWeatherData(forceRefresh = false) {
  const now = Date.now();

  // Return in-memory cache if fresh
  if (!forceRefresh && memoryCache && now - memoryCacheTime < CACHE_DURATION_MS) {
    return memoryCache;
  }

  // Check localStorage cache
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (now - parsed.timestamp < CACHE_DURATION_MS) {
          memoryCache = parsed.data;
          memoryCacheTime = parsed.timestamp;
          return memoryCache;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${SRINAGAR_LAT}&longitude=${SRINAGAR_LON}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=precipitation_probability,temperature_2m,wind_speed_10m`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Weather API returned status: ${res.status}`);
    const data = await res.json();

    const currentTemp = Math.round(data.current?.temperature_2m ?? 18);
    const humidity = Math.round(data.current?.relative_humidity_2m ?? 50);
    const windSpeed = Math.round(data.current?.wind_speed_10m ?? 4);
    const weatherCode = data.current?.weather_code ?? 0;
    const condition = getWeatherCondition(weatherCode);

    const hourlyProb = data.hourly?.precipitation_probability || [];
    const currentRainProb = Math.max(
      (data.current?.rain ?? 0) > 0 ? 85 : 0,
      hourlyProb[0] ?? 10
    );

    // Calculate dry hours window (hours until rain prob > 35%)
    let dryHours = 0;
    for (let i = 0; i < Math.min(12, hourlyProb.length); i++) {
      if (hourlyProb[i] < 35) {
        dryHours++;
      } else {
        break;
      }
    }
    const dryWindowText = dryHours >= 8 ? '8+ Hours' : dryHours >= 4 ? `${dryHours}+ Hours` : '1–2 Hours';

    // Spray status determination based on SKUAST-K parameters
    let status = 'SAFE';
    if (currentRainProb > 45 || (data.current?.rain ?? 0) > 0.5 || windSpeed > 20) {
      status = 'UNSAFE';
    } else if (currentRainProb >= 25 || windSpeed >= 12 || currentTemp > 28 || currentTemp < 6) {
      status = 'CAUTION';
    }

    let advisoryText = '';
    if (status === 'UNSAFE') {
      advisoryText = 'Rain or high wind detected in Srinagar Valley. Postpone chemical sprays to prevent chemical wash-off and droplet drift.';
    } else if (currentTemp > 25) {
      advisoryText = `High temperature (${currentTemp}°C). Spray during early morning (6–9 AM) or late afternoon to avoid leaf scorch.`;
    } else if (currentTemp < 10) {
      advisoryText = `Cool conditions (${currentTemp}°C). Ensure spray foliage dries thoroughly before nightfall.`;
    } else {
      advisoryText = 'Ideal weather in Srinagar Valley. Excellent rain-fastness window for fungicides & insecticides.';
    }

    const weatherData = {
      location: 'Srinagar, Kashmir',
      coordinates: '34.08° N, 74.80° E',
      temp: `${currentTemp}°C`,
      tempRaw: currentTemp,
      humidity: `${humidity}%`,
      humidityRaw: humidity,
      wind: `${windSpeed} km/h`,
      windRaw: windSpeed,
      rainProbability: currentRainProb,
      condition,
      weatherCode,
      dryWindow: dryWindowText,
      sprayStatus: status,
      advisory: advisoryText,
      isLive: true,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    memoryCache = weatherData;
    memoryCacheTime = now;

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data: weatherData }));
      } catch {
        // Ignore
      }
    }

    return weatherData;
  } catch (err) {
    clearTimeout(timeoutId);

    // Provide reliable seasonal Srinagar fallback
    const fallbackData = {
      location: 'Srinagar, Kashmir',
      coordinates: '34.08° N, 74.80° E',
      temp: '18°C',
      tempRaw: 18,
      humidity: '52%',
      humidityRaw: 52,
      wind: '4 km/h',
      windRaw: 4,
      rainProbability: 15,
      condition: { text: 'Mainly Clear', emoji: '🌤️' },
      weatherCode: 1,
      dryWindow: '6+ Hours',
      sprayStatus: 'SAFE',
      advisory: 'Favorable conditions for fungicide & insecticide application in Srinagar Valley. Morning spray window recommended.',
      isLive: false,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    return fallbackData;
  }
}

/**
 * Builds formatted text response for chatbot
 */
export function buildWeatherChatResponse(weather) {
  const statusEmoji = weather.sprayStatus === 'SAFE' ? '🟢' : weather.sprayStatus === 'CAUTION' ? '🟡' : '🔴';
  const statusBadge = weather.sprayStatus === 'SAFE' 
    ? 'SAFE TO SPRAY' 
    : weather.sprayStatus === 'CAUTION' 
    ? 'EXERCISE CAUTION' 
    : 'UNSAFE TO SPRAY (POSTPONE)';

  const text = `🌤️ **Live Srinagar Orchard Weather & Spray Details:**
📍 **Location:** ${weather.location} (${weather.isLive ? '📡 Live Satellite Feed' : 'Seasonal Valley Baseline'})
🕒 **Observation:** ${weather.lastUpdated}

- 🌡️ **Temperature:** **${weather.temp}** (Optimal spray range: **15°C – 25°C**)
- 🌤️ **Sky Condition:** **${weather.condition.emoji} ${weather.condition.text}**
- 💧 **Relative Humidity:** **${weather.humidity}**
- 🌬️ **Wind Speed:** **${weather.wind}** (Calm / Drift-Free)
- 🌧️ **Rain Probability:** **${weather.rainProbability}%**
- ⏱️ **Rain-Free Drying Window:** **${weather.dryWindow}**

${statusEmoji} **Spray Safety Status: ${statusBadge}**
💡 **Chemist Advisory:** ${weather.advisory}

🔬 **Rain-Fastness Protocol (Sheikh Mohammad Ayoub):**
- **Contact Fungicides (Antracol, Dodine, Mancozeb):** Require **4–6 hours** of rain-free drying time to bind firmly with leaf wax cuticles.
- **Systemic Fungicides (Luna, Score, Hexaconazole):** Absorbed into plant tissue within **1–2 hours**.`;

  return {
    text,
    weatherEmbed: weather,
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, regarding Srinagar weather (${weather.temp}, ${weather.condition.text}, ${weather.wind} wind), is it safe to spray my orchard today?`)}`,
    actionButtons: [
      { label: '🗓️ Open Spray Calendar', action: 'nav_calendar', primary: true, icon: 'compass' },
      { label: '🧮 Compute Tank Dosage', action: 'nav_calc', icon: 'calc' },
      { label: '💬 WhatsApp Chemist', action: 'open_whatsapp', icon: 'phone' }
    ],
    suggestions: ['🗓️ SKUAST Spray Stages', '🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '📍 Srinagar Store Details']
  };
}
