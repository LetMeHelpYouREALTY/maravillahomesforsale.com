import { redirect } from 'next/navigation';

/** Legacy URL — permanent content lives at /nearby-amenities */
export default function MapAndNearbyPlacesRedirect() {
  redirect('/nearby-amenities');
}
