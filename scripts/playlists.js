/** @format */

const playlists_section = document.getElementById("playlists");
let explain = "توضیحات..";
let title = "ژانر اهنگ ها در این گروه";
let img = "./assets/images/sample.jpg";
let id = 1;
const cards = [...Array(3)].map(
  (item,i) =>
    `
  <section class="playlists__container">
    <div class="playlists__title">
        <h3><a href="./pages/playlist.html?id=${id}">لیست اهنگ ${i+1}</a></h3>
        <a href="./pages/playlist.html?id=${id}">مشاهده همه</a>
    </div>
    <div class="cards__container">
        ${[...Array(7)]
          .map(
            (item) =>
              ` 
            <div class="card-playlist" >
                <a class="music-link">
                    <img src="${img}" alt="cover" />
                    <h4 class="card-playlist__title">${title}</h4>
                    <p>${explain}</p>
                </a>
            </div>
        `
          )
          .join("")}
    </div>
  </section>
  `
);

playlists_section.innerHTML = cards.join("\n");

document.querySelectorAll(".music-link").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (localStorage.getItem("token") === null) {
        permission();
    } else {
      item.href = `./pages/song.html?id=${2}`;
    }
  });
});
