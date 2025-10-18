# Hotel Admin Demo

A Next.js (App Router) + Tailwind CSS admin dashboard for hotel management (demo/local, JSON file storage).

## Chức năng chính
- Quản lý người dùng: thêm/sửa/xóa, phân quyền.
- Quản lý khách hàng: danh sách, tìm kiếm.
- Quản lý phòng: CRUD, phân loại, trạng thái.
- Quản lý đặt phòng: danh sách, cập nhật.
- Dịch vụ: CRUD.
- Thanh toán & hóa đơn: danh sách, xuất CSV.
- Phản hồi & khiếu nại: xem, đổi trạng thái.
- Báo cáo: biểu đồ doanh thu theo tháng.
- Cấu hình hệ thống: thông tin khách sạn, múi giờ, ngôn ngữ, tiền tệ.
- Bảo mật & nhật ký: xem log hành động (demo).

## Yêu cầu
- Node.js 18+ (đang dùng v22.20.0 trong môi trường này)

## Cài đặt & chạy
```bash
npm install
npm run dev
```
Mặc định chạy ở `http://localhost:3000`. Admin nằm ở đường dẫn `/admin`.

## Đăng nhập
- Email: `admin@example.com`
- Mật khẩu: `admin123`

## Lưu ý
- Dữ liệu lưu ở thư mục `data/*.json`. Đây chỉ là demo file-system, không dùng cho production.
- JWT Secret: dùng biến môi trường `JWT_SECRET` để override (mặc định giá trị demo).
- Một số chức năng như gửi email/SMS, in hóa đơn PDF chưa được tích hợp; có stub xuất CSV.
