/** @format */

const user_data = [
  {
    email: "hadis@gmail.com",
  },
  {
    email: "parna@gmail.com",
  },
];

const reset_pass = document.getElementById("login-email");
const btn_reset = document.getElementById("rstBtn");

const send_mail = (e) => {
  e.preventDefault();
  let result_text =
    reset_pass.value === ""
      ? "ایمیل خود را وارد کنید"
      : "کاربری با این اطلاعات یافت نشد";
  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i].email === reset_pass.value) {
      result_text = "لینک بازیابی به ایمیل شما ارسال شد";
      break;
    }
  }
  showToast(result_text);
};

btn_reset.addEventListener("click", send_mail);
