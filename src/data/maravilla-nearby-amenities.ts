import type { AmenityCategoryId } from '@/lib/config/community-map';

export type CuratedNearbyPlace = {
  name: string;
  category: AmenityCategoryId;
  address: string;
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
    | 'ParkingFacility';
  note?: string;
};

/**
 * Verified nearby places (names + street addresses from public listings).
 * Used for SSR copy, fallback map list, and ItemList schema.
 */
export const CURATED_NEARBY_PLACES: CuratedNearbyPlace[] = [
  {
    name: "Smith's Marketplace",
    category: 'grocery',
    address: '6350 N Decatur Blvd, Las Vegas, NV 89130',
    schemaType: 'GroceryStore',
    note: 'Grocery, pharmacy, and general merchandise near Craig Road corridors.',
  },
  {
    name: 'Walmart Supercenter',
    category: 'grocery',
    address: '4505 W Craig Rd, North Las Vegas, NV 89032',
    schemaType: 'GroceryStore',
  },
  {
    name: 'Aliante Nature Discovery Park',
    category: 'parks',
    address: '2627 Nature Park Dr, North Las Vegas, NV 89084',
    schemaType: 'Park',
    note: 'Walking paths, lake, and play areas in the Aliante area.',
  },
  {
    name: 'Aliante Golf Club',
    category: 'golf',
    address: '9600 Sovereign St, Las Vegas, NV 89129',
    schemaType: 'GolfCourse',
  },
  {
    name: 'North Vista Hospital',
    category: 'healthcare',
    address: '1409 E Lake Mead Blvd, North Las Vegas, NV 89030',
    schemaType: 'Hospital',
  },
  {
    name: 'CVS Pharmacy',
    category: 'pharmacies',
    address: '4440 W Craig Rd, North Las Vegas, NV 89032',
    schemaType: 'Pharmacy',
  },
  {
    name: 'Aliante Casino + Hotel',
    category: 'shopping',
    address: '7300 Aliante Pkwy, North Las Vegas, NV 89084',
    schemaType: 'ShoppingCenter',
    note: 'Retail, dining, and entertainment in the Aliante master plan.',
  },
  {
    name: 'Target',
    category: 'shopping',
    address: '6464 N Decatur Blvd, Las Vegas, NV 89131',
    schemaType: 'ShoppingCenter',
    note: 'Decatur Commons area retailer.',
  },
  {
    name: 'Planet Fitness',
    category: 'fitness',
    address: '2690 E Craig Rd, North Las Vegas, NV 89030',
    schemaType: 'ExerciseGym',
  },
  {
    name: 'Triggs Elementary School',
    category: 'schools',
    address: '5415 W Craig Rd, North Las Vegas, NV 89031',
    schemaType: 'School',
    note: 'CCSD campus — confirm assignment by listing address.',
  },
  {
    name: 'Clifford O. Pete Findlay Middle School',
    category: 'schools',
    address: '333 W Tropical Pkwy, Las Vegas, NV 89115',
    schemaType: 'School',
  },
  {
    name: 'Legacy High School',
    category: 'schools',
    address: '150 W Deer Springs Way, North Las Vegas, NV 89084',
    schemaType: 'School',
  },
  {
    name: 'Alexander Library',
    category: 'parks',
    address: '1755 W Alexander Rd, North Las Vegas, NV 89032',
    schemaType: 'Park',
    note: 'Clark County Library branch with programs and study space.',
  },
];

export const NEARBY_AMENITIES_FAQS: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What grocery stores are near Maravilla in North Las Vegas?',
    answer:
      'Smith\'s Marketplace on Decatur and a Walmart Supercenter on West Craig Road are common grocery runs from Maravilla; both sit within a short drive of the community.',
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
    question: 'What schools serve Maravilla?',
    answer:
      'Maravilla addresses are assigned by Clark County School District boundaries; nearby CCSD campuses include Triggs Elementary, Findlay Middle School, and Legacy High School — always confirm the zone for a specific listing.',
  },
  {
    question: 'Is there golf near Maravilla?',
    answer:
      'Aliante Golf Club on Sovereign Street is the nearest championship course to Maravilla, about a 10-minute drive in normal traffic.',
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
