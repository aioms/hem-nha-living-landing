# Hướng Dẫn Cài Đặt Ghi Nhận Booking Vào Google Sheet & Gửi Telegram

Tài liệu này hướng dẫn bạn cài đặt kết nối giữa Website Landing Page **Hẻm Nhà Living**, bảng tính **Google Sheet `[HèmNhà Living] Info Sheet`** và **Telegram Bot**.

---

## 📋 Bước 1: Mở Apps Script trong Google Sheet

1. Mở file Google Sheet **`[HèmNhà Living] Info Sheet`** trên trình duyệt của bạn (đảm bảo đã có 2 tab: `Early bird-Guest Info-Collection` và `Booking Info-Collection`).
2. Trên thanh menu trên cùng, bấm chọn **Tiện ích mở rộng** (Extensions) → **Apps Script**.
3. Một tab trình duyệt mới sẽ mở ra giao diện lập trình của Google Apps Script.

---

## 📝 Bước 2: Dán Code Backend

1. Trong giao diện Apps Script, xóa toàn bộ code mặc định (`function myFunction() { ... }`).
2. Mở file [apps-script/Code.gs](file:///Users/moment/Projects/personal/lab/demo/landing/hem-nha-living-landing/apps-script/Code.gs) trong dự án này, copy toàn bộ nội dung và dán vào Apps Script.
3. Tìm đến đoạn `const CONFIG = { ... }` ở đầu file và điền thông tin Telegram của bạn:

```javascript
const CONFIG = {
  TELEGRAM_BOT_TOKEN: '123456789:ABCdefGhIjkLmNoPqRsTuVwXyZ', // Thay bằng Token Bot Telegram của bạn
  TELEGRAM_CHAT_ID: '-1001234567890',                         // Thay bằng Chat ID (cá nhân hoặc group)
  NOTIFY_ON_BOOKING: true,                                    // Gửi Telegram khi có khách đặt phòng thường
  NOTIFY_ON_EARLY_BIRD: true,                                 // Gửi Telegram khi có khách đăng ký Early Bird
  TAB_EARLY_BIRD: 'Early bird-Guest Info-Collection',
  TAB_BOOKING: 'Booking Info-Collection'
};
```

4. Bấm biểu tượng **Lưu** (hình đĩa mềm hoặc bấm `Ctrl + S` / `Cmd + S`). Bạn có thể đổi tên dự án thành `HemNha Living Booking API`.

---

## 🧪 Bước 3: Chạy Kiểm Thử 1-Click Ngay Trên Apps Script

Trước khi triển khai, bạn có thể kiểm tra xem bot đã gửi tin nhắn và dữ liệu đã ghi vào Sheet chưa:

1. Trên thanh công cụ của Apps Script, ở ô chọn hàm thực thi (mặc định là `doGet` hoặc `doPost`), bấm chọn hàm:
   - `testEarlyBirdSubmission`: Test ghi form Early Bird và bắn tin nhắn Telegram
   - `testBookingSubmission`: Test ghi form Booking và bắn tin nhắn Telegram
2. Bấm nút **Chạy** (Run / ▶️).
3. Lần đầu tiên chạy, Google sẽ hiện hộp thoại yêu cầu cấp quyền:
   - Bấm **Xem xét quyền** (Review Permissions)
   - Chọn tài khoản Google của bạn
   - Nếu hiện cảnh báo *"Google chưa xác minh ứng dụng này"*, bấm vào **Nâng cao** (Advanced) ở góc dưới bên trái → chọn **Đi tới [Tên dự án] (không an toàn)**
   - Bấm **Cho phép** (Allow)
4. Kiểm tra:
   - Mở tab `Early bird-Guest Info-Collection` trong Google Sheet: sẽ thấy 1 dòng test mới xuất hiện ở các cột A → F.
   - Mở Telegram: sẽ thấy tin nhắn thông báo format đẹp mắt gửi về ngay lập tức!

---

## 🚀 Bước 4: Triển Khai Ứng Dụng Web (Deploy Web App)

Đây là bước quan trọng nhất để Website bên ngoài có thể gửi dữ liệu vào Google Sheet:

1. Ở góc trên bên phải màn hình Apps Script, bấm nút **Triển khai** (Deploy) → chọn **Tùy chọn triển khai mới** (New deployment).
2. Bấm vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại" (Select type) → chọn **Ứng dụng web** (Web app).
3. Cấu hình các mục như sau:
   - **Mô tả** (Description): `HemNha Booking API v1`
   - **Thực thi dưới dạng** (Execute as): **Tôi (địa chỉ email của bạn)** (*Me*)
   - **Ai có quyền truy cập** (Who has access): **Bất kỳ ai** (*Anyone*) ⚠️ **BẮT BUỘC CHỌN MỤC NÀY** để khách truy cập web không cần đăng nhập Google mà vẫn gửi được form.
4. Bấm **Triển khai** (Deploy).
5. Sau khi triển khai xong, Google sẽ cung cấp cho bạn một đường link tại mục **Ứng dụng web > URL** (có dạng `https://script.google.com/macros/s/AKfycb.../exec`).
6. Bấm nút **Sao chép** (Copy) đường link này.

---

## 💻 Bước 5: Cấu Hình URL Vào Dự Án Website

1. Tại thư mục gốc của dự án `hem-nha-living-landing`, tạo một file tên là `.env` (nếu chưa có).
2. Dán URL Web App bạn vừa copy ở Bước 4 vào:

```env
VITE_BOOKING_API_URL=https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxx/exec
```

3. Khởi động lại server dev:
   ```bash
   npm run dev
   ```
   hoặc nếu deploy lên Vercel / Netlify / Hosting:
   Thêm biến môi trường `VITE_BOOKING_API_URL` với giá trị URL ở trên trong phần Environment Variables của hosting.

---

## 🎯 Hoàn Tất & Kiểm Tra Thực Tế Trên Web

1. Mở trang web Hẻm Nhà Living trên trình duyệt.
2. Bấm vào nút **"Đăng ký đợt Early Bird"**:
   - Điền tên, số điện thoại, chọn loại phòng và bấm gửi.
   - Kiểm tra Google Sheet tab `Early bird-Guest Info-Collection` → dữ liệu xuất hiện ngay.
   - Kiểm tra Telegram → nhận thông báo tức thì.
3. Bấm vào nút **"Đặt phòng" (Booking)**:
   - Chọn ngày, chọn phòng (ví dụ Sớm Mai), điền tên và số điện thoại, bấm Xác nhận.
   - Kiểm tra Google Sheet tab `Booking Info-Collection` → dữ liệu xuất hiện ngay.
   - Kiểm tra Telegram → nhận thông báo tức thì.
