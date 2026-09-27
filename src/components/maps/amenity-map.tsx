'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AMENITY_CATEGORIES,
  AMENITY_SEARCH_RADIUS_METERS,
  getDirectionsUrl,
  getGoogleMapsEmbedUrl,
  MARAVILLA_COMMUNITY,
  MARAVILLA_MAP_CENTER,
  type AmenityCategoryId,
} from '@/lib/config/community-map';
import {
  CURATED_NEARBY_PLACES,
  curatedPlacesForCategory,
} from '@/data/maravilla-nearby-amenities';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

type AmenityMapProps = {
  height?: string;
  className?: string;
  /** Shorter chip row on embedded sections */
  compact?: boolean;
  showStaticList?: boolean;
};

type MapLoadState = 'idle' | 'loading' | 'ready' | 'fallback';

let mapsScriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Maps unavailable during SSR'));
  }
  if (window.google?.maps) {
    return Promise.resolve();
  }
  if (mapsScriptPromise) {
    return mapsScriptPromise;
  }
  mapsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Google Maps script failed to load'));
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return mapsScriptPromise;
}

function buildInfoWindowHtml(place: {
  name: string;
  address?: string;
  rating?: number;
  directionsUrl: string;
}): string {
  const ratingLine =
    place.rating !== undefined
      ? `<p style="margin:4px 0;font-size:13px;">Rating: ${place.rating.toFixed(1)}</p>`
      : '';
  const addressLine = place.address
    ? `<p style="margin:4px 0;font-size:13px;color:#444;">${place.address}</p>`
    : '';
  return `<div style="max-width:240px;padding:4px 2px;">
    <strong>${place.name}</strong>
    ${ratingLine}
    ${addressLine}
    <a href="${place.directionsUrl}" target="_blank" rel="noopener noreferrer" style="color:#3A8DDE;font-size:13px;">Directions</a>
  </div>`;
}

function CuratedPlaceList({ category }: { category: AmenityCategoryId }) {
  const places = curatedPlacesForCategory(category);
  if (places.length === 0) {
    return (
      <p className='text-sm text-gray-600 mt-4'>
        Explore this category on the map or contact Dr. Jan Duffy for hyperlocal recommendations.
      </p>
    );
  }
  return (
    <ul className='mt-4 space-y-2' aria-label={`${category} near Maravilla`}>
      {places.map((place) => (
        <li key={`${place.name}-${place.address}`} className='text-sm text-gray-700'>
          <span className='font-medium text-[#0A2540]'>{place.name}</span>
          <span className='text-gray-500'> — {place.address}</span>
        </li>
      ))}
    </ul>
  );
}

function EmbedFallback({ height, category }: { height: string; category: AmenityCategoryId }) {
  const embedUrl = getGoogleMapsEmbedUrl(MARAVILLA_MAP_CENTER.lat, MARAVILLA_MAP_CENTER.lng);
  return (
    <div>
      <div
        className='w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100'
        style={{ height }}
      >
        <iframe
          title={`Map of ${MARAVILLA_COMMUNITY.name}, ${MARAVILLA_COMMUNITY.city}`}
          src={embedUrl}
          width='100%'
          height='100%'
          style={{ border: 0 }}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </div>
      <CuratedPlaceList category={category} />
      <p className='text-xs text-gray-500 mt-3'>
        Interactive amenity search appears when{' '}
        <code className='text-[11px]'>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is configured in
        Vercel.
      </p>
    </div>
  );
}

