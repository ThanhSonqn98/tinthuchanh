/**
 * CONTROLLER ĐIỀU HÀNH CHÍNH (APPLICATION CONTROLLER)
 * Quản lý Đăng nhập, Chuyển Khối 3-4-5, Hiển thị Chủ đề - Bài học, Bảng xếp hạng và Mascot Robo-Tin
 */

class AppController {
  constructor() {
    this.currentUser = null;
    this.currentGrade = 3;
    this.currentSemester = "all"; // 'all', 1, hoặc 2
    this.currentTopicId = null;
    this.selectedAvatar = AVATARS[0].icon;

    // Leaderboard state
    this.lbFilter = {
      grade: 3,
      lessonId: null,
      scope: "grade", // 'grade' hoặc 'lesson'
      className: "ALL"
    };

    this.init();
  }

  init() {
    // 1. Kiểm tra trạng thái đăng nhập
    this.currentUser = Storage.getCurrentUser();
    if (this.currentUser) {
      this.currentGrade = Number(this.currentUser.grade) || 3;
      this.showMainApp();
    } else {
      this.showLoginScreen();
    }

    // 2. Lắng nghe cập nhật điểm số thời gian thực từ các tab khác
    Storage.onScoreUpdate((record) => {
      this.handleRealtimeScoreUpdate(record);
    });

    // 3. Khởi tạo các sự kiện
    this.bindEvents();
  }

  // Hiển thị màn hình đăng nhập
  showLoginScreen() {
    const loginSection = document.getElementById("loginSection");
    const mainSection = document.getElementById("mainSection");
    const navUserPill = document.getElementById("navUserPill");
    const btnNavLogout = document.getElementById("btnNavLogout");

    if (loginSection) loginSection.classList.remove("hidden");
    if (mainSection) mainSection.classList.add("hidden");
    if (navUserPill) navUserPill.classList.add("hidden");
    if (btnNavLogout) btnNavLogout.classList.add("hidden");

    this.renderAvatarSelector();
    this.updateClassDropdown(this.currentGrade);
  }

  // Hiển thị giao diện chính học tập
  showMainApp() {
    const loginSection = document.getElementById("loginSection");
    const mainSection = document.getElementById("mainSection");
    const navUserPill = document.getElementById("navUserPill");
    const btnNavLogout = document.getElementById("btnNavLogout");

    if (loginSection) loginSection.classList.add("hidden");
    if (mainSection) mainSection.classList.remove("hidden");
    if (navUserPill) navUserPill.classList.remove("hidden");
    if (btnNavLogout) btnNavLogout.classList.remove("hidden");

    this.updateUserInfoNav();
    this.switchGrade(this.currentGrade, false);
    this.updateMascotWelcome();
  }

  // Render danh sách Avatar cute công nghệ để học sinh chọn
  renderAvatarSelector() {
    const container = document.getElementById("avatarGrid");
    if (!container) return;

    container.innerHTML = "";
    AVATARS.forEach((av, idx) => {
      const item = document.createElement("div");
      item.className = `avatar-item ${idx === 0 ? "active" : ""}`;
      item.innerHTML = `
        <span class="avatar-emoji">${av.icon}</span>
        <span class="avatar-title">${av.name}</span>
      `;
      item.onclick = () => {
        Sound.playClick();
        container.querySelectorAll(".avatar-item").forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
        this.selectedAvatar = av.icon;
      };
      container.appendChild(item);
    });
  }

  // Cập nhật danh sách gợi ý lớp học khi chuyển khối
  updateClassDropdown(grade) {
    const classSelect = document.getElementById("loginClassSelect");
    if (!classSelect) return;

    classSelect.innerHTML = "";
    const classes = DEFAULT_CLASSES[grade] || ["3A", "3B", "3C"];
    classes.forEach((cls) => {
      const opt = document.createElement("option");
      opt.value = cls;
      opt.textContent = `Lớp ${cls}`;
      classSelect.appendChild(opt);
    });

    // Thêm tùy chọn nhập tự do nếu lớp khác
    const customOpt = document.createElement("option");
    customOpt.value = "CUSTOM";
    customOpt.textContent = "✏️ Lớp khác (Tự nhập)...";
    classSelect.appendChild(customOpt);
  }

