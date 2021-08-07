/** @format */

const register_btn = document.getElementById("registerBtn");

const register_email = document.getElementById("register-email");
const register_password = document.getElementById("register-password");

const checkData = (e) => {
    e.preventDefault();
    if (register_email.value !== "" && register_password !== "")
        showToast("ثبت شما با موفقیت انجام شد");
    else
        showToast("لطفا ایمیل و رمز عبور را وارد کنید");
};

register_btn.addEventListener("click", checkData);