export default function AmenityMap({
  height = '480px',
  className = '',
  compact = false,
  showStaticList = true,
}: AmenityMapProps) {
  const { ref: inViewRef, isInView } = useInView({ rootMargin: '120px', threshold: 0.05 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const placeMarkersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>('grocery');
  const [loadState, setLoadState] = useState<MapLoadState>(
    MAPS_API_KEY ? 'idle' : 'fallback'
  );
  const [ariaMessage, setAriaMessage] = useState('');

  const clearPlaceMarkers = useCallback(() => {
    placeMarkersRef.current.forEach((m) => m.setMap(null));
    placeMarkersRef.current = [];
  }, []);

  const ensureCommunityMarker = useCallback(() => {
    if (!mapRef.current || communityMarkerRef.current) return;
    const marker = new google.maps.Marker({
      map: mapRef.current,
      position: MARAVILLA_MAP_CENTER,
      title: MARAVILLA_COMMUNITY.name,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      },
    });
    marker.addListener('click', () => {
      infoWindowRef.current?.setContent(
        buildInfoWindowHtml({
          name: MARAVILLA_COMMUNITY.name,
          address: MARAVILLA_COMMUNITY.fullAddress,
          directionsUrl: MARAVILLA_COMMUNITY.mapsUrl,
        })
      );
      infoWindowRef.current?.open({ map: mapRef.current!, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || mapRef.current) return;
    try {
      await loadGoogleMapsScript();
      await google.maps.importLibrary('maps');
      mapRef.current = new google.maps.Map(mapContainerRef.current, {
        center: MARAVILLA_MAP_CENTER,
        zoom: 13,
        ...(MAP_ID ? { mapId: MAP_ID } : {}),
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      infoWindowRef.current = new google.maps.InfoWindow();
      ensureCommunityMarker();
      setLoadState('ready');
    } catch {
      setLoadState('fallback');
    }
  }, [ensureCommunityMarker]);

  const searchCategory = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || loadState !== 'ready') return;
      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      clearPlaceMarkers();
      setAriaMessage(`Loading ${category.label} near ${MARAVILLA_COMMUNITY.name}…`);

      try {
        const placesLib = (await google.maps.importLibrary('places')) as {
          Place: PlaceClass;
        };
        const { Place } = placesLib;
        const { places } = await Place.searchNearby({
          fields: ['displayName', 'formattedAddress', 'location', 'rating', 'id', 'googleMapsURI'],
          locationRestriction: {
            center: MARAVILLA_MAP_CENTER,
            radius: AMENITY_SEARCH_RADIUS_METERS,
          },
          includedPrimaryTypes: category.placeTypes,
          maxResultCount: 12,
        });

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(MARAVILLA_MAP_CENTER);

        places.forEach((place) => {
          const loc = place.location;
          if (!loc) return;
          const name =
            typeof place.displayName === 'string'
              ? place.displayName
              : place.displayName?.text ?? 'Place';
          const directionsUrl =
            place.googleMapsURI ??
            getDirectionsUrl(loc.lat, loc.lng, place.id);
          const marker = new google.maps.Marker({
            map: mapRef.current!,
            position: loc,
            title: name,
          });
          marker.addListener('click', () => {
            infoWindowRef.current?.setContent(
              buildInfoWindowHtml({
                name,
                address: place.formattedAddress,
                rating: place.rating,
                directionsUrl,
              })
            );
            infoWindowRef.current?.open({ map: mapRef.current!, anchor: marker });
          });
          placeMarkersRef.current.push(marker);
          bounds.extend(loc);
        });

        if (places.length > 0) {
          mapRef.current.fitBounds(bounds);
        } else {
          mapRef.current.setCenter(MARAVILLA_MAP_CENTER);
          mapRef.current.setZoom(13);
        }
        setAriaMessage(
          `${places.length} ${category.label.toLowerCase()} locations shown near ${MARAVILLA_COMMUNITY.name}.`
        );
      } catch {
        setAriaMessage(
          `Showing curated ${category.label.toLowerCase()} list — live search unavailable.`
        );
      }
    },
    [clearPlaceMarkers, loadState]
  );

  useEffect(() => {
    if (!isInView || !MAPS_API_KEY || loadState === 'fallback') return;
    if (loadState === 'idle') {
      setLoadState('loading');
      void initMap();
    }
  }, [isInView, initMap, loadState]);

  useEffect(() => {
    if (loadState === 'ready') {
      void searchCategory(activeCategory);
    }
  }, [activeCategory, loadState, searchCategory]);

  const useFallback = !MAPS_API_KEY || loadState === 'fallback';

  return (
    <div ref={inViewRef} className={cn('w-full', className)}>
      <div
        role='tablist'
        aria-label='Filter nearby amenities by category'
        className={cn(
          'flex flex-wrap gap-2 mb-4',
          compact ? 'max-h-24 overflow-y-auto' : ''
        )}
      >
        {AMENITY_CATEGORIES.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type='button'
              role='tab'
              aria-selected={selected}
              aria-controls='maravilla-amenity-map-panel'
              id={`amenity-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A8DDE]',
                selected
                  ? 'bg-[#3A8DDE] text-white'
                  : 'bg-[#F7F9FC] text-[#0A2540] hover:bg-gray-200'
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <p className='sr-only' aria-live='polite'>{ariaMessage}</p>

      <div id='maravilla-amenity-map-panel' role='tabpanel' aria-labelledby={`amenity-tab-${activeCategory}`}>
        {useFallback ? (
          <EmbedFallback height={height} category={activeCategory} />
        ) : (
          <div className='relative'>
            <div
              ref={mapContainerRef}
              className='w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100'
              style={{ height, minHeight: height }}
              aria-label={`Interactive map of ${MARAVILLA_COMMUNITY.name} and nearby ${activeCategory}`}
            />
            {loadState === 'loading' && (
              <div
                className='absolute inset-0 flex items-center justify-center bg-gray-100/90 rounded-lg'
                style={{ height }}
              >
                <p className='text-sm text-gray-600'>Loading map…</p>
              </div>
            )}
            {showStaticList && loadState === 'ready' && (
              <div className='mt-4'>
                <p className='text-sm font-medium text-[#0A2540] mb-1'>
                  Also nearby (verified addresses)
                </p>
                <ul className='text-sm text-gray-600 columns-1 md:columns-2 gap-x-6'>
                  {CURATED_NEARBY_PLACES.slice(0, 6).map((p) => (
                    <li key={p.name} className='mb-1 break-inside-avoid'>
                      {p.name}
                    </li>
                  ))}
                </ul>
                <Link
                  href='/nearby-amenities'
                  className='inline-block mt-2 text-sm text-[#3A8DDE] hover:underline font-medium'
                >
                  Full nearby amenities guide →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
