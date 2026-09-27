/* Minimal Google Maps JS API types for the amenity map (full types via @types/google.maps optional). */

declare namespace google.maps {
  class Map {
    constructor(el: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLngLiteral | LatLng): void;
    setZoom(zoom: number): void;
    fitBounds(bounds: LatLngBounds): void;
  }
  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    addListener(event: string, handler: () => void): void;
  }
  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(opts?: { map?: Map; anchor?: Marker }): void;
    close(): void;
    setContent(content: string): void;
  }
  class LatLngBounds {
    constructor();
    extend(point: LatLngLiteral): void;
  }
  class Size {
    constructor(width: number, height: number);
  }
  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }
  interface MarkerOptions {
    map?: Map;
    position?: LatLngLiteral;
    title?: string;
    icon?: string | { url: string; scaledSize?: Size };
  }
  interface InfoWindowOptions {
    content?: string;
  }
  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }
  namespace marker {
    class AdvancedMarkerElement {
      constructor(opts?: AdvancedMarkerElementOptions);
      map: Map | null;
      position: LatLngLiteral | LatLng | null;
      title: string;
      addListener(event: string, handler: () => void): void;
    }
    interface AdvancedMarkerElementOptions {
      map?: Map;
      position?: LatLngLiteral;
      title?: string;
    }
  }
  function importLibrary(name: 'maps' | 'places' | 'marker'): Promise<unknown>;
}

interface PlaceSearchNearbyResult {
  places: PlaceResult[];
}

interface PlaceResult {
  id?: string;
  displayName?: string | { text?: string };
  formattedAddress?: string;
  location?: google.maps.LatLngLiteral;
  rating?: number;
  googleMapsURI?: string;
}

interface PlaceClass {
  searchNearby(request: Record<string, unknown>): Promise<PlaceSearchNearbyResult>;
}

interface Window {
  google?: {
    maps: typeof google.maps & {
      importLibrary: typeof google.maps.importLibrary;
    };
  };
}
