const goBack = document.getElementById("goBack");
const goForward = document.getElementById("goForward");
const userStatusMenu = document.getElementById("userStatusMenu");

const searchBtn = document.getElementById("btnSearchMenu");
const searchBox = document.getElementById("boxSearchMenu");

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
    let path = calculatePath();
    let address = path === 'index.html' || path === '' ? '.' : '..';
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

function setMenuStatus(container, login_link, register_link) {
    let path = calculatePath();
    let address = path === 'index.html' || path === '' ? '.' : '..';
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

function getNavLink(path, link) {
    return (path === "index.html" || path === "") ?
        `./pages/${link}.html` :
        `./${link}.html`;
}

function calculatePath() {
    return window.location.pathname.split("/").pop();
}

function setStatus() {
    if (isLogedin()) {
        console.log(' logedin');
        setUserStatus(userStatusMenu);
    } else {
        console.log('not logedin');
        let path = calculatePath();
        let href_register = getNavLink(path, 'Register');
        let href_login = getNavLink(path, 'Login');
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

let path = calculatePath();

function gotoLibrary() {
    if (isLogedin()) {
        libraryMenu.href = getNavLink(path, 'songsList');
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
            window.location = getNavLink(path, 'Login');
        });
    }
}

goBack.addEventListener("click", fgoBack);
goForward.addEventListener("click", fgoForward);

if (searchBox) {
    searchBtn.addEventListener("click", SearchItem);
}
if (searchMenuMobileBtn) {
    searchMenuMobileBtn.addEventListener("click", SearchItem);
}

//show library
if (libraryMenu) {
    libraryMenu.addEventListener("click", gotoLibrary);
}
if (libraryMenuMobile) {
    libraryMenuMobile.addEventListener("click", gotoLibrary);
}

//create playlist
if (createListMenu) {
    createListMenu.addEventListener("click", gotoLibrary);
}
if (createListMenuMobile) {
    createListMenuMobile.addEventListener("click", gotoLibrary);
}

//show playlist
if (archivedMenu) {
    archivedMenu.addEventListener("click", gotoLibrary);
}
if (archivedMenuMobile) {
    archivedMenuMobile.addEventListener("click", gotoLibrary);
}


setStatus();
welcomeUser();
logoutBtnHandler();