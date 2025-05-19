// 質問データ（仮サンプル、後で差し替え）
const questions = [
  {
    text: "Q1. どちらかといえば…",
    options: [
      { text: "A: 感覚を大切にする", type: "白" },
      { text: "B: 論理的に考える", type: "青" },
    ]
  },
  // Q2〜Q11 も追加していきます
];

// タイプごとのスコア記録
const scoreMap = {};

let currentQuestion = 0;

const questionBox = document.getElementById("question-box");
const resultBox = document.getElementById("result-box");
const nextButton = document.getElementById("next-button");

function showQuestion() {
  questionBox.innerHTML = "";

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  const title = document.createElement("h2");
  title.textContent = q.text;
  questionBox.appendChild(title);

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.className = "answer-button";
    btn.onclick = () => {
      scoreMap[opt.type] = (scoreMap[opt.type] || 0) + 1;
      currentQuestion++;
      showQuestion();
    };
    questionBox.appendChild(btn);
  });
}

function showResult() {
  questionBox.classList.add("hidden");
  nextButton.classList.add("hidden");
  resultBox.classList.remove("hidden");

  // スコアの最大値のタイプを表示
  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
  const topType = sorted[0][0];

  resultBox.innerHTML = `<h2>あなたのオーラカラーは：<span style="color:${topType}">${topType}</span></h2>`;
  // 後でここに診断メッセージも加える
}

nextButton.addEventListener("click", () => {
  showQuestion();
  nextButton.classList.add("hidden");
});

showQuestion();
