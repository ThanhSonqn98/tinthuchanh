/**
 * BỘ MÁY ĐA TRÒ CHƠI MINI CỦNG CỐ BÀI HỌC (MULTI-MODE GAME ENGINE)
 * Hỗ trợ 6 thể loại trò chơi phong phú:
 * 1. Quiz (Đấu trường trắc nghiệm 4 đáp án)
 * 2. TrueFalse (Tia chớp Đúng / Sai siêu tốc)
 * 3. Matching (Nối cặp khái niệm không gian)
 * 4. Sorting (Phân loại vào các căn cứ vũ trụ)
 * 5. Sequence (Lắp ráp thuật toán và quy trình)
 * 6. Typing (Bắn thiên thạch gõ phím phản xạ)
 */

class MiniGameEngine {
  constructor() {
    this.currentLesson = null;
    this.currentTopic = null;
    this.grade = 3;
    this.student = null;

    // Trạng thái chung
    this.score = 0;
    this.combo = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.timeLeft = 20;
    this.maxTime = 20;

    // Trạng thái cho từng game
    this.quizIndex = 0;
    this.quizItems = [];
    this.correctCount = 0;
    this.totalQuestions = 0;

    // Matching state
    this.matchedPairsCount = 0;
    this.selectedMatchA = null;
    this.selectedMatchB = null;

    // Sorting state
    this.sortingIndex = 0;
    this.sortingItems = [];

    // Sequence state
    this.currentSteps = [];

    // Typing state
    this.typingIndex = 0;
    this.typingTargets = [];
    this.keyListener = null;

    // DOM Elements
    this.gameModal = document.getElementById("gameModal");
    this.resultModal = document.getElementById("resultModal");
  }

  // Khởi động trò chơi
  startGame(lesson, topic, grade, student) {
    if (!student || !student.name) {
      alert("Học sinh vui lòng đăng nhập để lưu điểm nhé!");
      return;
    }

    this.currentLesson = lesson;
    this.currentTopic = topic;
    this.grade = grade;
    this.student = student;

    this.score = 0;
    this.combo = 0;
    this.correctCount = 0;
    this.startTime = Date.now();
    clearInterval(this.timerInterval);

    // Gỡ bỏ sự kiện bàn phím cũ nếu có
    if (this.keyListener) {
      window.removeEventListener("keydown", this.keyListener);
      this.keyListener = null;
    }

    this.renderGameHeader();
    this.showModal();

    // Điều hướng vào chế độ game phù hợp với bài học
    const gameType = lesson.gameType || "quiz";
    switch (gameType) {
      case "truefalse":
        this.initTrueFalseMode();
        break;
      case "matching":
        this.initMatchingMode();
        break;
      case "sorting":
        this.initSortingMode();
        break;
      case "sequence":
        this.initSequenceMode();
        break;
      case "typing":
        this.initTypingMode();
        break;
      case "quiz":
      default:
        this.initQuizMode();
        break;
    }
  }

  showModal() {
    if (this.gameModal) {
      this.gameModal.classList.remove("hidden");
      this.gameModal.classList.add("flex");
    }
  }

  hideModal() {
    clearInterval(this.timerInterval);
    if (this.keyListener) {
      window.removeEventListener("keydown", this.keyListener);
      this.keyListener = null;
    }
    if (this.gameModal) {
      this.gameModal.classList.add("hidden");
      this.gameModal.classList.remove("flex");
    }
  }

  renderGameHeader() {
    const titleEl = document.getElementById("gameLessonTitle");
    const playerEl = document.getElementById("gamePlayerInfo");
    const scoreEl = document.getElementById("gameLiveScore");
    const comboEl = document.getElementById("gameComboBadge");

    if (titleEl) {
      titleEl.innerHTML = `<span class="lesson-icon">${this.currentLesson.icon}</span> Bài ${this.currentLesson.number}: ${this.currentLesson.title} <span class="game-badge-type">${this.currentLesson.gameTitle || "Mini Game"}</span>`;
    }
    if (playerEl) {
      playerEl.innerHTML = `<span class="player-avatar">${this.student.avatar}</span> <span class="player-name">${this.student.name}</span> <span class="player-class-badge">${this.student.class}</span>`;
    }
    if (scoreEl) scoreEl.textContent = "0";
    if (comboEl) {
      comboEl.classList.add("hidden");
      comboEl.textContent = "";
    }
  }

