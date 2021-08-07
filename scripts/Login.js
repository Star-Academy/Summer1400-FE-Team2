const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const inputs = loginForm.getElementsByTagName("input");

function Welcome(res, username) {
  localStorage.setItem("userId", res.id);
  localStorage.setItem("token", res.token);
  localStorage.setItem("username", username);
  sessionStorage.setItem("welcome", "false");
  window.location.href = "../index.html";
}

const checkData = (e) => {
  e.preventDefault();
  const postBody = {
    username: inputs[1].value,
    email: inputs[0].value,
    password: inputs[2].value,
  };
  if (CheckObj(postBody)) {
    PostData("postLogin", postBody)
      .then((res) => {
        Welcome(res, postBody.username);
      })
      .catch((err) => {
        showToast(err.message);
      });
  } else {
    showToast("اطلاعات را کامل وارد کنید");
  }
};

loginBtn.addEventListener("click", checkData);