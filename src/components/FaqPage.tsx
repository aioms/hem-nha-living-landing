import { useLanguage } from '../context/LanguageContext';
import { getFaqs } from '../seo/faqs';
import { localizedPath } from '../seo/routes';

export default function FaqPage() {
  const { language } = useLanguage();
  return <section className="bg-nagi-sand pt-28 pb-20 px-6 md:px-10 lg:px-16">
    <div className="max-w-[1280px] mx-auto">
      <a href={localizedPath('/', language)} className="text-xs text-nagi-muted hover:underline">← {language === 'vi' ? 'Trang chủ' : 'Home'}</a>
      <h1 className="font-sans text-3xl md:text-5xl font-medium text-nagi-cardEdge mt-8 mb-6">{language === 'vi' ? 'Hỏi đáp thường gặp' : 'Frequently asked questions'}</h1>
      <p className="text-nagi-slate mb-10">{language === 'vi' ? 'Những điều bạn cần biết trước khi tìm một nhịp sống riêng ở Hẻm Nhà.' : 'Things to know before finding your own pace at Hẻm Nhà.'}</p>
      <div className="space-y-6 max-w-3xl">{getFaqs(language, true).map(({ q, a }) => <article key={q} className="rounded-nagi-lg bg-nagi-sandAlt p-6 border border-nagi-border/20">
        <h2 className="font-sans font-semibold text-lg text-nagi-cardEdge mb-3">{q}</h2>
        <p className="text-nagi-slate leading-relaxed">{a}</p>
      </article>)}</div>
      <a href={localizedPath('/chinh-sach-huy-phong', language)} className="inline-block mt-8 text-nagi-terracotta underline">{language === 'vi' ? 'Chính sách hủy phòng' : 'Cancellation policy'}</a>
    </div>
  </section>;
}
