const playlistTable = document.querySelector('.playlist-table');
const playlist_body = document.getElementById('playlist-table__body');
const playlist_details = document.querySelector('.playlist-details');
const playlist_controls_container = document.querySelector('.playlist-controls__container');

let playlist_title = 'عنوان لیست اهنگ';
let playlist_description = 'توضیحات..';
let playlist_likes = 'likes 5000';
let songs_number = '100 اهنگ';
let playlist_time = '4hr 53min';
playlist_details.innerHTML = `
<div class="playlist-details__image">
<img src="../assets/images/sample.jpg" alt="playlist-image" />
</div>
<div class="playlist-details__content">
<p>لیست اهنگ</p>
<h1>${playlist_title}</h1>
<h6>${playlist_description}</h6>
<div class="flex songsListDetails">
    <span><b>Spotify</b></span>
    <span>${playlist_likes}</span>
    <span>${songs_number}</span>
    <span>${playlist_time}</span>
</div>
</div>
`

const playMusic_button = document.getElementById('playMusicBtn');
const like_songsList = document.getElementById("like-songs");

playMusic_button.addEventListener('click', () => {
    if (localStorage.getItem("token") === null) {
        permission();
    } else {
        // window.href = `. / pages / song.html ? id = $ { 2 }`;
        window.location.href = './song.html';
    }
})


let playMode = 0;
let song_image_src = "../assets/images/song.jpg";
let song_name_list = 'نام اهنگ';
let singer_name_list = 'نام خواننده';
let album_name_list = 'نام البوم';
let song_time_list = '1:50';
const songsList = [...Array(10)].map((row, i) =>
    `<tr>
    <td class="hide-column">
       <span> ${i + 1} </span>
        <i class='fas fa-play play_sign_button hide'></i>
    </td>
    <td class="song-details__container">
        <div class="song-details">
            <div>
                <img src=${song_image_src} />
            </div>
            <div>
                <h6>${song_name_list}</h6>
                <h6>${singer_name_list}</h6>
            </div>
        </div>
    </td>
    <td class="hide-column">${album_name_list}</td>
    <td><i class="like_sign_button far fa-heart"></i></td>
    <td class="hide-column">${song_time_list}</td>
    <td class="songsList-details"><i class="fas fa-ellipsis-v details_sign_button"></i></td>
    </tr>`
).join('\n');

playlist_body.innerHTML = songsList;

let details_buttons = document.querySelectorAll('.details_sign_button');
let likes_buttons = document.querySelectorAll('.like_sign_button');

details_buttons.forEach((item) => {
    item.addEventListener('click', () => { song_modal_container.style.display = 'block' });
})


let row_arr = document.querySelectorAll(`tbody tr`);

row_arr.forEach((item) => {
    let playSongBtn = item.querySelector('td i');
    let number = item.querySelector('td span');
    let likeBtn = item.querySelector('.like_sign_button');

    item.addEventListener('mouseover',
        () => {
            playSongBtn.classList.remove('hide');
            number.style.display = 'none';
            likeBtn.style.display = 'block';
        });

    item.addEventListener('mouseout',
        () => {
            playSongBtn.classList.add('hide');
            number.style.display = 'block';
        });

    likeBtn.addEventListener('click', () => {
        if (localStorage.getItem("token") === null) {
            permission();
        } else {
            if (likeBtn.classList.contains('likedMode')) {
                likeBtn.classList.replace('fas', 'far');
                likeBtn.classList.remove('likedMode');
                showToast('از اهنگ های مورد علاقه حذف شد.');
            } else {
                likeBtn.classList.replace('far', 'fas');
                likeBtn.classList.add('likedMode');
                showToast('به اهنگ های مورد علاقه اضافه شد.');
            }
        }
    });
})