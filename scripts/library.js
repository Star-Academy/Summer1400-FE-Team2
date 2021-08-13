const library_playlists = document.getElementById("library_playlists");
const edit_profileBtn = document.getElementById('edit-profile-button');
const fillData_library = (playlists, user_playlistsPics) => {
        return `
  <div class="cards__container">
      ${playlists
        .map(
          (playlist, index) =>
            ` 
          <div class="card-playlist" >
              <a id=${
                playlist.id
              } class="music-link" href="./songsList.html?id&playlist=${
              playlist.id
            }" >
                  <div class="music-link__image">
                  <img src="${
                    user_playlistsPics[index] &&
                    user_playlistsPics[index] !== ""
                      ? user_playlistsPics[index]
                      : "../assets/Icons/musical-note.svg"
                  }" alt="cover" />
                  <button class="play-playlists-button">
                  <img src="../assets/Icons/play-button.svg"  class="play_sign_button svgColor" alt="">
                  </button>
                  </div>
                  <h4 class="card-playlist__title">${playlist.name}</h4>
                  <p>${localStorage.getItem("username")}</p>
              </a>
          </div>
      `
        )
        .join("")}
  </div>

`;
};

// work with playlists

async function getAllPlaylists() {
  const user_playlists = [];
  const user_playlistsPics = [];
  PostData("postAllPlaylists", {
    token: getToken(),
  })
    .then((res) => {
      res.forEach((item) => {
        user_playlists.push(item);
        item.songs[0]
          ? user_playlistsPics.push(item.songs[0].rest.cover)
          : user_playlistsPics.push("");
      });
      library_playlists.innerHTML = fillData_library(
        user_playlists,
        user_playlistsPics
      );
    })
    .catch((error) => {
      showToast(error);
    });
}

await getAllPlaylists();

/**** Edit profile ****/
const profilePicContainer = document.querySelector(".profile-photo_container");
function getUserData() {
  let userId = localStorage.getItem("userId");
  GetData("getUser", userId).then((res) => {
    document.getElementById("profile-name").innerHTML =
      res.user.first_name + " " + res.user.last_name;
    document.getElementById("profile-username").innerHTML = res.user.username;
    if (res.user.avatar)
      profilePicContainer.style.backgroundImage = `url(${res.user.avatar})`;
  });
}

getUserData();

/**** profile uploader****/
const profile_input = document.querySelector(".profile-photo input");

profile_input.addEventListener(
  "change",
  function (event) {
    let file = profile_input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.size / 1000 < 85) {
      showToast("درحال آپلود");
      reader.onload = function () {
        PostData("postAlter", {
          token: localStorage.getItem("token"),
          avatar: reader.result,
        }).then(
          (res) => {
            getUserData();
          },
          (error) => {}
        );
      };
    } else {
      showToast("حجم فایل زیاد است");
    }
  },
  false
);

edit_profileBtn.addEventListener('click',()=>{
  console.log('edit profile');
})