const playlist_section = document.getElementById("playlist-section");
let explain = "توضیحات..";
let title = "ژانر اهنگ ها در این گروه";
let img = "../assets/images/sample.jpg";
const cards = [...Array(15)].map(
  (item) => `<div class="card-playlist">
      <a href="./songsList.html">
          <img src="${img}" alt="cover" />
          <h4 class="card-playlist__title">${title}</h4>
          <p>${explain}</p>
      </a>
  </div>`
);
playlist_section.innerHTML = cards.join("\n");
