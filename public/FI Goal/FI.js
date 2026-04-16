// DATA GỐC - Thay đổi thông tin ở đây
const fiData = {
    currentSavings: 24567000,
    targetAmount: 30800000000,
    progressPct: 36,
    retireYears: 45,
    targetYear: 2055,
    expenses: [
        { name: "Phí sinh hoạt thường ngày", cost: "500 triệu" },
        { name: "Thực phẩm, ăn uống", cost: "900 triệu" },
        { name: "Y tế", cost: "4 tỷ 5" },
        { name: "Nhà cửa tiện ích", cost: "9 tỷ 5" },
        { name: "Du lịch", cost: "15 tỷ" },
        { name: "Chăm sóc cá nhân", cost: "250 triệu" },
        { name: "Phát sinh", cost: "550 triệu" }
    ],
    total: "31 tỷ 4"
};

// 1. Render Thông tin Banner
function initBanner() {
    const statsContainer = document.getElementById('fi-main-stats');
    statsContainer.innerHTML = `
        <div class="text-5xl font-bold mb-2 mono">
            ${fiData.currentSavings.toLocaleString()} VND
        </div>
        <div class="text-4xl font-bold text-gray-700 mono">
            / ${fiData.targetAmount.toLocaleString()} VND
        </div>
    `;
    document.getElementById('pct-text').innerText = fiData.progressPct;
    document.getElementById('retire-years').innerText = fiData.retireYears;
    document.getElementById('retire-year').innerText = fiData.targetYear;
}

// 2. Render Bảng chi phí
function initTable() {
    const tableBody = document.getElementById('expense-table-body');
    tableBody.innerHTML = fiData.expenses.map(item => `
        <tr>
            <td class="py-3 text-gray-600">${item.name}</td>
            <td class="py-3 text-right font-semibold">${item.cost}</td>
        </tr>
    `).join('');
    document.getElementById('total-expense').innerText = fiData.total;
}

// 3. Vẽ biểu đồ (Sử dụng Chart.js)
// DỮ LIỆU CẤU HÌNH BIỂU ĐỒ
const chartData = {
    labels: ['2024', '2030', '2035', '2040', '2045', '2050', '2055'], // Các mốc năm
    thuNhap: [15, 25, 40, 60, 85, 120, 180], // Đơn vị triệu hoặc tỷ lệ tùy bạn
    chiTieu: [10, 15, 22, 30, 45, 60, 80],
    no: [20, 18, 15, 10, 5, 2, 0] // Nợ giảm dần về 0 khi nghỉ hưu
};

function initChart() {
    const ctx = document.getElementById('fiTargetChart').getContext('2d');
    
    // Cấu hình Chart.js
    new Chart(ctx, {
        type: 'bar', // Loại mặc định là cột
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Thu nhập (Triệu/Tháng)',
                    data: chartData.thuNhap,
                    backgroundColor: 'rgba(59, 130, 246, 0.6)', // Xanh dương trong suốt
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    borderRadius: 8,
                    order: 3 // Nằm dưới cùng
                },
                {
                    label: 'Mức Chi tiêu',
                    data: chartData.chiTieu,
                    type: 'line', // Chuyển sang đường
                    borderColor: '#ef4444', // Màu đỏ cho chi tiêu
                    backgroundColor: '#ef4444',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4, // Làm đường cong mượt
                    order: 1
                },
                {
                    label: 'Khoản Nợ',
                    data: chartData.no,
                    type: 'line',
                    borderColor: '#f59e0b', // Màu vàng/cam cho nợ
                    backgroundColor: '#f59e0b',
                    borderWidth: 3,
                    borderDash: [5, 5], // Đường đứt nét cho nợ
                    fill: false,
                    tension: 0.4,
                    order: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 12, family: 'Inter' }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' triệu';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Số tiền (VNĐ)' },
                    grid: { color: '#f1f5f9' }
                },
                x: {
                    grid: { display: false },
                    title: { display: true, text: 'Năm dự kiến' }
                }
            }
        }
    });
}

// Chạy tất cả
window.onload = () => {
    initBanner();
    initTable();
    initChart();
};