'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AMENITY_CATEGORIES,
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
import { loadGoogleMaps, mapsAuthFailed } from '@/lib/google-maps-loader';
import { searchCategory } from '@/lib/places-search-category';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

type AmenityMapProps = {
  height?: string;
  className?: string;
  compact?: boolean;
  showStaticList?: boolean;
};

type MapLoadState = 'idle' | 'loading' | 'ready' | 'fallback';

function placeLatLng(location: google.maps.places.Place['location']): google.maps.LatLngLiteral | null {
  if (!location) return null;
  if (typeof location.lat === 'function' && typeof location.lng === 'function') {
    return { lat: location.lat(), lng: location.lng() };
  }
  if (typeof (location as google.maps.LatLng).toJSON === 'function') {
    return (location as google.maps.LatLng).toJSON();
  }
  return null;
}

function displayNameText(displayName: unknown): string {
  if (!displayName) return 'Place';
  if (typeof displayName === 'string') return displayName;
  if (
    typeof displayName === 'object' &&
    displayName !== null &&
    'text' in displayName &&
    typeof (displayName as { text?: string }).text === 'string'
  ) {
    return (displayName as { text: string }).text;
  }
  return 'Place';
}

function openPlaceInfoWindow(
  infoWindow: google.maps.InfoWindow,
  map: google.maps.Map,
  marker: google.maps.Marker,
  place: { name: string; address?: string; directionsUrl: string }
): void {
  const div = document.createElement('div');
  div.style.maxWidth = '240px';
  div.style.padding = '4px 2px';
  const strong = document.createElement('strong');
  strong.textContent = place.name;
  div.appendChild(strong);
  if (place.address) {
    const p = document.createElement('p');
    p.style.margin = '4px 0';
    p.style.fontSize = '13px';
    p.style.color = '#444';
    p.textContent = place.address;
    div.appendChild(p);
  }
  const a = document.createElement('a');
  a.href = place.directionsUrl;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.color = '#3A8DDE';
  a.style.fontSize = '13px';
  a.textContent = 'Directions';
  div.appendChild(a);
  infoWindow.setContent(div);
  infoWindow.open({ map, anchor: marker });
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
        <li key={`${place.name}-${place.address ?? 'no-address'}`} className='text-sm text-gray-700'>
          <span className='font-medium text-[#0A2540]'>{place.name}</span>
          {place.address ? <span className='text-gray-500'> — {place.address}</span> : null}
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
  const [loadState, setLoadState] = useState<MapLoadState>(() => {
    if (!MAPS_API_KEY || mapsAuthFailed) return 'fallback';
    return 'idle';
  });
  const [searchUseCurated, setSearchUseCurated] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');

  const clearPlaceMarkers = useCallback(() => {
    placeMarkersRef.current.forEach((m) => m.setMap(null));
    placeMarkersRef.current = [];
  }, []);

  const enterFallback = useCallback(() => {
    clearPlaceMarkers();
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    mapRef.current = null;
    infoWindowRef.current = null;
    setLoadState('fallback');
  }, [clearPlaceMarkers]);

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
      if (!mapRef.current || !infoWindowRef.current) return;
      openPlaceInfoWindow(infoWindowRef.current, mapRef.current, marker, {
        name: MARAVILLA_COMMUNITY.name,
        address: MARAVILLA_COMMUNITY.fullAddress,
        directionsUrl: MARAVILLA_COMMUNITY.mapsUrl,
      });
    });
    communityMarkerRef.current = marker;
  }, []);

  const initMap = useCallback(async () => {
    if (!mapContainerRef.current || mapRef.current || !MAPS_API_KEY) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    try {
      await loadGoogleMaps(MAPS_API_KEY);
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
      enterFallback();
    }
  }, [ensureCommunityMarker, enterFallback]);

  const runCategorySearch = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || loadState !== 'ready') return;
      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      clearPlaceMarkers();
      setSearchUseCurated(false);
      setAriaMessage(`Loading ${category.label} near ${MARAVILLA_COMMUNITY.name}…`);

      try {
        const places = await searchCategory(
          MARAVILLA_MAP_CENTER,
          categoryId,
          category.placeTypes
        );

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(MARAVILLA_MAP_CENTER);

        places.forEach((place) => {
          const position = placeLatLng(place.location);
          if (!position) return;
          const name = displayNameText(place.displayName);
          const directionsUrl =
            place.googleMapsURI ?? getDirectionsUrl(position.lat, position.lng, place.id);
          const marker = new google.maps.Marker({
            map: mapRef.current!,
            position,
            title: name,
          });
          marker.addListener('click', () => {
            if (!mapRef.current || !infoWindowRef.current) return;
            openPlaceInfoWindow(infoWindowRef.current, mapRef.current, marker, {
              name,
              address: place.formattedAddress ?? undefined,
              directionsUrl,
            });
          });
          placeMarkersRef.current.push(marker);
          bounds.extend(position);
        });

        if (places.length > 0) {
          mapRef.current!.fitBounds(bounds);
          setAriaMessage(
            `${places.length} ${category.label.toLowerCase()} locations shown near ${MARAVILLA_COMMUNITY.name}.`
          );
        } else {
          mapRef.current!.setCenter(MARAVILLA_MAP_CENTER);
          mapRef.current!.setZoom(13);
          setSearchUseCurated(true);
          setAriaMessage(
            `Showing curated ${category.label.toLowerCase()} list — no live results for this filter.`
          );
        }
      } catch {
        setSearchUseCurated(true);
        setAriaMessage(
          `Showing curated ${category.label.toLowerCase()} list — live search unavailable.`
        );
      }
    },
    [clearPlaceMarkers, loadState]
  );

  useEffect(() => {
    const onAuthFail = () => enterFallback();
    if (mapsAuthFailed) enterFallback();
    window.addEventListener('gmaps:auth-failure', onAuthFail);
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFail);
  }, [enterFallback]);

  useEffect(() => {
    if (!isInView || !MAPS_API_KEY || loadState === 'fallback') return;
    if (loadState === 'idle') {
      setLoadState('loading');
      void initMap();
    }
  }, [isInView, initMap, loadState]);

  useEffect(() => {
    if (loadState === 'ready') {
      void runCategorySearch(activeCategory);
    }
  }, [activeCategory, loadState, runCategorySearch]);

  const useFallback = !MAPS_API_KEY || loadState === 'fallback';

  return (
    <div ref={inViewRef} className={cn('w-full', className)}>
      <div
        role='tablist'
        aria-label='Filter nearby amenities by category'
        className={cn('flex flex-wrap gap-2 mb-4', compact ? 'max-h-24 overflow-y-auto' : '')}
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

      <div
        id='maravilla-amenity-map-panel'
        role='tabpanel'
        aria-labelledby={`amenity-tab-${activeCategory}`}
      >
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
            {searchUseCurated && loadState === 'ready' && (
              <CuratedPlaceList category={activeCategory} />
            )}
            {showStaticList && loadState === 'ready' && !searchUseCurated && (
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
