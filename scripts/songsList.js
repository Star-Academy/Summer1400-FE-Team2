const playlistTable = document.querySelector(".playlist-table");
const playlist_body = document.getElementById("playlist-table__body");
const playlist_details = document.querySelector(".playlist-details");
const playlist_controls_container = document.querySelector(
  ".playlist-controls__container"
);

const playMusic_button = document.getElementById("playMusicBtn");
const like_songsList = document.getElementById("like-songs");

let mobile_nav_height;
const mobile_nav = document.querySelector(".aside-mobile__links");
const current_music_div = document.querySelector(".current-music");

function fillData(data) {
  playlist_details.innerHTML = `
    <div class="playlist-details__image">
        <img src="../assets/images/sample.jpg" alt="playlist-image" />
    </div>
    <div class="playlist-details__content">
        <p>لیست اهنگ</p>
        <h1>${data.name}</h1>
        <div class="flex songsListDetails">
            <span><b>Spotify</b></span>
            <span>${data.songs.length} آهنگ </span>
        </div>
    </div>
`;
  console.log(data);
  const songsList = data.songs
    .map(
      (song, i) =>
        `<tr>
            <td class="hide-column">
            <span> ${i + 1} </span>
                <i class='hide fas fa-play play_sign_button'></i>
            </td>
            <td class="song-details__container">
                <div class="song-details">
                    <div>
                        <a href="./song.html?id=${song.id}">
                            <img src=${song.cover} />
                        </a>
                    </div>
                    <div>
                        <h6>${song.name}</h6>
                        <h6>${song.artist}</h6>
                    </div>
                </div>
            </td>
            <td class="hide-column">${data.name}</td>
            <td class="hide-column">${new Date(
              song.publish_date
            ).getFullYear()}/${new Date(
          song.publish_date
        ).getMonth()}/${new Date(song.publish_date).getDay()}</td>
            <td class="songsList-details"><i class="fas fa-ellipsis-v details_sign_button"></i></td>
        </tr>`
    )
    .join("\n");
  playlist_body.innerHTML = songsList;

  playMusic_button.addEventListener("click", () => {
    if (getToken()) {
      window.location.href = `./song.html?id=${data.songs[0].id}`;
    } else {
      permission();
    }
  });
}

function getPlaylistSongs() {
  let id = localStorage.getItem("favoriteId");
  GetData("getPlaylist", id)
    .then((res) => {
      fillData(res);
      showToast("درحال بارگزاری آهنگ ها");
    })
    .catch(() => {
      showToast("خطا در ارتباط با سرور");
    });
}

getPlaylistSongs();

mobile_nav_height = mobile_nav.clientHeight;
current_music_div.style.bottom = `${mobile_nav_height}px`;

window.addEventListener("resize", () => {
  mobile_nav_height = mobile_nav.clientHeight;
  current_music_div.style.bottom = `${mobile_nav_height}px`;
});
