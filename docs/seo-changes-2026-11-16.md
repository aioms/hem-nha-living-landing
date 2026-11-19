# Thay đổi SEO/AEO — Hẻm Nhà Living — 16/11/2026

## Phạm vi và kết quả

Triển khai trên nhánh `seo/aeo-improvements`. Đã đọc `CLAUDE.md`, `DESIGN.md`, `tokens/typography.json` và đối chiếu audit với code. Kiểm tra read-only trên live xác nhận `server: Vercel`, `/homestay` trả 404; link Google Maps chuyển đến địa điểm Hẻm Nhà Living với tọa độ `10.7483367, 106.7266712`.

Không push, không deploy, không chỉnh `.env`. Các kết quả dưới đây là bản build và trình duyệt cục bộ; chưa phải bằng chứng thay đổi đã có trên production.

## Những gì đã thay đổi

### HTML tĩnh và URL thật

Dùng React `renderToString` cùng build SSR của Vite để tạo HTML lúc build; phía trình duyệt dùng `hydrateRoot` để tiếp tục hoạt động tương tác. Không chuyển framework, không thêm dịch vụ render, không cần server Node khi phục vụ site. Đây là mô hình prerender + hydration được mô tả trong [tài liệu Vite SSR](https://vite.dev/guide/ssr.html).

Có **20 URL nội dung × 2 ngôn ngữ = 40 trang**:

| Nhóm | URL tiếng Việt |
| --- | --- |
| Trang chủ | `/` |
| Homestay | `/homestay` |
| Phòng homestay | `/homestay/som-mai`, `/homestay/mo-trua`, `/homestay/hoang-hon`, `/homestay/dem-sao` |
| Studio dài hạn | `/thue-thang` |
| Từng studio | `/thue-thang/hem-diy-1`, `/thue-thang/hem-diy-2`, `/thue-thang/hem-minimal`, `/thue-thang/hem-japandi`, `/thue-thang/mo-japandi`, `/thue-thang/hem-scandi` |
| Cafe và tiện ích | `/cafe`, `/tien-ich` |
| Hỏi đáp | `/faq` |
| Chính sách | `/chinh-sach`, `/dieu-khoan`, `/chinh-sach-huy-phong`, `/chinh-sach-bao-mat` |

Bản Anh là `/en` và `/en/...` tương ứng. Mỗi trang có HTML chứa nội dung thật, một H1, địa chỉ/điện thoại, links, FAQ và JSON-LD. Trang phòng riêng chứa câu chuyện, thông số, toàn bộ tiện nghi và các dấu ấn không gian trong dữ liệu phòng.

Output dùng `dist/homestay.html`, `dist/homestay/mo-trua.html`, `dist/en/faq.html`… để cả Vercel clean URLs và `vite preview` đều trả đúng HTML khi URL không có dấu `/` cuối. Có `dist/404.html` với `noindex`. Không dùng rewrite mọi URL về trang chủ trên Vercel.

Đổi các nút điều hướng chính, tên phòng, breadcrumb, bộ lọc chính sách và chọn ngôn ngữ thành `<a href>` thật. Click thường tiếp tục điều hướng trong React; mở tab mới và truy cập không JS vẫn có tài liệu HTML. Các hash chia sẻ cũ như `#moments`, `#moments/trua-he`, `#diy-living/hem-scandi`, `#terms`, `#privacy-policy` vẫn chuyển đúng trang khi chạy JS. Các section trang chủ vẫn tồn tại, gồm `#contact`, `#cafe`, `#amenities`.

URL quyết định ngôn ngữ. Bỏ tự đổi sang tiếng Anh theo `navigator.language` hoặc localStorage để tránh HTML Việt bị hydrate thành tiếng Anh dưới cùng canonical. Hai bản có `lang`, metadata, JSON-LD và `hreflang` khớp nhau, gồm `vi`, `en`, `x-default`.

### Metadata, entity và nội dung trích dẫn

- Title/description riêng cho toàn bộ 40 URL; trang chính và phòng có thông tin loại hình/Quận 7 phù hợp. Bỏ `meta name="title"` xung đột và meta keywords.
- Canonical, `og:url`, schema URLs cùng dùng `https://hemnhaliving.com`. OG/Twitter có title/description theo trang, locale và ảnh tuyệt đối.
- Ảnh chia sẻ `public/assets/og/hem-nha-living.jpg` đúng **1200×630**, ghép ảnh mặt tiền và logo gốc, giữ màu nền thương hiệu; đã xem ảnh kết quả. Không dùng ảnh dọc làm preview.
- JSON-LD gồm `LodgingBusiness` (cũng thuộc nhóm Organization), `WebSite`, `WebPage`, `FAQPage`; trang chủ/cafe thêm `CafeOrCoffeeShop`. NAP, email, geo, URL, Maps, sameAs, check-in/check-out lấy từ dữ liệu đã có. Địa chỉ ghi rõ Tân Thuận, Quận 7; không tự thêm mã bưu chính hoặc số phòng toàn tòa nhà.
- FAQPage sử dụng đúng câu hỏi/đáp án có trong nội dung HTML. `/faq` có **13 câu**: 8 câu về địa chỉ, mở cửa, hình thức lưu trú, giờ nhận/trả phòng, sức chứa, cafe, tiện ích và bảng giá; 5 câu dùng chung với footer về hủy phòng, đặt cọc và 3 câu hỏi cũ. Hủy phòng và đặt cọc dùng quyết định chủ nhà đã chốt; không tự thêm khoảng cách, thời gian di chuyển hay giá chính xác.
- Thống nhất tên hiển thị **Mơ Trưa**. Giữ ID `trua-he` và đường dẫn ảnh cũ trong dữ liệu để tương thích; URL công khai là `/homestay/mo-trua`.
- Sửa “trung tâm Sài Gòn” / “heart of Saigon” trong copy vị trí thành Tân Thuận, Quận 7. Giữ các câu thương hiệu nói về nhịp sống Sài Gòn.

Các nguồn chính: `src/seo/routes.ts` quản lý URL và metadata; `src/seo/metadata.ts` dựng head/schema; `src/seo/faqs.ts` dùng lại FAQ hiện có và các câu trả lời từ thông tin trong repo.

### Robots, sitemap và llms.txt

- `public/robots.txt`: cho phép search/AI crawlers, gồm OAI-SearchBot, ChatGPT-User, GPTBot, Claude, Perplexity, Google-Extended; khai báo sitemap.
- `dist/sitemap.xml`: sinh từ cùng registry URL mỗi lần build, đủ 40 canonical, không đưa hash, alias, 404 hoặc URL không tồn tại vào sitemap. Không tự bịa `lastmod`.
- `public/llms.txt`: thông tin ngắn, địa chỉ, liên hệ, dự kiến mở cửa, loại hình lưu trú, tiện ích và links chính; được chép vào dist. Không công bố bảng giá số còn chưa được duyệt.

Các file này hỗ trợ tìm và đọc nội dung; không bảo đảm Google index, rich result hoặc công cụ AI sẽ trích dẫn.

### Hosting và cache

Thêm `vercel.json` cho hosting đã xác nhận bằng header live:

- Build `npm run build`, phục vụ `dist`, dùng `cleanUrls: true`, không thêm SPA catch-all của preset Vite (`framework: null`).
- Redirect **301** host `www.hemnhaliving.com` về apex; `/index.html` về `/`; các URL lồng `/index.html` về path cha; alias `homestay/trua-he` về `homestay/mo-trua` cho cả Việt/Anh.
- JS/CSS có hash ở `/assets/:file` và ảnh có hash ở `/assets/optimized/` dùng `public, max-age=31536000, immutable`.
- Không áp cache immutable cho HTML, OG hoặc các tài liệu discovery có tên cố định.

Cấu hình theo [tài liệu project configuration của Vercel](https://vercel.com/docs/project-configuration). `vite preview` không thực thi redirects/headers Vercel; những hành vi này còn phải xác minh trên hosting sau một lần deploy được chủ nhà cho phép. HTTP→HTTPS và Domain Redirect trong dashboard cũng cần kiểm tra lúc đó; không sửa dashboard trong tác vụ này.

### Ảnh và font

- `scripts/images.mjs` đọc dữ liệu nhị phân thật bằng Sharp, không chỉ đổi đuôi. Sinh WebP cho 92 URL ảnh/logo được tham chiếu, với các cỡ tối đa 480/960/1600px, không upscale.
- Tên file chứa hash của nội dung/recipe; manifest dùng chung cho SSR và trình duyệt. Đã kiểm tra **257 derivative thực sự có format WebP** được HTML tham chiếu.
- Tổng dung lượng nguồn được xử lý: **29,50 MiB → 8,76 MiB** khi cộng bản WebP lớn nhất của mỗi nguồn, giảm khoảng **70,3%**. Đây không phải dung lượng tải trang chủ; bộ derivative nhỏ còn được xuất thêm cho `srcset`.
- Thêm width/height, `srcset`, `sizes`, decode async và lazy loading mặc định. Hero chính vẫn eager/high priority; logo điều hướng eager. Ảnh phòng đầu tiên ưu tiên tải, các ảnh/phòng sau lazy.
- Thumbnail có alt mô tả; hai ảnh thuần trang trí giữ `alt=""` kèm `aria-hidden="true"` đúng vai trò.
- Ảnh gốc và logo gốc **vẫn giữ trong repo**. `dist` bỏ thư mục ảnh nguồn và các bản export logo không dùng; ảnh người xem nhận là derivative. Tổng `dist` khoảng 24 MiB.
- Giữ Be Vietnam Pro, Cormorant Garamond và Pinyon Script theo chuẩn hiện tại. Google Fonts chỉ tải Be Vietnam Pro normal 300/400/500/600/700 và italic 400, bỏ các weight italic dư và khai báo tải Cormorant/Pinyon trùng với font local. Chưa self-host Be Vietnam Pro.

Không đổi palette, class bố cục hoặc nội dung thương hiệu chính của landing. Trang mới dùng card/section hiện có. So sánh cục bộ với bản gốc `698b57f`, ở viewport 1440×900 và 390×844, các section trang chủ có vị trí/kích thước lệch dưới 0,1px sau khi ổn định. Lần so này chặn request bên ngoài ở cả hai bản; đây là kiểm tra geometry/font stack, không phải kiểm tra pixel toàn bộ dưới mọi điều kiện mạng.

## Quyết định chủ nhà đã áp dụng

### Giá

Giá studio công bố dạng `.x` là nguồn duy nhất. Đã bỏ toàn bộ trường giá số tuần/tháng và các TODO chờ duyệt liên quan. Booking giữ giá `.x`, kỳ thuê và yêu cầu liên hệ xác nhận tổng; không nhân thành tổng hay tiền cọc chính xác.

| Phòng / kỳ thuê | Giá công bố |
| --- | --- |
| Mo-Japandi / tháng | `7.x M đ` |
| Hẻm Scandi / tuần | `3.x M đ` |
| Hẻm Scandi / tháng | `8.x M đ` |

Giá homestay hiện có giữ nguyên. Không xuất `Offer`, `price`, `priceRange` hay availability giả định vào JSON-LD. FAQ hiển thị và JSON-LD dùng chung nội dung; llms.txt đồng bộ Việt/Anh. Build sinh lại 40 trang Việt/Anh và trang 404.

### Chính sách và tầng studio

1. **Hủy phòng:** miễn phí trước giờ nhận phòng ít nhất 48 giờ, hoàn toàn bộ khoản đã thanh toán. Giữ quy định không hoàn tiền khi báo hủy dưới 48 giờ hoặc không đến. Đổi ngày cần báo trước ít nhất 48 giờ; không còn các tầng thời gian cũ.
2. **Đặt cọc:** homestay ngắn ngày 50%; thuê dài hạn (tuần/tháng/năm) theo thỏa thuận. Dùng chung nội dung giữa modal, chính sách và FAQ footer.
3. **Tầng studio:** Hẻm Living ở tầng 2. Hẻm DIY thuê năm tại tầng trệt giữ nguyên.

### Các phạm vi khác giữ nguyên

4. **DIY:** mô tả marketing nói studio thô/tự bài trí nhưng dữ liệu liệt kê sofabed, giường, bếp/tủ lạnh. Cần chốt hạng mục bàn giao; chưa tự sửa tiện nghi.
5. **Ngày mở cửa/giờ vận hành:** tháng 12/2026 giữ là dự kiến; giờ check-in/out, cafe/rooftop/giải trí lấy từ repo. Chủ nhà nên xác nhận lại trước mở bán; chưa khai báo doanh nghiệp đã hoạt động hoặc ngày khai trương chính xác trong schema.
6. **Form booking/Early Bird:** luồng cũ có localStorage fallback khi backend thiếu hoặc lỗi; không sửa backend hay gửi lead thật trong tác vụ SEO. Chưa xác minh lead đi đến Sheet/Telegram. Chủ nhà cần thử end-to-end bằng cấu hình thật trong tác vụ riêng.
7. Giữ `.env`, ảnh/font nguồn và hai tài liệu audit/task có sẵn nguyên trạng. Không thêm analytics/tracker, Search Console property hoặc Google Business Profile mới.

## Cách kiểm tra lại

Yêu cầu Node phù hợp với Vite 8 (lần kiểm này dùng Node 22.22.3).

```sh
npm ci
npm run build
npm run check:seo
npx playwright install chromium
npm run test:seo
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

`npm run dev` cũng tự sinh manifest/ảnh trước khi chạy Vite. Sitemap được sinh vào dist trong build; không chỉnh sitemap thủ công. Khi thêm route, sửa registry và build lại. Khi thêm ảnh hoặc sửa recipe ảnh, chạy lại dev/build.

Ví dụ kiểm tra raw HTML bằng terminal, không render JS:

```sh
curl -s http://127.0.0.1:4173/
curl -s http://127.0.0.1:4173/homestay/mo-trua
curl -s http://127.0.0.1:4173/thue-thang/hem-scandi
curl -s http://127.0.0.1:4173/en/faq
curl -I http://127.0.0.1:4173/robots.txt
curl -I http://127.0.0.1:4173/sitemap.xml
curl -I http://127.0.0.1:4173/llms.txt
```

Có thể mở trực tiếp `dist/index.html`, `dist/homestay/mo-trua.html`, `dist/en/faq.html` để xem source. Phải thấy title/canonical đúng route, H1, địa chỉ, nội dung phòng/FAQ và `application/ld+json` trong file, không cần chờ JS.

Kết quả đã chạy:

- `npm run build`: **PASS**, xuất 40 trang + 404.
- `npm run check:seo`: **PASS**, kiểm tra title/description riêng, canonical/OG, hreflang, NAP, schema, FAQ khớp nội dung, đồ thị link đi tới đủ 40 trang, mọi ảnh tham chiếu tồn tại/WebP thật, OG 1200×630, discovery files và cấu hình hosting.
- `npm run test:seo`: **8/8 PASS**. Thêm kiểm tra giá `.x`, tầng studio, tổng thuê tháng không suy diễn giá số, cọc 50% homestay và hủy miễn phí 48 giờ trong booking Việt/Anh; studio modal/booking kiểm tra ở màn hình 390px. HTTP/HTML và hydration của cả 40 URL; chuyển trang không reload; đổi ngôn ngữ; back/forward; hash cũ; policy tabs; scroll contact; đọc không JS ở desktop/mobile; mobile menu và modal chi tiết. Chặn request ngoài trong test, không gửi form thật.
- Grep `dist/`: **PASS**, không còn giá cũ, tiền cọc hoặc ngưỡng hủy/tầng studio mâu thuẫn. Các chuỗi số trùng trong CSS/SVG, tọa độ và tên ảnh không phải nội dung chính sách.
- `git diff --check`: **PASS**.
- `curl` trên preview: `/en/homestay/mo-trua` trả HTML Anh đúng route; robots/sitemap/llms đều 200.

Không có script lint riêng trong repo. Build đã chạy TypeScript. Vite vẫn có cảnh báo client chunk khoảng 507 kB trước gzip (~139 kB gzip); chưa tách bundle trong đợt này. `npm audit` ghi nhận 2 nhóm advisory high có sẵn ở Vite và source-map-js trong toolchain; chưa nâng dependency ngoài phạm vi SEO. Chưa chạy PageSpeed/Lighthouse, external schema validator hoặc kiểm tra index/ranking/AI citation production.

Sau khi chủ nhà cho phép triển khai ở tác vụ khác: kiểm tra 301 www/index.html bằng `curl -I`, cache headers của JS/CSS/ảnh hash, URL không tồn tại trả 404, HTTP→HTTPS, sitemap trong Search Console và structured data. Cần lấy bằng chứng từ hosting thật vì preview không áp dụng `vercel.json`.
