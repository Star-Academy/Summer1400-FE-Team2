let current_music_container = document.getElementById('current-music__container');
console.log(current_music_container);
const current_music = document.querySelector('.current-music');
const current_music_details = document.querySelector('.current-music_details');
const like_button = document.querySelector('#like-button');
const play_button = document.querySelector('#play-button');
const music_current_desktop = document.querySelector('.music-current-desktop');

let song_name = 'نام اهنگ';
let singer_name = 'نام خواننده';
let image_src = '../assets/images/song.jpg';



let current_music_mobile = `
<div class="current-music">
<div class="current__time">
    <div class="progress-container" id="progress-container">
        <div class="progress" id="progress"></div>
    </div>
</div>
<div class="current-music_content music__container">
    <div class="current-music_details">
        <audio src="" id="audio"></audio>
        <div class="current-music_img">
            <a href="./song.html"><img src="" alt="" class="music__img" id="cover" /></a>
        </div>
        <div class="title__artist">
            <h5 class="music__name" id="title">اسم آهنگ</h5>
            <h5 class="singer">نام خواننده</h5>
        </div>
    </div>
    <div class="current-music_controls">
        <button class="btn--like">
  <img
    src="../assets/Icons/favorite_border_white_24dp.svg"
    alt=""
    class="svgColor"
  />
</button>
        <button id="playpause">
  <img
    src="../assets/Icons/play-button.svg"
    alt=""
    class="controls-button svgColor"
  />
</button>
    </div>
</div>
</div>
`;

let current_music_desktop = `
<div class="music-current-desktop">
<div class="current-music_details">
    <audio src="" id="audio"></audio>
    <div class="desktop_img">
        <a href="./song.html"><img src="../assets/images/song.jpg" alt="" class="music__img" id="cover" /></a>
    </div>
    <div class="title__artist">
        <h5 class="music__name" id="title">اسم آهنگ</h5>
        <h5 class="singer">نام خواننده</h5>
    </div>
</div>
<div class="song_container music__container">
    <div class="button-controls">
        <div class="btns">
            <button id="repeat" class="svgColor">
                <img src="../assets/Icons/loop-button.svg" alt="" class="replay">
            </button>
            <div class="controls">
                <button id="next" class="svgColor">
                    <img src="../assets/Icons/next-button.svg" alt="" class="controls-button">
                </button>
                <button id="playpause" class="svgColor">
                    <img src="../assets/Icons/play-button.svg" alt="" class="controls-button">
                </button>
                <button id="prev" class="svgColor">
                    <img src="../assets/Icons/back-button.svg" alt="" class="controls-button">
                </button>
            </div>
            <button id="shuffle" class="svgColor">
                <img src="../assets/Icons/shuffle-disabled-button.svg" alt="" class="replay">
            </button>
        </div>

    </div>
    <div class="current__time">
        <span id="durtime"></span>
        <div class="progress-container" id="progress-container">
            <div class="progress" id="progress"></div>
        </div>
        <span id="curtime"></span>
    </div>
</div>
</div>
`


// if (document.body.clientWidth > 1200) {
//     current_music_container.innerHTML = current_music_desktop;
// } else {
//     current_music_container.innerHTML = current_music_mobile;
// }

// window.addEventListener('resize', () => {
//     if (document.body.clientWidth > 1200) {
//         current_music_container.innerHTML = current_music_desktop;
//     } else {
//         current_music_container.innerHTML = current_music_mobile;
//     }
// })

// if (document.body.clientWidth > 1200) {
//     // current_music_container.innerHTML = current_music_desktop;
//     current_music_container.removeChild(current_music);
// } else {
//     current_music_container.removeChild(music_current_desktop);
// }

// window.addEventListener('resize', () => {
//     if (document.body.clientWidth > 1200) {
//         current_music_container.removeChild(current_music);
//     } else {
//         current_music_container.removeChild(music_current_desktop);
//     }
// })

// current_music_container.innerHTML =


// current_music_details.addEventListener('click', () => {
//     window.location = './song.html';
// });

// like_button.addEventListener('click', () => {
//     const likeTag = like_button.querySelector('i');
//     likeSongHandler(likeTag);
// })

// play_button.addEventListener('click', () => {
//     const playTag = play_button.querySelector('i');
//     playSongHandler(playTag);
// })


// function playSongHandler(playTag) {
//     if (localStorage.getItem("token") === null) {
//         permission();
//     } else {
//         if (playMode) {
//             playTag.classList.replace('fa-pause', 'fa-play');
//             playMode = 0;
//         } else {
//             playTag.classList.replace('fa-play', 'fa-pause');
//             playMode = 1;
//         }
//     }
// }