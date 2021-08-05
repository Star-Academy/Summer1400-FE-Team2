/** @format */

const goBack = document.getElementById("goBack");

function fgoBack() {
    window.history.forward();
}
goBack.addEventListener("click", fgoBack);

const goForward = document.getElementById("goForward");

function fgoForward() {
    window.history.back();
}
goForward.addEventListener("click", fgoForward);

const userStatusMenu = document.getElementById("userStatusMenu");

function welcomeUser() {
    if (localStorage.getItem("token") !== null && sessionStorage.getItem('welcome') == 'false') {
        showToast(`${localStorage.getItem('username')} عزیز با موفقیت وارد شدید .`);
        sessionStorage.setItem('welcome', 'true');
    }
}

function setStatus() {
    if (localStorage.getItem("token") !== null) {
        userStatusMenu.innerHTML = `
        <a href="#" id="user-account__link">
        <i class="far fa-user"></i> <span>${localStorage.getItem(
      "username"
    )}</span>
        </a>
        <a href="#" id="logoutBtn">
        <i class="fas fa-sign-out-alt"></i> <span>خروج</span>
        </a>
        `;
    } else {
        let path = window.location.pathname.split("/").pop();
        
console.log(path)
        let href_register = path === 'index.html' || path ==='' ? './pages/Register.html' : './Register.html';
        let href_login = path === 'index.html' || path ==='' ? './pages/Login.html' : './Login.html';
        userStatusMenu.innerHTML = `
    <a href=${href_register} class="controlBtn">
    <span>ثبت نام</span>
    </a>
    <a href=${href_login} class="controlBtn">
    <i class="fas fa-sign-in-alt vertical-middle"></i>
    <span>ورود</span>
    </a>
    `;
    }
}


setStatus();
welcomeUser();
const searchBtn = document.getElementById("btnSearchMenu");

function SearchItem() {
    let searchBox = document.getElementById("boxSearchMenu");
    if (searchBox.style.display !== "none") {
        searchBox.style.display = "none";
    } else {
        searchBox.style.display = "flex";
    }
}

searchBtn.addEventListener("click", SearchItem);

const btnSearchMenuMobile = document.getElementById("btnSearchMenuMobile");

btnSearchMenuMobile.addEventListener("click", SearchItem);

//Not done
let path = window.location.pathname.split("/").pop();

const libraryMenu = document.getElementById("libraryMenu");
const libraryMenuMobile = document.getElementById("libraryMenuMobile");

function gotoLibrary() {
    if (localStorage.getItem("token") !== null) {
        libraryMenu.href =
            path === "index.html" ? "./pages/songsList.html" : "./songsList.html";
    } else {
        showToast("ابتدا وارد شوید");
    }
}

//show library
libraryMenu.addEventListener("click", gotoLibrary);
libraryMenuMobile.addEventListener("click", gotoLibrary);


//create playlist
const createListMenu = document.getElementById("createListMenu");
const createListMenuMobile = document.getElementById("createListMenuMobile");

createListMenu.addEventListener("click", gotoLibrary);
createListMenuMobile.addEventListener("click", gotoLibrary);

//show playlist
const ArchivedMenu = document.getElementById("ArchivedMenu");
const ArchivedMenuMobile = document.getElementById("ArchivedMenuMobile");

ArchivedMenu.addEventListener("click", gotoLibrary);
ArchivedMenuMobile.addEventListener("click", gotoLibrary);


if (localStorage.getItem("token") !== null) {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        let path = window.location.pathname.split("/").pop();
        localStorage.clear();
        window.location =
            path === "index.html" ? "./pages/Login.html" : "./Login.html";
    })
}