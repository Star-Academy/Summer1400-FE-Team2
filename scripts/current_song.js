let current_music_container = document.getElementById('current-music__container');
let song_name = 'نام اهنگ';
let singer_name = 'نام خواننده';
let image_src = '../assets/images/song.jpg';

current_music_container.innerHTML = `
<div class="current-music">
<div class="current-music_content">
    <div class="current-music_details">
        <div class="current-music_img">
        <img src=${image_src} alt="">
        </div>
        <div class="current-music_info">
            <h6>${song_name}</h6>
            <h6>${singer_name}</h6>
        </div>
    </div>
    <div class="current-music_controls">
        <button id="like-button"><i class="far fa-heart"></i></button>
        <button id="play-button"> <i class="fas fa-play"></i></button>
    </div>
</div>
</div>
`

const current_music = document.querySelector('.current-music');
const current_music_details = document.querySelector('.current-music_details');
const like_button = document.querySelector('#like-button');
const play_button = document.querySelector('#play-button');


current_music_details.addEventListener('click', () => {
    window.location = './song.html';
});

like_button.addEventListener('click', () => {
    const likeTag = like_button.querySelector('i');
    likeSongHandler(likeTag);
})

play_button.addEventListener('click', () => {
    const playTag = play_button.querySelector('i');
    playSongHandler(playTag);
})