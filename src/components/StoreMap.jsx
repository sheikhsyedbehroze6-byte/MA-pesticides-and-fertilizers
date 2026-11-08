import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';
import { MapPin, ExternalLink, Phone } from 'lucide-react';

export default function StoreMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Hari Singh High Street, Srinagar Coordinates
      const STORE_LAT = 34.0706;
      const STORE_LNG = 74.8105;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // Ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }

      // Clear internal Leaflet ID on the DOM node to prevent "Map container is already initialized"
      if (mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }

      // Initialize Leaflet map
      const map = L.map(mapContainerRef.current, {
        center: [STORE_LAT, STORE_LNG],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false
      });
      mapInstanceRef.current = map;

      // Tile Layer: OpenStreetMap standard tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

      const timer = setTimeout(() => {
        try {
          map.invalidateSize();
        } catch {
          // ignore
        }
      }, 200);

      return () => {
        clearTimeout(timer);
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch {
            // ignore
          }
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      console.warn('StoreMap Leaflet initialization notice:', err);
      setTimeout(() => setMapError(true), 0);
    }
  }, [theme]);

  if (mapError) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: '340px',
        borderRadius: 'var(--radius-cards)',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'rgba(26, 67, 46, 0.1)',
          color: 'var(--color-pine-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <MapPin size={26} />
        </div>
        <h4 style={{ fontFamily: 'var(--font-signifier)', fontSize: '22px', fontWeight: 600, color: 'var(--color-ink-black)', margin: '0 0 6px' }}>
          Hari Singh High Street Store
        </h4>
        <p style={{ fontSize: '14.5px', color: 'var(--color-slate-gray)', maxWidth: '420px', margin: '0 0 20px', lineHeight: 1.5 }}>
          Near Exhibition Ground, opposite High Court Complex, Hari Singh High Street, Srinagar — 190001, Kashmir
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Hari+Singh+High+Street+Srinagar+Jammu+and+Kashmir+190001"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button-filled pill-button-sm"
          >
            <span>Open in Google Maps</span>
            <ExternalLink size={13} />
          </a>
          <a
            href="tel:+919906541321"
            className="pill-button-ghost pill-button-sm"
          >
            <Phone size={13} />
            <span>Call +91 99065 41321</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '340px',
        zIndex: 1,
        borderRadius: 'var(--radius-cards)',
        backgroundColor: '#e5e7eb'
      }}
    />
  );
}
