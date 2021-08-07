const register_btn = document.getElementById("registerBtn");
const register_email = document.getElementById("register-email");
const register_password = document.getElementById("register-password");
const register_username = document.getElementById("register-username");
const registerForm = document.getElementById("registerForm");

const inputs = registerForm.getElementsByTagName("input");
const checkData = (e) => {
  e.preventDefault();
  const postBody = {
    username: inputs[4].value,
    email: inputs[0].value,
    password: inputs[3].value,
    firstName: inputs[1].value,
    lastName: inputs[2].value,
  };
  if (
    postBody.username !== "" &&
    postBody.email !== "" &&
    postBody.password !== ""
  ) {
    PostData("postRegister", postBody)
      .then((res) => {
        localStorage.setItem("userId", res.id);
        localStorage.setItem("token", res.token);
        window.location.href = "/";
      })
      .catch((err) => {
        showToast(err.message);
      });
  } else showToast("لطفا تمام اطلاعات را وارد کنید");
};
register_btn.addEventListener("click", checkData);