  // ==========================================
  // 1. CHẾ ĐỘ: TRẮC NGHIỆM ĐẤU TRƯỜNG (QUIZ)
  // ==========================================
  initQuizMode() {
    this.quizItems = this.shuffleArray([...this.currentLesson.questions]);
    this.quizIndex = 0;
    this.totalQuestions = this.quizItems.length;
    this.loadQuizQuestion();
  }

  loadQuizQuestion() {
    if (this.quizIndex >= this.quizItems.length) {
      this.finishGame();
      return;
    }

    clearInterval(this.timerInterval);
    const qData = this.quizItems[this.quizIndex];
    this.updateProgressUI(this.quizIndex + 1, this.totalQuestions);

    const questionTextEl = document.getElementById("gameQuestionText");
    if (questionTextEl) {
      questionTextEl.innerHTML = `<div class="game-guide-text">${this.currentLesson.instruction || "Chọn đáp án đúng nhất:"}</div><div class="question-main-text">${qData.q}</div>`;
    }

    const feedbackBox = document.getElementById("gameFeedbackBox");
    if (feedbackBox) {
      feedbackBox.classList.add("hidden");
      feedbackBox.innerHTML = "";
    }

    const optionsContainer = document.getElementById("gameOptionsContainer");
    if (optionsContainer) {
      optionsContainer.innerHTML = "";
      const letters = ["A", "B", "C", "D"];
      qData.options.forEach((optText, idx) => {
        const btn = document.createElement("button");
        btn.className = "game-option-btn";
        btn.innerHTML = `
          <span class="option-key">${letters[idx]}</span>
          <span class="option-text">${optText}</span>
        `;
        btn.onclick = () => this.handleQuizAnswer(idx, btn, qData);
        optionsContainer.appendChild(btn);
      });
    }

    this.startTimer(18, () => this.handleQuizTimeout(qData));
  }

  handleQuizAnswer(selectedIdx, btnEl, qData) {
    clearInterval(this.timerInterval);
    const optionsContainer = document.getElementById("gameOptionsContainer");
    const allBtns = optionsContainer.querySelectorAll(".game-option-btn");
    allBtns.forEach((b) => (b.disabled = true));

    const isCorrect = selectedIdx === qData.correct;
    if (isCorrect) {
      btnEl.classList.add("correct-choice");
      this.combo++;
      this.correctCount++;
      const earned = Math.round((200 + this.timeLeft * 3) * Math.min(1 + (this.combo - 1) * 0.25, 2.5));
      this.score += earned;
      Sound.playCorrect();
      this.updateScoreUI();
      this.updateComboUI();
      this.showFeedback(true, `Chính xác! +${earned} điểm`, qData.explain, () => {
        this.quizIndex++;
        this.loadQuizQuestion();
      });
    } else {
      btnEl.classList.add("wrong-choice");
      if (allBtns[qData.correct]) allBtns[qData.correct].classList.add("correct-highlight");
      this.combo = 0;
      Sound.playWrong();
      this.updateComboUI();
      this.showFeedback(false, "Chưa đúng rồi! Cùng xem giải thích nhé:", qData.explain, () => {
        this.quizIndex++;
        this.loadQuizQuestion();
      });
    }
  }

  handleQuizTimeout(qData) {
    this.combo = 0;
    this.updateComboUI();
    Sound.playWrong();
    const optionsContainer = document.getElementById("gameOptionsContainer");
    if (optionsContainer) {
      const allBtns = optionsContainer.querySelectorAll(".game-option-btn");
      allBtns.forEach((b, idx) => {
        b.disabled = true;
        if (idx === qData.correct) b.classList.add("correct-highlight");
      });
    }
    this.showFeedback(false, "Hết thời gian mất rồi!", qData.explain, () => {
      this.quizIndex++;
      this.loadQuizQuestion();
    });
  }

  // ==========================================
  // 2. CHẾ ĐỘ: TIA CHỚP ĐÚNG / SAI (TRUE/FALSE)
  // ==========================================
  initTrueFalseMode() {
    this.quizItems = this.shuffleArray([...this.currentLesson.questions]);
    this.quizIndex = 0;
    this.totalQuestions = this.quizItems.length;
    this.loadTrueFalseQuestion();
  }

