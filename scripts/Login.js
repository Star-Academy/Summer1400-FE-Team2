/** @format */

const user_data = [{
        password: "1234@ha",
        userName: "Hadis",
        email: "hadis@gmail.com",
    },
    {
        password: "4567@pa",
        userName: "Perriex",
        email: "parna@gmail.com",
    },
];

let login_btn = document.getElementById("loginBtn");
let input_email = document.getElementById("login-email");
let input_pass = document.getElementById("login-password");
let rmCheck = document.getElementById("login-checkbox");

const checkData = (e) => {
    e.preventDefault();
    let result;
    let result_username;
    let isUser = 0;
    let hasAccount = 0;
    if (input_email.value === "" || input_pass.value === "") {
        result = "اطلاعات را کامل وارد کنید";
    } else {
        for (let i = 0; i < user_data.length; i++) {
            if (
                user_data[i].userName === input_email.value ||
                user_data[i].email === input_email.value
            ) {
                hasAccount = 1;
                if (user_data[i].password === input_pass.value) {
                    result_username = user_data[i].userName;
                    result = `${user_data[i].userName} عزیز با موفقیت وارد شدید .`;
                    lsRememberMe();
                    isUser = 1;
                    break;
                } else {
                    result = "رمز عبور اشتباه است.";
                }
            }
        }
        if (!hasAccount) {
            result = "کاربری با این اطلاعات یافت نشد.";
        }
    }
    showToast(result);
    if (isUser) {
        localStorage.setItem('token', 'true');
        localStorage.setItem('username', result_username);
        sessionStorage.setItem('welcome', 'false');
        window.location.href = '../index.html';
    }
};

login_btn.addEventListener("click", checkData);

if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    input_email.value = localStorage.username;
} else {
    rmCheck.removeAttribute("checked");
    input_email.value = "";
}

function lsRememberMe() {
    if (rmCheck.checked && input_email.value !== "") {
        localStorage.username = input_email.value;
        localStorage.checkbox = rmCheck.value;
    } else {
        localStorage.username = "";
        localStorage.checkbox = "";
    }
}