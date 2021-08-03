/** @format */

const user_data = [
  {
    name: "Mohadeseh",
    lastName: "Beautiful",
    password: "1234@mO",
    userName: "Mohadeseh",
    email: "mohadeseh@gmail.com",
    gender: "female",
  },
  {
    name: "Parna",
    lastName: "Asadi",
    password: "4567@pa",
    userName: "Perriex",
    email: "parna@gmail.com",
    gender: "female",
  },
];

let login_btn = document.getElementById("loginBtn");
let input_email = document.getElementById("login-email");
let input_pass = document.getElementById("login-password");
const checkData = (e) => {
  e.preventDefault();
  let result = "کاربری با این اطلاعات وجود ندارد";
  for (let i = 0; i < user_data.length; i++) {
    if (
      user_data[i].userName === input_email.value ||
      user_data[i].email === input_email.value
    ) {
      if (user_data[i].password === input_pass.value) {
        result = "ورود موفقیت آمیز بود";
        break;
      }
    }
  }
  showToast(result);
};
login_btn.addEventListener("click", checkData);
