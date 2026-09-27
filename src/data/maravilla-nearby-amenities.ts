import type { AmenityCategoryId } from '@/lib/config/community-map';

export type CuratedNearbyPlace = {
  name: string;
  category: AmenityCategoryId;
  /** Full street line verified from a primary source; omit when not verified */
  address?: string;
  sourceUrl: string;
  schemaType:
    | 'Restaurant'
    | 'CafeOrCoffeeShop'
    | 'GroceryStore'
    | 'Park'
    | 'GolfCourse'
    | 'Hospital'
    | 'Pharmacy'
    | 'ShoppingCenter'
    | 'School'
    | 'ExerciseGym'
    | 'Library';
  note?: string;
};

/**
 * Hyperlocal places verified against official operator / government pages.
 * Used for fallback lists and ItemList schema (address only when verified).
 */
export const CURATED_NEARBY_PLACES: CuratedNearbyPlace[] = [
  {
    name: "Smith's Food and Drug",
    category: 'grocery',
    address: '3013 W Craig Rd, North Las Vegas, NV 89032',
    sourceUrl: 'https://www.smithsfoodanddrug.com/stores/grocery/nv/north-las-vegas/3013-w-craig-rd/702/00101',
    schemaType: 'GroceryStore',
    note: 'Grocery and pharmacy on West Craig Road.',
  },
  {
    name: 'Walmart Supercenter',
    category: 'grocery',
    address: '1807 W Craig Rd, North Las Vegas, NV 89032',
    sourceUrl: 'https://www.walmart.com/store/2592-north-las-vegas-nv',
    schemaType: 'GroceryStore',
  },
  {
    name: 'Aliante Nature Discovery Park',
    category: 'parks',
    address: '2627 Nature Park Dr, North Las Vegas, NV 89084',
    sourceUrl: 'https://www.cityofnorthlasvegas.com/things-to-do/parks-facilities/parks/aliante-nature-discovery-park',
    schemaType: 'Park',
    note: 'Walking paths, lake, and play areas in the Aliante area.',
  },
  {
    name: 'Aliante Golf Club',
    category: 'golf',
    address: '3100 W Elkhorn Rd, North Las Vegas, NV 89084',
    sourceUrl: 'https://www.aliantegolf.com/',
    schemaType: 'GolfCourse',
  },
  {
    name: 'North Vista Hospital',
    category: 'healthcare',
    address: '1409 E Lake Mead Blvd, North Las Vegas, NV 89030',
    sourceUrl: 'https://www.northvistahospital.com/',
    schemaType: 'Hospital',
  },
  {
    name: 'CVS Pharmacy',
    category: 'pharmacies',
    address: '4440 W Craig Rd, North Las Vegas, NV 89032',
    sourceUrl: 'https://www.cvs.com/store-locator/cvs-pharmacy-address/4440+W+Craig+Rd-North+Las+Vegas-NV-89032/storeid=8934',
    schemaType: 'Pharmacy',
  },
  {
    name: 'Aliante Casino + Hotel',
    category: 'shopping',
    address: '7300 Aliante Pkwy, North Las Vegas, NV 89084',
    sourceUrl: 'https://www.aliantecasino.com/',
    schemaType: 'ShoppingCenter',
    note: 'Retail, dining, and entertainment in the Aliante master plan.',
  },
  {
    name: 'Target',
    category: 'shopping',
    address: '6464 N Decatur Blvd, Las Vegas, NV 89131',
    sourceUrl: 'https://www.target.com/sl/las-vegas-decatur/1375',
    schemaType: 'ShoppingCenter',
    note: 'Decatur Commons area retailer.',
  },
  {
    name: 'Planet Fitness',
    category: 'fitness',
    address: '2690 E Craig Rd, North Las Vegas, NV 89030',
    sourceUrl: 'https://www.planetfitness.com/gyms/north-las-vegas-nv',
    schemaType: 'ExerciseGym',
  },
  {
    name: 'Triggs Elementary School',
    category: 'schools',
    address: '5415 W Craig Rd, North Las Vegas, NV 89031',
    sourceUrl: 'https://triggses.ccsd.net/',
    schemaType: 'School',
    note: 'CCSD campus — confirm assignment by listing address.',
  },
  {
    name: 'Clifford O. Pete Findlay Middle School',
    category: 'schools',
    address: '333 W Tropical Pkwy, Las Vegas, NV 89115',
    sourceUrl: 'https://findlayms.ccsd.net/',
    schemaType: 'School',
  },
  {
    name: 'Legacy High School',
    category: 'schools',
    address: '150 W Deer Springs Way, North Las Vegas, NV 89084',
    sourceUrl: 'https://legacyhs.ccsd.net/',
    schemaType: 'School',
  },
  {
    name: 'Alexander Library',
    category: 'parks',
    address: '1755 W Alexander Rd, North Las Vegas, NV 89032',
    sourceUrl: 'https://www.cityofnorthlasvegas.com/things-to-do/libraries/north-las-vegas-library-district',
    schemaType: 'Library',
    note: 'North Las Vegas Library District branch with adjacent park space.',
  },
];

export const NEARBY_AMENITIES_FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What grocery stores are near Maravilla in North Las Vegas?',
    answer:
      "Smith's Food and Drug on West Craig Road and the Walmart Supercenter at 1807 W Craig Rd are common grocery runs from Maravilla; both sit within a short drive of the community.",
  },
  {
    question: 'How far is Maravilla from the Las Vegas Strip?',
    answer:
      'From Maravilla, the Las Vegas Strip is roughly a 20–30 minute drive depending on traffic and your route, typically via I-15 south.',
  },
  {
    question: 'Are there hospitals near Maravilla?',
    answer:
      'North Vista Hospital on East Lake Mead Boulevard is the closest full-service hospital to Maravilla, generally within about a 10-minute drive.',
  },
  {
    question: 'What parks are close to Maravilla?',
    answer:
      'Maravilla has on-community parks and trails; Aliante Nature Discovery Park on Nature Park Drive is a popular regional park a short drive north.',
  },
  {
    question: 'How far is Harry Reid International Airport from Maravilla?',
    answer:
      'Harry Reid International Airport is approximately 25–35 minutes from Maravilla by car in typical traffic, often via I-215 and I-15.',
  },
  {
    question: 'Which CCSD schools are assigned to Maravilla addresses?',
    answer:
      'Clark County School District assigns campuses by address. Nearby CCSD campuses include Triggs Elementary, Findlay Middle School, and Legacy High School. Verify assignment for a specific listing with the CCSD Zoning Search before you buy.',
  },
  {
    question: 'Is there golf near Maravilla?',
    answer:
      'Aliante Golf Club on West Elkhorn Road is the nearest championship course to Maravilla, about a 10-minute drive in normal traffic.',
  },
  {
    question: 'How do I get to Downtown Summerlin from Maravilla?',
    answer:
      'Downtown Summerlin is roughly a 25–35 minute drive west from Maravilla, commonly via CC 215 and Summerlin Parkway; times vary with traffic.',
  },
];

export function curatedPlacesForCategory(category: AmenityCategoryId): CuratedNearbyPlace[] {
  return CURATED_NEARBY_PLACES.filter((p) => p.category === category);
}
