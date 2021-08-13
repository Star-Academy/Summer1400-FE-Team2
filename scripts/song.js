const musicContainer = document.querySelector(".music__container");
const playBtn = document.getElementById("playpause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const replayBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const likeBtn = document.querySelector(".btn--like");
const addBtn = document.querySelector(".btn--add");
const moreBtn = document.getElementById("more");
const lyricsBtn = document.getElementById("song-lyrics-button");
const lyrics_container = document.getElementById("music-lyrics_container");
const lyrics = document.getElementById("music-lyrics");
const back_lyricsBtn = document.getElementById("back-lyrics-button");
let currTime = document.querySelector("#curtime");
let durTime = document.querySelector("#durtime");

const progress_arr = document.querySelectorAll(".progress");
const progressContainer_arr = document.querySelectorAll(".progress-container");

// keep track of song
let url = new URL(window.location.href);
let search_params = url.searchParams;
let id = search_params.get("id");
var isLiked = false;

const data = await GetData("getAllSongs");

let firstSong = id ? data.songs.filter((song) => song.id === +id)[0] : null;
let songIndex =
  data.songs.indexOf(firstSong) > 0 ? data.songs.indexOf(firstSong) : 1;

loadSong(songIndex);

function loadSong(id) {
  sessionStorage.setItem("id", data.songs[id].id);
  likeBtn.querySelector("img").src = "../assets/Icons/like-button-empty.svg";
  isLiked = false;
  title.innerHTML = data.songs[id].name;
  artist.innerHTML = data.songs[id].artist;
  audio.src = data.songs[id].file;
  cover.src = data.songs[id].cover;
  if (lyrics) lyrics.innerText = data.songs[id].lyrics;
  playSong();
}
if (lyricsBtn) {
  lyricsBtn.addEventListener("click", () => {
    cover.style.display = "none";
    lyrics_container.style.display = "block";
    lyrics.style.display = "block";
    lyricsBtn.style.display = "none";
  });
}

if (back_lyricsBtn) {
  back_lyricsBtn.addEventListener("click", () => {
    cover.style.display = "block";
    lyrics_container.style.display = "none";
    lyrics.style.display = "none";
    lyricsBtn.style.display = "block";
  });
}

// play song

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("img").src = "../assets/Icons/pause-button.svg";
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("img").src = "../assets/Icons/play-button.svg";
  audio.pause();
}

function addIdToURl() {
  window.history.pushState(
    "nextSong",
    "Title",
    `${window.location.pathname}?id=${data.songs[songIndex].id}`
  );
}

function prevSong() {
  if (isShuffle) {
    let random = Math.floor(Math.random() * 200);
    while (songIndex === random) {
      random = Math.floor(Math.random() * 200);
    }
    songIndex = random;
  } else {
    songIndex--;
  }
  if (songIndex < 0) {
    songIndex = Math.abs(songIndex);
  }
  addIdToURl();
  loadSong(songIndex);
}

function nextSong() {
  if (isShuffle) {
    let random = Math.floor(Math.random() * 200);
    while (songIndex === random) {
      random = Math.floor(Math.random() * 200);
    }
    songIndex = random;
  } else {
    songIndex++;
  }
  if (songIndex > 300) {
    songIndex = 0;
  }
  addIdToURl();
  loadSong(songIndex);
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  // if (progress) progress.style.width = `${progressPercent}%`;
  progress_arr.forEach((item) => {
    item.style.width = `${progressPercent}%`;
  });
}

// set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
  let sec, min;
  const { duration, currentTime } = e.srcElement;
  let sec_d;

  //define minutes curretTime
  min =
    currentTime == null
      ? musicTimeMin
        ? musicTimeMin
        : 0
      : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (let i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }

  get_sec(currentTime, sec);
  if (currTime) currTime.innerHTML = min + ":" + sec;
  // define minutes duration
  let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (let i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  }
  get_sec_d(duration);
  if (durTime) durTime.innerHTML = min_d + ":" + sec_d;
}

let isLoop = 0;

function replaySongHandler() {
  if (!isLoop) {
    audio.loop = true;
    replayBtn.querySelector("img").src =
      "../assets/Icons/right-arrow-button.svg";
    isLoop = 1;
  } else {
    audio.loop = false;
    replayBtn.querySelector("img").src = "../assets/Icons/loop-button.svg";
    isLoop = 0;
  }
}

let isShuffle = 0;

function shuffleSongHandler() {
  if (!isShuffle) {
    isShuffle = 1;
    shuffleBtn.querySelector("img").src = "../assets/Icons/shuffle-button.svg";
  } else {
    isShuffle = 0;
    shuffleBtn.querySelector("img").src =
      "../assets/Icons/shuffle-disabled-button.svg";
  }
}

function likeSongHandler() {
  if (!isLiked) {
    let id = localStorage.getItem("favoriteId");
    if (id) {
      isLiked = true;
      likeBtn.querySelector("img").src = "../assets/Icons/like.svg";
      const postBody = {
        token: getToken(),
        playlistId: +id,
        songId: data.songs[songIndex].id,
      };
      PostData("postAddSong", postBody)
        .then(() => {})
        .catch((err) => {});
      showToast("به آهنگ های مورد علاقه اضافه شد");
      getPlaylistSongs(id);
    } else {
      showToast("لطفا لیست آهنگ های مورد علاقه را ایجاد کنید");
      // isLiked = 0;
      likeBtn.querySelector("img").src =
        "../assets/Icons/like-button-empty.svg";
    }
  } else {
    isLiked = false;
    likeBtn.querySelector("img").src = "../assets/Icons/like-button-empty.svg";
    showToast("از آهنگ های مورد علاقه حذف شد");
  }
}

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

//click on progress bar
// if (progressContainer) progressContainer.addEventListener("click", setProgress);
progressContainer_arr.forEach((item) => {
  item.addEventListener("click", setProgress);
});

// song ends
audio.addEventListener("ended", nextSong);

//Time of song
audio.addEventListener("timeupdate", DurTime);

if (replayBtn) replayBtn.addEventListener("click", replaySongHandler);
if (shuffleBtn) shuffleBtn.addEventListener("click", shuffleSongHandler);
likeBtn.addEventListener("click", likeSongHandler);
if (moreBtn)
  moreBtn.addEventListener("click", () => {
    let path = window.location.pathname.split("/").pop();
    window.location =
      path === "index.html" || path === ""
        ? `./pages/songsList.html?id=${
            data.songs[songIndex].id
          }&playlist=${localStorage.getItem("favoriteId")}`
        : `./songsList.html?id=${
            data.songs[songIndex].id
          }&playlist=${localStorage.getItem("favoriteId")}`;
  });

// change Song
if (prevBtn) prevBtn.addEventListener("click", prevSong);
if (nextBtn) nextBtn.addEventListener("click", nextSong);

const linkReturn = document.getElementById("linkReturn");
if (linkReturn) linkReturn.href = `./song.html?id=${data.songs[songIndex].id}`;

//add to playlists

function addToPlaylist() {
  PostData("postAllPlaylists", {
    token: getToken(),
  }).then((res) => {
    AddPlaylistModal(res,data.songs[songIndex]);
  });
}

addBtn.addEventListener("click", addToPlaylist);
