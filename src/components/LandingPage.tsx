import Image from './Image';
import { useLanguage } from '../context/LanguageContext';
import { LANDINGS, type Cell } from '../seo/landings';
import type { LandingId } from '../seo/routes';

export const LANDING_IMAGES: Record<LandingId, { src: string; alt: string }> = {
  'homestay-quan-7': {
    src: '/assets/photos/rooms/som-mai/hero.webp',
    alt: 'Phòng homestay Sớm Mai tại Hẻm Nhà Living — không gian sofa thư giãn với đèn mây bồng bềnh và ánh nắng sớm',
  },
  'short-stay-district-7': {
    src: '/assets/photos/rooms/som-mai/hero.webp',
    alt: 'Sớm Mai homestay room at Hẻm Nhà Living — sunlit relaxation lounge with cloud pendant and morning light',
  },
  'studio-thue-thang-quan-7': {
    src: '/assets/photos/diy-living/mo-japandi/page_085.jpeg',
    alt: 'Studio Mo-Japandi tại Hẻm Nhà Living — không gian làm việc và nghỉ ngơi với bàn làm việc gỗ tự nhiên',
  },
  'monthly-studio-district-7': {
    src: '/assets/photos/diy-living/mo-japandi/page_085.jpeg',
    alt: 'Mo-Japandi studio at Hẻm Nhà Living — furnished living and workspace with natural wood desk',
  },
  'homestay-gan-phu-my-hung': {
    src: '/assets/photos/rooms/trua-he/hero.webp',
    alt: 'Phòng homestay Mơ Trưa tại Hẻm Nhà Living — không gian phòng khách ấm cúng với sofa êm ái và mảng tường cam đất',
  },
  'cho-o-gan-secc': {
    src: '/assets/photos/rooms/dem-sao/hero.webp',
    alt: 'Phòng homestay Đêm Sao tại Hẻm Nhà Living — giường Queen êm ái, màn chiếu thư giãn và không gian tone xanh đêm',
  },
};

// Static, crawlable landing layout built from existing site styles (no scroll-reveal state, so HTML is visible before JS).
const card = 'rounded-nagi-lg bg-nagi-sandAlt border border-nagi-border/20 p-6 md:p-8';
const link = 'text-nagi-terracotta underline hover:text-nagi-cardEdge';

function CellView({ cell }: { cell: Cell }) {
  return typeof cell === 'string' ? <>{cell}</> : <a href={cell.href} className={link}>{cell.text}</a>;
}

export default function LandingPage({ id, onBookingOpen, onOpenEarlyBird }: { id: LandingId; onBookingOpen: () => void; onOpenEarlyBird: () => void }) {
  const { language } = useLanguage();
  const page = LANDINGS[id];
  const landingImage = LANDING_IMAGES[id];
  const home = language === 'vi' ? '/' : '/en';
  return <section className="bg-nagi-sand pt-24 pb-20">
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
      <nav aria-label="Breadcrumb" className="text-xs text-nagi-muted flex gap-2 mb-8">
        <a href={home} className="hover:underline">{page.labels.home}</a><span>/</span><span>{page.breadcrumb}</span>
      </nav>
      <h1 className="font-sans text-3xl md:text-5xl font-medium text-nagi-cardEdge leading-tight max-w-4xl mb-6">{page.h1}</h1>
      {landingImage && <div className="mb-8 overflow-hidden rounded-nagi-lg shadow-floating-card max-w-4xl">
        <Image
          src={landingImage.src}
          alt={landingImage.alt}
          className="w-full h-auto max-h-[480px] object-cover rounded-nagi-lg"
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1280px) 896px, (min-width: 768px) 80vw, 100vw"
        />
      </div>}
      <div className="space-y-4 max-w-3xl text-base md:text-lg text-nagi-slate leading-relaxed mb-12">
        {page.intro.map(text => <p key={text}>{text}</p>)}
      </div>
      <div className="space-y-8">
        {page.sections.map(section => <section key={section.id} id={section.id} className={`${card} scroll-mt-28`}>
          <h2 className="font-sans text-xl md:text-2xl font-semibold text-nagi-cardEdge mb-4">{section.h2}</h2>
          {section.paragraphs?.map(text => <p key={text} className="text-nagi-slate leading-relaxed mb-4 max-w-3xl">{text}</p>)}
          {section.table && <div className="overflow-x-auto mb-4">
            <table className="w-full text-left text-sm text-nagi-slate border-collapse">
              <thead><tr>{section.table.head.map(head => <th key={head} className="font-semibold py-2 pr-4 border-b border-nagi-border/30 whitespace-nowrap">{head}</th>)}</tr></thead>
              <tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, i) => <td key={i} className="py-3 pr-4 border-b border-nagi-border/15 align-top">{i === 0 ? <strong><CellView cell={cell} /></strong> : <CellView cell={cell} />}</td>)}</tr>)}</tbody>
            </table>
          </div>}
          {section.bullets && <ul className="space-y-2 text-nagi-slate leading-relaxed list-disc pl-5 max-w-3xl mb-4">{section.bullets.map(text => <li key={text}>{text}</li>)}</ul>}
          {(section.links || section.mapLink) && <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {section.mapLink && <a href={section.mapLink} target="_blank" rel="noopener noreferrer" className={link}>{page.labels.mapText} ↗</a>}
            {section.links?.map(item => <a key={item.href} href={item.href} className={link}>{item.text}</a>)}
          </p>}
        </section>)}
        <section id="faq" className={`${card} scroll-mt-28`}>
          <h2 className="font-sans text-xl md:text-2xl font-semibold text-nagi-cardEdge mb-6">{page.faqTitle}</h2>
          <div className="space-y-6 max-w-3xl">{page.faqs.map(({ q, a }) => <article key={q}>
            <h3 className="font-sans font-semibold text-lg text-nagi-cardEdge mb-2">{q}</h3>
            <p className="text-nagi-slate leading-relaxed">{a}</p>
          </article>)}</div>
          <p className="mt-6 text-sm"><a href={language === 'vi' ? '/faq' : '/en/faq'} className={link}>{language === 'vi' ? 'Tất cả câu hỏi thường gặp' : 'All frequently asked questions'}</a></p>
        </section>
        <section id="dat-phong" className={`${card} scroll-mt-28`}>
          <h2 className="font-sans text-xl md:text-2xl font-semibold text-nagi-cardEdge mb-4">{page.cta.title}</h2>
          <p className="text-nagi-slate leading-relaxed max-w-3xl mb-6">{page.cta.text}</p>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={onBookingOpen} className="btn-primary text-sm px-6 py-3">{page.cta.book}</button>
            {page.cta.earlyBird && <button type="button" onClick={onOpenEarlyBird} className="btn-ghost text-sm px-6 py-3">{page.cta.earlyBird}</button>}
            <a href="tel:+84912254657" className="btn-ghost text-sm px-6 py-3">{page.cta.phone}</a>
            <a href={`mailto:${page.cta.email}`} className="btn-ghost text-sm px-6 py-3">{page.cta.email}</a>
          </div>
        </section>
      </div>
    </div>
  </section>;
}
