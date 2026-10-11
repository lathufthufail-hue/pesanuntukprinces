// ========================================
// 1. NAVIGASI ANTARHALAMAN
// ========================================

const pages = document.querySelectorAll(".page");

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.go);

    if (!target) return;

    pages.forEach((page) => {
      page.classList.remove("active");
    });

    target.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


// ========================================
// 2. BUNGA DAN HATI MELAYANG
// ========================================

const floatingContainer =
  document.getElementById("floating-container");

const decorations = [
  "💕", "🌸", "🌷", "💗",
  "♡", "🌹", "✨", "💖"
];

function createFloatingDecoration() {
  if (!floatingContainer) return;

  const item = document.createElement("span");

  item.className = "floating";

  item.textContent =
    decorations[Math.floor(Math.random() * decorations.length)];

  item.style.left = Math.random() * 100 + "vw";

  item.style.fontSize =
    (14 + Math.random() * 18) + "px";

  const duration = 8 + Math.random() * 8;

  item.style.animationDuration = duration + "s";

  floatingContainer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, duration * 1000);
}

for (let i = 0; i < 12; i++) {
  setTimeout(createFloatingDecoration, i * 300);
}

setInterval(createFloatingDecoration, 650);


// ========================================
// 3. LOVE QUIZ - 5 PERTANYAAN
// ========================================

const quizQuestions = [
  {
    emoji: "💌",
    question: "Kalau sayanggg tiba-tiba bilang ‘aku capek’, jawaban paling manis apa?",
    options: [
      "Ya sudah, tidur sana",
      "Mau cerita atau istirahat dulu? Aku temani yaa",
      "Kok capek terus sih?"
    ],
    correct: 1,
    feedback: "Betul! Mendengarkan dan memberi ruang itu bentuk perhatian. 🤍"
  },
  {
    emoji: "🍜",
    question: "Kalian bingung memilih makanan. Solusi paling damai?",
    options: [
      "Berdebat sampai besok",
      "Saling menyalahkan",
      "Pilih bergantian atau undi lucu-lucuan"
    ],
    correct: 2,
    feedback: "Yesss! Hubungan juga butuh kompromi, bukan perang menu 😂"
  },
  {
    emoji: "🌧️",
    question: "Kalau sedang salah paham, langkah yang paling baik?",
    options: [
      "Diam dan berharap dibaca pikirannya",
      "Tenang dulu, lalu ngobrol jujur dan sopan",
      "Ungkit semua kesalahan lama"
    ],
    correct: 1,
    feedback: "Pintar! Ngobrol dengan tenang lebih membantu daripada saling menebak. 🌷"
  },
  {
    emoji: "🎁",
    question: "Hadiah kecil yang paling berarti biasanya adalah…",
    options: [
      "Perhatian tulus dan mengingat hal sederhana",
      "Harus selalu mahal",
      "Hanya hadiah yang viral"
    ],
    correct: 0,
    feedback: "Benar! Perhatian tulus sering lebih berkesan daripada harga. 💗"
  },
  {
    emoji: "✨",
    question: "Rahasia hubungan yang terus bertumbuh adalah…",
    options: [
      "Harus selalu sempurna",
      "Satu orang saja yang berusaha",
      "Saling menghargai, belajar, dan memperbaiki diri"
    ],
    correct: 2,
    feedback: "Jawaban terbaik! Dua orang belajar bersama, tanpa harus sempurna. 🤍"
  }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const quizQuestionEl =
  document.getElementById("quiz-question");

const quizEmojiEl =
  document.getElementById("quiz-emoji");

const quizOptionsEl =
  document.getElementById("quiz-options");

const quizFeedbackEl =
  document.getElementById("quiz-feedback");

const quizNextBtn =
  document.getElementById("quiz-next");

const quizProgressEl =
  document.getElementById("quiz-progress");

const quizScoreEl =
  document.getElementById("quiz-score");

const quizProgressBar =
  document.getElementById("quiz-progress-bar");

const quizArea =
  document.getElementById("quiz-area");

const quizResult =
  document.getElementById("quiz-result");


function renderQuizQuestion() {
  const q = quizQuestions[quizIndex];

  if (!q || !quizQuestionEl) return;

  quizAnswered = false;

  quizEmojiEl.textContent = q.emoji;
  quizQuestionEl.textContent = q.question;

  quizProgressEl.textContent =
    `PERTANYAAN ${quizIndex + 1} DARI ${quizQuestions.length}`;

  quizScoreEl.textContent = `💗 Skor: ${quizScore}`;

  quizProgressBar.style.width =
    `${(quizIndex / quizQuestions.length) * 100}%`;

  quizFeedbackEl.textContent =
    "Pilih jawabanmu. Jangan curang yaaa 🤭";

  quizNextBtn.disabled = true;

  quizNextBtn.textContent =
    quizIndex === quizQuestions.length - 1
      ? "Lihat Hasilku ✨"
      : "Jawaban berikutnya →";

  quizOptionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "quiz-option";
    button.type = "button";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = option;

    button.appendChild(letter);
    button.appendChild(text);

    button.addEventListener("click", () => {
      chooseQuizAnswer(index, button);
    });

    quizOptionsEl.appendChild(button);
  });
}


