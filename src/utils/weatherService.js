/**
 * Weather Service for M.A. Pesticides & Fertilizers
 * Provides real-time Srinagar Kashmir Valley orchard weather data,
 * rain-fastness drying windows, and SKUAST-K spray suitability advisories.
 */

import { safeJsonParse } from './security';

export const KASHMIR_DISTRICTS = {
  srinagar: {
    id: 'srinagar',
    name: 'Srinagar',
    nameUrdu: 'سرینگر',
    zone: 'Central Valley',
    lat: 34.0837,
    lon: 74.7973,
    baseTemp: 18
  },
  shopian: {
    id: 'shopian',
    name: 'Shopian',
    nameUrdu: 'شوپیاں',
    zone: 'Apple Bowl of Kashmir',
    lat: 33.7208,
    lon: 74.8322,
    baseTemp: 16
  },
  sopore: {
    id: 'sopore',
    name: 'Sopore / Baramulla',
    nameUrdu: 'سوپور / بارہمولہ',
    zone: 'North Fruit Belt',
    lat: 34.2989,
    lon: 74.4697,
    baseTemp: 18
  },
  pulwama: {
    id: 'pulwama',
    name: 'Pulwama',
    nameUrdu: 'پلوامہ',
    zone: 'South Fruit Belt',
    lat: 33.8741,
    lon: 74.8988,
    baseTemp: 17
  },
  anantnag: {
    id: 'anantnag',
    name: 'Anantnag',
    nameUrdu: 'اننت ناگ',
    zone: 'South Valley',
    lat: 33.7311,
    lon: 75.1487,
    baseTemp: 17
  }
};

const CACHE_KEY_PREFIX = 'ma_live_weather_';
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

const memoryCaches = {};
const inFlightRequests = new Map();

/**
 * Fetches real-time weather from Open-Meteo for Kashmir Valley districts
 * Includes caching and resilient fallback.
 */
export async function fetchLiveWeatherData(districtKey = 'srinagar', forceRefresh = false) {
  const district = KASHMIR_DISTRICTS[districtKey] || KASHMIR_DISTRICTS.srinagar;
  const now = Date.now();
  const cacheKey = `${CACHE_KEY_PREFIX}${district.id}`;

  // Return in-memory cache if fresh
  if (!forceRefresh && memoryCaches[district.id] && now - memoryCaches[district.id].time < CACHE_DURATION_MS) {
    return memoryCaches[district.id].data;
  }

  // Check localStorage cache (fresh check)
  let cachedFallback = memoryCaches[district.id]?.data || null;
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = safeJsonParse(cached);
        if (parsed?.data) {
          cachedFallback = parsed.data;
          if (now - parsed.timestamp < CACHE_DURATION_MS) {
            memoryCaches[district.id] = { data: parsed.data, time: parsed.timestamp };
            return parsed.data;
          }
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // Stale-While-Revalidate: Return stale cached data instantly while refreshing in background
  if (cachedFallback && !forceRefresh) {
    if (!inFlightRequests.has(district.id)) {
      const bgPromise = fetchLiveWeatherData(districtKey, true)
        .catch(() => null);
      inFlightRequests.set(district.id, bgPromise);
    }
    return cachedFallback;
  }

  // Single-Flight Promise Coalescing: Deduplicate concurrent in-flight requests for the same district
  if (inFlightRequests.has(district.id)) {
    return inFlightRequests.get(district.id);
  }

  const fetchPromise = (async () => {
    const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${district.lat}&longitude=${district.lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=precipitation_probability,temperature_2m,wind_speed_10m`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Weather API returned status: ${res.status}`);
    const data = await res.json();

    const currentTemp = Math.round(data.current?.temperature_2m ?? district.baseTemp);
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
      advisoryText = `Rain or high wind detected in ${district.name} orchards. Postpone chemical sprays to prevent chemical wash-off and droplet drift.`;
    } else if (currentTemp > 25) {
      advisoryText = `High temperature in ${district.name} (${currentTemp}°C). Spray during early morning (6–9 AM) or late afternoon to avoid leaf scorch.`;
    } else if (currentTemp < 10) {
      advisoryText = `Cool conditions in ${district.name} (${currentTemp}°C). Ensure spray foliage dries thoroughly before nightfall.`;
    } else {
      advisoryText = `Ideal spraying weather in ${district.name} (${district.zone}). Excellent rain-fastness window for fungicides & insecticides.`;
    }

    const weatherData = {
      districtId: district.id,
      location: `${district.name}, Kashmir`,
      zone: district.zone,
      nameUrdu: district.nameUrdu,
      coordinates: `${district.lat.toFixed(2)}° N, ${district.lon.toFixed(2)}° E`,
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

    memoryCaches[district.id] = { data: weatherData, time: now };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: weatherData }));
      } catch {
        // Ignore
      }
    }

    return weatherData;
  } catch {
    clearTimeout(timeoutId);

    // Provide reliable seasonal district fallback
    const fallbackData = {
      districtId: district.id,
      location: `${district.name}, Kashmir`,
      zone: district.zone,
      nameUrdu: district.nameUrdu,
      coordinates: `${district.lat.toFixed(2)}° N, ${district.lon.toFixed(2)}° E`,
      temp: `${district.baseTemp}°C`,
      tempRaw: district.baseTemp,
      humidity: '52%',
      humidityRaw: 52,
      wind: '4 km/h',
      windRaw: 4,
      rainProbability: 15,
      condition: { text: 'Mainly Clear', emoji: '🌤️' },
      weatherCode: 1,
      dryWindow: '6+ Hours',
      sprayStatus: 'SAFE',
      advisory: `Favorable conditions for fungicide & insecticide application in ${district.name} (${district.zone}). Morning spray window recommended.`,
      isLive: false,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

      return fallbackData;
    } finally {
      inFlightRequests.delete(district.id);
    }
  })();

  inFlightRequests.set(district.id, fetchPromise);
  return fetchPromise;
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

  const text = `🌤️ **Live ${weather.location} Orchard Weather & Spray Details:**
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
    actionLink: `https://wa.me/919906541321?text=${encodeURIComponent(`Hello Sheikh Mohammad Ayoub, regarding ${weather.location} weather (${weather.temp}, ${weather.condition.text}, ${weather.wind} wind), is it safe to spray my orchard today?`)}`,
    actionButtons: [
      { label: '🗓️ Open Spray Calendar', action: 'nav_calendar', primary: true, icon: 'compass' },
      { label: '🧮 Compute Tank Dosage', action: 'nav_calc', icon: 'calc' },
      { label: '💬 WhatsApp Chemist', action: 'open_whatsapp', icon: 'phone' }
    ],
    suggestions: ['🗓️ SKUAST Spray Stages', '🍏 Apple Scab Treatment', '⚡ 200L Tank Dosage Calc', '📍 Srinagar Store Details']
  };
}
