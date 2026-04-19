// Quản lý trạng thái Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

// 1. Kiểm tra cấu hình đã lưu trong trình duyệt
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    htmlElement.classList.add('dark');
    if (darkModeToggle) darkModeToggle.checked = true;
}

// 2. Lắng nghe sự kiện chuyển đổi
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
}

// 3. Điều hướng Logout
function Logout() {
    console.log("Nút Logout đã được nhấn!"); // Nếu nhấn nút mà không thấy dòng này trong F12 -> Console là do file JS chưa nhận.
    if (confirm("Thoát?")) {
        window.location.href = "../index.html";
    }
}

// 4. Quản lý Modal
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// 5. Xử lý form cập nhật mật khẩu
document.getElementById('pw-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Mật khẩu đã được cập nhật thành công!");
    closeModal('password-modal');
    this.reset();
});

// Đóng modal khi nhấn ra ngoài vùng bảng
window.addEventListener('click', (e) => {
    const modal = document.getElementById('password-modal');
    if (e.target === modal) closeModal('password-modal');
});