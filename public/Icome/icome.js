const incomeData = {
    totalAllTime: 55840000,
    salaryFixed: 30000000,
    extraIncomeTotal: 3730000,
    currentMonthIncome: 33740000,
    history: [
        { name: "Lương", amount: 30000000 },
        { name: "Tiền thưởng", amount: 3000000 },
        { name: "Làm thêm", amount: 740000 }
    ]
};

function init() {
    // Đổ dữ liệu vào các khung
    document.getElementById('total-all-time').innerText = incomeData.totalAllTime.toLocaleString() + " VND";
    document.getElementById('salary-fixed').innerText = incomeData.salaryFixed.toLocaleString();
    document.getElementById('extra-income-total').innerText = incomeData.extraIncomeTotal.toLocaleString();
    document.getElementById('current-month-income').innerText = incomeData.currentMonthIncome.toLocaleString() + " VND";

    // Render bảng thu nhập gần đây
    const list = document.getElementById('recent-income-list');
    list.innerHTML = incomeData.history.map(item => `
        <tr>
            <td class="text-gray-600">${item.name}</td>
            <td class="text-right income-green">${item.amount.toLocaleString()} VND</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);