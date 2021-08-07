const getToken = () => {
  return localStorage.getItem("token");
};

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
