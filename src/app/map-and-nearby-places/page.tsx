import { permanentRedirect } from 'next/navigation';

/** Legacy URL — permanent content lives at /nearby-amenities */
export default function MapAndNearbyPlacesRedirect() {
  permanentRedirect('/nearby-amenities');
}
