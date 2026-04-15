const current = 24567000;
const target = 417870000000;

// % tiến độ
const percent = (current / target) * 100;

const progress = document.getElementById("progress");
const statusText = document.getElementById("statusText");

// set width
progress.style.width = percent + "%";

// logic màu
if (percent >= 100) {
  progress.style.background = "#3b82f6"; // xanh dương = vượt
  statusText.innerText = "🚀 Vượt mục tiêu";
}
else if (percent >= 70) {
  progress.style.background = "#22c55e"; // xanh lá = đúng tiến độ
  statusText.innerText = "✅ Đúng tiến độ";
}
else {
  progress.style.background = "#ef4444"; // đỏ = chậm
  statusText.innerText = "⚠️ Chậm tiến độ";
}