function chooseQuizAnswer(selected, selectedButton) {
  if (quizAnswered) return;

  quizAnswered = true;

  const q = quizQuestions[quizIndex];

  const buttons =
    quizOptionsEl.querySelectorAll(".quiz-option");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.correct) {
      button.classList.add("correct");
    }
  });

  if (selected === q.correct) {
    quizScore += 1;

    quizFeedbackEl.textContent = q.feedback;

    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");

    quizFeedbackEl.textContent =
      "Belum tepat, tapi tenang—ini game buat seru-seruan dan belajar bareng 💕";
  }

  quizScoreEl.textContent = `💗 Skor: ${quizScore}`;

  quizProgressBar.style.width =
    `${((quizIndex + 1) / quizQuestions.length) * 100}%`;

  quizNextBtn.disabled = false;
}


function showQuizResult() {
  quizArea.hidden = true;
  quizResult.hidden = false;

  document.getElementById("result-score").textContent =
    `${quizScore} / ${quizQuestions.length} poin`;

  const crown =
    document.getElementById("result-crown");

  const title =
    document.getElementById("result-title");

  const description =
    document.getElementById("result-description");

  if (quizScore === 5) {
    crown.textContent = "👑";
    title.textContent = "CEO Hubungan Gemas!";

    description.textContent =
      "Wihhh, jawabanmu penuh perhatian! Semoga sikap baiknya juga dipraktikkan di dunia nyata yaaa. 💖";

  } else if (quizScore >= 3) {
    crown.textContent = "🏆";
    title.textContent = "Tim Romantis dan Bijak!";

    description.textContent =
      "Lumayannn! Kamu sudah punya bekal bagus. Terus belajar mendengarkan dan menghargai satu sama lain. 🌷";

  } else {
    crown.textContent = "🧸";
    title.textContent = "Murid Cinta Gemas!";

    description.textContent =
      "Belum dapat nilai penuh? Santaiii! Yang penting mau belajar, saling menghormati, dan bertumbuh bersama. 💕";
  }
}


if (quizNextBtn) {
  quizNextBtn.addEventListener("click", () => {
    if (!quizAnswered) return;

    if (quizIndex < quizQuestions.length - 1) {
      quizIndex += 1;
      renderQuizQuestion();
    } else {
      showQuizResult();
    }
  });
}


// ========================================
// 4. MAIN LAGI
// ========================================

const playAgainBtn =
  document.getElementById("play-again");

if (playAgainBtn) {
  playAgainBtn.addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;

    quizArea.hidden = false;
    quizResult.hidden = true;

    renderQuizQuestion();
  });
}

renderQuizQuestion();


