const playlist_section = document.getElementById("playlist-section");
const song_numbers = document.getElementById("song-numbers");
const song_sort = document.getElementById("song-sort");

let num = 1200;
let sort = "name";

function createCardsList() {
  PostData("postFilterSongs", {
    size: num,
    current: 1,
    sorter: sort,
    desc: false,
  })
    .then((res) => {
      showToast("درحال بارگزاری آهنگ ها");
      playlist_section.innerHTML = res.songs
        .map(
          (item) => `<div class="card-playlist">
            <a href="./song.html?id=${item.id}">
                <img src="${item.cover}" alt="cover" />
                <h4 class="card-playlist__title">${item.name}</h4>
                <p>${item.artist}</p>
            </a>
        </div>`
        )
        .join("\n");
    })
    .catch(() => {
      showToast("خطا در ارتباط با سرور");
    });
}

createCardsList();

song_numbers.addEventListener("change", () => {
  num = +song_numbers.options[song_numbers.selectedIndex].value;
  createCardsList(
    +song_numbers.options[song_numbers.selectedIndex].value,
    "name"
  );
});

song_sort.addEventListener("change", () => {
  sort = song_sort.options[song_sort.selectedIndex].value;
  console.log(song_sort.options);
  createCardsList(1200, song_sort.options[song_sort.selectedIndex].value);
});
