export interface AmenityTranslationItem {
  name: string;
  tagline: string;
  description: string;
  hours: string;
  features: string[];
}

export const AMENITIES_TRANSLATIONS_EN: Record<string, AmenityTranslationItem> = {
  rooftop: {
    name: 'Rooftop Lounge & Terrace',
    tagline: 'A shared sky for individual rhythms',
    description: 'A serene sanctuary above the city. A place to breathe the crisp dawn breeze, pause at golden sunset, and connect under starry skies.',
    hours: '06:00 — 23:00 Daily',
    features: [
      'Breezy wooden pergola spanning the rooftop terrace',
      'Handcrafted woven rattan outdoor lounge chairs',
      'Mini entertainment corner with tabletop games',
      'Romantic ambient string lights at night',
      'Peaceful space for morning yoga and meditation',
    ],
  },
  cafe: {
    name: 'Quando Quando Cafe',
    tagline: 'Indoor & Outdoor Space Available · Mezzanine & Courtyard',
    description: 'More than just a coffee shop, Quando Quando is the shared living room of our house: where you can savor artisanal brews, focus at the communal wooden table, and sink into our analog vinyl Listening Bar.',
    hours: '07:00 — 22:00 Daily',
    features: [
      'Artisanal specialty coffee & organic herbal teas',
      'High-speed fiber Wi-Fi for co-working',
      'Mini library, curated vinyl records & board games',
      'Intimate space for workshops and small gatherings',
      'Open-air courtyard with lush greenery',
    ],
  },
  laundry: {
    name: 'Smart Self-Service Laundry',
    tagline: 'Automated laundry tailored to your own rhythm',
    description: 'Modern self-service laundry lounge equipped with automated commercial washers and dryers for effortless privacy and convenience:',
    hours: '07:00 — 22:00 Daily',
    features: [
      'Modern semi-industrial washers & tumble dryers',
      'Convenient contactless QR payment system',
      'Flexible pricing based on your wash load',
      'Exclusive resident perk for Hẻm Nhà Living community',
    ],
  },
  billiards: {
    name: 'Rooftop Table Games Lounge',
    tagline: 'Unwind and connect under the open sky',
    description: 'A multi-experience open-air nook: connect through light tabletop games, or simply savor the quiet breeze and starry night sky.',
    hours: '10:00 — 23:00 Daily',
    features: [
      'Curated board games & interactive tabletop games',
      'Open terrace frame for sunset & stargazing',
      'Breezy outdoor seating and panoramic alley views',
      'Complimentary access for residents and staying guests',
    ],
  },
  atrium: {
    name: 'Central Sunlight Atrium',
    tagline: 'The breathing heart of the house',
    description: 'Where natural light meets living flora. The central skylight and ascending greenery act as the spine of the house, drawing clean fresh air and gentle daylight into every corner.',
    hours: 'Natural Daylight',
    features: [
      'Multi-tier central skylight with hanging garden',
      'Continuous natural vertical airflow ventilation',
      'Artistic wooden staircase gallery filled with light',
      'Architectural visual connection between all floors',
    ],
  },
};
