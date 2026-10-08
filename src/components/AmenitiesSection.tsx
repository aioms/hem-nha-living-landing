import { useInView } from '../hooks/useScroll';
import { AmenitySpace } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedAmenity } from '../utils/localizedContent';

interface AmenitiesSectionProps {
  amenities: AmenitySpace[];
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView(0.1);

  const localizedAmenities = amenities.map(a => getLocalizedAmenity(a, language));
  const featured = localizedAmenities.find(a => a.id === 'rooftop')!;
  const others = localizedAmenities.filter(a => a.id !== 'rooftop' && a.id !== 'cafe');

  return (
    <section
      id="amenities"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="Amenities at Hẻm Nhà Living"
    >
      <div ref={ref}>
        {/* Section header */}
        <div className="mb-16">
          <div
            className={`arch-tag mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span>{t.amenities.label}</span>
          </div>
          <h2
            className={`font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-nagi-cardEdge mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {t.amenities.title}
          </h2>
          <p
            className={`text-base md:text-lg text-nagi-slate max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}
          >
            {t.amenities.desc}
          </p>
        </div>

        {/* Featured: Rooftop — full-bleed editorial */}
        <div
          className={`relative rounded-nagi-lg overflow-hidden mb-8 transition-all duration-900 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] min-h-[440px] md:min-h-[520px]">
            <img
              src={featured.image}
              alt="Hẻm Nhà Living Rooftop Terrace"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a2e]/95 via-[#1e2a2e]/60 to-transparent" />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid md:grid-cols-2 gap-6 items-end">
                <div className="min-w-0">
                  <span className="arch-tag !text-[#d9c7b0] !border-[#d9c7b0]/40 mb-3 sm:mb-4 block">
                    {t.amenities.rooftopHours || featured.hours}
                  </span>
                  <h3 className="font-sans font-normal text-[clamp(2rem,5vw,3.5rem)] leading-none text-[#d9c7b0] mb-2 tracking-tight">
                    {t.amenities.rooftopName || featured.name}
                  </h3>
                  <p className="font-sans text-sm text-[#79a594] tracking-wide">
                    {t.amenities.rooftopTagline || featured.tagline}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-base md:text-lg text-[#faf6f0] leading-relaxed max-w-full break-words">
                    {t.amenities.rooftopDesc || featured.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery row for rooftop */}
        <div
          className={`grid grid-cols-3 gap-4 mb-20 transition-all duration-700 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          {featured.gallery.map((src, i) => (
            <div key={i} className="rounded-nagi overflow-hidden">
              <img
                src={src}
                alt={`Sân thượng Hẻm Nhà Living — góc ${i + 1}`}
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Other amenities — horizontal editorial rows */}
        <div className="space-y-16">
          {others.map((amenity, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={amenity.id}
                className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${(idx + 2) * 100}ms` }}
              >
                {/* Image */}
                <div className={`${isEven ? '' : 'md:order-2'} rounded-nagi-md overflow-hidden`}>
                  <img
                    src={amenity.image}
                    alt={`${amenity.name} — ${amenity.tagline}`}
                    className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-600"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className={isEven ? '' : 'md:order-1'}>
                  <span className="arch-tag mb-5 block">{amenity.hours}</span>
                  <h3 className="font-sans font-normal text-[clamp(1.75rem,3.5vw,2.5rem)] text-nagi-terracotta mb-1 tracking-tight">
                    {amenity.name}
                  </h3>
                  <p className="font-sans text-sm text-nagi-muted mb-4">{amenity.tagline}</p>
                  <p className="text-base text-nagi-slate leading-relaxed mb-6">
                    {amenity.description}
                  </p>
                  <ul className="space-y-2">
                    {amenity.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 font-sans text-sm text-nagi-slate">
                        <span className="text-[#2f5244] text-xs mt-0.5">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