  loadTrueFalseQuestion() {
    if (this.quizIndex >= this.quizItems.length) {
      this.finishGame();
      return;
    }

    clearInterval(this.timerInterval);
    const qData = this.quizItems[this.quizIndex];
    this.updateProgressUI(this.quizIndex + 1, this.totalQuestions);

    const questionTextEl = document.getElementById("gameQuestionText");
    if (questionTextEl) {
      questionTextEl.innerHTML = `
        <div class="game-guide-text">${this.currentLesson.instruction || "Đọc nhận định và chọn ĐÚNG hoặc SAI:"}</div>
        <div class="tf-statement-card">
          <span class="tf-quote-icon">📢</span>
          <p class="tf-statement-text">"${qData.statement}"</p>
        </div>
      `;
    }

    const feedbackBox = document.getElementById("gameFeedbackBox");
    if (feedbackBox) {
      feedbackBox.classList.add("hidden");
      feedbackBox.innerHTML = "";
    }

    const optionsContainer = document.getElementById("gameOptionsContainer");
    if (optionsContainer) {
      optionsContainer.innerHTML = `
        <div class="tf-buttons-grid">
          <button class="btn-tf btn-tf-true" id="btnTfTrue">
            <span class="tf-btn-icon">🛡️</span>
            <span class="tf-btn-title">ĐÚNG</span>
          </button>
          <button class="btn-tf btn-tf-false" id="btnTfFalse">
            <span class="tf-btn-icon">⚔️</span>
            <span class="tf-btn-title">SAI</span>
          </button>
        </div>
      `;

      document.getElementById("btnTfTrue").onclick = () => this.handleTrueFalseAnswer(true, qData);
      document.getElementById("btnTfFalse").onclick = () => this.handleTrueFalseAnswer(false, qData);
    }

    this.startTimer(12, () => this.handleTrueFalseTimeout(qData));
  }

  handleTrueFalseAnswer(choice, qData) {
    clearInterval(this.timerInterval);
    const btnTrue = document.getElementById("btnTfTrue");
    const btnFalse = document.getElementById("btnTfFalse");
    if (btnTrue) btnTrue.disabled = true;
    if (btnFalse) btnFalse.disabled = true;

    const isCorrect = choice === qData.isTrue;
    if (isCorrect) {
      this.combo++;
      this.correctCount++;
      const earned = Math.round((200 + this.timeLeft * 4) * Math.min(1 + (this.combo - 1) * 0.3, 2.5));
      this.score += earned;
      Sound.playCorrect();
      this.updateScoreUI();
      this.updateComboUI();
      this.showFeedback(true, `Phản xạ tuyệt vời! +${earned} điểm`, qData.explain, () => {
        this.quizIndex++;
        this.loadTrueFalseQuestion();
      });
    } else {
      this.combo = 0;
      Sound.playWrong();
      this.updateComboUI();
      this.showFeedback(false, "Chưa đúng rồi!", qData.explain, () => {
        this.quizIndex++;
        this.loadTrueFalseQuestion();
      });
    }
  }

  handleTrueFalseTimeout(qData) {
    this.combo = 0;
    this.updateComboUI();
    Sound.playWrong();
    this.showFeedback(false, "Hết thời gian suy nghĩ!", qData.explain, () => {
      this.quizIndex++;
      this.loadTrueFalseQuestion();
    });
  }

  // ==========================================
  // 3. CHẾ ĐỘ: NỐI CẶP KHÁI NIỆM (MATCHING)
  // ==========================================
  initMatchingMode() {
    const pairs = this.currentLesson.pairs;
    this.totalQuestions = pairs.length;
    this.matchedPairsCount = 0;
    this.selectedMatchA = null;
    this.selectedMatchB = null;

    const questionTextEl = document.getElementById("gameQuestionText");
    if (questionTextEl) {
      questionTextEl.innerHTML = `
        <div class="game-guide-text">${this.currentLesson.instruction || "Nhấp vào thẻ ở Cột A rồi chọn thẻ ở Cột B để nối cặp đúng:"}</div>
      `;
    }

    const feedbackBox = document.getElementById("gameFeedbackBox");
    if (feedbackBox) {
      feedbackBox.classList.add("hidden");
      feedbackBox.innerHTML = "";
    }

    // Xáo trộn ngẫu nhiên cột B
    const colAItems = pairs.map((p, idx) => ({ id: idx, text: p.a, icon: p.iconA || "🔹" }));
    const colBItems = this.shuffleArray(pairs.map((p, idx) => ({ id: idx, text: p.b, icon: p.iconB || "🔸" })));

    this.updateProgressUI(0, this.totalQuestions);

    const container = document.getElementById("gameOptionsContainer");
    if (container) {
      container.innerHTML = `
        <div class="matching-arena">
          <div class="matching-col" id="matchColA"></div>
          <div class="matching-col" id="matchColB"></div>
        </div>
      `;

      const colAEl = document.getElementById("matchColA");
      const colBEl = document.getElementById("matchColB");

      colAItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "match-card card-a";
        card.dataset.id = item.id;
        card.innerHTML = `<span class="match-icon">${item.icon}</span><span class="match-text">${item.text}</span>`;
        card.onclick = () => this.handleSelectMatchCard(card, "A");
        colAEl.appendChild(card);
      });

      colBItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "match-card card-b";
        card.dataset.id = item.id;
        card.innerHTML = `<span class="match-icon">${item.icon}</span><span class="match-text">${item.text}</span>`;
        card.onclick = () => this.handleSelectMatchCard(card, "B");
        colBEl.appendChild(card);
      });
    }

    this.startTimer(45, () => {
      Sound.playWrong();
      this.finishGame();
    });
  }

  handleSelectMatchCard(cardEl, colType) {
    if (cardEl.classList.contains("matched")) return;
    Sound.playClick();

    if (colType === "A") {
      document.querySelectorAll(".match-card.card-a").forEach((c) => c.classList.remove("selected"));
      cardEl.classList.add("selected");
      this.selectedMatchA = cardEl;
    } else {
      document.querySelectorAll(".match-card.card-b").forEach((c) => c.classList.remove("selected"));
      cardEl.classList.add("selected");
      this.selectedMatchB = cardEl;
    }

    // Nếu đã chọn cả 2 thẻ thì kiểm tra cặp
    if (this.selectedMatchA && this.selectedMatchB) {
      const idA = this.selectedMatchA.dataset.id;
      const idB = this.selectedMatchB.dataset.id;

      if (idA === idB) {
        // Nối đúng!
        this.selectedMatchA.classList.remove("selected");
        this.selectedMatchB.classList.remove("selected");
        this.selectedMatchA.classList.add("matched");
        this.selectedMatchB.classList.add("matched");

        this.combo++;
        this.matchedPairsCount++;
        this.correctCount++;
        const earned = Math.round(250 * Math.min(1 + (this.combo - 1) * 0.25, 2.5));
        this.score += earned;
        Sound.playCorrect();
        this.updateScoreUI();
        this.updateComboUI();

        this.updateProgressUI(this.matchedPairsCount, this.totalQuestions);
        this.selectedMatchA = null;
        this.selectedMatchB = null;

        if (this.matchedPairsCount >= this.totalQuestions) {
          clearInterval(this.timerInterval);
          setTimeout(() => this.finishGame(), 700);
        }
      } else {
        // Nối sai!
        this.selectedMatchA.classList.add("shake-error");
        this.selectedMatchB.classList.add("shake-error");
        this.combo = 0;
        this.updateComboUI();
        Sound.playWrong();

        setTimeout(() => {
          if (this.selectedMatchA) {
            this.selectedMatchA.classList.remove("selected", "shake-error");
            this.selectedMatchA = null;
          }
          if (this.selectedMatchB) {
            this.selectedMatchB.classList.remove("selected", "shake-error");
            this.selectedMatchB = null;
          }
        }, 600);
      }
    }
  }

  // ==========================================
  // 4. CHẾ ĐỘ: PHÂN LOẠI CĂN CỨ VŨ TRỤ (SORTING)
  // ==========================================
  initSortingMode() {
    this.sortingItems = this.shuffleArray([...this.currentLesson.items]);
    this.sortingIndex = 0;
    this.totalQuestions = this.sortingItems.length;
    this.loadSortingItem();
  }

  loadSortingItem() {
    if (this.sortingIndex >= this.sortingItems.length) {
      this.finishGame();
      return;
    }

    clearInterval(this.timerInterval);
    const itemData = this.sortingItems[this.sortingIndex];
    this.updateProgressUI(this.sortingIndex + 1, this.totalQuestions);

    const questionTextEl = document.getElementById("gameQuestionText");
    if (questionTextEl) {
      questionTextEl.innerHTML = `
        <div class="game-guide-text">${this.currentLesson.instruction || "Bấm chọn Căn cứ tương ứng cho vật phẩm dưới đây:"}</div>
        <div class="sorting-item-card">
          <span class="sorting-fly-icon">🛸</span>
          <h3 class="sorting-item-text">${itemData.text}</h3>
        </div>
      `;
    }

    const feedbackBox = document.getElementById("gameFeedbackBox");
    if (feedbackBox) {
      feedbackBox.classList.add("hidden");
      feedbackBox.innerHTML = "";
    }

    const optionsContainer = document.getElementById("gameOptionsContainer");
    if (optionsContainer) {
      let binsHtml = "";
      this.currentLesson.bins.forEach((bin) => {
        binsHtml += `
          <button class="sorting-bin-btn" data-bin-id="${bin.id}" style="--bin-color: ${bin.color || '#00f3ff'}">
            <span class="bin-icon">${bin.icon || '📦'}</span>
            <span class="bin-name">${bin.name}</span>
          </button>
        `;
      });

      optionsContainer.innerHTML = `<div class="sorting-bins-grid">${binsHtml}</div>`;

      optionsContainer.querySelectorAll(".sorting-bin-btn").forEach((btn) => {
        btn.onclick = () => {
          const chosenBinId = btn.dataset.binId;
          this.handleSortingChoice(chosenBinId, itemData);
        };
      });
    }

    this.startTimer(15, () => {
      Sound.playWrong();
      this.sortingIndex++;
      this.loadSortingItem();
    });
  }

  handleSortingChoice(chosenBinId, itemData) {
    clearInterval(this.timerInterval);
    const optionsContainer = document.getElementById("gameOptionsContainer");
    optionsContainer.querySelectorAll(".sorting-bin-btn").forEach((b) => (b.disabled = true));

    const isCorrect = chosenBinId === itemData.binId;
    if (isCorrect) {
      this.combo++;
      this.correctCount++;
      const earned = Math.round((200 + this.timeLeft * 3) * Math.min(1 + (this.combo - 1) * 0.25, 2.5));
      this.score += earned;
      Sound.playCorrect();
      this.updateScoreUI();
      this.updateComboUI();
      this.showFeedback(true, `Chuẩn xác! +${earned} điểm`, itemData.explain, () => {
        this.sortingIndex++;
        this.loadSortingItem();
      });
    } else {
      this.combo = 0;
      Sound.playWrong();
      this.updateComboUI();
      this.showFeedback(false, "Chưa chính xác!", itemData.explain, () => {
        this.sortingIndex++;
        this.loadSortingItem();
      });
    }
  }

  // ==========================================
  // 5. CHẾ ĐỘ: LẮP RÁP THUẬT TOÁN (SEQUENCE)
  // ==========================================
  initSequenceMode() {
    const rawSteps = this.currentLesson.steps;
    this.totalQuestions = rawSteps.length;
    // Xáo trộn ngẫu nhiên các bước ban đầu
    this.currentSteps = this.shuffleArray([...rawSteps]);
    while (this.isSequenceMatching(this.currentSteps, rawSteps) && rawSteps.length > 2) {
      this.currentSteps = this.shuffleArray([...rawSteps]);
    }

    this.updateProgressUI(1, 1);

    const questionTextEl = document.getElementById("gameQuestionText");
    if (questionTextEl) {
      questionTextEl.innerHTML = `
        <div class="game-guide-text">${this.currentLesson.instruction || "Dùng nút LÊN và XUỐNG để sắp xếp đúng quy trình, sau đó bấm '🚀 Chạy Thuật Toán':"}</div>
      `;
    }

    this.renderSequenceList();

    this.startTimer(60, () => {
      Sound.playWrong();
      this.finishGame();
    });
  }

  renderSequenceList() {
    const container = document.getElementById("gameOptionsContainer");
    if (!container) return;

    let itemsHtml = "";
    this.currentSteps.forEach((st, idx) => {
      itemsHtml += `
        <div class="seq-item" data-index="${idx}">
          <span class="seq-order-num">#${idx + 1}</span>
          <span class="seq-text">${st.text}</span>
          <div class="seq-btn-group">
            <button class="btn-seq-move" onclick="GameEngine.moveSequenceStep(${idx}, -1)" ${idx === 0 ? "disabled" : ""} title="Di chuyển lên">⬆️</button>
            <button class="btn-seq-move" onclick="GameEngine.moveSequenceStep(${idx}, 1)" ${idx === this.currentSteps.length - 1 ? "disabled" : ""} title="Di chuyển xuống">⬇️</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="sequence-arena">
        <div class="seq-list">${itemsHtml}</div>
        <button class="btn-run-algorithm" onclick="GameEngine.validateSequenceAlgorithm()">
          🚀 CHẠY THỬ THUẬT TOÁN SCRATCH
        </button>
      </div>
    `;
  }

  moveSequenceStep(index, direction) {
    Sound.playClick();
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= this.currentSteps.length) return;

    const temp = this.currentSteps[index];
    this.currentSteps[index] = this.currentSteps[newIdx];
    this.currentSteps[newIdx] = temp;

    this.renderSequenceList();
  }

  validateSequenceAlgorithm() {
    clearInterval(this.timerInterval);
    const correctSteps = this.currentLesson.steps;
    const isCorrect = this.isSequenceMatching(this.currentSteps, correctSteps);

    if (isCorrect) {
      this.correctCount = correctSteps.length;
      const earned = Math.round(800 + this.timeLeft * 8);
      this.score += earned;
      Sound.playVictory();
      this.updateScoreUI();
      this.showFeedback(true, `🎉 Thuật toán hoàn hảo! +${earned} điểm`, this.currentLesson.explain, () => {
        this.finishGame();
      });
    } else {
      Sound.playWrong();
      this.showFeedback(false, "Thứ tự các bước chưa đúng!", "Em hãy xem kỹ lại bước nào nên diễn ra trước, bước nào diễn ra sau nhé!", () => {
        // Cho học sinh thử lại
        const feedbackBox = document.getElementById("gameFeedbackBox");
        if (feedbackBox) feedbackBox.classList.add("hidden");
        this.startTimer(40, () => this.finishGame());
      });
    }
  }

  isSequenceMatching(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].id !== arr2[i].id) return false;
    }
    return true;
  }

  // ==========================================
  // 6. CHẾ ĐỘ: BẮN THIÊN THẠCH GÕ PHÍM (TYPING)
  // ==========================================
  initTypingMode() {
    this.typingTargets = [...this.currentLesson.targets];
    this.typingIndex = 0;
    this.totalQuestions = this.typingTargets.length;
    this.loadTypingTarget();

    // Lắng nghe bàn phím máy tính thực
    this.keyListener = (e) => {
      const pressed = e.key.toUpperCase();
      this.handleTypingInput(pressed);
    };
    window.addEventListener("keydown", this.keyListener);
  }

  loadTypingTarget() {
    if (this.typingIndex >= this.typingTargets.length) {
      if (this.keyListener) {
        window.removeEventListener("keydown", this.keyListener);
        this.keyListener = null;
      }
      this.finishGame();
      return;
    }

    clearInterval(this.timerInterval);
    const targetWord = this.typingTargets[this.typingIndex];
    this.updateProgressUI(this.typingIndex + 1, this.totalQuestions);

    const questionTextEl = document.getElementById("gameQuestionText");
    if (questionTextEl) {
      questionTextEl.innerHTML = `
        <div class="game-guide-text">${this.currentLesson.instruction || "Gõ chữ cái trên bàn phím máy tính để bắn vỡ thiên thạch:"}</div>
        <div class="typing-target-container">
          <div class="typing-meteor-ball" id="meteorTarget">
            <span class="meteor-fire">🔥</span>
            <span class="meteor-text">${targetWord}</span>
          </div>
        </div>
      `;
    }

    const feedbackBox = document.getElementById("gameFeedbackBox");
    if (feedbackBox) {
      feedbackBox.classList.add("hidden");
      feedbackBox.innerHTML = "";
    }

    // Bàn phím ảo hỗ trợ cả màn hình cảm ứng
    const optionsContainer = document.getElementById("gameOptionsContainer");
    if (optionsContainer) {
      const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
      const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
      const keysRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

      let renderRow = (arr) => arr.map((k) => `<button class="virtual-key" data-key="${k}">${k}</button>`).join("");

      optionsContainer.innerHTML = `
        <div class="virtual-keyboard">
          <div class="kb-row">${renderRow(keysRow1)}</div>
          <div class="kb-row">${renderRow(keysRow2)}</div>
          <div class="kb-row">${renderRow(keysRow3)}</div>
        </div>
      `;

      optionsContainer.querySelectorAll(".virtual-key").forEach((btn) => {
        btn.onclick = () => {
          this.handleTypingInput(btn.dataset.key);
        };
      });
    }

    this.startTimer(10, () => {
      this.combo = 0;
      this.updateComboUI();
      Sound.playWrong();
      this.typingIndex++;
      this.loadTypingTarget();
    });
  }

  handleTypingInput(key) {
    const target = this.typingTargets[this.typingIndex];
    if (!target) return;

    if (key === target) {
      // Bắn trúng!
      const meteor = document.getElementById("meteorTarget");
      if (meteor) meteor.classList.add("meteor-exploded");

      this.combo++;
      this.correctCount++;
      const earned = Math.round((150 + this.timeLeft * 5) * Math.min(1 + (this.combo - 1) * 0.25, 2.5));
      this.score += earned;
      Sound.playCorrect();
      this.updateScoreUI();
      this.updateComboUI();

      clearInterval(this.timerInterval);
      setTimeout(() => {
        this.typingIndex++;
        this.loadTypingTarget();
      }, 400);
    } else {
      // Bấm nhầm phím
      Sound.playWrong();
      this.combo = 0;
      this.updateComboUI();
    }
  }

  // ==========================================
  // CÁC HÀM TIỆN ÍCH DÙNG CHUNG
  // ==========================================
  startTimer(seconds, onTimeout) {
    clearInterval(this.timerInterval);
    this.timeLeft = seconds;
    this.maxTime = seconds;

    const timerBar = document.getElementById("gameTimerBar");
    const timerText = document.getElementById("gameTimerText");

    if (timerBar) {
      timerBar.style.width = "100%";
      timerBar.className = "timer-bar normal";
    }
    if (timerText) {
      timerText.textContent = `${this.timeLeft}s`;
    }

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (timerText) timerText.textContent = `${this.timeLeft}s`;

      if (timerBar) {
        const pct = (this.timeLeft / this.maxTime) * 100;
        timerBar.style.width = `${pct}%`;
        if (pct < 30) {
          timerBar.className = "timer-bar danger";
          Sound.playTick();
        } else if (pct < 60) {
          timerBar.className = "timer-bar warning";
        }
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        if (onTimeout) onTimeout();
      }
    }, 1000);
  }

  updateProgressUI(current, total) {
    const textEl = document.getElementById("gameProgressText");
    const barEl = document.getElementById("gameProgressBar");
    if (textEl) textEl.textContent = `Thử thách ${current} / ${total}`;
    if (barEl) barEl.style.width = `${(current / Math.max(1, total)) * 100}%`;
  }

  updateScoreUI() {
    const scoreEl = document.getElementById("gameLiveScore");
    if (scoreEl) {
      scoreEl.textContent = this.score;
      scoreEl.classList.add("score-bump");
      setTimeout(() => scoreEl.classList.remove("score-bump"), 300);
    }
  }

  updateComboUI() {
    const comboEl = document.getElementById("gameComboBadge");
    if (!comboEl) return;
    if (this.combo >= 2) {
      comboEl.classList.remove("hidden");
      comboEl.innerHTML = `🔥 COMBO X${this.combo}!`;
      comboEl.classList.add("combo-pulse");
    } else {
      comboEl.classList.add("hidden");
    }
  }

  showFeedback(isCorrect, heading, explanation, onNext) {
    const feedbackBox = document.getElementById("gameFeedbackBox");
    if (!feedbackBox) return;

    feedbackBox.className = `feedback-box ${isCorrect ? "success" : "warning"}`;
    feedbackBox.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-icon">${isCorrect ? "✨🎉" : "💡"}</span>
        <strong>${heading}</strong>
      </div>
      <p class="feedback-body">${explanation || ""}</p>
      <button class="btn-next-question" id="btnNextQuestion">
        Tiếp tục nhiệm vụ ➔
      </button>
    `;
    feedbackBox.classList.remove("hidden");

    const nextBtn = document.getElementById("btnNextQuestion");
    if (nextBtn) {
      nextBtn.onclick = () => {
        Sound.playClick();
        if (onNext) onNext();
      };
    }
  }

  finishGame() {
    this.hideModal();
    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));
    const totalQ = Math.max(1, this.totalQuestions);
    const accuracy = Math.round((this.correctCount / totalQ) * 100);

    const savedRecord = Storage.saveGameRecord({
      studentName: this.student.name,
      studentClass: this.student.class,
      grade: this.grade,
      topicId: this.currentTopic.id,
      lessonId: this.currentLesson.id,
      lessonTitle: `Bài ${this.currentLesson.number}: ${this.currentLesson.title}`,
      score: this.score,
      maxScore: totalQ * 300,
      accuracy: accuracy,
      timeSpent: timeSpentSeconds,
      avatar: this.student.avatar
    });

    Sound.playVictory();
    this.launchConfetti();
    this.showResultModal(savedRecord, accuracy, timeSpentSeconds);
  }

  showResultModal(record, accuracy, timeSpentSeconds) {
    if (!this.resultModal) return;

    const classRankInfo = Storage.getStudentRank(this.student.name, this.student.class, {
      grade: this.grade,
      lessonId: this.currentLesson.id,
      className: this.student.class,
      scope: "lesson"
    });

    const gradeRankInfo = Storage.getStudentRank(this.student.name, this.student.class, {
      grade: this.grade,
      lessonId: this.currentLesson.id,
      className: "ALL",
      scope: "lesson"
    });

    let stars = "⭐";
    let titleBadge = "Chiến Binh Tập Sự";
    if (accuracy >= 80) {
      stars = "⭐⭐⭐";
      titleBadge = "👑 Đại Kiện Tướng Tin Học";
    } else if (accuracy >= 60) {
      stars = "⭐⭐";
      titleBadge = "🚀 Chuyên Gia Công Nghệ";
    }

    document.getElementById("resPlayerAvatar").textContent = this.student.avatar;
    document.getElementById("resPlayerName").textContent = this.student.name;
    document.getElementById("resPlayerClass").textContent = `Lớp ${this.student.class}`;
    document.getElementById("resStars").textContent = stars;
    document.getElementById("resTitleBadge").textContent = titleBadge;

    document.getElementById("resTotalScore").textContent = this.score;
    document.getElementById("resAccuracy").textContent = `${accuracy}% (${this.correctCount}/${this.totalQuestions})`;
    document.getElementById("resTimeSpent").textContent = `${timeSpentSeconds}s`;

    const rankBanner = document.getElementById("resRealtimeRankBanner");
    if (rankBanner) {
      const cRank = classRankInfo.rank || 1;
      const cTotal = classRankInfo.total || 1;
      const gRank = gradeRankInfo.rank || 1;

      rankBanner.innerHTML = `
        <div class="rank-highlight-badge">
          🎉 Em đang xếp thứ <strong>#${cRank}</strong> / ${cTotal} bạn của Lớp ${this.student.class}!
        </div>
        <div class="rank-sub-badge">
          (Hạng <strong>#${gRank}</strong> toàn Khối ${this.grade} bài học này)
        </div>
      `;
    }

    this.resultModal.classList.remove("hidden");
    this.resultModal.classList.add("flex");

    const btnLeaderboard = document.getElementById("resBtnOpenLeaderboard");
    if (btnLeaderboard) {
      btnLeaderboard.onclick = () => {
        Sound.playClick();
        this.resultModal.classList.add("hidden");
        this.resultModal.classList.remove("flex");
        window.App.openLeaderboard({
          grade: this.grade,
          lessonId: this.currentLesson.id,
          scope: "lesson",
          className: this.student.class
        });
      };
    }

    const btnPlayAgain = document.getElementById("resBtnPlayAgain");
    if (btnPlayAgain) {
      btnPlayAgain.onclick = () => {
        Sound.playClick();
        this.resultModal.classList.add("hidden");
        this.resultModal.classList.remove("flex");
        this.startGame(this.currentLesson, this.currentTopic, this.grade, this.student);
      };
    }

    const btnClose = document.getElementById("resBtnClose");
    if (btnClose) {
      btnClose.onclick = () => {
        Sound.playClick();
        this.resultModal.classList.add("hidden");
        this.resultModal.classList.remove("flex");
      };
    }
  }

  launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#00f3ff", "#b537f2", "#ff0077", "#ffb800", "#00ff88", "#ffffff"];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        opacity: 1
      });
    }

    let frame = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 120) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    render();
  }

  shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

// Khởi tạo Game Engine instance
const GameEngine = new MiniGameEngine();
window.GameEngine = GameEngine;