  // Xử lý sự kiện đăng nhập
  handleLogin(e) {
    if (e) e.preventDefault();
    Sound.playClick();

    const nameInput = document.getElementById("loginNameInput");
    const classSelect = document.getElementById("loginClassSelect");
    const customClassInput = document.getElementById("loginCustomClassInput");
    const gradeSelect = document.querySelector('input[name="loginGrade"]:checked');

    const name = nameInput ? nameInput.value.trim() : "";
    let studentClass = classSelect ? classSelect.value : "3A";
    const grade = gradeSelect ? Number(gradeSelect.value) : 3;

    if (studentClass === "CUSTOM") {
      studentClass = customClassInput ? customClassInput.value.trim().toUpperCase() : "";
    }

    if (!name) {
      alert("Học sinh hãy nhập Họ và Tên của mình nhé!");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!studentClass) {
      alert("Vui lòng chọn hoặc nhập Tên Lớp của em (ví dụ: 3A, 4B)!");
      return;
    }

    // Lưu thông tin học sinh
    this.currentUser = {
      name: name,
      class: studentClass,
      grade: grade,
      avatar: this.selectedAvatar || "🤖",
      loginTime: new Date().toISOString()
    };

    Storage.setCurrentUser(this.currentUser);
    this.currentGrade = grade;

    // Phát âm thanh chào mừng
    Sound.playBadge();

    // Chuyển sang giao diện chính
    this.showMainApp();
  }

  // Đăng xuất / Đổi học sinh khác
  handleLogout() {
    Sound.playClick();
    if (confirm("Em có muốn đăng xuất để đổi học sinh khác không?")) {
      Storage.clearCurrentUser();
      this.currentUser = null;
      this.showLoginScreen();
    }
  }

  // Cập nhật thông tin học sinh trên thanh Header
  updateUserInfoNav() {
    if (!this.currentUser) return;
    const nameEl = document.getElementById("navStudentName");
    const classEl = document.getElementById("navStudentClass");
    const avatarEl = document.getElementById("navStudentAvatar");

    if (nameEl) nameEl.textContent = this.currentUser.name;
    if (classEl) classEl.textContent = `Lớp ${this.currentUser.class}`;
    if (avatarEl) avatarEl.textContent = this.currentUser.avatar;
  }