// ========================================
// 5. PASSWORD HALAMAN QR
// ========================================

// Password sesuai permintaan.
const QR_PASSWORD = "meandprinces";

const passwordInput =
  document.getElementById("qr-password");

const unlockButton =
  document.getElementById("unlock-qr");

const passwordFeedback =
  document.getElementById("password-feedback");

const lockAgainButton =
  document.getElementById("lock-again");


if (unlockButton) {
  unlockButton.addEventListener("click", () => {
    const entered = passwordInput.value;

    if (entered === QR_PASSWORD) {
      passwordInput.value = "";

      passwordFeedback.textContent =
        "Password benar. Halaman QR dibuka 💕";

      pages.forEach((page) => {
        page.classList.remove("active");
      });

      document.getElementById("page-qr")
        .classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } else {
      passwordFeedback.textContent =
        "Password belum benar. Coba lagi yaa.";

      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      unlockButton.click();
    }
  });
}


// ========================================
// 6. KUNCI LAGI HALAMAN QR
// ========================================

if (lockAgainButton) {
  lockAgainButton.addEventListener("click", () => {
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    document.getElementById("page-lock")
      .classList.add("active");

    if (passwordFeedback) {
      passwordFeedback.textContent =
        "Halaman QR dikunci lagi 🔒";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// ========================================
// 7. PEMBUAT QR CODE
// ========================================

const websiteInput =
  document.getElementById("website-url");

const generateButton =
  document.getElementById("generate-qr");

const qrResult =
  document.getElementById("qr-result");

const qrImage =
  document.getElementById("qr-image");

const openWebsite =
  document.getElementById("open-website");

const downloadButton =
  document.getElementById("download-qr");

let currentQrUrl = "";


if (generateButton) {
  generateButton.addEventListener("click", () => {
    const value = websiteInput.value.trim();

    if (!value) {
      alert("Masukkan tautan website terlebih dahulu 💕");
      websiteInput.focus();
      return;
    }

    let parsed;

    try {
      parsed = new URL(value);
    } catch {
      alert(
        "Tautan belum valid. Contoh: https://website-kamu.com"
      );
      return;
    }

    if (!["https:", "http:"].includes(parsed.protocol)) {
      alert("Gunakan tautan yang diawali https:// atau http://");
      return;
    }

    const publicUrl = parsed.href;

    currentQrUrl =
      "https://api.qrserver.com/v1/create-qr-code/" +
      "?size=500x500&data=" +
      encodeURIComponent(publicUrl);

    qrResult.hidden = true;

    qrImage.onload = () => {
      qrResult.hidden = false;

      qrResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    };

    qrImage.onerror = () => {
      qrResult.hidden = true;

      alert(
        "QR Code gagal dimuat. Periksa koneksi internet lalu coba lagi."
      );
    };

    openWebsite.href = publicUrl;
    openWebsite.textContent = "Buka website 💕";

    qrImage.src = currentQrUrl;
  });
}


// ========================================
// 8. UNDUH QR CODE
// ========================================

if (downloadButton) {
  downloadButton.addEventListener("click", async () => {
    if (!currentQrUrl) {
      alert("Buat QR Code terlebih dahulu.");
      return;
    }

    try {
      const response = await fetch(currentQrUrl);

      if (!response.ok) {
        throw new Error("Gagal mengunduh QR");
      }

      const blob = await response.blob();

      const objectUrl =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = objectUrl;
      link.download = "QR-Code-Sayang.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);

    } catch {
      window.open(
        currentQrUrl,
        "_blank",
        "noopener,noreferrer"
      );

      alert(
        "QR dibuka di tab baru. Simpan gambar dari browser."
      );
    }
  });
}


// ========================================
// 9. PERIKSA FOTO YANG TIDAK DITEMUKAN
// ========================================

document.querySelectorAll(".photo img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.background = "#ffe4ed";

    img.alt =
      "Foto belum ditemukan. Periksa nama dan ekstensi file.";
  });
});