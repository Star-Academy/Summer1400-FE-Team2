const boxModal = document.querySelector('.box-modal');
boxModal.innerHTML = `
<div class="modal">
<div class="main-modal">
    <div class="modal-info flex-center">
        <p>با یه حساب رایگان شروع به گوش دادن اهنگ ها کن</p>
        <a href="Register.html">ثبت نام رایگان</a>
        <small>قبلا حساب کاربری ایجاد کردی؟ <a href="Login.html">ورود</a>
</small>
    </div>
    <div class="modal-photo flex-center">
        <img src="../assets/images/box-modal.jpg" alt="" />
    </div>
</div>
<div class="close-modal">
    <button>close</button>
</div>
</div>
`;