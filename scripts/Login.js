/** @format */

const user_data = [
  {
    password: "1234@mO",
    userName: "Mohadeseh",
    email: "mohadeseh@gmail.com",
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
  let result =
    input_email.value === "" || input_pass.value === ""
      ? "اطلاعات را کامل وارد کنید"
      : "کاربری با این اطلاعات وجود ندارد";
  for (let i = 0; i < user_data.length; i++) {
    if (
      user_data[i].userName === input_email.value ||
      user_data[i].email === input_email.value
    ) {
      result = "حساب کاربری یافت نشد";
      if (user_data[i].password === input_pass.value) {
        result = " موفقیت آمیز بود";
        lsRememberMe();
        break;
      }
    }
  }
  showToast(result);
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
