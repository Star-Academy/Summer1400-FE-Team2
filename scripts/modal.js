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

//modals of the site
function permission() {
  modal.style.display = "block";
  let path = calculatePath();
  let href_register = getNavLink(path, "Register");
  let href_login = getNavLink(path, "Login");
  let image_address =
    path === "index.html"
      ? "./assets/images/box-modal.jpg"
      : "../assets/images/box-modal.jpg";
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

function showSearchResults(data) {
  modal.style.display = "block";
  let path = calculatePath();
  let href = getNavLink(path, "song");
  text.innerHTML = `
      <div class="main-modal">
          <div class="modal-search">
                <p>نتایج جست و جوی شما</p>
                <div class="search-container">
                ${
                  data.length > 0
                    ? data
                        .map(
                          (song) =>
                            `<div class="card" >
                                <a class="music-link" href="./pages/song.html?id=${song.id}">
                                    <div class="music-link__image">
                                    <img src="${song.cover}" alt="cover" />
                                    <button class="play-playlists-button"><i class="fas fa-play-circle"></i></button>
                                    </div>
                                    <div class="music-info">
                                        <h3>${song.name}</h3>
                                        <h5>${song.artist}</h5>
                                    </div>
                                </a>
                            </div>`
                        )
                        .join("")
                    : "<a>نتیجه ای یافت نشد</a>"
                }
                </div>
          </div>
        </div>`;
}
