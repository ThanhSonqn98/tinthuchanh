/**
 * TOÀN BỘ CHƯƠNG TRÌNH SGK TIN HỌC 3, 4, 5 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * ĐẦY ĐỦ CẢ HỌC KÌ 1 VÀ HỌC KÌ 2 (48 BÀI HỌC TOÀN KHÓA)
 * Mỗi bài học gồm: Tóm tắt lý thuyết trọng tâm + Mini-game tương tác chuyên sâu
 */

const CURRICULUM_DATA = {
  // =========================================================================
  // KHỐI 3: 16 BÀI HỌC (HỌC KÌ 1: BÀI 1-8 | HỌC KÌ 2: BÀI 9-16)
  // =========================================================================
  3: {
    title: "Tin Học Lớp 3 - Khám Phá Công Nghệ",
    subtitle: "Bộ sách Kết nối tri thức với cuộc sống (Trọn bộ HK1 & HK2)",
    color: "#00f3ff",
    topics: [
      {
        id: "k3_t1",
        name: "Chủ đề 1: Máy tính và em",
        icon: "💻",
        description: "Làm quen với thông tin, máy tính và các thiết bị số thông minh",
        semester: 1,
        lessons: [
          {
            id: "k3_b1",
            number: 1,
            title: "Thông tin và quyết định",
            semester: 1,
            icon: "💡",
            summary: "Thông tin là những điều em biết giúp em đưa ra các quyết định hành động đúng đắn.",
            theory: [
              "Thông tin là tất cả những gì con người thu nhận được từ thế giới xung quanh qua các giác quan.",
              "Thông tin giúp con người hiểu biết và đưa ra quyết định hành động phù hợp.",
              "Ví dụ: Nghe thấy tiếng chuông báo thức ➔ Quyết định thức dậy đi học; Thấy đèn đỏ ➔ Dừng lại."
            ],
            gameType: "truefalse",
            gameTitle: "Tia Chớp Thông Tin Đúng / Sai",
            instruction: "Đọc thật nhanh và chọn ĐÚNG 🛡️ hoặc SAI ⚔️ trước khi hết giờ:",
            questions: [
              { statement: "Đèn tín hiệu giao thông chuyển màu ĐỎ báo cho em thông tin phải dừng lại.", isTrue: true, explain: "Đúng! Màu đỏ là thông tin chỉ dẫn dừng xe an toàn." },
              { statement: "Nghe tiếng trống trường 'Tùng! Tùng!', em quyết định đi ngủ tiếp trên bàn.", isTrue: false, explain: "Sai! Tiếng trống trường báo hiệu giờ vào lớp học." },
              { statement: "Nhìn thấy mây đen và nghe sấm, em quyết định mang áo mưa khi ra ngoài.", isTrue: true, explain: "Chính xác! Đó là quyết định phòng tránh bị ướt mưa." },
              { statement: "Mọi thông tin nhận được đều không có ích gì cho con người.", isTrue: false, explain: "Sai! Thông tin rất quan trọng giúp con người học tập và hành động." }
            ]
          },
          {
            id: "k3_b2",
            number: 2,
            title: "Xử lí thông tin",
            semester: 1,
            icon: "🧠",
            summary: "Các bước thu nhận, xử lí, lưu trữ và đưa ra quyết định của bộ não và máy tính.",
            theory: [
              "Giác quan (mắt, tai, mũi, lưỡi, da) giúp con người THU NHẬN thông tin.",
              "Bộ não con người là cơ quan làm nhiệm vụ XỬ LÍ THÔNG TIN và LƯU TRỮ thông tin.",
              "Trong máy tính: Bàn phím/chuột là thiết bị thu nhận; CPU ở thân máy là bộ não xử lí; Màn hình/loa là nơi xuất kết quả."
            ],
            gameType: "sequence",
            gameTitle: "Lắp Ráp Cỗ Máy Xử Lí",
            instruction: "Sắp xếp 4 bước xử lí thông tin theo đúng thứ tự logic từ đầu đến cuối:",
            steps: [
              { id: "s1", text: "1. Đôi mắt và tai THU NHẬN thông tin từ thế giới bên ngoài 👀👂" },
              { id: "s2", text: "2. Bộ não phân tích và XỬ LÍ thông tin đã nhận 🧠⚡" },
              { id: "s3", text: "3. Bộ não LƯU TRỮ dữ liệu vào trí nhớ để dùng sau 💾" },
              { id: "s4", text: "4. RA QUYẾT ĐỊNH và nói/viết ra kết quả hành động 🗣️✍️" }
            ],
            explain: "Quy trình xử lí thông tin: Thu nhận ➔ Bộ não xử lí ➔ Lưu trữ ➔ Đưa ra quyết định/kết quả."
          },
          {
            id: "k3_b3",
            number: 3,
            title: "Máy tính - những người bạn mới",
            semester: 1,
            icon: "🖥️",
            summary: "Nhận biết 4 bộ phận cơ bản của máy tính để bàn và các loại máy tính khác.",
            theory: [
              "Máy tính để bàn gồm 4 bộ phận chính: Thân máy, Màn hình, Bàn phím và Chuột.",
              "Thân máy chứa bộ vi xử lí CPU (bộ não của máy tính).",
              "Các loại máy tính thông dụng khác: Máy tính xách tay (Laptop), Máy tính bảng (Tablet), Điện thoại thông minh."
            ],
            gameType: "matching",
            gameTitle: "Siêu Nối Thẻ Thiết Bị Máy Tính",
            instruction: "Nhấp thẻ Thiết bị ở Cột A rồi chọn thẻ Công dụng tương ứng ở Cột B:",
            pairs: [
              { a: "Thân máy tính", b: "Chứa CPU - bộ não điều khiển mọi hoạt động của máy", iconA: "🖲️", iconB: "🧠" },
              { a: "Màn hình vi tính", b: "Hiển thị kết quả làm việc (chữ, hình ảnh, video)", iconA: "🖥️", iconB: "🖼️" },
              { a: "Bàn phím máy tính", b: "Dùng để gõ chữ cái, số và gửi lệnh vào máy", iconA: "⌨️", iconB: "🔤" },
              { a: "Chuột máy tính", b: "Điều khiển con trỏ trên màn hình và nhấp chọn lệnh", iconA: "🖱️", iconB: "🎯" }
            ]
          },
          {
            id: "k3_b4",
            number: 4,
            title: "Làm việc với máy tính",
            semester: 1,
            icon: "🪑",
            summary: "Tư thế ngồi đúng chuẩn công thái học và quy tắc an toàn điện trong phòng máy.",
            theory: [
              "Tư thế ngồi chuẩn: Lưng thẳng, tựa nhẹ vào ghế, mắt ngang hoặc hơi thấp hơn mép trên màn hình.",
              "Khoảng cách an toàn từ mắt đến màn hình là 50cm đến 80cm (khoảng một sải tay).",
              "Tuyệt đối không mang đồ ăn nước uống vào phòng máy, không sờ tay ướt vào dây điện, ổ cắm.",
              "Tắt máy đúng cách: Bấm Start ➔ Power ➔ Shut down."
            ],
            gameType: "sorting",
            gameTitle: "Căn Cứ An Toàn vs Nguy Hiểm",
            instruction: "Phân loại hành động vào Căn cứ [AN TOÀN NÊN LÀM 🛡️] hoặc [NGUY HIỂM CẤM LÀM ⚠️]:",
            bins: [
              { id: "safe", name: "AN TOÀN - NÊN LÀM", icon: "🛡️", color: "#00ff88" },
              { id: "danger", name: "NGUY HIỂM - CẤM LÀM", icon: "⚠️", color: "#ff3366" }
            ],
            items: [
              { text: "Ngồi thẳng lưng, mắt cách màn hình từ 50cm - 80cm", binId: "safe", explain: "Bảo vệ cột sống và thị lực phòng chống cận thị." },
              { text: "Vừa uống nước ngọt, vừa gõ bàn phím máy tính", binId: "danger", explain: "Nước đổ vào máy gây chập cháy hỏng thiết bị!" },
              { text: "Dùng tay ướt để cắm hoặc rút phích cắm điện máy tính", binId: "danger", explain: "Nước dẫn điện cực kì nguy hiểm có thể bị điện giật!" },
              { text: "Tắt máy tính bằng nút Start -> Shut down", binId: "safe", explain: "Đảm bảo hệ điều hành lưu tệp tin an toàn." },
              { text: "Dùng kéo hoặc que sắt chọc vào khe thông gió của thùng máy", binId: "danger", explain: "Hành động cực kì nguy hiểm gây chập cháy nổ điện!" },
              { text: "Sau 30 phút ngồi máy tính thì đứng dậy vận động nhẹ", binId: "safe", explain: "Giúp mắt và cơ thể thư giãn, không bị mỏi mệt." }
            ]
          },
          {
            id: "k3_b5",
            number: 5,
            title: "Sử dụng bàn phím",
            semester: 1,
            icon: "⌨️",
            summary: "Cấu trúc bàn phím, các hàng phím và hai phím mốc có gai nổi F, J.",
            theory: [
              "Khu vực chính gồm 5 hàng phím: Hàng phím số, Hàng phím trên, Hàng phím cơ sở, Hàng phím dưới, Hàng phím chứa phím cách.",
              "Hàng phím cơ sở là quan trọng nhất: A S D F G H J K L ;",
              "Hai phím có gai (gờ nổi) là F và J: dùng làm mốc đặt hai ngón tay trỏ.",
              "Phím Spacebar (phím cách) là phím dài nhất dùng để tạo dấu cách."
            ],
            gameType: "matching",
            gameTitle: "Bậc Thầy Nhận Diện Phím Bấm",
            instruction: "Nối phím bấm ở cột A với đặc điểm tương ứng ở cột B:",
            pairs: [
              { a: "Phím F và Phím J", b: "Có gờ (gai) nổi làm mốc định vị cho hai ngón trỏ", iconA: "📍", iconB: "☝️" },
              { a: "Phím Spacebar (Phím cách)", b: "Phím dài nhất ở hàng dưới cùng, dùng gõ dấu cách", iconA: "␣", iconB: "📏" },
              { a: "Phím Enter", b: "Dùng để xuống dòng mới khi soạn thảo văn bản", iconA: "↵", iconB: "⏬" },
              { a: "Hàng phím cơ sở", b: "Nơi đặt sẵn 8 ngón tay mốc: A S D F - J K L ;", iconA: "🏠", iconB: "🖐️" }
            ]
          },
          {
            id: "k3_b6",
            number: 6,
            title: "Sử dụng chuột máy tính",
            semester: 1,
            icon: "🖱️",
            summary: "Cấu tạo và 5 thao tác cơ bản với chuột máy tính.",
            theory: [
              "Chuột gồm: Nút trái, Nút phải và Bánh lăn ở giữa.",
              "Tay phải cầm chuột: Ngón trỏ đặt lên nút trái, ngón giữa đặt lên nút phải, ngón cái và các ngón còn lại giữ hai bên thân chuột.",
              "5 thao tác chuột: Di chuyển chuột, Nháy chuột (trái), Nháy nút phải chuột, Nháy đúp chuột, Kéo thả chuột."
            ],
            gameType: "matching",
            gameTitle: "Đấu Trường Thao Tác Chuột",
            instruction: "Nối tên thao tác chuột với ý nghĩa thao tác chính xác:",
            pairs: [
              { a: "Nháy đúp chuột (Double click)", b: "Nhấn nhanh nút trái chuột 2 lần liên tiếp để mở tệp", iconA: "⚡", iconB: "📂" },
              { a: "Cuộn bánh lăn", b: "Lăn nút tròn ở giữa để di chuyển trang màn hình lên/xuống", iconA: "🔄", iconB: "📜" },
              { a: "Kéo thả chuột (Drag & Drop)", b: "Nhấn giữ nút trái, kéo vật phẩm tới vị trí mới rồi thả", iconA: "🖐️", iconB: "📦" },
              { a: "Nháy nút phải chuột", b: "Nhấn nhanh nút bên phải để mở bảng danh mục (menu)", iconA: "📋", iconB: "⚙️" }
            ]
          }
        ]
      },
      {
        id: "k3_t2",
        name: "Chủ đề 2: Mạng máy tính và Internet",
        icon: "🌐",
        description: "Khám phá thế giới kết nối Internet muôn màu",
        semester: 1,
        lessons: [
          {
            id: "k3_b7",
            number: 7,
            title: "Khám phá Internet",
            semester: 1,
            icon: "🌍",
            summary: "Internet là kho tàng thông tin toàn cầu giúp học tập, tìm kiếm và giải trí bổ ích.",
            theory: [
              "Internet là mạng lưới khổng lồ kết nối các máy tính trên khắp thế giới với nhau.",
              "Lợi ích của Internet: Tìm kiếm thông tin học tập, xem bài giảng video, liên lạc với bạn bè thầy cô, nghe nhạc giải trí.",
              "Phần mềm dùng để truy cập Internet gọi là Trình duyệt web (Google Chrome, Cốc Cốc, Microsoft Edge...)."
            ],
            gameType: "quiz",
            gameTitle: "Lướt Sóng Siêu Không Gian",
            instruction: "Chọn đáp án đúng nhất cho từng câu hỏi về Internet:",
            questions: [
              {
                q: "Mạng Internet giúp học sinh làm được những việc nào sau đây?",
                options: ["Tìm kiếm tài liệu học tập, xem video khoa học", "Giao lưu, gửi thư cho bạn bè thầy cô", "Học tiếng Anh và chơi trò chơi trí tuệ", "Tất cả các điều trên"],
                correct: 3,
                explain: "Internet mang lại nguồn kiến thức vô tận cho học tập và đời sống."
              },
              {
                q: "Phần mềm nào sau đây là TRÌNH DUYỆT WEB giúp em vào xem các trang mạng?",
                options: ["Google Chrome", "Microsoft Word", "Phần mềm Paint", "Máy tính bỏ túi Calculator"],
                correct: 0,
                explain: "Google Chrome là trình duyệt web phổ biến nhất trên thế giới."
              },
              {
                q: "Học sinh tiểu học nên dùng Internet như thế nào là thông minh nhất?",
                options: ["Chơi game thâu đêm suốt sáng", "Chỉ truy cập khi có sự hướng dẫn và cho phép của cha mẹ, thầy cô", "Xem các video bạo lực rùng rợn", "Cung cấp mật khẩu cho người lạ"],
                correct: 1,
                explain: "Luôn có sự đồng hành của người lớn để sử dụng Internet an toàn và bổ ích."
              }
            ]
          }
        ]
      },
      {
        id: "k3_t3",
        name: "Chủ đề 3: Tổ chức lưu trữ, tìm kiếm thông tin",
        icon: "📁",
        description: "Sắp xếp thông tin ngăn nắp theo cấu trúc cây thư mục",
        semester: 1,
        lessons: [
          {
            id: "k3_b8",
            number: 8,
            title: "Sơ đồ hình cây - Tổ chức thông tin trong máy tính",
            semester: 1,
            icon: "🌳",
            summary: "Sơ đồ hình cây giúp phân loại và quản lý thông tin từ bao quát đến chi tiết.",
            theory: [
              "Thông tin trong máy tính được sắp xếp theo sơ đồ hình cây giống như các nhánh cây phân cành.",
              "Gốc cây là Ổ đĩa (như C:, D:), các cành lớn là Thư mục cha, cành nhỏ là Thư mục con, lá cây là các Tệp tin.",
              "Cách sắp xếp hình cây giúp ta tìm kiếm bài học nhanh chóng và không bị thất lạc dữ liệu."
            ],
            gameType: "sequence",
            gameTitle: "Xếp Tầng Cây Thư Mục",
            instruction: "Sắp xếp cấp bậc cây thư mục từ CẤP CAO NHẤT (Gốc) đến CẤP CHI TIẾT (Lá):",
            steps: [
              { id: "c1", text: "1. Ổ đĩa máy tính (Ổ đĩa D: Hoc_Tap) 💽" },
              { id: "c2", text: "2. Thư mục LỚN: [Nam_Hoc_Lop_3] 📁" },
              { id: "c3", text: "3. Thư mục CON: [Mon_Tin_Hoc] 📂" },
              { id: "c4", text: "4. Tệp bài làm bên trong: [Bai_Ve_Ngoi_Nha.png] 📄" }
            ],
            explain: "Thứ tự tổ chức: Ổ đĩa ➔ Thư mục mẹ ➔ Thư mục con ➔ Tệp tin cụ thể."
          }
        ]
      },
      // ---------------------------------------------------------------------
      // HỌC KÌ 2 (BÀI 9 ĐẾN BÀI 16)
      // ---------------------------------------------------------------------
      {
        id: "k3_t3_hk2",
        name: "Chủ đề 3: Tổ chức lưu trữ (Học kì 2)",
        icon: "📂",
        description: "Thao tác với tệp và thư mục bài tập của em",
        semester: 2,
        lessons: [
          {
            id: "k3_b9",
            number: 9,
            title: "Thực hành với tệp và thư mục",
            semester: 2,
            icon: "📂",
            summary: "Thực hành tạo thư mục mới, đổi tên thư mục và phân biệt tệp tin.",
            theory: [
              "Thư mục (Folder) có biểu tượng kẹp hồ sơ màu vàng, dùng để chứa tệp và các thư mục khác.",
              "Tệp (File) là đơn vị lưu trữ thông tin (văn bản, tranh vẽ, bài hát, video). Tệp có tên và phần mở rộng (đuôi tệp).",
              "Cách tạo thư mục mới: Nhấp chuột phải ➔ New ➔ Folder ➔ Gõ tên ➔ Nhấn Enter.",
              "Cách đổi tên thư mục: Nhấp chuột phải ➔ Rename ➔ Gõ tên mới ➔ Enter."
            ],
            gameType: "sorting",
            gameTitle: "Phân Loại Tệp vs Thư Mục",
            instruction: "Bắn từng đồ vật vào Căn cứ [THƯ MỤC VÀNG 📁] hoặc [TỆP DỮ LIỆU 📄]:",
            bins: [
              { id: "folder", name: "THƯ MỤC (Folder)", icon: "📁", color: "#ffb800" },
              { id: "file", name: "TỆP TIN (File)", icon: "📄", color: "#00f3ff" }
            ],
            items: [
              { text: "Bức tranh vẽ mèo: MeoCon.png", binId: "file", explain: "Đây là tệp tin hình ảnh có đuôi .png" },
              { text: "Kẹp hồ sơ màu vàng: Bai_Tap_Toan_Lop_3", binId: "folder", explain: "Thư mục màu vàng dùng chứa bài tập Toán." },
              { text: "Tệp bài soạn văn: QueHuong.docx", binId: "file", explain: "Tệp văn bản Word lưu bài viết." },
              { text: "Ngăn lưu trữ: Video_Khoa_Hoc", binId: "folder", explain: "Thư mục dùng gom nhóm video khoa học." },
              { text: "Bài hát thiếu nhi: EmYeuTruongEm.mp3", binId: "file", explain: "Tệp tin âm thanh có đuôi .mp3" },
              { text: "Hồ sơ: Bai_Kiem_Tra_Tin_Hoc", binId: "folder", explain: "Thư mục chứa các bài kiểm tra thực hành." }
            ]
          }
        ]
      },
      {
        id: "k3_t4",
        name: "Chủ đề 4: Đạo đức, pháp luật và văn hoá số",
        icon: "🛡️",
        description: "Bảo vệ thông tin cá nhân và an toàn trên Internet",
        semester: 2,
        lessons: [
          {
            id: "k3_b10",
            number: 10,
            title: "Quy tắc an toàn khi sử dụng Internet",
            semester: 2,
            icon: "🔒",
            summary: "Bảo vệ thông tin bí mật cá nhân và ứng xử lịch sự, văn minh trên không gian mạng.",
            theory: [
              "Thông tin cá nhân cần BẢO MẬT: Họ tên đầy đủ, ngày sinh, địa chỉ nhà, số điện thoại, mật khẩu tài khoản.",
              "Tuyệt đối không chia sẻ thông tin cá nhân cho người lạ trên mạng.",
              "Không tự ý bấm vào các đường link lạ, quà tặng ảo trúng thưởng lừa đảo.",
              "Khi gặp điều bất an, bị quấy rối hoặc thấy nội dung xấu: Báo ngay cho bố mẹ hoặc thầy cô giáo."
            ],
            gameType: "truefalse",
            gameTitle: "Tấm Khiên Mật Mã An Toàn",
            instruction: "Chọn ĐÚNG 🛡️ (An toàn) hoặc SAI ⚔️ (Nguy hiểm) cho từng hành vi:",
            questions: [
              { statement: "Em tuyệt đối không chia sẻ địa chỉ nhà và mật khẩu cho người lạ trên mạng.", isTrue: true, explain: "Rất chuẩn! Giữ bí mật thông tin giúp em an toàn tuyệt đối." },
              { statement: "Một người lạ trên mạng nhắn tin cho quà xịn, em vội vàng gửi ảnh gia đình và số điện thoại.", isTrue: false, explain: "Cực kỳ nguy hiểm! Kẻ xấu có thể lợi dụng để lừa đảo hoặc bắt cóc." },
              { statement: "Khi thấy bài viết xúc phạm bạn bè, em nên bình luận hùa theo chửi bới.", isTrue: false, explain: "Sai! Cần ứng xử lịch sự, không lan truyền hành vi bắt nạt qua mạng." },
              { statement: "Gặp điều nghi vấn hoặc bị đe dọa trên mạng, em báo ngay cho bố mẹ hoặc thầy cô.", isTrue: true, explain: "Chính xác! Luôn nhờ người lớn tin cậy giúp đỡ kịp thời." }
            ]
          }
        ]
      },
      {
        id: "k3_t5_hk2",
        name: "Chủ đề 5: Ứng dụng tin học (Học kì 2)",
        icon: "🎨",
        description: "Luyện gõ bàn phím và làm quen bài trình chiếu PowerPoint",
        semester: 2,
        lessons: [
          {
            id: "k3_b11",
            number: 11,
            title: "Em tập gõ hàng phím cơ sở",
            semester: 2,
            icon: "⌨️",
            summary: "Luyện phản xạ gõ mười ngón trên hàng phím cơ sở A S D F - J K L ;",
            theory: [
              "Tay trái: Ngón út đặt ở phím A, ngón áp út phím S, ngón giữa phím D, ngón trỏ phím F (và vươn sang G).",
              "Tay phải: Ngón trỏ đặt ở phím J (và vươn sang H), ngón giữa phím K, ngón áp út phím L, ngón út phím ;",
              "Hai ngón tay cái luôn đặt nhẹ trên phím cách (Spacebar)."
            ],
            gameType: "typing",
            gameTitle: "Mưa Thiên Thạch Phím Cơ Sở",
            instruction: "Gõ đúng chữ cái trên bàn phím để bắn phá các thiên thạch đang rơi:",
            targets: ["F", "J", "A", "S", "D", "K", "L", "G", "H", "F", "J", "A", "D", "K"]
          },
          {
            id: "k3_b12",
            number: 12,
            title: "Em tập gõ các hàng phím",
            semester: 2,
            icon: "🔼",
            summary: "Luyện gõ phối hợp hàng phím trên (Q W E R T Y U I O P) và hàng phím dưới (Z X C V B N M).",
            theory: [
              "Từ hàng cơ sở, các ngón tay vươn nhẹ lên hàng phím trên để gõ chữ, sau đó lập tức thu ngón tay về hàng cơ sở.",
              "Tương tự, các ngón tay đưa nhẹ xuống hàng phím dưới rồi quay về căn cứ.",
              "Quy tắc vàng: Mắt luôn nhìn vào màn hình, không nhìn bàn phím (Touch Typing)."
            ],
            gameType: "typing",
            gameTitle: "Vũ Điệu Hàng Phím Mở Rộng",
            instruction: "Gõ chuẩn các chữ cái từ hàng trên và hàng dưới để ghi điểm siêu cấp:",
            targets: ["R", "U", "E", "I", "T", "Y", "V", "B", "N", "M", "C", "X", "O", "P"]
          },
          {
            id: "k3_b13",
            number: 13,
            title: "Luyện tập gõ bàn phím",
            semester: 2,
            icon: "🏎️",
            summary: "Luyện gõ từ hoàn chỉnh và câu ngắn tiếng Việt đúng quy tắc 10 ngón.",
            theory: [
              "Khi gõ hết một từ, nhấn phím Spacebar đúng 1 lần bằng ngón cái.",
              "Ngồi thẳng lưng, vai thả lỏng, cổ tay không tì mạnh xuống bàn.",
              "Gõ đều nhịp nhàng và chính xác quan trọng hơn gõ vội vàng mà sai nhiều."
            ],
            gameType: "typing",
            gameTitle: "Đua Tốc Độ Gõ Từ",
            instruction: "Gõ chính xác các từ tin học đang bay tới căn cứ:",
            targets: ["TIN", "HOC", "BAN", "PHIM", "CHUOT", "MAY", "TINH", "LOP3"]
          },
          {
            id: "k3_b14",
            number: 14,
            title: "Làm quen với phần mềm tạo bài trình chiếu",
            semester: 2,
            icon: "📽️",
            summary: "Khám phá PowerPoint - công cụ tạo các trang chiếu thuyết trình sinh động.",
            theory: [
              "PowerPoint là phần mềm tạo bài trình chiếu, dùng để thuyết trình trước thầy cô và các bạn.",
              "Mỗi trang trình diễn gọi là một Trang chiếu (Slide).",
              "Một trang chiếu có thể chứa: Tiêu đề, văn bản, hình ảnh minh họa, âm thanh và hiệu ứng.",
              "Nhấn phím F5 để bắt đầu trình chiếu toàn màn hình từ trang đầu tiên; phím Esc để thoát chế độ chiếu."
            ],
            gameType: "quiz",
            gameTitle: "Nhà Thuyết Trình Tương Lai",
            instruction: "Chọn đáp án đúng nhất về phần mềm trình chiếu:",
            questions: [
              {
                q: "Phần mềm chuyên dụng phổ biến nhất để tạo bài thuyết trình sinh động là gì?",
                options: ["Microsoft Word", "Microsoft PowerPoint", "Phần mềm Paint", "Calculator"],
                correct: 1,
                explain: "PowerPoint là phần mềm trình chiếu được sử dụng rộng rãi trên toàn thế giới."
              },
              {
                q: "Mỗi trang trình diễn trong PowerPoint được gọi là gì?",
                options: ["Một Slide (Trang chiếu)", "Một đoạn văn bản", "Một bảng số liệu", "Một bức vẽ"],
                correct: 0,
                explain: "Mỗi trang chiếu nội dung trong PowerPoint gọi là một Slide."
              },
              {
                q: "Phím tắt thần kỳ nào trên bàn phím dùng để bắt đầu trình chiếu toàn màn hình?",
                options: ["Phím Esc", "Phím F5", "Phím Enter", "Phím Spacebar"],
                correct: 1,
                explain: "Phím F5 chiếu toàn màn hình từ trang đầu tiên để cả lớp cùng quan sát."
              }
            ]
          },
          {
            id: "k3_b15",
            number: 15,
            title: "Cây gia đình của em",
            semester: 2,
            icon: "👨‍👩‍👧‍👦",
            summary: "Sử dụng bài trình chiếu để giới thiệu các thành viên trong gia đình theo sơ đồ cây.",
            theory: [
              "Sơ đồ cây gia đình giúp thể hiện các thế hệ: Ông bà ➔ Bố mẹ, cô chú ➔ Các con, anh chị em.",
              "Thêm hình ảnh chụp thật của gia đình vào bài trình chiếu để bài thuyết trình thêm ấm áp, sinh động.",
              "Cách chèn ảnh vào trang chiếu: Chọn thẻ Insert ➔ Pictures ➔ Chọn ảnh từ máy tính."
            ],
            gameType: "matching",
            gameTitle: "Sơ Đồ Gia Đình Thông Thái",
            instruction: "Nối các thế hệ trong sơ đồ cây gia đình theo thứ tự đúng:",
            pairs: [
              { a: "Thế hệ thứ nhất (Gốc cây)", b: "Ông nội, Bà nội, Ông ngoại, Bà ngoại", iconA: "👴👵", iconB: "🌳" },
              { a: "Thế hệ thứ hai (Cành chính)", b: "Bố, Mẹ, Bác, Chú, Cô, Dì", iconA: "👨👩", iconB: "🌿" },
              { a: "Thế hệ thứ ba (Nhánh lá)", b: "Em, Anh trai, Chị gái, Em họ", iconA: "👦👧", iconB: "🍃" },
              { a: "Lệnh chèn ảnh gia đình", b: "Vào thẻ Insert -> Chọn Pictures", iconA: "🖼️", iconB: "📎" }
            ]
          }
        ]
      },
      {
        id: "k3_t6",
        name: "Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính",
        icon: "🧩",
        description: "Lên kế hoạch và thực hiện công việc với sự trợ giúp của máy tính",
        semester: 2,
        lessons: [
          {
            id: "k3_b16",
            number: 16,
            title: "Công việc của em và sự trợ giúp của máy tính",
            semester: 2,
            icon: "🎯",
            summary: "Biết chia nhỏ một công việc phức tạp thành các bước nhỏ hơn để máy tính trợ giúp.",
            theory: [
              "Để hoàn thành một công việc lớn, ta cần chia việc đó thành các bước nhỏ theo thứ tự trước sau.",
              "Máy tính giúp con người: Tính toán siêu nhanh, vẽ tranh, soạn thảo văn bản, lưu trữ thông tin khổng lồ.",
              "Con người luôn là người ra lệnh và điều khiển, máy tính là công cụ hỗ trợ đắc lực."
            ],
            gameType: "sequence",
            gameTitle: "Kế Hoạch Thông Minh Từng Bước",
            instruction: "Sắp xếp các bước để thực hiện một bài thuyết trình về con vật em yêu thích:",
            steps: [
              { id: "p1", text: "1. Chọn con vật em yêu thích (Ví dụ: Chú chim cánh cụt) 🐧" },
              { id: "p2", text: "2. Thu thập thông tin và hình ảnh về con vật đó 🔍🖼️" },
              { id: "p3", text: "3. Mở PowerPoint, tạo các trang chiếu và chèn thông tin, ảnh 💻" },
              { id: "p4", text: "4. Bấm F5 tự tin trình bày báo cáo trước cả lớp 🎤✨" }
            ],
            explain: "Thực hiện có kế hoạch theo 4 bước giúp bài thuyết trình thành công rực rỡ!"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // KHỐI 4: 16 BÀI HỌC (HỌC KÌ 1: BÀI 1-8 | HỌC KÌ 2: BÀI 9-16)
  // =========================================================================
  4: {
    title: "Tin Học Lớp 4 - Chinh Phục Tri Thức",
    subtitle: "Bộ sách Kết nối tri thức với cuộc sống (Trọn bộ HK1 & HK2)",
    color: "#b537f2",
    topics: [
      {
        id: "k4_t1",
        name: "Chủ đề 1: Máy tính và em",
        icon: "💻",
        description: "Phần cứng, phần mềm và kỹ năng tìm kiếm siêu tốc trên Internet",
        semester: 1,
        lessons: [
          {
            id: "k4_b1",
            number: 1,
            title: "Phần cứng và phần mềm máy tính",
            semester: 1,
            icon: "⚙️",
            summary: "Phân biệt thiết bị phần cứng (sờ được) và chương trình phần mềm máy tính.",
            theory: [
              "Phần cứng (Hardware) là các thiết bị vật lý của máy tính mà em có thể nhìn thấy và chạm tay vào được: Bàn phím, Màn hình, Chuột, Thân máy, Loa, Ổ cứng.",
              "Phần mềm (Software) là các chương trình chạy trên máy tính: Hệ điều hành Windows, Phần mềm Paint, Word, PowerPoint, Trò chơi Scratch, Unikey.",
              "Phần cứng và phần mềm kết hợp chặt chẽ: Phần mềm điều khiển phần cứng hoạt động."
            ],
            gameType: "sorting",
            gameTitle: "Phân Loại Phần Cứng vs Phần Mềm",
            instruction: "Phân loại từng đồ vật vào Căn cứ [PHẦN CỨNG 🖥️] hoặc [PHẦN MỀM 💿]:",
            bins: [
              { id: "hardware", name: "PHẦN CỨNG (Hardware)", icon: "🖥️", color: "#00f3ff" },
              { id: "software", name: "PHẦN MỀM (Software)", icon: "💿", color: "#b537f2" }
            ],
            items: [
              { text: "Bàn phím cơ và Chuột quang", binId: "hardware", explain: "Thiết bị vật lý có thể chạm tay vào là phần cứng." },
              { text: "Phần mềm gõ tiếng Việt Unikey", binId: "software", explain: "Unikey là chương trình phần mềm hỗ trợ gõ dấu tiếng Việt." },
              { text: "Màn hình LCD máy tính", binId: "hardware", explain: "Màn hình là thiết bị phần cứng hiển thị kết quả." },
              { text: "Trình duyệt web Google Chrome", binId: "software", explain: "Chrome là phần mềm duyệt web trên máy tính." },
              { text: "Loa và Tai nghe vi tính", binId: "hardware", explain: "Loa là thiết bị phần cứng phát âm thanh." },
              { text: "Phần mềm lập trình Scratch", binId: "software", explain: "Scratch là phần mềm giúp em ghép khối lệnh lập trình." }
            ]
          },
          {
            id: "k4_b2",
            number: 2,
            title: "Gõ bàn phím đúng cách",
            semester: 1,
            icon: "⌨️",
            summary: "Kỹ năng gõ bàn phím bằng 10 ngón tay với tư thế và vị trí ngón chuẩn xác.",
            theory: [
              "Lợi ích gõ 10 ngón: Tốc độ gõ nhanh hơn, gõ chính xác, mắt không phải cúi nhìn bàn phím giúp bảo vệ cột sống và thị lực.",
              "Mỗi ngón tay phụ trách một khu vực phím nhất định.",
              "Mười ngón luôn sẵn sàng đặt tại hàng phím cơ sở (ngón trỏ đặt tại F và J có gờ nổi)."
            ],
            gameType: "typing",
            gameTitle: "Vũ Điệu 10 Ngón Bay Lượn",
            instruction: "Gõ thật nhanh các từ khóa tin học đang rơi xuống căn cứ:",
            targets: ["TIN", "HOC", "MAY", "TINH", "LOP4", "CODE", "ROBOT", "GAME", "PHAN", "MEM"]
          },
          {
            id: "k4_b3",
            number: 3,
            title: "Thông tin trên trang web",
            semester: 1,
            icon: "🌐",
            summary: "Nhận biết các dạng thông tin trên trang web và siêu liên kết (Hyperlink).",
            theory: [
              "Trang web chứa đa dạng thông tin: Văn bản, hình ảnh tĩnh, hình ảnh động, âm thanh và video.",
              "Siêu liên kết (Hyperlink) là một đoạn chữ hoặc hình ảnh khi nhấp chuột vào sẽ dẫn em sang một trang web khác.",
              "Khi di chuột qua siêu liên kết, con trỏ chuột thường đổi từ hình mũi tên thành hình bàn tay chỉ ngón trỏ 👆."
            ],
            gameType: "truefalse",
            gameTitle: "Thám Hiểm Siêu Liên Kết",
            instruction: "Chọn ĐÚNG 🛡️ hoặc SAI ⚔️ cho các câu hỏi về trang web:",
            questions: [
              { statement: "Siêu liên kết giúp chuyển nhanh sang một trang web hoặc tài liệu khác khi nhấp chuột.", isTrue: true, explain: "Chính xác! Đó là tính năng tuyệt vời của trang web." },
              { statement: "Con trỏ chuột sẽ biến thành hình bàn tay 👆 khi đưa vào một siêu liên kết.", isTrue: true, explain: "Đúng! Dấu hiệu nhận biết siêu liên kết rất rõ ràng." },
              { statement: "Trang web chỉ hiển thị được chữ đen trắng, không thể phát âm thanh hay video.", isTrue: false, explain: "Sai hoàn toàn! Trang web là môi trường đa phương tiện phong phú." }
            ]
          },
          {
            id: "k4_b4",
            number: 4,
            title: "Tìm kiếm thông tin trên Internet",
            semester: 1,
            icon: "🔍",
            summary: "Sử dụng máy tìm kiếm (Google) và chọn từ khóa chính xác, hiệu quả.",
            theory: [
              "Máy tìm kiếm (như Google) giúp tìm thông tin trên Internet bằng Từ khóa (Keywords).",
              "Từ khóa nên ngắn gọn, đúng trọng tâm điều muốn tìm kiếm.",
              "Dùng dấu ngoặc kép \"...\" để tìm kiếm chính xác cụm từ nguyên văn.",
              "Chọn lọc kết quả từ các trang web uy tín, chính thống."
            ],
            gameType: "quiz",
            gameTitle: "Thợ Săn Từ Khóa Cừ Khôi",
            instruction: "Chọn từ khóa thông minh nhất cho từng yêu cầu:",
            questions: [
              {
                q: "Khi muốn tìm thông tin về 'loài chim bồ câu trắng', em nên nhập từ khóa nào vào Google?",
                options: ["hãy cho tôi biết chim bồ câu trắng ăn gì", "chim bồ câu trắng", "chim bay trên trời", "các loài chim"],
                correct: 1,
                explain: "Từ khóa ngắn gọn, đúng trọng tâm 'chim bồ câu trắng' sẽ mang lại kết quả tốt nhất."
              },
              {
                q: "Để tìm kiếm chính xác cụm từ không bị xáo trộn vị trí các từ, ta đặt cụm từ trong cặp dấu gì?",
                options: ["Dấu ngoặc kép \"...\"", "Dấu ngoặc đơn (...)", "Dấu chấm hỏi ???", "Dấu gạch ngang ---"],
                correct: 0,
                explain: "Đặt trong dấu ngoặc kép như \"Hồ Gươm Hà Nội\" giúp máy tìm đúng chính xác từng từ."
              },
              {
                q: "Kết quả tìm kiếm trên Google có thể xem dưới những định dạng nào?",
                options: ["Văn bản bài viết", "Hình ảnh", "Video clip", "Tất cả các định dạng trên"],
                correct: 3,
                explain: "Google hỗ trợ tìm kiếm đa dạng: Tất cả, Hình ảnh, Video, Tin tức."
              }
            ]
          }
        ]
      },
      {
        id: "k4_t2",
        name: "Chủ đề 2: Mạng máy tính và Internet",
        icon: "📂",
        description: "Quản lý tệp và thư mục nâng cao",
        semester: 1,
        lessons: [
          {
            id: "k4_b5",
            number: 5,
            title: "Thao tác với thư mục và tệp",
            semester: 1,
            icon: "📁",
            summary: "Sao chép (Copy), di chuyển (Cut) và xóa (Delete) tệp và thư mục.",
            theory: [
              "Sao chép (Copy): Tạo thêm một bản sao giống hệt ở nơi mới mà bản gốc vẫn còn nguyên (Ctrl + C, Ctrl + V).",
              "Di chuyển (Cut): Chuyển hẳn tệp hoặc thư mục sang nơi mới, nơi cũ không còn (Ctrl + X, Ctrl + V).",
              "Xóa (Delete): Xóa bỏ tệp hoặc thư mục không dùng nữa để giải phóng dung lượng ổ đĩa.",
              "Cảnh báo: Tuyệt đối không xóa các tệp hệ điều hành của máy tính."
            ],
            gameType: "matching",
            gameTitle: "Phím Tắt Quản Trị Căn Cứ",
            instruction: "Nối lệnh thao tác với tổ hợp phím tắt tương ứng:",
            pairs: [
              { a: "Sao chép (Copy)", b: "Nhấn tổ hợp phím Ctrl + C", iconA: "📋", iconB: "⌨️" },
              { a: "Dán vào nơi mới (Paste)", b: "Nhấn tổ hợp phím Ctrl + V", iconA: "📌", iconB: "📥" },
              { a: "Cắt di chuyển (Cut)", b: "Nhấn tổ hợp phím Ctrl + X", iconA: "✂️", iconB: "🚚" },
              { a: "Xóa tệp (Delete)", b: "Nhấn phím Delete trên bàn phím", iconA: "🗑️", iconB: "❌" }
            ]
          }
        ]
      },
      {
        id: "k4_t3",
        name: "Chủ đề 3: Đạo đức, pháp luật và văn hoá số",
        icon: "⚖️",
        description: "Bản quyền phần mềm và văn hóa sử dụng thông tin",
        semester: 1,
        lessons: [
          {
            id: "k4_b6",
            number: 6,
            title: "Bản quyền phần mềm và thông tin",
            semester: 1,
            icon: "🛡️",
            summary: "Tôn trọng bản quyền tác giả và tác hại của phần mềm bẻ khóa (crack).",
            theory: [
              "Bản quyền là quyền của tác giả hoặc tổ chức tạo ra sản phẩm trí tuệ (phần mềm, bài hát, tranh ảnh...).",
              "Không được tự ý sao chép, chia sẻ lậu hoặc bán lại sản phẩm của người khác mà không có sự cho phép.",
              "Tác hại của phần mềm crack: Máy tính dễ nhiễm virus, mã độc tống tiền, mất dữ liệu cá nhân.",
              "Nên sử dụng phần mềm có bản quyền chính hãng hoặc phần mềm mã nguồn mở miễn phí (Freeware)."
            ],
            gameType: "truefalse",
            gameTitle: "Hiệp Sĩ Bản Quyền Đúng / Sai",
            instruction: "Chọn ĐÚNG 🛡️ hoặc SAI ⚔️ cho từng phát biểu về bản quyền:",
            questions: [
              { statement: "Dùng phần mềm bẻ khóa (crack) tiềm ẩn nguy cơ máy tính bị nhiễm virus và mất dữ liệu.", isTrue: true, explain: "Đúng! Phần mềm lậu thường bị kẻ xấu cài mã độc nguy hiểm." },
              { statement: "Em có quyền lấy tranh vẽ trên mạng của người khác rồi nhận là chính mình tự vẽ.", isTrue: false, explain: "Sai! Đó là hành vi vi phạm đạo đức và bản quyền tác giả." },
              { statement: "Phần mềm miễn phí (Freeware) cho phép mọi người dùng tự do mà không vi phạm pháp luật.", isTrue: true, explain: "Chính xác! Tác giả cấp phép cho cộng đồng sử dụng miễn phí." }
            ]
          }
        ]
      },
      {
        id: "k4_t4",
        name: "Chủ đề 4: Ứng dụng tin học",
        icon: "📊",
        description: "Thiết kế bài trình chiếu chuyên nghiệp và sơ đồ tư duy",
        semester: 1,
        lessons: [
          {
            id: "k4_b7",
            number: 7,
            title: "Tạo bài trình chiếu",
            semester: 1,
            icon: "📽️",
            summary: "Tạo trang chiếu mới, chèn khung văn bản và chọn mẫu bố cục phù hợp.",
            theory: [
              "Cách thêm trang chiếu mới: Vào thẻ Home ➔ New Slide.",
              "Khung văn bản (Text Box) dùng để nhập chữ vào bất kì vị trí nào trên trang chiếu.",
              "Bố cục trang chiếu (Layout): Giúp bài thuyết trình được sắp xếp khoa học, ngăn nắp."
            ],
            gameType: "matching",
            gameTitle: "Sân Khấu Thuyết Trình Nhí",
            instruction: "Nối lệnh trong PowerPoint với tác dụng chính xác:",
            pairs: [
              { a: "Thẻ Home -> New Slide", b: "Thêm một trang chiếu (Slide) mới tinh vào bài", iconA: "➕", iconB: "📄" },
              { a: "Khung Text Box", b: "Khung để gõ văn bản vào bất kì đâu trên slide", iconA: "🔤", iconB: "📝" },
              { a: "Nút lệnh Layout", b: "Chọn cách bố trí tiêu đề và nội dung cho trang", iconA: "📐", iconB: "🖼️" },
              { a: "Phím F5", b: "Trình chiếu toàn màn hình từ trang đầu tiên", iconA: "▶️", iconB: "🖥️" }
            ]
          },
          {
            id: "k4_b8",
            number: 8,
            title: "Định dạng văn bản trên trang chiếu",
            semester: 1,
            icon: "✨",
            summary: "Chọn phông chữ, cỡ chữ, màu sắc và căn lề bài thuyết trình rõ ràng, đẹp mắt.",
            theory: [
              "Quy tắc chọn màu: Màu chữ cần tương phản với màu nền (chữ đậm trên nền sáng hoặc chữ sáng trên nền tối).",
              "Cỡ chữ: Tiêu đề từ 36 - 44pt trở lên; Nội dung từ 24 - 28pt để người ngồi xa đọc rõ.",
              "Các nút định dạng: B (Bold - in đậm), I (Italic - in nghiêng), U (Underline - gạch chân)."
            ],
            gameType: "matching",
            gameTitle: "Phù Thủy Định Dạng Chữ",
            instruction: "Nối nút lệnh định dạng với công dụng tương ứng:",
            pairs: [
              { a: "Nút lệnh B (Bold)", b: "Làm chữ in đậm nét nổi bật", iconA: "𝗕", iconB: "💪" },
              { a: "Nút lệnh I (Italic)", b: "Làm chữ in nghiêng mềm mại", iconA: "𝘐", iconB: "📐" },
              { a: "Nút lệnh U (Underline)", b: "Gạch chân dưới chân chữ", iconA: "<u>U</u>", iconB: "➖" },
              { a: "Nút Font Color (Màu chữ)", b: "Đổi màu sắc của chữ theo ý muốn", iconA: "🎨", iconB: "🌈" }
            ]
          }
        ]
      },
      // ---------------------------------------------------------------------
      // HỌC KÌ 2 (BÀI 9 ĐẾN BÀI 16)
      // ---------------------------------------------------------------------
      {
        id: "k4_t4_hk2",
        name: "Chủ đề 4: Ứng dụng tin học (Học kì 2)",
        icon: "🎬",
        description: "Hiệu ứng chuyển trang sống động và sơ đồ tư duy sáng tạo",
        semester: 2,
        lessons: [
          {
            id: "k4_b9",
            number: 9,
            title: "Hiệu ứng chuyển trang và hình ảnh động",
            semester: 2,
            icon: "✨",
            summary: "Tạo hiệu ứng chuyển trang (Transitions) và hiệu ứng cho đối tượng (Animations).",
            theory: [
              "Hiệu ứng chuyển trang (Transitions): Hiệu ứng xuất hiện khi chuyển từ slide này sang slide khác.",
              "Hiệu ứng đối tượng (Animations): Hiệu ứng cho chữ hoặc tranh ảnh bay vào, xoay tròn hoặc biến mất.",
              "Lưu ý: Không nên dùng quá nhiều hiệu ứng rườm rà gây chóng mặt cho người xem."
            ],
            gameType: "matching",
            gameTitle: "Bậc Thầy Kỹ Xảo Slide",
            instruction: "Nối thẻ tính năng hiệu ứng với công dụng tương ứng:",
            pairs: [
              { a: "Thẻ Transitions", b: "Tạo hiệu ứng chuyển tiếp giữa các trang chiếu", iconA: "🔄", iconB: "📑" },
              { a: "Thẻ Animations", b: "Tạo hiệu ứng chuyển động cho tranh ảnh, chữ bay vào", iconA: "💫", iconB: "🏃" },
              { a: "Hiệu ứng Fade (Mờ dần)", b: "Hình ảnh hiện ra từ từ nhẹ nhàng", iconA: "🌫️", iconB: "👁️" },
              { a: "Hiệu ứng Fly In (Bay vào)", b: "Đối tượng từ mép màn hình bay vào vị trí chính thức", iconA: "🚀", iconB: "📍" }
            ]
          },
          {
            id: "k4_b10",
            number: 10,
            title: "Sơ đồ tư duy",
            semester: 2,
            icon: "🗺️",
            summary: "Tổ chức và tóm tắt ý tưởng sáng tạo bằng sơ đồ tư duy (Mindmap).",
            theory: [
              "Sơ đồ tư duy là công cụ giúp ghi chép và tổ chức ý tưởng bằng hình ảnh, màu sắc và các nhánh cây.",
              "Chủ đề trung tâm đặt ở chính giữa trang giấy/màn hình.",
              "Từ chủ đề chính tỏa ra các Nhánh chính, rồi đến các Nhánh phụ chi tiết.",
              "Sử dụng từ khóa ngắn gọn và biểu tượng để kích thích trí nhớ."
            ],
            gameType: "sequence",
            gameTitle: "Kiến Trúc Sư Ý Tưởng",
            instruction: "Sắp xếp 4 bước vẽ sơ đồ tư duy theo đúng thứ tự khoa học:",
            steps: [
              { id: "mm1", text: "1. Viết chủ đề chính hoặc vẽ hình ảnh trung tâm ở giữa trang 🎯" },
              { id: "mm2", text: "2. Vẽ các nhánh chính tỏa ra từ trung tâm kèm từ khóa lớn 🌿" },
              { id: "mm3", text: "3. Từ mỗi nhánh chính vẽ tiếp các nhánh phụ chi tiết hơn 🍃" },
              { id: "mm4", text: "4. Thêm màu sắc và các biểu tượng vui nhộn để dễ ghi nhớ 🎨✨" }
            ],
            explain: "Thứ tự vẽ sơ đồ tư duy: Chủ đề trung tâm ➔ Nhánh chính ➔ Nhánh phụ ➔ Tô màu & icon."
          }
        ]
      },
      {
        id: "k4_t5",
        name: "Chủ đề 5: Lập trình trực quan Scratch",
        icon: "🤖",
        description: "Lắp ráp khối lệnh thông minh cùng chú mèo Scratch",
        semester: 2,
        lessons: [
          {
            id: "k4_b11",
            number: 11,
            title: "Em làm quen với lập trình trực quan",
            semester: 2,
            icon: "🐱",
            summary: "Giao diện phần mềm Scratch: Sân khấu, Nhân vật, Khu vực khối lệnh.",
            theory: [
              "Scratch là phần mềm lập trình trực quan thông qua việc kéo ghép các khối lệnh nhiều màu sắc.",
              "Nhân vật mặc định là Chú mèo Scratch màu cam đáng yêu.",
              "Sân khấu (Stage): Nơi nhân vật biểu diễn hành động theo kịch bản.",
              "Bấm vào Lá cờ xanh 🟢 để chạy chương trình; bấm Nút đỏ 🔴 để dừng lại."
            ],
            gameType: "matching",
            gameTitle: "Bậc Thầy Ghép Thẻ Scratch",
            instruction: "Nối thành phần trong Scratch với ý nghĩa tương ứng:",
            pairs: [
              { a: "Sân khấu (Stage)", b: "Nơi nhân vật biểu diễn và chạy chương trình", iconA: "🎭", iconB: "🐱" },
              { a: "Lá cờ xanh 🟢", b: "Nút bấm kích hoạt bắt đầu chạy toàn bộ kịch bản lệnh", iconA: "🏁", iconB: "▶️" },
              { a: "Khu vực khối lệnh", b: "Chứa các mảnh ghép lệnh nhiều màu sắc để lập trình", iconA: "🧩", iconB: "🧱" },
              { a: "Nút màu đỏ 🔴", b: "Dừng lại toàn bộ chương trình đang chạy", iconA: "🛑", iconB: "⏸️" }
            ]
          },
          {
            id: "k4_b12",
            number: 12,
            title: "Tạo chương trình đầu tiên",
            semester: 2,
            icon: "🚩",
            summary: "Kéo thả khối lệnh Khi bấm cờ xanh và khối lệnh Nói (Say Hello).",
            theory: [
              "Khối lệnh sự kiện (màu vàng): 'when green flag clicked' - bắt đầu kịch bản.",
              "Khối lệnh hiển thị (màu tím): 'say [Xin chào!] for 2 seconds' - nhân vật nói ra bong bóng lời thoại.",
              "Các khối lệnh ghép nối với nhau từ trên xuống dưới như trò chơi Lego."
            ],
            gameType: "sequence",
            gameTitle: "Lắp Ráp Chương Trình Chào Bạn",
            instruction: "Sắp xếp khối lệnh để chú mèo Scratch nói lời chào thân thiện:",
            steps: [
              { id: "pr1", text: "1. when green flag clicked (Khi bấm Lá cờ xanh) 🟢" },
              { id: "pr2", text: "2. go to x: 0 y: 0 (Đến vị trí giữa sân khấu) 📍" },
              { id: "pr3", text: "3. say [Xin chào các bạn!] for 2 secs 💬" },
              { id: "pr4", text: "4. say [Mình là Mèo Scratch đây!] for 2 secs 🐱" }
            ],
            explain: "Thứ tự kịch bản: Bấm cờ xanh ➔ Đặt vị trí trung tâm ➔ Lời chào 1 ➔ Lời chào 2."
          },
          {
            id: "k4_b13",
            number: 13,
            title: "Điều khiển nhân vật di chuyển",
            semester: 2,
            icon: "🚀",
            summary: "Sử dụng khối lệnh Chuyển động (Move) và khối lệnh lặp để nhân vật bước đi.",
            theory: [
              "Khối lệnh 'move 10 steps' (màu xanh dương): nhân vật bước tới 10 bước theo hướng đang nhìn.",
              "Khối lệnh 'if on edge, bounce': nếu chạm vào cạnh mép sân khấu thì tự động bật nảy trở lại.",
              "Khối lệnh 'forever' (vòng lặp liên tục): lặp lại hành động mãi mãi không dừng."
            ],
            gameType: "sequence",
            gameTitle: "Lắp Ráp Kịch Bản Bước Đi",
            instruction: "Sắp xếp các khối lệnh để chú mèo bước đi tuần tự và không biến mất khỏi sân khấu:",
            steps: [
              { id: "sc1", text: "1. when green flag clicked (Khi bấm Lá cờ xanh) 🟢" },
              { id: "sc2", text: "2. forever (Vòng lặp liên tục mãi mãi) 🔁" },
              { id: "sc3", text: "3. move 10 steps (Di chuyển bước tới 10 bước) 🐾" },
              { id: "sc4", text: "4. if on edge, bounce (Nếu chạm cạnh thì bật lại) 🔀" },
              { id: "sc5", text: "5. wait 0.1 secs (Chờ 0.1 giây để bước chân nhịp nhàng) ⏱️" }
            ],
            explain: "Kịch bản Scratch hoàn chỉnh: Bấm cờ ➔ Lặp mãi mãi (Bước đi + Chạm mép bật lại + Chờ nhịp)."
          },
          {
            id: "k4_b14",
            number: 14,
            title: "Luyện tập lập trình trực quan",
            semester: 2,
            icon: "🎮",
            summary: "Lập trình điều khiển nhân vật bằng các phím mũi tên Lên, Xuống, Trái, Phải.",
            theory: [
              "Khối lệnh 'when [space] key pressed': kích hoạt hành động khi người chơi bấm một phím.",
              "Phím Mũi tên Phải: hướng 90 độ, bước tới; Phím Mũi tên Trái: hướng -90 độ.",
              "Phím Mũi tên Lên: hướng 0 độ (đi lên); Phím Mũi tên Xuống: hướng 180 độ (đi xuống)."
            ],
            gameType: "matching",
            gameTitle: "Đấu Trường Phím Điều Khiển",
            instruction: "Nối phím bấm với hướng di chuyển tương ứng của nhân vật:",
            pairs: [
              { a: "Phím Mũi tên Phải (Right arrow)", b: "Xoay hướng 90 độ và bước sang phải", iconA: "➡️", iconB: "👉" },
              { a: "Phím Mũi tên Trái (Left arrow)", b: "Xoay hướng -90 độ và bước sang trái", iconA: "⬅️", iconB: "👈" },
              { a: "Phím Mũi tên Lên (Up arrow)", b: "Xoay hướng 0 độ và bay thẳng lên trên", iconA: "⬆️", iconB: "👆" },
              { a: "Phím Mũi tên Xuống (Down arrow)", b: "Xoay hướng 180 độ và đi xuống dưới", iconA: "⬇️", iconB: "👇" }
            ]
          },
          {
            id: "k4_b15",
            number: 15,
            title: "Dự án: Tạo câu chuyện tương tác",
            semester: 2,
            icon: "📖",
            summary: "Tạo dự án phim hoạt hình ngắn đối thoại giữa hai nhân vật trên sân khấu.",
            theory: [
              "Thêm nhân vật thứ hai vào sân khấu từ thư viện Scratch.",
              "Sử dụng khối lệnh 'wait [N] seconds' để hai nhân vật đối thoại lần lượt, không nói đè lên nhau.",
              "Đổi hình nền sân khấu (Backdrop) phù hợp với bối cảnh câu chuyện."
            ],
            gameType: "sequence",
            gameTitle: "Đạo Diễn Hoạt Hình Nhí",
            instruction: "Sắp xếp trình tự đối thoại giữa Chú mèo và Chú chó:",
            steps: [
              { id: "an1", text: "1. Mèo nói: 'Xin chào bạn Chó vàng!' trong 2 giây 🐱" },
              { id: "an2", text: "2. Chó chờ 2 giây trong khi Mèo đang nói ⏱️" },
              { id: "an3", text: "3. Chó vẫy đuôi đáp: 'Chào Mèo con đáng yêu!' trong 2 giây 🐶" },
              { id: "an4", text: "4. Cả hai cùng nhảy múa vui vẻ trên sân khấu công viên 🌳✨" }
            ],
            explain: "Thứ tự đối thoại nhịp nhàng giúp bộ phim hoạt hình diễn ra mượt mà và cuốn hút!"
          },
          {
            id: "k4_b16",
            number: 16,
            title: "Ôn tập và củng cố cuối năm",
            semester: 2,
            icon: "🏆",
            summary: "Tổng kết toàn bộ kiến thức Tin học Lớp 4 chuẩn bị bước vào Lớp 5.",
            theory: [
              "Hệ thống lại kiến thức: Phần cứng & phần mềm; Thao tác tệp và thư mục; An toàn bản quyền; Bài trình chiếu PowerPoint; Lập trình trực quan Scratch.",
              "Tin học là công cụ đắc lực giúp em học giỏi tất cả các môn học khác."
            ],
            gameType: "quiz",
            gameTitle: "Đại Hội Anh Tài Tin Học 4",
            instruction: "Vượt qua thử thách tổng kết năm học để nhận cúp vinh quang:",
            questions: [
              {
                q: "Thiết bị nào sau đây là bộ phận phần cứng xuất âm thanh của máy tính?",
                options: ["Loa vi tính", "Bàn phím", "Chuột quang", "Máy quét"],
                correct: 0,
                explain: "Loa là thiết bị phần cứng xuất âm thanh."
              },
              {
                q: "Trong Scratch, để nhân vật lặp lại một hành động liên tục không bao giờ dừng, ta dùng khối lệnh nào?",
                options: ["repeat 10", "forever", "if then", "wait 1 secs"],
                correct: 1,
                explain: "Khối lệnh 'forever' (mãi mãi) tạo vòng lặp vô tận cho nhân vật."
              },
              {
                q: "Khi sao chép một tệp (Copy), tệp gốc ở vị trí cũ sẽ như thế nào?",
                options: ["Bị xóa mất", "Vẫn còn nguyên vẹn", "Bị đổi tên", "Bị biến thành thư mục"],
                correct: 1,
                explain: "Lệnh Copy tạo thêm bản sao mới mà vẫn giữ nguyên tệp gốc."
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // KHỐI 5: 16 BÀI HỌC (HỌC KÌ 1: BÀI 1-8 | HỌC KÌ 2: BÀI 9-16)
  // =========================================================================
  5: {
    title: "Tin Học Lớp 5 - Lập Trình Tương Lai",
    subtitle: "Bộ sách Kết nối tri thức với cuộc sống (Trọn bộ HK1 & HK2)",
    color: "#ff0077",
    topics: [
      {
        id: "k5_t1",
        name: "Chủ đề 1: Máy tính và em",
        icon: "💾",
        description: "Dữ liệu, thông tin và nhận diện tin giả trên không gian mạng",
        semester: 1,
        lessons: [
          {
            id: "k5_b1",
            number: 1,
            title: "Thông tin và dữ liệu",
            semester: 1,
            icon: "📁",
            summary: "Phân biệt dữ liệu thô (chữ, số, hình ảnh lưu trữ) và thông tin ý nghĩa con người hiểu được.",
            theory: [
              "Dữ liệu (Data) là các con số, chữ viết, hình ảnh, âm thanh được thu thập và lưu trữ trong máy tính.",
              "Thông tin (Information) là ý nghĩa mà con người rút ra được sau khi phân tích dữ liệu.",
              "Ví dụ: Dữ liệu là con số '40 độ C'; Thông tin là 'Hôm nay trời nắng rất gay gắt, cần hạn chế ra ngoài'."
            ],
            gameType: "sorting",
            gameTitle: "Phân Loại Dữ Liệu vs Thông Tin",
            instruction: "Phân loại từng trường hợp vào Căn cứ [DỮ LIỆU THÔ 💾] hoặc [THÔNG TIN Ý NGHĨA 💡]:",
            bins: [
              { id: "data", name: "DỮ LIỆU THÔ (Số, chữ, ký hiệu)", icon: "💾", color: "#00f3ff" },
              { id: "info", name: "THÔNG TIN (Ý nghĩa hiểu được)", icon: "💡", color: "#ffb800" }
            ],
            items: [
              { text: "Con số ghi trên bảng: '40 độ C'", binId: "data", explain: "Đây là dữ liệu nhiệt độ đo được bằng số." },
              { text: "Hiểu rằng: 'Hôm nay trời nắng rất gắt, cần đội mũ khi ra đường'", binId: "info", explain: "Đây là thông tin có ý nghĩa giúp con người ra quyết định." },
              { text: "Dãy số điện thoại: '0912345678'", binId: "data", explain: "Dữ liệu gồm 10 chữ số được lưu trong danh bạ." },
              { text: "Biết được: 'Đây là số liên lạc của cô giáo chủ nhiệm'", binId: "info", explain: "Thông tin cho ta biết chủ nhân và mục đích số điện thoại." },
              { text: "Bức ảnh chụp đám mây đen và sấm chớp", binId: "data", explain: "Dữ liệu tệp hình ảnh lưu trong máy ảnh." },
              { text: "Nhận biết: 'Cơn bão sắp đổ bộ, cần chằng chống nhà cửa'", binId: "info", explain: "Thông tin cảnh báo thiên tai quan trọng." }
            ]
          },
          {
            id: "k5_b2",
            number: 2,
            title: "Tìm kiếm thông tin trên Internet",
            semester: 1,
            icon: "🔎",
            summary: "Thẩm định độ tin cậy của thông tin: Phân biệt Tin thật từ nguồn uy tín vs Tin giả (Fake news).",
            theory: [
              "Không phải mọi thông tin trên mạng Internet đều là sự thật.",
              "Nguồn tin cậy: Trang web của cơ quan chính phủ (.gov), trường học (.edu), đài truyền hình, báo chí chính thống.",
              "Dấu hiệu tin giả (Fake news): Tiêu đề giật gân, không có tên tác giả, không rõ ngày tháng, bài viết nặc danh kêu gọi like/share.",
              "Quy tắc vàng: Luôn kiểm chứng với người có chuyên môn trước khi tin hoặc chia sẻ."
            ],
            gameType: "truefalse",
            gameTitle: "Thám Tử Thẩm Định Tin Tức",
            instruction: "Chọn ĐÚNG 🛡️ (Đáng tin cậy) hoặc SAI ⚔️ (Tin giả / Nguy hiểm):",
            questions: [
              { statement: "Trang web có đuôi tên miền .gov (chính phủ) hoặc .edu (giáo dục) là nguồn tin chính thống tin cậy.", isTrue: true, explain: "Đúng! Cơ quan nhà nước và giáo dục luôn kiểm duyệt thông tin chuẩn mực." },
              { statement: "Một bài viết giật gân trên Facebook không rõ người viết nói 'ngày mai được nghỉ học cả năm' là tin thật 100%.", isTrue: false, explain: "Sai hoàn toàn! Đây là tin giả gây hoang mang dư luận." },
              { statement: "Khi thấy tin lạ về sức khỏe hoặc bão lũ, em nên hỏi lại bố mẹ và thầy cô để kiểm chứng.", isTrue: true, explain: "Rất chuẩn! Luôn đối chiếu với người có thẩm quyền trước khi tin." }
            ]
          }
        ]
      },
      {
        id: "k5_t2",
        name: "Chủ đề 2: Mạng máy tính và Internet",
        icon: "👥",
        description: "Mạng xã hội và giao tiếp văn minh trên môi trường số",
        semester: 1,
        lessons: [
          {
            id: "k5_b3",
            number: 3,
            title: "Mạng xã hội và chia sẻ thông tin",
            semester: 1,
            icon: "🌐",
            summary: "Lợi ích, tác hại và quy tắc ứng xử văn minh, bảo vệ quyền riêng tư trên mạng xã hội.",
            theory: [
              "Mạng xã hội giúp kết nối người thân bạn bè, chia sẻ kiến thức học tập và sở thích bổ ích.",
              "Tuyệt đối không đăng tải thông tin cá nhân riêng tư, không nói xấu hoặc chê bai người khác trên mạng.",
              "Hỏi ý kiến bạn bè trước khi đăng ảnh có mặt bạn lên mạng xã hội.",
              "Cảnh giác với tin nhắn mượn tiền, yêu cầu mã OTP, link độc hại từ người lạ."
            ],
            gameType: "sorting",
            gameTitle: "Công Dân Số Văn Minh",
            instruction: "Phân loại hành vi vào Căn cứ [VĂN MINH TÍCH CỰC 👍] hoặc [NGUY HIỂM VI PHẠM 👎]:",
            bins: [
              { id: "good", name: "VĂN MINH - TÍCH CỰC", icon: "👍", color: "#00ff88" },
              { id: "bad", name: "NGUY HIỂM - VI PHẠM", icon: "👎", color: "#ff3366" }
            ],
            items: [
              { text: "Chia sẻ bài văn hay hoặc video khoa học bổ ích cho nhóm bạn cùng học", binId: "good", explain: "Hành vi tích cực lan tỏa tri thức cho cộng đồng." },
              { text: "Chụp ảnh bài kiểm tra điểm kém của bạn rồi đăng lên mạng trêu chọc", binId: "bad", explain: "Hành vi xúc phạm danh dự bạn bè, vi phạm văn hóa mạng!" },
              { text: "Hỏi ý kiến và được sự đồng ý của bạn trước khi đăng ảnh chụp chung", binId: "good", explain: "Tôn trọng quyền riêng tư cá nhân của người khác." },
              { text: "Người lạ tự xưng là bạn của mẹ xin mã OTP, lập tức nhắn gửi ngay", binId: "bad", explain: "Thủ đoạn lừa đảo nguy hiểm, tuyệt đối không gửi mã bảo mật!" }
            ]
          }
        ]
      },
      {
        id: "k5_t3",
        name: "Chủ đề 3: Đạo đức, pháp luật và văn hoá",
        icon: "📜",
        description: "Tôn trọng bản quyền số và bảo vệ an toàn trên không gian mạng",
        semester: 1,
        lessons: [
          {
            id: "k5_b4",
            number: 4,
            title: "Tôn trọng bản quyền khi sử dụng thông tin",
            semester: 1,
            icon: "✍️",
            summary: "Quy tắc trích dẫn nguồn khi sử dụng văn bản, tranh ảnh, video của tác giả khác.",
            theory: [
              "Khi sử dụng tài liệu của người khác, phải ghi rõ Tên tác giả và Nguồn gốc tài liệu (Ví dụ: Nguồn: Báo Thiếu niên Tiền phong).",
              "Không tự ý nhận tác phẩm của người khác là của mình (đạo văn, gian lận).",
              "Sử dụng thông tin có trách nhiệm thể hiện sự trung thực và lòng tự trọng."
            ],
            gameType: "truefalse",
            gameTitle: "Vệ Binh Sở Hữu Trí Tuệ",
            instruction: "Chọn ĐÚNG 🛡️ hoặc SAI ⚔️ cho các câu hỏi về trích dẫn nguồn:",
            questions: [
              { statement: "Khi lấy một đoạn thơ hay trên mạng vào bài thuyết trình, em ghi rõ tên nhà thơ sáng tác.", isTrue: true, explain: "Rất chuẩn! Thể hiện sự tôn trọng công sức của tác giả." },
              { statement: "Sao chép nguyên văn bài làm của bạn rồi xóa tên bạn đi, ghi tên mình vào để nộp cô giáo.", isTrue: false, explain: "Sai! Đó là hành vi gian lận học tập đáng chê trách." },
              { statement: "Luật Sở hữu trí tuệ bảo vệ quyền lợi của những người sáng tạo ra tác phẩm.", isTrue: true, explain: "Chính xác! Pháp luật bảo hộ quyền tác giả đối với tác phẩm trí tuệ." }
            ]
          },
          {
            id: "k5_b5",
            number: 5,
            title: "Sử dụng công nghệ số an toàn và có trách nhiệm",
            semester: 1,
            icon: "🔒",
            summary: "Phòng tránh nghiện thiết bị số, bảo vệ mắt và giữ gìn bí mật mật khẩu mạnh.",
            theory: [
              "Mật khẩu mạnh: Dài ít nhất 8 kí tự, kết hợp chữ hoa, chữ thường, số và kí hiệu đặc biệt (như @, #, $).",
              "Không dùng mật khẩu quá dễ đoán như '123456' hay ngày sinh nhật.",
              "Phòng tránh nghiện game/mạng xã hội: Cân bằng thời gian học tập, vui chơi ngoài trời và giúp đỡ gia đình."
            ],
            gameType: "matching",
            gameTitle: "Tấm Khiên An Ninh Mạng",
            instruction: "Nối loại mật khẩu với mức độ an toàn bảo mật:",
            pairs: [
              { a: "Mật khẩu: '123456' hoặc 'abc'", b: "Rất yếu, hacker dò ra trong 1 giây ❌", iconA: "🔓", iconB: "⚠️" },
              { a: "Mật khẩu: 'Robot#2026@TinHoc'", b: "Cực kì mạnh và an toàn, khó bị bẻ khóa 🛡️", iconA: "🔐", iconB: "🌟" },
              { a: "Thời gian ngồi máy tính mỗi lần", b: "Nên dưới 45 phút rồi nghỉ ngơi mắt ⏱️", iconA: "⏰", iconB: "👀" },
              { a: "Khi rời khỏi máy tính công cộng", b: "Phải Đăng xuất (Log out) tài khoản ngay 🚪", iconA: "🖥️", iconB: "🔒" }
            ]
          }
        ]
      },
      {
        id: "k5_t4",
        name: "Chủ đề 4: Ứng dụng tin học",
        icon: "📊",
        description: "Thu thập, tổ chức dữ liệu và trình bày với bảng, biểu đồ",
        semester: 1,
        lessons: [
          {
            id: "k5_b6",
            number: 6,
            title: "Trình bày thông tin với bảng và biểu đồ",
            semester: 1,
            icon: "📈",
            summary: "Sử dụng bảng (Table) và biểu đồ (Chart) để so sánh số liệu trực quan, dễ hiểu.",
            theory: [
              "Bảng (Table) gồm các hàng (Rows) và cột (Columns), giao của hàng và cột là Ô (Cell).",
              "Biểu đồ hình cột: So sánh số liệu giữa các nhóm (Ví dụ: So sánh số điểm 10 giữa các tổ trong lớp).",
              "Biểu đồ hình quạt tròn: Biểu diễn tỉ lệ phần trăm của từng phần trong tổng thể."
            ],
            gameType: "matching",
            gameTitle: "Phù Thủy Biểu Đồ Số",
            instruction: "Nối loại biểu đồ với mục đích sử dụng phù hợp nhất:",
            pairs: [
              { a: "Bảng số liệu (Table)", b: "Trình bày thông tin ngăn nắp theo hàng và cột", iconA: "📋", iconB: "🔢" },
              { a: "Biểu đồ hình cột (Column Chart)", b: "So sánh độ lớn số liệu giữa các đối tượng", iconA: "📊", iconB: "📏" },
              { a: "Biểu đồ hình quạt tròn (Pie Chart)", b: "Thể hiện tỉ lệ phần trăm các thành phần", iconA: "🥧", iconB: "🥧" },
              { a: "Biểu đồ đường (Line Chart)", b: "Thể hiện sự tăng giảm số liệu theo thời gian", iconA: "📈", iconB: "📅" }
            ]
          },
          {
            id: "k5_b7",
            number: 7,
            title: "Sử dụng công cụ đa phương tiện để trình bày",
            semester: 1,
            icon: "🎬",
            summary: "Kết hợp âm thanh, video và sơ đồ động trong bài thuyết trình đa phương tiện.",
            theory: [
              "Đa phương tiện (Multimedia) là sự kết hợp của nhiều dạng thông tin: Văn bản, hình ảnh, âm thanh, video hoạt hình.",
              "Bài thuyết trình đa phương tiện giúp khán giả hào hứng, dễ tiếp thu kiến thức phức tạp.",
              "Cách chèn video vào trang chiếu: Thẻ Insert ➔ Video ➔ Chọn video từ máy tính."
            ],
            gameType: "quiz",
            gameTitle: "Đạo Diễn Truyền Thông Nhí",
            instruction: "Chọn đáp án đúng về sản phẩm đa phương tiện:",
            questions: [
              {
                q: "Một sản phẩm đa phương tiện (Multimedia) có thể chứa những dạng thông tin nào?",
                options: ["Chỉ duy nhất văn bản chữ viết", "Chỉ tranh ảnh tĩnh", "Văn bản, hình ảnh, âm thanh và video kết hợp", "Chỉ âm thanh"],
                correct: 2,
                explain: "Đa phương tiện là sự hòa quyện của chữ, ảnh, tiếng và video."
              },
              {
                q: "Để chèn một đoạn video bài hát vào bài thuyết trình PowerPoint, em chọn thẻ nào?",
                options: ["Thẻ View", "Thẻ Insert -> Video", "Thẻ Review", "Thẻ Design"],
                correct: 1,
                explain: "Thẻ Insert (Chèn) chứa các nút chèn Video, Audio, Pictures."
              }
            ]
          },
          {
            id: "k5_b8",
            number: 8,
            title: "Thu thập và tổ chức dữ liệu",
            semester: 1,
            icon: "🗃️",
            summary: "Lập phiếu khảo sát, thu thập dữ liệu và sắp xếp theo tiêu chí khoa học.",
            theory: [
              "Thu thập dữ liệu: Hỏi ý kiến, phỏng vấn, đếm số lượng hoặc làm phiếu khảo sát.",
              "Tổ chức dữ liệu: Phân loại theo tiêu chí (theo ngày tháng, theo nhóm lớp, theo điểm số).",
              "Sử dụng phần mềm bảng tính (như Excel) để tính tổng, tính trung bình tự động."
            ],
            gameType: "sequence",
            gameTitle: "Quy Trình Khảo Sát Dữ Liệu",
            instruction: "Sắp xếp 4 bước thu thập và báo cáo dữ liệu về sở thích đọc sách của lớp:",
            steps: [
              { id: "dt1", text: "1. Lập phiếu hỏi khảo sát các thể loại sách bạn thích đọc 📝" },
              { id: "dt2", text: "2. Phát phiếu và thu thập câu trả lời từ tất cả các bạn trong lớp 📋" },
              { id: "dt3", text: "3. Nhập số liệu vào bảng tính và vẽ biểu đồ hình cột 📊" },
              { id: "dt4", text: "4. Báo cáo kết quả: Thể loại truyện tranh hay khoa học được thích nhất 🎤" }
            ],
            explain: "Quy trình: Lập phiếu ➔ Thu thập ➔ Tổng hợp vẽ biểu đồ ➔ Báo cáo kết luận."
          }
        ]
      },
      // ---------------------------------------------------------------------
      // HỌC KÌ 2 (BÀI 9 ĐẾN BÀI 16)
      // ---------------------------------------------------------------------
      {
        id: "k5_t5",
        name: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
        icon: "⚡",
        description: "Thuật toán nâng cao: Cấu trúc Tuần tự, Rẽ nhánh, Vòng lặp và Dự án Game",
        semester: 2,
        lessons: [
          {
            id: "k5_b9",
            number: 9,
            title: "Cấu trúc tuần tự trong lập trình",
            semester: 2,
            icon: "1️⃣",
            summary: "Các lệnh được máy tính thực hiện lần lượt từ trên xuống dưới theo thứ tự logic chặt chẽ.",
            theory: [
              "Cấu trúc tuần tự: Các câu lệnh thực hiện nối tiếp nhau theo thứ tự xuất hiện, lệnh trước xong mới tới lệnh sau.",
              "Nếu đảo lộn thứ tự các bước trong cấu trúc tuần tự thì kết quả sẽ bị sai lầm nghiêm trọng.",
              "Ví dụ thuật toán tuần tự: Quy trình Robot pha một ly sữa bột ấm."
            ],
            gameType: "sequence",
            gameTitle: "Dây Chuyền Thuật Toán Robot",
            instruction: "Sắp xếp thuật toán để Robot pha sữa bột theo đúng thứ tự tuần tự:",
            steps: [
              { id: "sq1", text: "1. Lấy một chiếc cốc sạch đặt ngay ngắn lên bàn 🥛" },
              { id: "sq2", text: "2. Múc 3 muỗng sữa bột cho vào cốc 🥄" },
              { id: "sq3", text: "3. Rót 150ml nước ấm vào cốc 🫖" },
              { id: "sq4", text: "4. Dùng thìa khuấy đều cho sữa tan hết 🔄" },
              { id: "sq5", text: "5. Mời bạn bè thưởng thức ly sữa thơm ngon 😋" }
            ],
            explain: "Thứ tự tuần tự chuẩn xác: Chuẩn bị cốc ➔ Cho sữa bột ➔ Rót nước ➔ Khuấy đều ➔ Thưởng thức."
          },
          {
            id: "k5_b10",
            number: 10,
            title: "Cấu trúc rẽ nhánh (Nếu - Thì)",
            semester: 2,
            icon: "🔀",
            summary: "Điều kiện logic: Dạng thiếu (Nếu... Thì...) và Dạng đủ (Nếu... Thì... Ngược lại...).",
            theory: [
              "Cấu trúc rẽ nhánh kiểm tra một Điều kiện (Đúng hay Sai).",
              "Dạng thiếu: 'Nếu <điều kiện> thì <lệnh A>' - chỉ khi điều kiện đúng mới làm lệnh A.",
              "Dạng đủ: 'Nếu <điều kiện> thì <lệnh A> không thì <lệnh B>' - nếu đúng làm A, nếu sai làm B.",
              "Trong Scratch: Khối 'if <...> then' và khối 'if <...> then ... else'."
            ],
            gameType: "quiz",
            gameTitle: "Đường Đua Ngã Rẽ Logic",
            instruction: "Chọn khối lệnh logic chính xác nhất cho từng tình huống:",
            questions: [
              {
                q: "Câu nói: 'NẾU trời mưa THÌ em mang ô, KHÔNG THÌ em đội mũ vải'. Điều kiện ở đây là gì?",
                options: ["Em mang ô", "Trời mưa", "Em đội mũ", "Cả 3 phương án"],
                correct: 1,
                explain: "'Trời mưa' là điều kiện kiểm tra để rẽ nhánh hành động."
              },
              {
                q: "Khối lệnh nào trong Scratch thể hiện cấu trúc rẽ nhánh dạng đủ (Nếu - Thì - Ngược lại)?",
                options: ["if <điều kiện> then ... else ...", "forever ...", "repeat 10 ...", "wait 1 secs"],
                correct: 0,
                explain: "Khối 'if then else' là cấu trúc rẽ nhánh dạng đủ chuẩn mực."
              },
              {
                q: "Trong game hứng quà, lệnh: 'Nếu Điểm số >= 100 thì Chúc mừng Chiến thắng' thuộc cấu trúc gì?",
                options: ["Cấu trúc tuần tự", "Cấu trúc lặp vô tận", "Cấu trúc rẽ nhánh (Nếu - Thì)", "Không phải lập trình"],
                correct: 2,
                explain: "Chỉ khi thỏa mãn điều kiện đạt >= 100 điểm thì mới kích hoạt thông báo thắng."
              }
            ]
          },
          {
            id: "k5_b11",
            number: 11,
            title: "Cấu trúc lặp trong lập trình",
            semester: 2,
            icon: "🔁",
            summary: "Vòng lặp hữu hạn (Repeat N) và vòng lặp vô tận (Forever) trong Scratch.",
            theory: [
              "Vòng lặp giúp lặp lại các công việc giống nhau mà không phải viết đi viết lại nhiều lần dòng lệnh.",
              "Lặp với số lần biết trước: 'repeat [N]' (ví dụ lặp 4 lần để vẽ 4 cạnh hình vuông).",
              "Lặp vô tận: 'forever' (ví dụ quả bóng rơi liên tục trong game).",
              "Lợi ích: Giúp chương trình ngắn gọn, thông minh và tiết kiệm bộ nhớ."
            ],
            gameType: "sequence",
            gameTitle: "Lắp Ráp Vòng Lặp Vẽ Hình Vuông",
            instruction: "Sắp xếp các khối lệnh để nhân vật dùng vòng lặp vẽ một hình vuông chuẩn:",
            steps: [
              { id: "lp1", text: "1. Đặt bút vẽ màu xanh và hạ bút xuống (pen down) 🖊️" },
              { id: "lp2", text: "2. Lặp lại đúng 4 lần (repeat 4) cho 4 cạnh 🔁" },
              { id: "lp3", text: "3. Di chuyển bước tới 100 bước (move 100 steps) 📏" },
              { id: "lp4", text: "4. Xoay phải 90 độ (turn right 90 degrees) 📐" },
              { id: "lp5", text: "5. Nhấc bút lên hoàn thành hình vuông (pen up) ✨" }
            ],
            explain: "Hạ bút ➔ Vòng lặp 4 lần (Đi 100 bước + Xoay 90 độ) ➔ Nhấc bút."
          },
          {
            id: "k5_b12",
            number: 12,
            title: "Thực hành lập trình trò chơi",
            semester: 2,
            icon: "🍎",
            summary: "Xây dựng trò chơi 'Hứng Quả Táo Rơi' hoàn chỉnh với tính điểm và va chạm cảm biến.",
            theory: [
              "Nhân vật hứng (Cái bát): Di chuyển sang trái/phải theo con trỏ chuột (x = mouse x).",
              "Nhân vật quả táo: Xuất phát ngẫu nhiên ở trên đỉnh màn hình (y = 180), rơi xuống dưới (change y by -5).",
              "Khối cảm biến va chạm: 'touching [Bát hứng]?' ➔ tăng Điểm số lên 1, phát tiếng chuông và đưa quả táo quay lại đỉnh."
            ],
            gameType: "matching",
            gameTitle: "Bậc Thầy Game Studio Nhí",
            instruction: "Nối chức năng trong game với khối lệnh Scratch tương ứng:",
            pairs: [
              { a: "Làm quả táo rơi xuống dưới", b: "Khối lệnh 'change y by -5'", iconA: "🍎", iconB: "⬇️" },
              { a: "Bát di chuyển theo chuột", b: "Khối lệnh 'set x to mouse x'", iconA: "🥣", iconB: "🖱️" },
              { a: "Kiểm tra va chạm hứng trúng", b: "Khối cảm biến 'touching [Bát]?'", iconA: "💥", iconB: "🎯" },
              { a: "Cộng thêm 1 điểm khi hứng được", b: "Khối lệnh 'change Điểm số by 1'", iconA: "⭐", iconB: "➕" }
            ]
          },
          {
            id: "k5_b13",
            number: 13,
            title: "Biến trong lập trình",
            semester: 2,
            icon: "📦",
            summary: "Biến (Variable) là ô nhớ dùng để lưu trữ và thay đổi giá trị trong suốt quá trình chạy game.",
            theory: [
              "Biến giống như một chiếc hộp có dán nhãn tên, bên trong chứa giá trị (như số điểm, số mạng chơi, thời gian).",
              "Giá trị của biến có thể thay đổi: Ban đầu Điểm số = 0, ăn táo thì tăng 1, va quái vật thì Mạng chơi giảm 1.",
              "Khối lệnh 'set [Biến] to [0]' dùng để đặt lại giá trị khởi đầu."
            ],
            gameType: "truefalse",
            gameTitle: "Nhà Quản Trị Hộp Biến Số",
            instruction: "Chọn ĐÚNG 🛡️ hoặc SAI ⚔️ cho các câu hỏi về Biến trong Scratch:",
            questions: [
              { statement: "Biến (Variable) dùng để lưu trữ giá trị có thể thay đổi như Điểm số và Thời gian chơi.", isTrue: true, explain: "Chính xác! Đó là công dụng cốt lõi của biến trong lập trình." },
              { statement: "Giá trị của biến một khi đã đặt là không bao giờ thay đổi được nữa.", isTrue: false, explain: "Sai! Giá trị của biến có thể tăng lên hoặc giảm đi linh hoạt." },
              { statement: "Khi bắt đầu game mới, ta cần đặt lại biến Điểm số về 0 (set Score to 0).", isTrue: true, explain: "Đúng! Giúp người chơi bắt đầu lượt thi mới công bằng." }
            ]
          },
          {
            id: "k5_b14",
            number: 14,
            title: "Thực hành dự án sáng tạo",
            semester: 2,
            icon: "🚀",
            summary: "Tự thiết kế trò chơi Mê Cung hoặc Bắn Thiên Thạch bảo vệ trái đất theo ý tưởng riêng.",
            theory: [
              "Quy trình sáng tạo dự án: (1) Lên ý tưởng ➔ (2) Vẽ/chọn nhân vật và hình nền ➔ (3) Lập trình kịch bản lệnh ➔ (4) Chơi thử và sửa lỗi (Debug).",
              "Sáng tạo các chướng ngại vật và phần thưởng đặc biệt để trò chơi thêm hấp dẫn."
            ],
            gameType: "sequence",
            gameTitle: "Quy Trình Phát Triển Trò Chơi",
            instruction: "Sắp xếp 4 bước của một lập trình viên game chuyên nghiệp:",
            steps: [
              { id: "gp1", text: "1. Lên ý tưởng luật chơi: Mục tiêu, chướng ngại vật và cách chiến thắng 💡" },
              { id: "gp2", text: "2. Thiết kế nhân vật phi thuyền và hình nền không gian vũ trụ 🎨" },
              { id: "gp3", text: "3. Lắp ráp các khối lệnh điều khiển, va chạm và tính điểm 🤖" },
              { id: "gp4", text: "4. Chơi thử nghiệm, sửa các lỗi phát sinh và chia sẻ cho bạn bè cùng chơi 🎮✨" }
            ],
            explain: "Quy trình chuẩn: Lên ý tưởng ➔ Thiết kế đồ họa ➔ Lập trình ➔ Chơi thử và hoàn thiện."
          },
          {
            id: "k5_b15",
            number: 15,
            title: "Đánh giá và chia sẻ sản phẩm số",
            semester: 2,
            icon: "🌟",
            summary: "Trình diễn sản phẩm của mình, lắng nghe góp ý xây dựng và tôn trọng sản phẩm của bạn bè.",
            theory: [
              "Khi thuyết trình sản phẩm số: Nói rõ tên dự án, cách chơi, điểm độc đáo sáng tạo nhất của trò chơi.",
              "Đóng góp ý kiến cho bạn: Lời lẽ lịch sự, mang tính xây dựng, khen ngợi ưu điểm trước khi chỉ ra lỗi cần khắc phục.",
              "Biết lắng nghe góp ý để nâng cấp sản phẩm ngày càng hoàn thiện hơn."
            ],
            gameType: "truefalse",
            gameTitle: "Hội Đồng Giám Khảo Nhí",
            instruction: "Chọn ĐÚNG 🛡️ (Thái độ chuẩn mực) hoặc SAI ⚔️ (Hành vi không nên):",
            questions: [
              { statement: "Lắng nghe góp ý của bạn bè với thái độ cầu thị giúp sản phẩm của mình tốt hơn.", isTrue: true, explain: "Rất chuẩn! Tinh thần học hỏi là phẩm chất tuyệt vời của lập trình viên." },
              { statement: "Chê bai dè bỉu sản phẩm của bạn trước cả lớp bằng những lời lẽ khó nghe.", isTrue: false, explain: "Sai hoàn toàn! Cần nhận xét lịch sự và tôn trọng công sức của bạn." }
            ]
          },
          {
            id: "k5_b16",
            number: 16,
            title: "Ôn tập tổng kết năm học - Sẵn sàng vào Lớp 6",
            semester: 2,
            icon: "🎓",
            summary: "Tổng kết toàn bộ chương trình Tin học Tiểu học, trang bị nền tảng vững chắc bước vào THCS.",
            theory: [
              "Hành trình tiểu học đã trang bị cho em: Kiến thức phần cứng & phần mềm; Kỹ năng tìm kiếm và thẩm định thông tin; Ý thức công dân số an toàn, văn minh; Tư duy thuật toán và lập trình sáng tạo.",
              "Tin học là chìa khóa mở ra cánh cửa tương lai trong kỷ nguyên số 4.0!"
            ],
            gameType: "quiz",
            gameTitle: "Chinh Phục Đỉnh Cao Tin Học Tiểu Học",
            instruction: "Vượt qua thử thách cuối cùng để nhận danh hiệu Bậc Thầy Công Nghệ Tiểu Học:",
            questions: [
              {
                q: "Ba cấu trúc điều khiển cơ bản trong mọi ngôn ngữ lập trình là gì?",
                options: ["Cấu trúc Tuần tự, Cấu trúc Rẽ nhánh, Cấu trúc Lặp", "Cấu trúc Bàn phím, Chuột, Màn hình", "Cấu trúc Word, Excel, PowerPoint", "Cấu trúc Tệp, Thư mục, Ổ đĩa"],
                correct: 0,
                explain: "Tuần tự, Rẽ nhánh (Nếu - Thì) và Lặp là 3 viên gạch nền tảng của mọi thuật toán trên thế giới."
              },
              {
                q: "Khi đọc được thông tin giật gân lạ trên mạng, thái độ thông minh của một công dân số là gì?",
                options: ["Chia sẻ ngay không cần suy nghĩ", "Kiểm chứng nguồn tin, đối chiếu với trang web chính thống hoặc hỏi người lớn", "Tin ngay lập tức", "Lưu về máy gửi cho cả trường"],
                correct: 1,
                explain: "Luôn thẩm định và kiểm chứng thông tin trước khi tin hoặc chia sẻ."
              },
              {
                q: "Để bảo vệ an toàn cho tài khoản cá nhân, mật khẩu nên có đặc điểm gì?",
                options: ["Ngắn gọn chỉ 1 chữ số", "Mật khẩu mạnh kết hợp chữ hoa, chữ thường, số và kí hiệu đặc biệt", "Dùng ngày sinh nhật", "Công khai cho mọi người cùng biết"],
                correct: 1,
                explain: "Mật khẩu mạnh kết hợp nhiều loại kí tự giúp bảo vệ tài khoản an toàn tuyệt đối."
              }
            ]
          }
        ]
      }
    ]
  }
};

// Danh sách Avatar ngầu cho học sinh chọn
const AVATARS = [
  { id: "robot_blue", name: "Cyber Bot", icon: "🤖", title: "Chiến Binh Số" },
  { id: "astro_cat", name: "Mèo Không Gian", icon: "🐱‍🚀", title: "Thám Tử Sao" },
  { id: "super_hero", name: "Hiệp Sĩ Byte", icon: "🦸‍♂️", title: "Siêu Lập Trình" },
  { id: "wonder_girl", name: "Nữ Thần Code", icon: "🦸‍♀️", title: "Phù Thủy Thuật Toán" },
  { id: "rocket_ship", name: "Tàu Không Gian", icon: "🚀", title: "Phi Công Siêu Tốc" },
  { id: "smart_alien", name: "Người Ngoài Hành Tinh", icon: "👽", title: "Bậc Thầy Thiên Hà" },
  { id: "game_controller", name: "Game Master", icon: "🎮", title: "Cao Thủ Trò Chơi" },
  { id: "lightning_spark", name: "Tia Chớp Vàng", icon: "⚡", title: "Tốc Độ Ánh Sáng" }
];

// Danh sách lớp mặc định theo khối để học sinh chọn nhanh hoặc nhập tự do
const DEFAULT_CLASSES = {
  3: ["3A", "3B", "3C", "3D", "3E"],
  4: ["4A", "4B", "4C", "4D", "4E"],
  5: ["5A", "5B", "5C", "5D", "5E"]
};
