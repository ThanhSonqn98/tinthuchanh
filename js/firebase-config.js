/**
 * CẤU HÌNH KẾT NỐI FIREBASE REALTIME DATABASE (TÙY CHỌN)
 * Giúp đồng bộ điểm số và bảng xếp hạng THỜI GIAN THỰC qua mạng Internet giữa tất cả các máy tính.
 *
 * HƯỚNG DẪN CẤU HÌNH (Chỉ mất 2 phút, HOÀN TOÀN MIỄN PHÍ):
 * 1. Truy cập https://console.firebase.google.com/ và đăng nhập bằng tài khoản Google.
 * 2. Bấm "Add project" (Tạo dự án mới), đặt tên ví dụ: "tinhoc-tieuhoc".
 * 3. Vào mục "Build" -> "Realtime Database" -> Bấm "Create Database" -> Chọn chế độ "Start in test mode".
 * 4. Vào "Project settings" (biểu tượng bánh răng) -> Kéo xuống mục "Your apps" -> Bấm biểu tượng Web (</>) -> Copy đoạn config dán vào bên dưới:
 */

const FIREBASE_CONFIG = {
  // Thay thế các thông tin bên dưới bằng thông tin dự án Firebase của bạn nếu muốn đồng bộ qua mạng Internet:
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Tự động kiểm tra nếu người dùng đã cấu hình Firebase hợp lệ
window.FIREBASE_ENABLED = Boolean(
  FIREBASE_CONFIG && 
  FIREBASE_CONFIG.apiKey && 
  FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY"
);
