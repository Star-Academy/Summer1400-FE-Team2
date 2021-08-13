//Searchbox
const searchBtns = document.querySelectorAll(".btnSearchMenu");
const searchBox = document.getElementById("boxSearchMenu");
const search = document.getElementById("searchBtn");

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

if (search) {
  search.addEventListener("click", Search);
}
if (searchBtns) {
  searchBtns.forEach((item) => {
    item.addEventListener("click", SearchItem);
  });
}

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

function setUserStatus(container) {
  let path = calculatePath();
  let address = path === "index.html" || path === "" ? "." : "..";
  container.innerHTML = `
        <a href="#" id="user-account__link">
        <img src="${address}/assets/Icons/user-button.svg" alt="">
             <span>${localStorage.getItem("username")}</span>
        </a>
        <a href="#" id="logoutBtn">
        <img src="${address}/assets/Icons/exit-button.svg" alt="">
            <span>خروج</span>
        </a>
`;
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
  let path = calculatePath();
  let address = path === "index.html" || path === "" ? "." : "..";
  container.innerHTML = `
    <a href=${register_link} class="controlBtn">
        <span>ثبت نام</span>
    </a>
    <a href=${login_link} class="controlBtn">
        <img  src="${address}/assets/Icons/login-button.svg" alt="">
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

function welcomeUser() {
  if (
    localStorage.getItem("token") !== null &&
    sessionStorage.getItem("welcome") === "false"
  ) {
    showToast(`${localStorage.getItem("username")} عزیز با موفقیت وارد شدید .`);
    sessionStorage.setItem("welcome", "true");
  }
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

function setUserStatus(container) {
  let path = calculatePath();
  let address = path === "index.html" || path === "" ? "." : "..";
  container.innerHTML = `
        <a href="#" id="user-account__link">
        <img src="${address}/assets/Icons/user-button.svg" alt="">
             <span>${localStorage.getItem("username")}</span>
        </a>
        <a href="#" id="logoutBtn">
        <img src="${address}/assets/Icons/exit-button.svg" alt="">
            <span>خروج</span>
        </a>
`;
}

setStatus();

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

//Auth Handle  =? Hadis add profile here!  /library?userId={localstorage}
const libraryMenu = document.getElementById("libraryMenu");

function gotoLibrary() {
  if (isLogedin()) {
    libraryMenu.href = getNavLink(path, "library");
  } else {
    showToast("ابتدا وارد شوید");
  }
}

//Create new playlist
const createListMenu_arr = document.querySelectorAll(".createListMenu");
//Favorites
const archivedMenu_arr = document.querySelectorAll(".archived-menu");

//show library
if (libraryMenu) {
  libraryMenu.addEventListener("click", gotoLibrary);
}

//create playlist
if (createListMenu_arr) {
  createListMenu_arr.forEach((item) => {
    item.addEventListener("click", addPlaylist);
  });
}

//show playlist
if (archivedMenu_arr) {
  archivedMenu_arr.forEach((item) => {
    item.addEventListener("click", gotoArchivedSongs);
  });
}

//set for Favorite songs
const getFirstPlaylist = () =>
  PostData("postAllPlaylists", { token: getToken() }).then((res) =>
    localStorage.setItem("favoriteId", res[0].id)
  );
getFirstPlaylist();

function gotoArchivedSongs() {
  let id = localStorage.getItem("favoriteId");
  if (id) {
    let path = calculatePath();
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

function getUserName() {
  return localStorage.getItem("username");
}

function setUserName(name) {
  localStorage.setItem("username", name);
}

welcomeUser();

if (logoutBtn) {
  logoutBtnHandler();
}
