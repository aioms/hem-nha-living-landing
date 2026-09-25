import { useInView } from '../hooks/useScroll';
import { AmenitySpace } from '../types';

interface AmenitiesSectionProps {
  amenities: AmenitySpace[];
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [ref, inView] = useInView(0.1);

  const featured = amenities.find(a => a.id === 'rooftop')!;
  const others = amenities.filter(a => a.id !== 'rooftop' && a.id !== 'cafe');

  return (
    <section
      id="amenities"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="Tiện ích trong Hẻm Nhà Living"
    >
      <div ref={ref}>
        {/* Section header */}
        <div className="mb-16">
          <div
            className={`arch-tag mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span>Cuộc sống trong nhà</span>
          </div>
          <h2
            className={`font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-nagi-cardEdge mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Nhiều hơn một chỗ để ngủ.
          </h2>
          <p
            className={`font-serif text-lg text-nagi-slate max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100' : 'opacity-0'}`}
          >
            Từ sân thượng ngắm sao đến bàn bida chiều tà, từ giếng trời ngập sáng đến khu giặt sấy tiện nghi —
            mọi không gian đều được thiết kế để bạn <em>sống thực sự</em> tại đây.
          </p>
        </div>

        {/* Featured: Rooftop — full-bleed editorial */}
        <div
          className={`relative rounded-nagi-lg overflow-hidden mb-8 transition-all duration-900 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative aspect-[21/9] md:min-h-[520px]">
            <img
              src={featured.image}
              alt="Sân thượng Hẻm Nhà Living — không gian mở với pergola, bàn ghế mây và bầu trời thành phố"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2438]/80 via-transparent to-transparent" />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 items-end">
                <div>
                  <span className="arch-tag !text-[#d8bc8e] !border-[#d8bc8e]/40 mb-4 block">
                    {featured.hours}
                  </span>
                  <h3 className="font-script text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#d8bc8e] mb-2">
                    {featured.name}
                  </h3>
                  <p className="font-sans text-sm text-[#8e97ad] tracking-wide">
                    {featured.tagline}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-base text-[#e9ddca] leading-relaxed">
                    {featured.description}
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
                  <h3 className="font-script text-[clamp(2rem,4vw,3.5rem)] text-nagi-terracotta mb-1">
                    {amenity.name}
                  </h3>
                  <p className="font-sans text-sm text-nagi-muted mb-4">{amenity.tagline}</p>
                  <p className="font-serif text-base text-nagi-slate leading-relaxed mb-6">
                    {amenity.description}
                  </p>
                  <ul className="space-y-2">
                    {amenity.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 font-sans text-sm text-nagi-slate">
                        <span className="text-nagi-gold text-xs mt-0.5">✦</span>
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
