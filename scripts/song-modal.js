const song_modal_container = document.querySelector('.song-modal__container');

let song_name_modal = 'نام اهنگ';
let singer_name_modal = 'نام خواننده';
let image_src_modal = '../assets/images/song.jpg';


song_modal_container.innerHTML = `
<span id="songModal-close">&times;</span>
<div class="song-modal">
    <div class="song-modal__content">
        <div class="song-modal_image">
            <img src=${image_src_modal} alt="" />
            <h5>${song_name_modal}</h5>
            <h6>${singer_name_modal}</h6>
        </div>
        <div class="song-modal_links">
            <div>
                <button id="likeSong_modal">
                <i class="far fa-heart"></i>
                </button>
                <span>اضافه به علاقه مندی</span>
            </div>
            <div>
                <button id="addToPlaylist">
                <i class="fas fa-plus-circle"></i>
                </button>
                <span>اضافه به لیست پخش</span>
            </div>
        </div>
    </div>
</div>
`

const song_modal = document.querySelector('.song-modal');
const song_modal_close = document.getElementById('songModal-close');
const song_modal_like = document.querySelector('#likeSong_modal');
const song_modal_add = document.querySelector('#addToPlaylist');

window.addEventListener('click', (event) => {
    if (event.target == song_modal_container) {
        song_modal_container.style.display = 'none';
    }
})

song_modal_close.addEventListener('click', () => {
    song_modal_container.style.display = 'none';
})

song_modal_like.addEventListener('click', () => {
    showToast('به اهنگ های مورد علاقه اضافه شد.');
    song_modal_container.style.display = 'none';
})

song_modal_add.addEventListener('click', () => {
    showToast('به لیست پخش اضافه شد.');
    song_modal_container.style.display = 'none';
})