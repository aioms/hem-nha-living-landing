export interface RoomTranslationItem {
  concept: string;
  story: string;
  floor: string;
  bedType: string;
  capacity: string;
  leaseTerm?: string;
  amenities: string[];
  features: {
    highlight: string;
    lightMood?: string;
    view?: string;
    atmosphere?: string;
    suitableFor?: string;
  };
  captions?: string[];
}

export const ROOM_TRANSLATIONS_EN: Record<string, RoomTranslationItem> = {
  'som-mai': {
    concept: 'Luminous Pure · Soft Dawn Light · Serene Beginning',
    story: 'The room awakens you with natural sunlight filtering through misty morning whites and rustic light wood. Feel the softness of sheer linen curtains, catch the warm aroma of morning coffee from the kitchenette, and let the gentle sounds of a new day welcome you.',
    floor: '1st Floor — Sunlit front-facing balcony',
    bedType: '1 Flexible Queen Sofabed',
    capacity: '2 adults',
    amenities: [
      'Pure ivory palette paired with warm natural oak.',
      'Whimsical cloud pendant light casting soft ambient glow.',
      'Plush woven fabric sofa with organic seagrass rug.',
      'Fully equipped compact kitchenette.',
      'HD projector for relaxing movie nights.',
    ],
    features: {
      highlight: 'Sun-drenched morning balcony & cozy reading sofa nook',
      lightMood: 'Soft, diffused natural daylight with dual-layer linen drapes',
      view: 'Overlooking the quiet shaded alley and breezy green skylight',
    },
    captions: [
      'Relaxing sofa lounge with floating cloud lamp and early morning sunshine',
      'Integrated open space with plush sofa and modern kitchenette',
      'Panoramic room overview featuring checkerboard floors and arched shelving',
      'Artistic console with round perforations, turntable, and organic wavy mirror',
      'Music and relaxation corner adjacent to the kitchenette',
      'Terrazzo mini kitchen complete with coffee maker and induction stovetop',
      'Warm beige ceramic tiled bathroom with fluted glass partition and walk-in rain shower',
    ],
  },
  'trua-he': {
    concept: 'Warm Terracotta · Tropical Serenity · Gentle Slumber',
    story: 'A soothing sanctuary from the midday tropical sun, enveloped in grounding terracotta tones. Under soft ambient illumination, the feather pendant lamp hovers like a daydream. Sink into the cool, plush sofa, take in notes of calming woody incense, and embrace complete stillness away from the bustling city.',
    floor: '1st Floor — Open breezy perspective',
    bedType: '1 Flexible Queen Sofabed',
    capacity: '2 adults',
    amenities: [
      'Calming terracotta warmth that softens midday glare.',
      'Dreamy feather pendant chandelier creating a floating aura.',
      'Plush sofabed crafted for blissful midday naps.',
      'Elegant arched kitchenette paired with rustic open display shelves.',
      'HD cinema projector for relaxed viewing.',
    ],
    features: {
      highlight: 'Japanese-inspired platform bed bathed in gentle tropical light',
      lightMood: 'Warm amber glow, 100% blackout curtains for uninterrupted rest',
      view: 'Open view over quiet neighborhood terracotta rooftops and lush treetops',
    },
    captions: [
      'Cozy living lounge in warm terracotta with plush sofa and floating pendant',
      'Signature curved terracotta kitchenette and sculptural circular divider',
      'Arched console table, designer curved mirror, and sunlit balcony',
      'Artistic view through the circular window looking out to the sunlit balcony',
      'Sun-soaked balcony corner with vibrant tropical plants and fresh air',
      'Checkered terracotta ceramic bathroom with terrazzo floor and fluted glass',
    ],
  },
  'hoang-hon': {
    concept: 'Golden Hour · Warm Amber Glow · Romantic Analog Mood',
    story: 'The magic of dusk captured under an ombre sunset wall. Curl up on the oversized beanbag, surrounded by delicate floral aromas and slow analog melodies from the turntable — the perfect evening haven to let your soul truly unwind.',
    floor: '1st Floor — Prime sunset vantage',
    bedType: '1 Queen Bed + 1 Sofa Daybed',
    capacity: '2 adults',
    amenities: [
      'Radiant ombre gradient wall reflecting romantic twilight hues.',
      'Plush, inviting bed accented with soft pastel warmth.',
      'Oversized beanbag and bench lounge to melt away evening fatigue.',
      'Convenient mini kitchenette.',
      'HD projection entertainment setup.',
      'Curated room board games for cozy connection.',
    ],
    features: {
      highlight: 'Golden hour honeyed glow streaming in through a breezy balcony',
      lightMood: 'Mellow amber tones with cinematic, heartwarming shadows',
      view: 'Unobstructed twilight skyline views over Saigon',
    },
    captions: [
      'Warm sunset bedroom with plush bed, wooden blinds, and amber lighting',
      'Sunset gradient wall with chamomile sofa and curated book shelf',
      'Panoramic view from the bed taking in the sofa, kitchenette, and arched doorway',
      'Relaxing reading nook by the wide window catching golden evening light',
      'Pastel pink and timber kitchenette with retro Smeg espresso maker',
      'Fully equipped cooking area adjacent to vinyl records and warm checkered floor',
      'Striped sunset-tone ceramic bathroom with arched mirror and premium vanity',
      'Walk-in rain shower with amber fluted glass partition',
      'Airy window frame capturing romantic dusk moments',
    ],
  },
  'dem-sao': {
    concept: 'Midnight Deep · Intimate Cosmos · Absolute Quietude',
    story: 'A private cosmos unfolds with a shimmering starry galaxy wall and floating moonlight. Snuggle into deep navy velvet bedding, inhale the crisp midnight air, and immerse yourself in an intimate private cinema — the ultimate sanctuary for deep sleep and profound restoration.',
    floor: '1st Floor — Absolute nighttime tranquility',
    bedType: '1 Plush Queen Bed',
    capacity: '2 adults',
    amenities: [
      'Shimmering starry night wall & ceiling simulating a private cosmos.',
      'Immersive widescreen cinema projector.',
      'Celestial ceiling wash light for cozy stargazing in bed.',
      'Ultra-cushioned beanbag for serene nighttime reading.',
      'Minimalist, sleek in-room kitchen.',
    ],
    features: {
      highlight: 'Controlled ambient darkness and acoustic peace for deep slumber',
      lightMood: 'Dimmable mood lighting simulating moonlight and distant constellations',
      view: 'Gazing at the nocturnal sky and shimmering city lights from high above',
    },
    captions: [
      'Starry Night bedroom panorama in mysterious, calming deep navy',
      'Full moon lamp glowing softly beside the sleek black library shelf',
      'Cozy midnight chill nook with oversized beanbag and wooden tea table',
      'Window view into the luminous room glowing in gentle darkness',
      'Modern midnight kitchenette with sophisticated integrated LED strips',
      'Art Deco inspired navy striped bathroom with distinct character',
    ],
  },
  'hem-diy-1': {
    concept: 'Private Garden Patio · Bi-fold Glass Wall · Free to Curate',
    story: 'Nestled on the quiet ground floor with an exclusive garden patio and rustic wooden pergola. Highlights include a wide bi-fold window opening completely to private outdoor greenery, a relaxing sofabed daybed, and a modern kitchenette. An ideal raw canvas for creative souls.',
    floor: 'Ground Floor — Private garden patio & entrance',
    bedType: '1 Flexible Queen Sofabed',
    capacity: '1–2 adults',
    leaseTerm: 'Yearly Lease · Raw Canvas Studio',
    amenities: [
      'Private landscaped terrace sheltered by a wooden pergola.',
      'Expansive bi-fold windows welcoming natural breezes and daylight.',
      'Comfortable multi-functional sofabed daybed.',
      'Standard kitchen counter & energy-efficient Inverter refrigerator.',
      'Complete freedom to furnish, repaint, and arrange your own decor.',
      'High-speed dedicated Wi-Fi included.',
      'Smart self-service automated laundry in the building.',
      'Exclusive resident privileges at Quando Quando Cafe.',
      'Open access to the scenic rooftop terrace.',
    ],
    features: {
      highlight: 'Dedicated private garden patio and Japanese-inspired bi-fold window wall',
      atmosphere: 'Quiet, verdant green shade, authentic artistic workshop vibe',
      suitableFor: 'Freelancers, designers, writers, and long-term DIY enthusiasts',
    },
  },
  'hem-diy-2': {
    concept: 'Olive Green Tone · Bay Window Garden Ledge · Personalized Home',
    story: 'Finished in sophisticated olive green paired with rich, warm timber furnishings. Features an expansive floor-to-ceiling bay window ledge looking out into tropical greenery — your serene spot to read, sip tea, or place your work desk facing nature.',
    floor: 'Ground Floor — Garden greenery & bay window lounge',
    bedType: '1 Natural Wood Queen Bed',
    capacity: '2 adults',
    leaseTerm: 'Yearly Lease · Raw Canvas Studio',
    amenities: [
      'Deep bay window bench integrated with garden viewing ledge.',
      'Solid wood double bed with comfortable spring mattress.',
      'Permission to mount shelves, hang artwork, and personalize.',
      'High-speed dedicated Wi-Fi included.',
      'Smart self-service automated laundry in the building.',
      'Exclusive resident privileges at Quando Quando Cafe.',
      'Open access to the scenic rooftop terrace.',
    ],
    features: {
      highlight: 'Botanical bay window looking out onto lush garden & refined olive tone',
      atmosphere: 'Peaceful, close to nature, inspiring mindful slow living',
      suitableFor: 'Long-term residents (1+ years), remote specialists, book lovers',
    },
  },
  'hem-minimal': {
    concept: 'Pure Minimalism · Natural Pallet Platform · Sunlit Balcony',
    story: 'Channeling clean minimalist serenity, this studio strips away visual clutter to make room for mental stillness. Organic textures, gentle morning daylight, and warm neutral tones create a versatile retreat, perfect for lingering from a few weeks to a full year.',
    floor: '2nd Floor — Minimalist essentials & balcony',
    bedType: '1 Flexible Queen Sofabed',
    capacity: '1–2 adults',
    leaseTerm: 'Flexible: Weekly · Monthly · Annual',
    amenities: [
      'Versatile sofabed with plush cushioning on rustic timber platform.',
      'Streamlined kitchenette thoughtfully integrated with full functionality.',
      'Airy sun-drenched balcony with relaxing lounge chairs.',
      'Open hanging rack and minimalist natural wood storage shelves.',
      'Artisanal paper lantern pendant and woven seagrass rug accents.',
    ],
    features: {
      highlight: 'Wide sunlit balcony and clutter-free layout that liberates the mind',
      atmosphere: 'Serene, organic, gently greeting the early morning light',
      suitableFor: 'Extended travelers and digital nomads on weekly/monthly stays',
    },
  },
  'hem-japandi': {
    concept: 'Wabi-Sabi Wood Slats · Multi-tier Platform · Understated Luxury',
    story: 'Japandi strikes a harmonious balance between the calm contemplation of Japanese architecture and the cozy functionality of Scandinavian living. Every square meter is carefully calibrated to optimize utility while preserving an unmistakable sense of sanctuary.',
    floor: '2nd Floor — Refined & tranquil living',
    bedType: '1 Stepped Timber Platform Bed (1.8m × 2.0m)',
    capacity: '2 adults',
    leaseTerm: 'Flexible: Weekly · Monthly · Annual',
    amenities: [
      'Stepped timber platform bed with discreet built-in underbed storage.',
      'Slatted timber screen separating the bedroom and balcony elegantly.',
      'Fresh emerald tiled kitchenette with warm wooden shelving.',
      'Rustic clothing rack with full-length vanity mirror.',
      'Balcony with decorative breeze bricks casting rhythmic geometric shadows.',
    ],
    features: {
      highlight: 'Multi-functional stepped platform bed and architectural timber slats',
      atmosphere: 'Warm, impeccably detailed, boutique retreat ambiance',
      suitableFor: 'Couples and traveling specialists staying from 1 week to several months',
    },
  },
  'mo-japandi': {
    concept: 'Ergonomic Curved Desk · Glass Brick Luminescence · Contemporary',
    story: 'Infused with modern Japandi dynamism, this studio serves as an inspiring workstation for remote professionals. Fluid curved woodwork and smart space planning balance high productivity with deep, restorative relaxation.',
    floor: '2nd Floor — Modern & adaptable rhythm',
    bedType: '1 Platform King Bed with Privacy Slats',
    capacity: '2 adults',
    leaseTerm: 'Flexible: Weekly · Monthly · Annual',
    amenities: [
      'Ergonomic curved wooden desk beside sun-catching glass block wall.',
      'Quiet stepped bed platform tucked behind natural cane privacy screens.',
      'Open ceiling-height wardrobe system with smart integrated drawers.',
      'Sleek kitchenette with warm back-lit open shelving.',
    ],
    features: {
      highlight: 'Sculptural curved desk and translucent glass block wall for abundant light',
      atmosphere: 'Modern, creative, filled with uplifting positive energy',
      suitableFor: 'Software engineers, creative directors, and remote professionals',
    },
  },
  'hem-scandi': {
    concept: 'Bright Scandinavian · Stepped White Platform · Breezy Balcony',
    story: 'Grounded in Nordic purity, this studio unfolds as a gentle symphony of warm ivory whites and light oak. Every corner is carefully composed to evoke crisp freshness and absolute relaxation.',
    floor: '2nd Floor — Peaceful, sunlit living',
    bedType: '1 Stepped White Platform Bed (1.6m × 2.0m)',
    capacity: '2 adults',
    leaseTerm: 'Flexible: Weekly · Monthly · Annual',
    amenities: [
      'Stepped architectural platform bed delineating the room zones.',
      'Convenient hidden pull-out storage drawers beneath the bed.',
      'Multi-purpose desk integrated seamlessly alongside the steps.',
      'Compact kitchenette with blonde oak cabinetry.',
      'Open balcony with sliding glass doors framing city breezes and sunlight.',
    ],
    features: {
      highlight: 'Crisp white stepped platform opening directly to a sunlit green balcony',
      atmosphere: 'Luminous, refreshing, charged with positive morning vitality',
      suitableFor: 'Weekly guests and long-term residents seeking light-filled serenity',
    },
  },
};
