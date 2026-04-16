// DATABASE: Chứa tất cả số liệu thực tế
const database = {
    totalDebtBanner: 35000000, // Con số hiển thị ở Banner
    loan: {
        total: 55000000,       // Tổng khoản nợ vay
        paid: 24750000         // Số tiền thực tế đã trả
    },
    credit: {
        total: 0,
        paid: 0
    },
    history: [
        { name: "Thẻ tín dụng", amount: -500000 },
        { name: "Khoản vay", amount: -5000000 },
        { name: "Thẻ tín dụng", amount: -1200000 }
    ]
};

function formatVND(num) {
    return num.toLocaleString('vi-VN') + " VND";
}

function updateDebtUI() {
    const db = database;

    // 1. Cập nhật Banner và Tiêu đề thẻ
    document.getElementById('total-debt-banner').innerText = formatVND(db.totalDebtBanner);
    document.getElementById('loan-amount-display').innerText = formatVND(db.loan.total);
    document.getElementById('credit-amount-display').innerText = formatVND(db.credit.total);

    // 2. Xử lý thanh tiến độ Khoản vay
    const loanPercent = (db.loan.paid / db.loan.total) * 100;
    document.getElementById('loan-bar').style.width = loanPercent + "%";
    document.getElementById('loan-percent-text').innerText = Math.round(loanPercent) + "%";

    // 3. Xử lý thanh tiến độ Thẻ tín dụng (Nếu bằng 0 thì hiện xám)
    if (db.credit.total > 0) {
        const creditPercent = (db.credit.paid / db.credit.total) * 100;
        document.getElementById('credit-bar').style.width = creditPercent + "%";
        document.getElementById('credit-bar-container').classList.add('bg-[#ef4444]');
        document.getElementById('credit-status-text').innerText = Math.round(creditPercent) + "% đã trả";
    }

    // 4. Xử lý Tiến độ trả nợ tổng quát
    const totalPaid = db.loan.paid + db.credit.paid;
    const totalLoan = db.loan.total + db.credit.total;
    const overallPercent = (totalPaid / totalLoan) * 100;

    document.getElementById('total-paid-value').innerText = totalPaid.toLocaleString('vi-VN');
    document.getElementById('total-loan-value').innerText = totalLoan.toLocaleString('vi-VN');
    document.getElementById('overall-bar').style.width = overallPercent + "%";
    document.getElementById('label-paid').innerText = Math.round(overallPercent) + "%";
    document.getElementById('label-remain').innerText = Math.round(100 - overallPercent) + "%";

    // 5. Render bảng lịch sử thanh toán
    const tableBody = document.getElementById('payment-history-table');
    tableBody.innerHTML = db.history.map(item => `
        <tr>
            <td class="text-gray-800">${item.name}</td>
            <td class="text-right text-payment-red">${item.amount.toLocaleString('vi-VN')} VND</td>
        </tr>
    `).join('');
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', updateDebtUI);