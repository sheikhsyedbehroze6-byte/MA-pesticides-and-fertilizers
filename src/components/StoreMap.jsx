import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';

export default function StoreMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Hari Singh High Street, Srinagar Coordinates
    const STORE_LAT = 34.0706;
    const STORE_LNG = 74.8105;

    // Clean up previous instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [STORE_LAT, STORE_LNG],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false // prevents accidental scroll capture on page scroll
    });
    mapInstanceRef.current = map;

    // Tile Layer: OpenStreetMap standard tiles (No API key, zero iframe, never blocked)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Editorial Pin matching MA Pesticides brand
    const customIcon = L.divIcon({
      className: 'store-map-pin',
      html: `
        <div style="
          position: relative;
          width: 36px;
          height: 36px;
          background: #5d2a1a;
          border: 2.5px solid #ffffff;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background: #ffffff;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -34]
    });

    // Add Store Marker
    const marker = L.marker([STORE_LAT, STORE_LNG], { icon: customIcon }).addTo(map);

    // Rich popup
    const popupContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 4px; max-width: 220px;">
        <h4 style="margin: 0 0 4px; font-size: 15px; font-weight: 600; color: #17191c;">MA Pesticides</h4>
        <p style="margin: 0 0 6px; font-size: 12.5px; color: #555e68; line-height: 1.4;">
          Hari Singh High Street, opp. High Court Complex, Srinagar — 190001
        </p>
        <span style="display: inline-block; background: #e8f5e9; color: #1c472a; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px;">
          Open: Mon–Sat 9AM–7PM
        </span>
      </div>
    `;
    marker.bindPopup(popupContent).openPopup();

    // Ensure map tiles resize correctly after mounting
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [theme]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1,
        borderRadius: 'var(--radius-cards)',
        backgroundColor: '#e5e7eb'
      }}
    />
  );
}
