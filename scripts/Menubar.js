//Searchbox
const searchBtn = document.getElementById("btnSearchMenu");
const searchBox = document.getElementById("boxSearchMenu");
const search = document.getElementById("searchBtn");
const searchMenuMobileBtn = document.getElementById("btnSearchMenuMobile");

searchBox.style.display = "none";

function SearchItem() {
  if (searchBox.style.display === "none") {
    searchBox.style.display = "flex";
  } else {
    searchBox.style.display = "none";
  }
}

function Search() {
  const text = searchBox.getElementsByTagName("input")[0].value;
  if (text !== "") {
    PostData("postSearch", {
      phrase: text,
      count: 200,
      sorter: "",
      desc: true,
    })
      .then((res) => {
        showSearchResults(res.songs);
      })
      .catch((e) => {
        showToast(e.message);
      });
  }
}

search.addEventListener("click", Search);
searchBtn.addEventListener("click", SearchItem);
searchMenuMobileBtn.addEventListener("click", SearchItem);

//History control
const goBack = document.getElementById("goBack");
const goForward = document.getElementById("goForward");

function fgoBack() {
  window.history.back();
}
function fgoForward() {
  window.history.forward();
}

goBack.addEventListener("click", fgoBack);
goForward.addEventListener("click", fgoForward);

//Handy
function isLogedin() {
  return localStorage.getItem("token") !== null;
}

function calculatePath() {
  return window.location.pathname.split("/").pop();
}

let path = calculatePath();

function getNavLink(path, link) {
  return path === "index.html" || path === ""
    ? `./pages/${link}.html`
    : `./${link}.html`;
}

//Status
const userStatusMenu = document.getElementById("userStatusMenu");

function setMenuStatus(container, login_link, register_link) {
  container.innerHTML = `
    <a href=${register_link} class="controlBtn">
        <span>ثبت نام</span>
    </a>
    <a href=${login_link} class="controlBtn">
        <i class="fas fa-sign-in-alt vertical-middle"></i>
        <span>ورود</span>
    </a>
`;
}

function setStatus() {
  if (isLogedin()) {
    setUserStatus(userStatusMenu);
  } else {
    let path = calculatePath();
    let href_register = getNavLink(path, "Register");
    let href_login = getNavLink(path, "Login");
    setMenuStatus(userStatusMenu, href_login, href_register);
  }
}

setStatus();

function welcomeUser() {
  if (
    localStorage.getItem("token") !== null &&
    sessionStorage.getItem("welcome") === "false"
  ) {
    showToast(`${localStorage.getItem("username")} عزیز با موفقیت وارد شدید .`);
    sessionStorage.setItem("welcome", "true");
  }
}

function setUserStatus(container) {
  container.innerHTML = `
        <a href="#" id="user-account__link">
            <i class="far fa-user"></i> 
             <span>${localStorage.getItem("username")}</span>
        </a>
        <a href="#" id="logoutBtn">
            <i class="fas fa-sign-out-alt"></i> 
            <span>خروج</span>
        </a>
`;
}

welcomeUser();

//Logout
const logoutBtn = document.getElementById("logoutBtn");

function logoutBtnHandler() {
  if (isLogedin()) {
    logoutBtn.addEventListener("click", () => {
      let path = calculatePath();
      localStorage.clear();
      window.location = getNavLink(path, "Login");
    });
  }
}

logoutBtnHandler();

//Auth Handle  =? Hadis add profile here!  /library?userId={localstorage}
const libraryMenu = document.getElementById("libraryMenu");
const libraryMenuMobile = document.getElementById("libraryMenuMobile");

function gotoLibrary() {
  if (isLogedin()) {
    libraryMenu.href = getNavLink(path, "#");
  } else {
    showToast("ابتدا وارد شوید");
  }
}

libraryMenu.addEventListener("click", gotoLibrary);
libraryMenuMobile.addEventListener("click", gotoLibrary);

//Create new playlist
const createListMenu = document.getElementById("createListMenu");
const createListMenuMobile = document.getElementById("createListMenuMobile");

createListMenu.addEventListener("click", addPlaylist);
createListMenuMobile.addEventListener("click", addPlaylist);

//Favorites
const archivedMenu = document.getElementById("archived-menu");
const archivedMenuMobile = document.getElementById("archived-menu-mobile");

//set for Favorite songs
const getFirstPlaylist = () =>
  PostData("postAllPlaylists", { token: getToken() }).then((res) =>
    localStorage.setItem("favoriteId", res[0].id)
  );
getFirstPlaylist();

function gotoArchivedSongs() {
  let id = localStorage.getItem("favoriteId");
  if (id) {
    let path = window.location.pathname.split("/").pop();
    window.location =
      path === "index.html" || path === ""
        ? `./pages/songsList.html?id&playlist=${id}`
        : `./songsList.html?id&playlist=${id}`;
  } else {
    showToast("لیست آهنگ های مورد علاقه شما ساخته شد");
    PostData("postCreatePlaylist", {
      token: getToken(),
      name: "مورد علاقه ها",
    })
      .then((res) => {
        localStorage.setItem("favoriteId", res.id);
      })
      .catch((err) => showToast(err.message));
  }
}

archivedMenu.addEventListener("click", gotoArchivedSongs);
archivedMenuMobile.addEventListener("click", gotoArchivedSongs);