  // Chuyển đổi giữa Khối 3, 4, 5
  switchGrade(grade, playSound = true) {
    if (playSound) Sound.playClick();
    this.currentGrade = Number(grade);

    // Cập nhật giao diện Tab Khối
    const tabs = document.querySelectorAll(".grade-tab-btn");
    tabs.forEach((tab) => {
      const g = Number(tab.getAttribute("data-grade"));
      if (g === this.currentGrade) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Cập nhật Banner Tiêu Đề Khối
    const gradeData = CURRICULUM_DATA[this.currentGrade];
    const bannerTitle = document.getElementById("gradeBannerTitle");
    const bannerSubtitle = document.getElementById("gradeBannerSubtitle");

    if (bannerTitle && gradeData) bannerTitle.textContent = gradeData.title;
    if (bannerSubtitle && gradeData) bannerSubtitle.textContent = gradeData.subtitle;

    // Render danh sách Chủ đề & Bài học của Khối này
    this.renderCurriculumContent();
  }

  // Render các Chủ đề và Bài học theo bộ sách Kết nối tri thức
  // Cập nhật thanh tiến độ hoàn thành bài học của học sinh
  updateProgressionUI() {
    const gradeData = CURRICULUM_DATA[this.currentGrade];
    if (!gradeData || !gradeData.topics) return;

    // Tổng số bài trong khối này
    let allLessonsInGrade = [];
    gradeData.topics.forEach((t) => {
      if (t.lessons) allLessonsInGrade.push(...t.lessons);
    });

    const totalLessons = allLessonsInGrade.length || 16;
    let completedCount = 0;

    if (this.currentUser) {
      const records = Storage.getAllRecords().filter(
        (r) =>
          r.studentName.toLowerCase() === this.currentUser.name.toLowerCase() &&
          Number(r.grade) === Number(this.currentGrade)
      );

      const uniqueCompletedLessonIds = new Set(records.map((r) => r.lessonId));
      completedCount = uniqueCompletedLessonIds.size;
    }

    const percent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    const countText = document.getElementById("progressCountText");
    const percentText = document.getElementById("progressPercentText");
    const barFill = document.getElementById("progressionBarFill");

    if (countText) countText.textContent = `${completedCount} / ${totalLessons} bài học`;
    if (percentText) percentText.textContent = `${percent}%`;
    if (barFill) barFill.style.width = `${percent}%`;
  }

  // Chuyển đổi bộ lọc Học kì (Tất cả / Học kì 1 / Học kì 2)
  switchSemester(semester) {
    Sound.playClick();
    this.currentSemester = semester;

    const semesterButtons = document.querySelectorAll(".semester-btn");
    semesterButtons.forEach((btn) => {
      const semAttr = btn.getAttribute("data-semester");
      if (semAttr == semester || (semester === "all" && semAttr === "all")) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.renderCurriculumContent();
  }

  // Mở Popup Ôn Nhanh Lý Thuyết Bài Học
  openTheoryModal(lessonId, topicId) {
    Sound.playBadge();
    const gradeData = CURRICULUM_DATA[this.currentGrade];
    if (!gradeData) return;

    const topic = gradeData.topics.find((t) => t.id === topicId);
    if (!topic) return;

    const lesson = topic.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    const modal = document.getElementById("theoryModal");
    if (!modal) return;

    document.getElementById("theoryLessonTitle").textContent = `Bài ${lesson.number}: ${lesson.title}`;
    document.getElementById("theoryLessonBadge").textContent = `Khối ${this.currentGrade} - ${lesson.semester === 1 ? "Học Kì 1" : "Học Kì 2"}`;
    document.getElementById("theorySummaryText").textContent = lesson.summary || "";

    const pointsList = document.getElementById("theoryPointsList");
    if (pointsList) {
      pointsList.innerHTML = "";
      const theoryList = lesson.theory || ["Đọc kĩ câu hỏi trước khi trả lời", "Vận dụng kiến thức bài học đã học"];
      theoryList.forEach((pt) => {
        const li = document.createElement("li");
        li.innerHTML = pt;
        pointsList.appendChild(li);
      });
    }

    const btnStart = document.getElementById("btnTheoryStartGame");
    if (btnStart) {
      btnStart.onclick = () => {
        this.closeTheoryModal();
        this.startLessonGame(lesson.id, topic.id);
      };
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  closeTheoryModal() {
    Sound.playClick();
    const modal = document.getElementById("theoryModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  }

  // Render các Chủ đề và Bài học theo bộ sách Kết nối tri thức
  renderCurriculumContent() {
    const container = document.getElementById("curriculumContainer");
    if (!container) return;

    const gradeData = CURRICULUM_DATA[this.currentGrade];
    if (!gradeData || !gradeData.topics) {
      container.innerHTML = `<div class="empty-state">Đang cập nhật bài học khối ${this.currentGrade}...</div>`;
      return;
    }

    container.innerHTML = "";
    this.updateProgressionUI();

    // Lấy lịch sử điểm của học sinh này để đánh giá số sao
    const allRecords = Storage.getAllRecords();

    gradeData.topics.forEach((topic) => {
      // Lọc danh sách bài học theo Học Kì nếu được chọn
      let filteredLessons = topic.lessons;
      if (this.currentSemester !== "all") {
        filteredLessons = filteredLessons.filter((l) => Number(l.semester) === Number(this.currentSemester));
      }

      // Nếu chủ đề này không có bài học nào trong học kì đang chọn thì bỏ qua
      if (filteredLessons.length === 0) return;

      const topicCard = document.createElement("div");
      topicCard.className = "topic-block";

      let lessonsHtml = "";
      filteredLessons.forEach((lesson) => {
        let bestRecord = null;
        if (this.currentUser) {
          bestRecord = allRecords.find(
            (r) =>
              r.studentName.toLowerCase() === this.currentUser.name.toLowerCase() &&
              r.lessonId === lesson.id
          );
        }

        let badgeHtml = `<span class="lesson-status unplayed">Chưa hoàn thành</span>`;
        if (bestRecord) {
          const stars = bestRecord.accuracy >= 80 ? "⭐⭐⭐" : bestRecord.accuracy >= 60 ? "⭐⭐" : "⭐";
          badgeHtml = `<span class="lesson-status played">${stars} ${bestRecord.score}đ</span>`;
        }

        let gameTypeLabel = "🎮 Mini Game";
        if (lesson.gameType === "matching") gameTypeLabel = "🧩 Nối Cặp";
        else if (lesson.gameType === "sorting") gameTypeLabel = "🛸 Phân Loại";
        else if (lesson.gameType === "typing") gameTypeLabel = "⌨️ Gõ Phím";
        else if (lesson.gameType === "sequence") gameTypeLabel = "🤖 Thuật Toán";
        else if (lesson.gameType === "truefalse") gameTypeLabel = "⚡ Đúng / Sai";
        else if (lesson.gameType === "quiz") gameTypeLabel = "🎯 Trắc Nghiệm";

        const semesterBadge = lesson.semester === 1 
          ? `<span class="semester-tag-badge hk1">HK1</span>` 
          : `<span class="semester-tag-badge hk2">HK2</span>`;

        lessonsHtml += `
          <div class="lesson-card" data-lesson-id="${lesson.id}">
            <div class="lesson-card-header">
              <div class="lesson-icon-circle">${lesson.icon}</div>
              <div class="lesson-meta">
                <div style="display: flex; gap: 4px; align-items: center;">
                  ${semesterBadge}
                  <span class="lesson-num-badge">Bài ${lesson.number}</span>
                  <span class="lesson-game-tag">${gameTypeLabel}</span>
                </div>
                ${badgeHtml}
              </div>
            </div>
            <h4 class="lesson-card-title">${lesson.title}</h4>
            <p class="lesson-card-summary">${lesson.summary}</p>
            <div class="lesson-card-actions">
              <button class="btn-view-theory" title="Xem tóm tắt lý thuyết bài học" onclick="App.openTheoryModal('${lesson.id}', '${topic.id}')">
                📖 Ôn lý thuyết
              </button>
              <button class="btn-play-lesson" onclick="App.startLessonGame('${lesson.id}', '${topic.id}')">
                Chơi Ngay 🚀
              </button>
              <button class="btn-view-rank" title="Xem bảng xếp hạng bài này" onclick="App.viewLessonLeaderboard('${lesson.id}')">
                🏆 Hạng
              </button>
            </div>
          </div>
        `;
      });

      topicCard.innerHTML = `
        <div class="topic-header">
          <div class="topic-title-group">
            <span class="topic-icon">${topic.icon}</span>
            <div>
              <h3 class="topic-title">${topic.name}</h3>
              <p class="topic-desc">${topic.description}</p>
            </div>
          </div>
          <span class="topic-count-badge">${filteredLessons.length} bài học</span>
        </div>
        <div class="lessons-grid">
          ${lessonsHtml}
        </div>
      `;

      container.appendChild(topicCard);
    });
  }

  // Khởi động Mini-game cho bài học
  startLessonGame(lessonId, topicId) {
    Sound.playClick();
    const gradeData = CURRICULUM_DATA[this.currentGrade];
    if (!gradeData) return;

    const topic = gradeData.topics.find((t) => t.id === topicId);
    if (!topic) return;

    const lesson = topic.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    GameEngine.startGame(lesson, topic, this.currentGrade, this.currentUser);
  }

  // Xem Bảng xếp hạng của riêng bài học này
  viewLessonLeaderboard(lessonId) {
    Sound.playClick();
    this.openLeaderboard({
      grade: this.currentGrade,
      lessonId: lessonId,
      scope: "lesson",
      className: this.currentUser ? this.currentUser.class : "ALL"
    });
  }

  // Mở Bảng xếp hạng Modal
  openLeaderboard(options = {}) {
    Sound.playClick();
    const modal = document.getElementById("leaderboardModal");
    if (!modal) return;

    this.lbFilter = {
      grade: options.grade || this.currentGrade,
      lessonId: options.lessonId || null,
      scope: options.scope || "grade",
      className: options.className || "ALL"
    };

    this.renderLeaderboardUI();

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  closeLeaderboard() {
    Sound.playClick();
    const modal = document.getElementById("leaderboardModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  }

  // Render nội dung Bảng Xếp Hạng
  renderLeaderboardUI() {
    // 1. Cập nhật bộ lọc Tab Khối trong Leaderboard
    const lbGradeSelect = document.getElementById("lbGradeSelect");
    if (lbGradeSelect) {
      lbGradeSelect.value = this.lbFilter.grade;
      lbGradeSelect.onchange = (e) => {
        this.lbFilter.grade = Number(e.target.value);
        this.renderLeaderboardUI();
      };
    }

    // 2. Cập nhật bộ lọc Lớp
    const lbClassSelect = document.getElementById("lbClassSelect");
    if (lbClassSelect) {
      lbClassSelect.innerHTML = `<option value="ALL">Toàn Trường / Toàn Khối</option>`;
      const classes = DEFAULT_CLASSES[this.lbFilter.grade] || ["3A", "3B", "3C"];
      classes.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = `Lớp ${c}`;
        if (this.lbFilter.className === c) opt.selected = true;
        lbClassSelect.appendChild(opt);
      });

      lbClassSelect.onchange = (e) => {
        this.lbFilter.className = e.target.value;
        this.renderLeaderboardUI();
      };
    }

    // 3. Lấy dữ liệu đã sắp xếp từ Storage
    const records = Storage.getLeaderboard(this.lbFilter);

    // 4. Render Bục vinh quang Top 3 (Podium)
    const podiumEl = document.getElementById("lbPodiumContainer");
    if (podiumEl) {
      if (records.length === 0) {
        podiumEl.innerHTML = `<div class="empty-podium">Chưa có ai thi đấu bài học này. Hãy là người đầu tiên! 🚀</div>`;
      } else {
        const top1 = records[0] || null;
        const top2 = records[1] || null;
        const top3 = records[2] || null;

        podiumEl.innerHTML = `
          <!-- Hạng 2 -->
          <div class="podium-card rank-2 ${top2 ? "" : "empty"}">
            <div class="podium-medal">🥈 Hạng 2</div>
            <div class="podium-avatar">${top2 ? top2.avatar : "👤"}</div>
            <div class="podium-name">${top2 ? top2.studentName : "---"}</div>
            <div class="podium-class">${top2 ? "Lớp " + top2.studentClass : ""}</div>
            <div class="podium-score">${top2 ? top2.score + " điểm" : "0đ"}</div>
            <div class="podium-pillar pillar-2">2</div>
          </div>

          <!-- Hạng 1 (Cao nhất giữa sân khấu) -->
          <div class="podium-card rank-1 ${top1 ? "" : "empty"}">
            <div class="podium-crown">👑</div>
            <div class="podium-medal">🥇 Quán Quân</div>
            <div class="podium-avatar golden-glow">${top1 ? top1.avatar : "👤"}</div>
            <div class="podium-name">${top1 ? top1.studentName : "---"}</div>
            <div class="podium-class">${top1 ? "Lớp " + top1.studentClass : ""}</div>
            <div class="podium-score glow-text">${top1 ? top1.score + " điểm" : "0đ"}</div>
            <div class="podium-pillar pillar-1">1</div>
          </div>

          <!-- Hạng 3 -->
          <div class="podium-card rank-3 ${top3 ? "" : "empty"}">
            <div class="podium-medal">🥉 Hạng 3</div>
            <div class="podium-avatar">${top3 ? top3.avatar : "👤"}</div>
            <div class="podium-name">${top3 ? top3.studentName : "---"}</div>
            <div class="podium-class">${top3 ? "Lớp " + top3.studentClass : ""}</div>
            <div class="podium-score">${top3 ? top3.score + " điểm" : "0đ"}</div>
            <div class="podium-pillar pillar-3">3</div>
          </div>
        `;
      }
    }

    // 5. Render danh sách bảng chi tiết
    const tableBody = document.getElementById("lbTableBody");
    if (tableBody) {
      tableBody.innerHTML = "";
      records.forEach((r, idx) => {
        const tr = document.createElement("tr");
        const isCurrentStudent =
          this.currentUser &&
          r.studentName.toLowerCase() === this.currentUser.name.toLowerCase() &&
          r.studentClass.toUpperCase() === this.currentUser.class.toUpperCase();

        if (isCurrentStudent) {
          tr.className = "row-current-student";
        }

        let rankBadge = `<span class="rank-number">${idx + 1}</span>`;
        if (idx === 0) rankBadge = `<span class="rank-badge rank-gold">🥇 1</span>`;
        if (idx === 1) rankBadge = `<span class="rank-badge rank-silver">🥈 2</span>`;
        if (idx === 2) rankBadge = `<span class="rank-badge rank-bronze">🥉 3</span>`;

        tr.innerHTML = `
          <td class="text-center">${rankBadge}</td>
          <td>
            <div class="table-player-cell">
              <span class="player-mini-avatar">${r.avatar}</span>
              <div>
                <strong>${r.studentName}</strong> ${isCurrentStudent ? '<span class="you-tag">(Em)</span>' : ""}
              </div>
            </div>
          </td>
          <td class="text-center"><span class="table-class-tag">${r.studentClass}</span></td>
          <td class="text-center font-bold text-accent">${r.score}đ</td>
          <td class="text-center text-muted">${r.timeSpent}s</td>
          <td class="text-center text-muted text-small">${new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
        `;

        tableBody.appendChild(tr);
      });
    }

    // 6. Hiển thị thông báo vị trí hiện tại của em
    const stickyRankEl = document.getElementById("lbStickyMyRank");
    if (stickyRankEl) {
      if (!this.currentUser) {
        stickyRankEl.innerHTML = `<span>Đăng nhập để xem vị trí thứ hạng của em!</span>`;
      } else {
        const myRankInfo = Storage.getStudentRank(this.currentUser.name, this.currentUser.class, this.lbFilter);
        if (myRankInfo.rank) {
          stickyRankEl.innerHTML = `
            <div class="my-rank-content">
              <span>${this.currentUser.avatar} <strong>${this.currentUser.name}</strong> (${this.currentUser.class})</span>
              <span class="my-rank-badge">🏆 Em đang xếp hạng: <strong>#${myRankInfo.rank}</strong> / ${myRankInfo.total} bạn</span>
            </div>
          `;
        } else {
          stickyRankEl.innerHTML = `
            <div class="my-rank-content">
              <span>${this.currentUser.avatar} <strong>${this.currentUser.name}</strong> (${this.currentUser.class})</span>
              <span>Em chưa có lượt thi nào trong bảng này. Hãy tham gia ngay nhé! 🚀</span>
            </div>
          `;
        }
      }
    }
  }

  // Mascot Robot Tin chào mừng và động viên
  updateMascotWelcome() {
    const speechEl = document.getElementById("robotSpeech");
    if (!speechEl) return;

    if (this.currentUser) {
      const messages = [
        `Chào bạn <strong>${this.currentUser.name}</strong>! Tớ là Robo-Tin. Hôm nay bạn muốn chinh phục bài học nào? 🚀`,
        `Thầy cô Tin học luôn tự hào về bạn! Cùng vào làm bài tập nhận điểm 10 nào! ⭐`,
        `Gợi ý: Trả lời nhanh và liên tục để nhận <strong>Combo X2, X3</strong> siêu điểm số nhé! 🔥`
      ];
      speechEl.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    } else {
      speechEl.innerHTML = "Chào các bạn học sinh tiểu học! Hãy đăng nhập tên và lớp để bắt đầu khám phá nhé! 🤖";
    }
  }

  // Phản ứng khi click vào Robot
  pokeRobot() {
    Sound.playBadge();
    const robotEl = document.getElementById("robotMascot");
    if (robotEl) {
      robotEl.classList.add("robot-bounce");
      setTimeout(() => robotEl.classList.remove("robot-bounce"), 600);
    }
    this.updateMascotWelcome();
  }

  // Xử lý cập nhật điểm thời gian thực từ các tab khác
  handleRealtimeScoreUpdate(record) {
    if (!record) return;

    // Hiển thị thông báo toast nổi góc màn hình
    this.showRealtimeToast(record);

    // Cập nhật lại Bảng Xếp Hạng nếu đang mở
    const lbModal = document.getElementById("leaderboardModal");
    if (lbModal && !lbModal.classList.contains("hidden")) {
      this.renderLeaderboardUI();
    }

    // Cập nhật lại sao/điểm trên thẻ bài học
    this.renderCurriculumContent();
  }

  // Toast thông báo thời gian thực khi có bạn vừa đạt điểm cao
  showRealtimeToast(record) {
    const toast = document.getElementById("realtimeToast");
    if (!toast) return;

    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-avatar">${record.avatar}</span>
        <div>
          <div class="toast-title">Cập nhật Bảng Xếp Hạng! ⚡</div>
          <div class="toast-body">Bạn <strong>${record.studentName}</strong> (${record.studentClass}) vừa đạt <strong>${record.score} điểm</strong>!</div>
        </div>
      </div>
    `;

    toast.classList.remove("hidden");
    toast.classList.add("toast-show");

    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.classList.add("hidden"), 400);
    }, 4000);
  }

  // Gắn các sự kiện DOM
  bindEvents() {
    // Đăng nhập form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.onsubmit = (e) => this.handleLogin(e);
    }

    // Chọn lớp dropdown -> nếu chọn CUSTOM thì hiện ô nhập
    const classSelect = document.getElementById("loginClassSelect");
    const customClassInput = document.getElementById("loginCustomClassInput");
    if (classSelect && customClassInput) {
      classSelect.onchange = () => {
        if (classSelect.value === "CUSTOM") {
          customClassInput.classList.remove("hidden");
          customClassInput.focus();
        } else {
          customClassInput.classList.add("hidden");
        }
      };
    }

    // Chuyển khối trong màn hình đăng nhập
    const gradeRadios = document.querySelectorAll('input[name="loginGrade"]');
    gradeRadios.forEach((r) => {
      r.onchange = () => {
        Sound.playClick();
        this.updateClassDropdown(Number(r.value));
      };
    });

    // Chuyển khối trên Header chính
    const gradeTabs = document.querySelectorAll(".grade-tab-btn");
    gradeTabs.forEach((btn) => {
      btn.onclick = () => {
        const g = Number(btn.getAttribute("data-grade"));
        this.switchGrade(g);
      };
    });

    // Chuyển Học kì (Toàn năm / HK1 / HK2)
    const semesterBtns = document.querySelectorAll(".semester-btn");
    semesterBtns.forEach((btn) => {
      btn.onclick = () => {
        const sem = btn.getAttribute("data-semester");
        this.switchSemester(sem === "all" ? "all" : Number(sem));
      };
    });

    // Nút Bảng xếp hạng trên Navbar
    const btnOpenLb = document.getElementById("btnNavbarLeaderboard");
    if (btnOpenLb) {
      btnOpenLb.onclick = () => this.openLeaderboard();
    }

    // Nút đóng modal Bảng xếp hạng
    const btnCloseLb = document.getElementById("btnCloseLeaderboard");
    if (btnCloseLb) {
      btnCloseLb.onclick = () => this.closeLeaderboard();
    }

    // Nút Âm thanh (Bật / Tắt)
    const btnAudio = document.getElementById("btnToggleAudio");
    if (btnAudio) {
      btnAudio.onclick = () => {
        const isMuted = Sound.toggleMute();
        btnAudio.innerHTML = isMuted ? "🔇" : "🔊";
        btnAudio.title = isMuted ? "Bật âm thanh" : "Tắt âm thanh";
      };
    }

    // Nút Đăng xuất
    const btnLogout = document.getElementById("btnNavLogout");
    if (btnLogout) {
      btnLogout.onclick = () => this.handleLogout();
    }

    // Nút Chế độ Toàn màn hình (Rất tiện cho máy tính trường học)
    const btnFullscreen = document.getElementById("btnToggleFullscreen");
    if (btnFullscreen) {
      btnFullscreen.onclick = () => {
        Sound.playClick();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      };
    }

    // Nút Dành cho Thầy/Cô: Xuất CSV
    const btnExportCSV = document.getElementById("btnExportCSV");
    if (btnExportCSV) {
      btnExportCSV.onclick = () => {
        Sound.playClick();
        Storage.exportToCSV(this.currentGrade);
      };
    }

    // Nút Reset bảng điểm
    const btnResetData = document.getElementById("btnResetData");
    if (btnResetData) {
      btnResetData.onclick = () => {
        Sound.playClick();
        if (confirm("Thầy/Cô có chắc chắn muốn đặt lại bảng điểm về ban đầu không?")) {
          Storage.clearAllRecords();
          this.renderCurriculumContent();
          this.renderLeaderboardUI();
          alert("Đã làm mới dữ liệu thành công!");
        }
      };
    }
  }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  window.App = new AppController();
});
