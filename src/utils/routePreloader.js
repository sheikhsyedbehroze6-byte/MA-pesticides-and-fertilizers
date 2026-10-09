import { lazy } from 'react';

/**
 * Higher-Order Component to wrap React.lazy with a .preload() method
 * for instantaneous 0ms route navigation.
 */
export function lazyWithPreload(factory) {
  let promise = null;

  const load = () => {
    if (!promise) {
      promise = factory();
    }
    return promise;
  };

  const LazyComponent = lazy(load);
  LazyComponent.preload = load;
  return LazyComponent;
}

// Preloadable Lazy Route Components
export const About = lazyWithPreload(() => import('../pages/About'));
export const Products = lazyWithPreload(() => import('../pages/Products'));
export const DiseaseGuide = lazyWithPreload(() => import('../pages/DiseaseGuide'));
export const SprayCalendar = lazyWithPreload(() => import('../pages/SprayCalendar'));
export const VideoGallery = lazyWithPreload(() => import('../pages/VideoGallery'));
export const DosageCalculatorPage = lazyWithPreload(() => import('../pages/DosageCalculatorPage'));
export const Contact = lazyWithPreload(() => import('../pages/Contact'));
export const Search = lazyWithPreload(() => import('../pages/Search'));
export const NotFound = lazyWithPreload(() => import('../pages/NotFound'));

// Mapping of route paths to route component objects
const routeMap = {
  '/about': About,
  '/products': Products,
  '/disease-guide': DiseaseGuide,
  '/dosage-calculator': DosageCalculatorPage,
  '/calculator': DosageCalculatorPage,
  '/spray-calendar': SprayCalendar,
  '/videos': VideoGallery,
  '/video-gallery': VideoGallery,
  '/search': Search,
  '/contact': Contact,
};

/**
 * Preloads a specific route's JavaScript bundle chunk on hover or touchstart
 * @param {string} path - Target path string e.g. '/products'
 */
export function preloadRoute(path) {
  if (!path) return;
  const cleanPath = path.split('?')[0].split('#')[0];
  const route = routeMap[cleanPath];
  if (route && typeof route.preload === 'function') {
    route.preload();
  }
}

/**
 * Preloads all background route modules during browser idle time
 */
export function preloadAllRoutes() {
  Object.values(routeMap).forEach((route) => {
    if (route && typeof route.preload === 'function') {
      route.preload();
    }
  });
}
