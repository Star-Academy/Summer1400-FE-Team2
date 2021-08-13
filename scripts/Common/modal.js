const modal = document.getElementById("modal");
const span = document.getElementById("modal-close");
const text = document.getElementById("modal-text");

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
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
        path === "index.html" ?
        "./assets/images/box-modal.jpg" :
        "../assets/images/box-modal.jpg";
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
                                <a class="music-link" href="${
                                  path === "index.html" || path === ""
                                    ? `./pages/song.html?id=${song.id}`
                                    : `../pages/song.html?id=${song.id}`
                                }">
                                    <div class="music-link__image">
                                    <img src="${song.cover}" alt="cover" />
                                    </div>
                                    <div class="music-info">
                                        <h4>${song.name}</h4>
                                        <h6>${song.artist}</h6>
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

function addPlaylist() {
  modal.style.display = "block";
  let path = calculatePath();
  text.innerHTML = `
  <div id="modal-playlist_container">
    <div class="modal-playlist">
      <div class="modal-header">
          <h1>افزودن پلی لیست</h1>
          <div class="close-modal">
          <button id="close-modal-button">&times;</button>
      </div>
      </div>
      <div class="modal-content">
          <div class="modal-getInfo">
              <div>
                  <input type="text" id="create-playlist" name="name" onchange="saveName( event )" placeholder="یک نام اضافه کن" id="playlist-name">
              </div>
              <div>
                  <textarea name="playlist-description" id="playlist-description" rows="5" placeholder="توضیحات (اختیاری)" spellcheck="false"></textarea>
              </div>
          </div>
          <div class="modal-image" id='playlist-image_container'>
              <!-- <input type="file"> -->
              <img id='playlist-img' src="${
                path === "" || path === "index.html"
                  ? "./assets/images/box-modal.jpg"
                  : "../assets/images/box-modal.jpg"
              }" alt="">
          </div>
      </div>
      <div class="modal-footer">
          <button id="save-playlist" class='save-modal-button' onclick="createNewPlaylist()">ذخیره</button>
      </div>
    </div>
  </div>
  `;
  document.getElementById("modal-playlist_container").style.display = "block";
  document
    .getElementById("close-modal-button")
    .addEventListener("click", () => {
      document.getElementById("modal-playlist_container").style.display =
        "none";
      document.getElementById("modal").style.display = "none";
    });
}

let nameNewPlaylist = "";

const createNewPlaylist = () => {
  if (nameNewPlaylist !== "") {
    PostData("postCreatePlaylist", {
      token: getToken(),
      name: nameNewPlaylist,
    })
      .then((res) => {
        getAllPlaylists();
      })
      .catch((err) => {});
    modal.style.display = "none";
    showToast("پلی لیست ساخته شد");
  } else {
    showToast("نام لیست را وارد کنید");
  }
};

const saveName = (event) => {
  nameNewPlaylist = event.target.value;
};

function AddPlaylistModal(playlists, song) {
  modal.style.display = "block";
  text.innerHTML = `
  <div class="song-modal">
    <div class="song-modal__content">
        <div class="song-modal_image">
            <img src=${song.cover} alt="" />
            <div class="song-modal__text">
            <h4>${song.name}</h5>
            <h5>${song.artist}</h6>
            </div>
        </div>
        <div class="song-modal_links">  
            ${playlists
              .map(
                (item) =>
                  `<div>
                    <button id="${item.id}">
                      <img src="../assets/Icons/music-folder.svg"alt=""class="svgColor"/>
                      <span> اضافه به  ${item.name}</span>
                    </button>
                </div>`
              )
              .join("\n")}
        </div>
    </div>
  </div>
  `;
  const playlistButton = document.querySelector(".song-modal_links");
  for (let i = 0; i < playlists.length; i++) {
    let btn = playlistButton.getElementsByTagName("button")[i];
    btn.addEventListener("click", function () {
      console.log({
        token: getToken(),
        playlistId: btn.id,
        songId: song.id,
      });
      PostData("postAddSong", {
        token: getToken(),
        playlistId: parseInt(btn.id),
        songId: song.id,
      })
        .then((res) => "")
        .catch((err) => showToast(err.message));
      modal.style.display = "none";
    });
  }
}