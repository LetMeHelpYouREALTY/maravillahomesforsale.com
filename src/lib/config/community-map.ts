import { BUSINESS_INFO } from '@/lib/config/business-info';

/**
 * Maravilla master-planned community map center.
 * Coordinates align with Google Maps for "Maravilla, North Las Vegas, NV 89031"
 * (see BUSINESS_INFO.communityGeo — same source as existing site maps).
 */
export const MARAVILLA_MAP_CENTER = {
  lat: BUSINESS_INFO.communityGeo.latitude,
  lng: BUSINESS_INFO.communityGeo.longitude,
} as const;

export const MARAVILLA_COMMUNITY = {
  name: BUSINESS_INFO.community.name,
  city: BUSINESS_INFO.community.locality,
  state: BUSINESS_INFO.community.region,
  postalCode: BUSINESS_INFO.community.postalCode,
  fullAddress: BUSINESS_INFO.community.address,
  mapsUrl: BUSINESS_INFO.maps.community,
} as const;

export type AmenityCategoryId =
  | 'restaurants'
  | 'cafes'
  | 'grocery'
  | 'parks'
  | 'golf'
  | 'healthcare'
  | 'pharmacies'
  | 'shopping'
  | 'parking'
  | 'fitness'
  | 'schools';

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) primary types for searchNearby */
  placeTypes: string[];
};

/** Master-planned community — full category set per site spec default order. */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  { id: 'restaurants', label: 'Restaurants', placeTypes: ['restaurant'] },
  { id: 'cafes', label: 'Cafes', placeTypes: ['cafe', 'coffee_shop'] },
  { id: 'grocery', label: 'Grocery', placeTypes: ['grocery_store', 'supermarket'] },
  { id: 'parks', label: 'Parks', placeTypes: ['park'] },
  { id: 'golf', label: 'Golf', placeTypes: ['golf_course'] },
  { id: 'healthcare', label: 'Healthcare', placeTypes: ['hospital', 'doctor'] },
  { id: 'pharmacies', label: 'Pharmacies', placeTypes: ['pharmacy'] },
  { id: 'shopping', label: 'Shopping', placeTypes: ['shopping_mall', 'department_store'] },
  { id: 'parking', label: 'Parking', placeTypes: ['parking'] },
  { id: 'fitness', label: 'Fitness', placeTypes: ['gym'] },
  { id: 'schools', label: 'Schools', placeTypes: ['school', 'primary_school', 'secondary_school'] },
];

export const AMENITY_SEARCH_RADIUS_METERS = 8000;

export function getGoogleMapsEmbedUrl(lat: number, lng: number, zoom = 14): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function getDirectionsUrl(lat: number, lng: number, placeId?: string): string {
  if (placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
