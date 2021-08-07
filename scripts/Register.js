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
  if (CheckObj(postBody)) {
    PostData("postRegister", postBody)
      .then((res) => {
        localStorage.setItem("userId", res.id);
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", postBody.username);
        window.location.href = "../index.html";
      })
      .catch((err) => {
        showToast(err.message);
      });
  } else showToast("لطفا تمام اطلاعات را وارد کنید");
};
inputs[5].addEventListener("click", checkData);
