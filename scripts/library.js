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
              <a id=${playlist.id
          } class="music-link" href="./songsList.html?id&playlist=${playlist.id
          }" >
                  <div class="music-link__image">
                  <img src="${user_playlistsPics[index] &&
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
    console.log('in getUser Data: ', res);
    document.getElementById("profile-name").innerHTML =
      res.user.first_name + " " + res.user.last_name;
    document.getElementById("profile-username").innerHTML = res.user.username;
    if (res.user.avatar)
      profilePicContainer.style.backgroundImage = `url(${res.user.avatar})`;
    const modal_img = document.getElementById('profile-image_container');
    console.log(modal_img)
    if (modal_img) {
      modal_img.style.backgroundImage = `url(${res.user.avatar})`;
    }
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
          (error) => { }
        );
      };
    } else {
      showToast("حجم فایل زیاد است");
    }
  },
  false
);

edit_profileBtn.addEventListener('click', editProfile)
/*********** edit profile modal ********** */
function editProfile() {
  modal.style.display = "block";
  text.innerHTML = getEditModal();
  const close_profile_button = document.getElementById('close-profile-button');
  const save_button = document.getElementById('save-photo');
  const modal_playlist_container = document.getElementById('modal-playlist_container');
  modal_playlist_container.style.display = 'block';
  setProfileModal();

  function closeEditModal() {
    modal_playlist_container.style.display = 'none';
    modal.style.display = 'none';
  }

  save_button.addEventListener('click', () => {
    if (changed_name != getUserName() || current_profile_img != changed_profile_img) {
      PostData("postAlter", {
        token: localStorage.getItem("token"),
        username: changed_name,
        avatar: changed_profile_img
      }).then(
        (res) => {
          localStorage.setItem("username", changed_name);
          getUserData();
          setStatus();
          getAllPlaylists();
          showToast('ویرایش اطلاعات با موفقیت انجام شد.')
          closeEditModal();
        },
        (error) => {
          showToast(error);
        }
      );
    } else {
      closeEditModal();
    }
  })
  close_profile_button.addEventListener('click', closeEditModal);
}

let changed_name;
let changed_profile_img;
let current_profile_img;
function setProfileModal() {
  let userId = localStorage.getItem("userId");
  const delete_img = document.querySelector('#delete-modalImg');
  const modal_file = document.getElementById('modal-file');
  GetData("getUser", userId).then((res) => {
    const modal_img = document.getElementById('profile-image_container');
    const modal_name = document.getElementById('modal-username');
    changed_profile_img = res.user.avatar;
    current_profile_img = res.user.avatar;
    if (modal_img) {
      modal_img.style.backgroundImage = `url(${res.user.avatar})`;
    }

    modal_name.value = res.user.username;
    changed_name = res.user.username;
    modal_name.addEventListener('change', () => {
      changed_name = modal_name.value;
    })

    delete_img.addEventListener('click', () => {
      modal_img.style.backgroundImage = `url('../assets/Icons/user-profile.svg')`;
      changed_profile_img = '../assets/Icons/user-profile.svg';
    })
    modal_file.addEventListener('change',()=>{
      let file = modal_file.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.size / 1000 < 85) {
        reader.onload = function () {
          modal_img.style.backgroundImage = `url(${reader.result})`;
          changed_profile_img = reader.result;
        }}
    })

  });
}