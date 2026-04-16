// --- Cấu hình chung cho Chart.js ---
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#94a3b8';

// --- BIỂU ĐỒ 1: THU NHẬP & CHI TIÊU ---
const ctx1 = document.getElementById('monthChart').getContext('2d');
new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Thu nhập',
                data: [15, 18, 12, 22, 25, 19, 24, 28],
                backgroundColor: '#60a5fa',
                borderRadius: 6,
            },
            {
                label: 'Chi tiêu',
                data: [10, 12, 11, 14, 15, 11, 16, 13],
                type: 'line',
                borderColor: '#1e293b',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 2
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { display: false },
            x: { grid: { display: false } }
        }
    }
});

// --- BIỂU ĐỒ 2: DỰ ĐOÁN FI ---
const ctx2 = document.getElementById('projectionChart').getContext('2d');
const barColors = ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#0ea5e9', '#06b6d4', '#22d3ee', '#fbbf24', '#f59e0b'];

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'],
        datasets: [{
            data: [20, 32, 45, 58, 65, 78, 88, 100],
            backgroundColor: barColors,
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
            x: { grid: { display: false } }
        }
    }
});

//----- Giao dịch gần đây ----
// 1. Khai báo mảng dữ liệu (Data)
const transactionData = [
    { name: "Lương tháng 4", amount: 20000000 },
    { name: "Tiền thưởng Project", amount: 5000000 },
    { name: "Ăn sáng & Café", amount: -1500000 },
    { name: "Tiền điện nước", amount: -2200000 },
    { name: "Cổ tức chứng khoán", amount: 5000000 },
    { name: "Làm thêm Freelance", amount: 1500000 },
    { name: "Mua sắm Shopee", amount: -1800000 },
    { name: "Trúng số độc đắc", amount: 2000000 } // Thử thêm một dòng mới
];

// 2. Hàm render dữ liệu ra HTML
function renderTransactions() {
    const container = document.getElementById('transaction-list');
    
    // Xóa nội dung cũ (nếu có)
    container.innerHTML = '';

    transactionData.forEach(item => {
        // Kiểm tra xem là thu (dương) hay chi (âm) để chọn màu
        const isIncome = item.amount > 0;
        const colorClass = isIncome ? 'text-green-500' : 'text-red-400';
        const sign = isIncome ? '+' : '';

        // Định dạng số tiền sang kiểu VND (ví dụ: 20,000,000)
        const formattedAmount = item.amount.toLocaleString('vi-VN');

        // Tạo cấu trúc HTML cho mỗi dòng
        const html = `
            <div class="flex justify-between items-center border-b border-gray-50 pb-2 transition-all hover:bg-gray-50 p-1 rounded-lg">
                <span class="text-gray-600">${item.name}</span>
                <span class="${colorClass} font-bold mono">${sign}${formattedAmount} VND</span>
            </div>
        `;

        // Đẩy vào container
        container.innerHTML += html;
    });
}

// 3. Gọi hàm để nó chạy ngay khi load trang
renderTransactions();