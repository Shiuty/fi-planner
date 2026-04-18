// Mở và đóng Modal
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý tất cả các ô nhập tiền (amount-input)
    const amountInputs = document.querySelectorAll('.amount-input');
    amountInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/[^0-9]/g, '');
            if (value !== "") {
                this.value = parseInt(value).toLocaleString('en-US');
            } else {
                this.value = "";
            }
        });
    });

    // 2. Kiểm tra điều kiện khi nhấn "Thêm" cho tất cả các form
    const forms = document.querySelectorAll('.finance-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, select');
            
            inputs.forEach(field => {
                // Kiểm tra bỏ trống
                if (field.value.trim() === "" || field.value === null) {
                    field.classList.add('border-red-500', 'ring-1', 'ring-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
                }
            });

            if (!isValid) {
                alert("Vui lòng nhập đầy đủ thông tin!");
            } else {
                alert("Đã thêm thành công!");
                this.reset();
                // Đóng modal cha sau khi thành công
                this.closest('.modal-overlay').classList.add('hidden');
            }
        });
    });
});
