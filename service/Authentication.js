const getToken = () => {
  return localStorage.getItem("token");
};

function getUserName() {
  return localStorage.getItem("username");
}

function setUserName(name) {
  localStorage.setItem("username", name);
}

const checkIfStillValid = () => {
  PostData("postToken", { token: getToken() })
    .then((res) => {
      localStorage.setItem("userId", res.id);
    })
    .catch((err) => {
      showToast(err.message);
    });
};

if (getToken()) checkIfStillValid();

function logoutBtnHandler() {
  if (isLogedin()) {
    logoutBtn.addEventListener("click", () => {
      let path = calculatePath();
      localStorage.clear();
      window.location = getNavLink(path, "Login");
    });
  }
}