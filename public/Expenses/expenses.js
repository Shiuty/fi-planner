// DATABASE: Hạn mức và Thực chi
const db = {
    totalMonth: 4943000,
    categories: {
        food: { spent: 2570000, budget: 2000000 },      // Vượt mức (Đỏ)
        shopping: { spent: 1300000, budget: 1500000 },  // Vừa đạt (Vàng)
        others: { spent: 1073000, budget: 2500000 }     // Dùng ít (Xanh)
    },
    history: [
        { name: "Ăn uống", amount: 570000 },
        { name: "Mua sắm", amount: 300000 },
        { name: "Các khoản chi khác", amount: 1000000 },
        { name: "Mua sắm", amount: 1000000 }
    ]
};

function formatVND(num) {
    return num.toLocaleString('vi-VN') + " VND";
}

function updateUI() {
    // 1. Cập nhật Banner
    document.getElementById('total-month-display').innerText = formatVND(db.totalMonth);

    // 2. Cập nhật các thẻ hạng mục
    Object.keys(db.categories).forEach(key => {
        const item = db.categories[key];
        const percent = Math.min((item.spent / item.budget) * 100, 100);
        
        const bar = document.getElementById(`${key}-bar`);
        const status = document.getElementById(`${key}-status`);
        const current = document.getElementById(`${key}-spent`);
        const budget = document.getElementById(`${key}-budget`);
        const percentLabel = document.getElementById(`${key}-percent`);

        // Đổ số liệu
        current.innerText = `-${formatVND(item.spent)}`;
        budget.innerText = formatVND(item.budget);
        percentLabel.innerText = Math.round((item.spent / item.budget) * 100) + "%";
        bar.style.width = percent + "%";

        // Logic đổi màu trạng thái
        if (percent >= 100) {
            bar.className = "h-full bg-red-500 shadow-md";
            status.innerText = "Vượt mức cho phép!";
            status.className = "text-xs font-bold italic text-red-500";
            current.className = "text-2xl font-bold text-red-500";
        } else if (percent >= 75) {
            bar.className = "h-full bg-yellow-400 shadow-md";
            status.innerText = "Sắp chạm hạn mức (Vừa đạt)";
            status.className = "text-xs font-bold italic text-yellow-600";
        } else {
            bar.className = "h-full bg-green-500 shadow-md";
            status.innerText = "Đang chi tiêu tốt (Dùng ít)";
            status.className = "text-xs font-bold italic text-green-600";
        }
    });

    // 3. Đổ bảng lịch sử
    const historyBody = document.getElementById('expense-history');
    historyBody.innerHTML = db.history.map(item => `
        <tr>
            <td class="text-gray-800">${item.name}</td>
            <td class="text-right text-expense-red">-${formatVND(item.amount)}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', updateUI);