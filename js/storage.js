/**
 * HỆ THỐNG LƯU TRỮ VÀ XẾP HẠNG THỜI GIAN THỰC (REALTIME STORAGE & LEADERBOARD)
 * Hỗ trợ LocalStorage, Đồng bộ đa Tab bằng BroadcastChannel, và Tích hợp Firebase Realtime DB
 */

class StorageManager {
  constructor() {
    this.STORAGE_KEY_RECORDS = "tinhoc_game_records_v1";
    this.STORAGE_KEY_USER = "tinhoc_current_user_v1";
    this.STORAGE_KEY_FIREBASE = "tinhoc_firebase_config_v1";
    
    this.channel = null;
    this.firebaseApp = null;
    this.firebaseDb = null;
    this.listeners = [];

    this.initBroadcastChannel();
    this.seedInitialDataIfEmpty();
    this.initFirebase();
  }

  // Khởi tạo kết nối Firebase Realtime Database nếu có cấu hình
  initFirebase() {
    if (window.FIREBASE_ENABLED && window.firebase && window.FIREBASE_CONFIG) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.FIREBASE_CONFIG);
        }
        this.firebaseDb = firebase.database();
        window._firebaseDbReady = true;

        // Lắng nghe dữ liệu thời gian thực từ Cloud Firebase
        const dbRef = this.firebaseDb.ref("tinhoc_records");
        dbRef.limitToLast(150).on("value", (snapshot) => {
          const val = snapshot.val();
          if (val) {
            const cloudRecords = Object.values(val);
            this.mergeCloudRecords(cloudRecords);
          }
        });
        console.log("⚡ Đã kết nối Firebase Realtime Database thành công!");
      } catch (e) {
        console.warn("Không thể kết nối Firebase:", e);
      }
    }
  }

  // Đồng bộ và gộp dữ liệu từ Firebase vào LocalStorage
  mergeCloudRecords(cloudList) {
    if (!Array.isArray(cloudList) || cloudList.length === 0) return;
    const current = this.getAllRecords();
    const map = new Map();

    // Thêm bản ghi hiện tại vào map
    current.forEach((item) => {
      if (item && item.id) map.set(item.id, item);
    });

    // Gộp bản ghi từ Firebase (ghi đè hoặc thêm mới)
    cloudList.forEach((item) => {
      if (item && item.id) map.set(item.id, item);
    });

    const merged = Array.from(map.values());
    merged.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.timeSpent !== b.timeSpent) return a.timeSpent - b.timeSpent;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    try {
      localStorage.setItem(this.STORAGE_KEY_RECORDS, JSON.stringify(merged));
    } catch (e) {}

    // Báo cho UI cập nhật
    if (cloudList.length > 0) {
      this.notifyListeners(cloudList[cloudList.length - 1]);
    }
  }

  // Khởi tạo kênh phát thanh đồng bộ tức thì giữa các tab trình duyệt
  initBroadcastChannel() {
    try {
      if ("BroadcastChannel" in window) {
        this.channel = new BroadcastChannel("tinhoc_realtime_sync");
        this.channel.onmessage = (event) => {
          if (event.data && event.data.type === "NEW_SCORE") {
            this.notifyListeners(event.data.record);
          }
        };
      }
    } catch (e) {
      console.warn("BroadcastChannel không khả dụng:", e);
    }
  }

  // Đăng ký hàm lắng nghe khi có điểm số mới cập nhật
  onScoreUpdate(callback) {
    this.listeners.push(callback);
  }

  notifyListeners(newRecord) {
    this.listeners.forEach((cb) => {
      try {
        cb(newRecord);
      } catch (err) {
        console.error("Lỗi listener bảng xếp hạng:", err);
      }
    });
  }

  // Lưu thông tin học sinh đang đăng nhập
  setCurrentUser(userData) {
    try {
      localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(userData));
    } catch (e) {
      console.error("Không thể lưu user:", e);
    }
  }

  getCurrentUser() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  clearCurrentUser() {
    localStorage.removeItem(this.STORAGE_KEY_USER);
  }

  // Lấy toàn bộ bản ghi điểm số
  getAllRecords() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_RECORDS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Lưu một lượt chơi mới của học sinh
  saveGameRecord(record) {
    const records = this.getAllRecords();

    // Chuẩn hóa bản ghi
    const newRecord = {
      id: "rec_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      studentName: record.studentName.trim(),
      studentClass: record.studentClass.trim().toUpperCase(),
      grade: Number(record.grade),
      topicId: record.topicId,
      lessonId: record.lessonId,
      lessonTitle: record.lessonTitle || "",
      score: Number(record.score),
      maxScore: Number(record.maxScore || 100),
      accuracy: Math.round(record.accuracy || 100),
      timeSpent: Number(record.timeSpent || 0), // Số giây hoàn thành
      avatar: record.avatar || "🤖",
      timestamp: new Date().toISOString()
    };

    // Thêm bản ghi mới lên đầu danh sách
    records.unshift(newRecord);
    try {
      localStorage.setItem(this.STORAGE_KEY_RECORDS, JSON.stringify(records));
    } catch (e) {
      console.error("Lỗi lưu điểm vào LocalStorage:", e);
    }

    // Phát tín hiệu đồng bộ sang các tab khác
    if (this.channel) {
      try {
        this.channel.postMessage({ type: "NEW_SCORE", record: newRecord });
      } catch (e) {}
    }

    // Báo cho các component trong cùng tab cập nhật ngay
    this.notifyListeners(newRecord);

    // Nếu có cấu hình Firebase, đẩy lên cloud realtime
    this.syncToFirebase(newRecord);

    return newRecord;
  }

  // Lấy dữ liệu Bảng xếp hạng theo các bộ lọc
  getLeaderboard({ grade, topicId, lessonId, className, scope = "lesson" }) {
    let records = this.getAllRecords();

    // Lọc theo Khối
    if (grade) {
      records = records.filter((r) => Number(r.grade) === Number(grade));
    }

    // Lọc theo Bài hoặc Chủ đề nếu scope yêu cầu
    if (scope === "lesson" && lessonId) {
      records = records.filter((r) => r.lessonId === lessonId);
    } else if (scope === "topic" && topicId) {
      records = records.filter((r) => r.topicId === topicId);
    }

    // Lọc theo Lớp
    if (className && className !== "ALL") {
      records = records.filter(
        (r) => r.studentClass.toUpperCase() === className.toUpperCase()
      );
    }

    // Sắp xếp:
    // 1. Điểm cao hơn xếp trên
    // 2. Điểm bằng nhau thì thời gian làm bài ít hơn (nhanh hơn) xếp trên
    // 3. Cùng thời gian thì ai hoàn thành mới hơn xếp trên
    records.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (a.timeSpent !== b.timeSpent) {
        return a.timeSpent - b.timeSpent;
      }
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return records;
  }

  // Tìm thứ hạng của một học sinh cụ thể
  getStudentRank(studentName, studentClass, filterOptions) {
    const list = this.getLeaderboard(filterOptions);
    const normalizedName = studentName.trim().toLowerCase();
    const normalizedClass = studentClass.trim().toUpperCase();

    const index = list.findIndex(
      (r) =>
        r.studentName.trim().toLowerCase() === normalizedName &&
        r.studentClass.toUpperCase() === normalizedClass
    );

    if (index === -1) {
      return { rank: null, total: list.length, record: null };
    }

    return {
      rank: index + 1,
      total: list.length,
      record: list[index]
    };
  }

  // Tạo dữ liệu thi đua mẫu sinh động lần đầu mở web
  seedInitialDataIfEmpty() {
    const existing = this.getAllRecords();
    if (existing.length > 0) return;

    const sampleStudents = [
      { name: "Nguyễn Bảo Nam", class: "3A", grade: 3, avatar: "🤖", score: 980, time: 25 },
      { name: "Trần Mai Anh", class: "3A", grade: 3, avatar: "🦸‍♀️", score: 940, time: 29 },
      { name: "Lê Minh Khôi", class: "3B", grade: 3, avatar: "🚀", score: 900, time: 31 },
      { name: "Phạm Hà My", class: "3B", grade: 3, avatar: "🐱‍🚀", score: 860, time: 35 },
      { name: "Vũ Tuấn Kiệt", class: "3C", grade: 3, avatar: "⚡", score: 820, time: 40 },
      
      { name: "Hoàng Gia Huy", class: "4A", grade: 4, avatar: "🎮", score: 990, time: 22 },
      { name: "Đặng Thùy Dung", class: "4A", grade: 4, avatar: "🦸‍♀️", score: 950, time: 28 },
      { name: "Bùi Quốc Anh", class: "4B", grade: 4, avatar: "🤖", score: 910, time: 33 },
      { name: "Ngô Diệu Linh", class: "4C", grade: 4, avatar: "⚡", score: 870, time: 38 },
      
      { name: "Trịnh Quang Minh", class: "5A", grade: 5, avatar: "👽", score: 1000, time: 20 },
      { name: "Lê Phương Thảo", class: "5A", grade: 5, avatar: "🦸‍♀️", score: 960, time: 26 },
      { name: "Nguyễn Đức Trí", class: "5B", grade: 5, avatar: "🚀", score: 920, time: 30 },
      { name: "Phạm Ngọc Ánh", class: "5C", grade: 5, avatar: "🤖", score: 890, time: 34 }
    ];

    const seeded = [];
    sampleStudents.forEach((st, i) => {
      seeded.push({
        id: "seed_" + i,
        studentName: st.name,
        studentClass: st.class,
        grade: st.grade,
        topicId: `k${st.grade}_t1`,
        lessonId: `k${st.grade}_b1`,
        lessonTitle: "Bài củng cố khởi động",
        score: st.score,
        maxScore: 1000,
        accuracy: 100,
        timeSpent: st.time,
        avatar: st.avatar,
        timestamp: new Date(Date.now() - (i + 1) * 3600000).toISOString()
      });
    });

    try {
      localStorage.setItem(this.STORAGE_KEY_RECORDS, JSON.stringify(seeded));
    } catch (e) {}
  }

  // Xuất file CSV (Excel) cho Thầy / Cô giáo
  exportToCSV(grade = null) {
    let records = this.getAllRecords();
    if (grade) {
      records = records.filter((r) => Number(r.grade) === Number(grade));
    }

    if (records.length === 0) {
      alert("Chưa có bản ghi điểm nào để xuất!");
      return;
    }

    let csvContent = "\uFEFF"; // Byte Order Mark để hiển thị tiếng Việt UTF-8 chuẩn trong Excel
    csvContent += "STT,Họ và Tên,Lớp,Khối,Bài Học,Điểm Số,Độ Chính Xác (%),Thời Gian (Giây),Ngày Giờ Hoàn Thành\n";

    records.forEach((r, idx) => {
      const dateStr = new Date(r.timestamp).toLocaleString("vi-VN");
      const safeTitle = `"${(r.lessonTitle || r.lessonId || "").replace(/"/g, '""')}"`;
      const safeName = `"${r.studentName.replace(/"/g, '""')}"`;
      csvContent += `${idx + 1},${safeName},${r.studentClass},Khối ${r.grade},${safeTitle},${r.score},${r.accuracy}%,${r.timeSpent}s,${dateStr}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `BangDiem_TinHoc_${grade ? "Khoi" + grade : "ToanTruong"}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Xóa toàn bộ dữ liệu bảng điểm (dành cho Giáo viên đầu năm học mới)
  clearAllRecords() {
    localStorage.removeItem(this.STORAGE_KEY_RECORDS);
    this.seedInitialDataIfEmpty();
    if (this.channel) {
      try {
        this.channel.postMessage({ type: "NEW_SCORE", record: null });
      } catch (e) {}
    }
    this.notifyListeners(null);
  }

  // Tùy chọn Firebase Cloud sync nếu giáo viên cấu hình
  syncToFirebase(record) {
    if (window.firebase && window.firebase.database && window._firebaseDbReady) {
      try {
        const ref = window.firebase.database().ref("tinhoc_records");
        ref.push(record);
      } catch (err) {
        console.warn("Lỗi đồng bộ Firebase:", err);
      }
    }
  }
}

// Khởi tạo instance Storage duy nhất
const Storage = new StorageManager();
window.Storage = Storage;
