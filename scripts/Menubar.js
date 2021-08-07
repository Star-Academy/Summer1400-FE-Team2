const goBack = document.getElementById("goBack");
const goForward = document.getElementById("goForward");
const userStatusMenu = document.getElementById("userStatusMenu");

const searchBtn = document.getElementById("btnSearchMenu");
const searchBox = document.getElementById("boxSearchMenu");
const search = document.getElementById("searchBtn");

const libraryMenu = document.getElementById("libraryMenu");
const libraryMenuMobile = document.getElementById("libraryMenuMobile");

const createListMenu = document.getElementById("createListMenu");
const createListMenuMobile = document.getElementById("createListMenuMobile");

const searchMenuMobileBtn = document.getElementById("btnSearchMenuMobile");

const archivedMenu = document.getElementById("archived-menu");
const archivedMenuMobile = document.getElementById("archived-menu-mobile");

function isLogedin() {
  return localStorage.getItem("token") !== null;
}

function fgoBack() {
  window.history.back();
}

function fgoForward() {
  window.history.forward();
}

function welcomeUser() {
  let name = localStorage.getItem("username");
  if (
    localStorage.getItem("token") !== null &&
    sessionStorage.getItem("welcome") === "false"
  ) {
    showToast(`${name} عزیز با موفقیت وارد شدید .`);
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

function getNavLink(path, link) {
  return path === "index.html" || path === ""
    ? `./pages/${link}.html`
    : `./${link}.html`;
}

function calculatePath() {
  return window.location.pathname.split("/").pop();
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
      count: 50,
      sorter: "name",
      desc: true,
    })
      .then((res) => {
        showSearchResults(res.songs);
        console.log(res.songs);
      })
      .catch((e) => {
        showToast(e.message);
      });
  }
}
search.addEventListener("click", Search);

let path = calculatePath();

function gotoLibrary() {
  if (isLogedin()) {
    libraryMenu.href = getNavLink(path, "songsList");
  } else {
    showToast("ابتدا وارد شوید");
  }
}

function logoutBtnHandler() {
  if (isLogedin()) {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      let path = calculatePath();
      localStorage.clear();
      window.location = getNavLink(path, "Login");
    });
  }
}

goBack.addEventListener("click", fgoBack);
goForward.addEventListener("click", fgoForward);

searchBtn.addEventListener("click", SearchItem);
searchMenuMobileBtn.addEventListener("click", SearchItem);

//show library
libraryMenu.addEventListener("click", gotoLibrary);
libraryMenuMobile.addEventListener("click", gotoLibrary);

//create playlist
createListMenu.addEventListener("click", gotoLibrary);
createListMenuMobile.addEventListener("click", gotoLibrary);

//show playlist
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

setStatus();
welcomeUser();
logoutBtnHandler();
