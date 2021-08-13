//Fill playlist
const playlist_body = document.getElementById("playlist-table__body");
const playlist_details = document.querySelector(".playlist-details");
const playMusic_button = document.getElementById("playMusicBtn");
const like_songsList = document.getElementById("like-songs");

function fillData(data) {
  playlist_details.innerHTML = `
    <div class="playlist-details__image">
        <img id='playlist-img' src="../assets/images/sample.jpg" alt="playlist-image" />
    </div>
    <div class="playlist-details__content">
        <p>لیست اهنگ</p>
        <h1>${data.name}</h1>
        <div class="flex songsListDetails">
            <span>${data.songs.length} آهنگ </span>
        </div>
    </div>
`;
  const songsList = data.songs
    .map(
      (song, i) =>
        `<tr>
            <td class="hide-column">
            <span> ${i + 1} </span>
            <img src="../assets/Icons/play-triangle-button.svg" class="play_sign_button svgColor" alt="">
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
            <td class="remove-column" ><img  id="${
              song.id
            }" class="remove" src="../assets/Icons/remove_circle_white_24dp.svg"/></td>
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

function getPlaylistSongs(id) {
  GetData("getPlaylist", id)
    .then((res) => {
      fillData(res);
      const playlist_image = document.getElementById("playlist-img");
      if (res["songs"][0]["cover"])
        playlist_image.src = res["songs"][0]["cover"];

      showToast("درحال بارگزاری آهنگ ها");
    })
    .catch(() => {
    });
}

let url = new URL(window.location.href);
let search_params = url.searchParams;
let playlist_id = search_params.get("playlist");
if (playlist_id) {
  getPlaylistSongs(playlist_id);
}

//Remove a song
const removeSong = (id) => {
  let url = new URL(window.location.href);
  let search_params = url.searchParams;
  let playlist_id = search_params.get("playlist");
  PostData("postRemoveSong", {
    token: getToken(),
    playlistId: +playlist_id,
    songId: id,
  })
    .then((res) => {
      getPlaylistSongs();
    })
    .catch((err) => {});
  showToast("آهنگ حذف شد");
};

document.addEventListener(
  "click",
  function (e) {
    if (e.target.className === "remove") {
      removeSong(+e.target.id);
    }
  },
  false
);

/* When the user clicks on the button, 
                                        toggle between hiding and showing the dropdown content */
function dropbtnHandler() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const dropbtn = document.querySelector(".dropbtn");
const dropbtn_icon = document.querySelector(".dropbtn img");
if (dropbtn) dropbtn.addEventListener("click", dropbtnHandler);

window.addEventListener("click", (e) => {
  if (e.target !== dropbtn_icon) {
    const myDropdown = document.getElementById("myDropdown");
    if (myDropdown) {
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
  }
});

const remove_playlist_button = document.getElementById("removePlaylistBtn");

// remove playlist
let id = localStorage.getItem("favoriteId");

function removePlaylist() {
  let url = new URL(window.location.href);
  let search_params = url.searchParams;
  let playlist_id = search_params.get("playlist");
  let playlist_name;
  if (id !== playlist_id)
    PostData("postRemovePlaylist", {
      token: getToken(),
      id: +playlist_id,
    })
      .then((res) => {
        showToast(`playlist removed successfully`);
        window.location = "../index.html";
      })
      .catch((error) => {
        showToast(error);
      });
  else {
    showToast("لیست آهنگ های مورد علاقه قابل حذف کردن نمیباشد.");
  }
}
if (remove_playlist_button)
  remove_playlist_button.addEventListener("click", removePlaylist);

function getPlaylistName(id) {
  const playlists = [];
  let name = "";
  getToken() &&
    PostData("postAllPlaylists", {
      token: localStorage.getItem("token"),
    })
      .then((res) => {
        res.forEach((item) => {
          playlists.push(item);
        });
      })
      .catch((error) => {
        showToast(error);
      });

  playlists.forEach((item) => {
    if (item["id"] == id) {
      name = item["name"];
    }
  });
}
