const modal = document.getElementById("modal");
const span = document.getElementById("modal-close");
const text = document.getElementById("modal-text");
span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


//example of how to use
function permission() {
    modal.style.display = "block";
    let path = window.location.pathname.split("/").pop();
    let href_register = path === 'index.html' ? './pages/Register.html' : './Register.html';
    let href_login = path === 'index.html' ? './pages/Login.html' : './Login.html';
    let image_address = path === 'index.html' ? './assets/images/box-modal.jpg' : '../assets/images/box-modal.jpg';
    text.innerHTML = `
      <div class="main-modal">
          <div class="modal-info flex-center">
                <p>با یه حساب رایگان شروع به گوش دادن اهنگ ها کن</p>
                <a href=${href_register}>ثبت نام رایگان</a>
                <small>قبلا حساب کاربری ایجاد کردی؟ <a href=${href_login}>ورود</a></small>
          </div>
          <div class="modal-photo flex-center">
              <img src=${image_address} alt="" />
          </div>
        </div>`;
}