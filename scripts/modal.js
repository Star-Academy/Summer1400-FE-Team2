/** @format */

const modal = document.getElementById("modal");
const span = document.getElementById("modal-close");
const text = document.getElementById("modal-text");
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


//example of how to use
function permission() {
  modal.style.display = "block";
  text.innerHTML = `
      <div class="main-modal">
          <div class="modal-info flex-center">
                <p>با یه حساب رایگان شروع به گوش دادن اهنگ ها کن</p>
                <a href="Register.html">ثبت نام رایگان</a>
                <small>قبلا حساب کاربری ایجاد کردی؟ <a href="Login.html">ورود</a></small>
          </div>
          <div class="modal-photo flex-center">
              <img src="./assets/images/box-modal.jpg" alt="" />
          </div>
        </div>`;
}
