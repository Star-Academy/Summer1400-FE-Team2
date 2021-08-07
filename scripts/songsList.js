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

for (let i = 1; i <= 10; i++) {
    let row = document.createElement('tr');
    let like_sign = '';
    let song_number_container;
    let song_number;
    let playButton;
    let details_sign;
    for (let j = 1; j <= 6; j++) {
        let column = document.createElement('td');
        if (j == 1) {
            column.classList.add('hide-column');
            song_number_container = document.createElement('div');
            song_number = document.createElement('span');
            song_number.innerText = i;
            song_number_container.appendChild(song_number);
            playButton = document.createElement('i');
            playButton.classList.add('fas', 'fa-play');
            playButton.style.display = 'none';
            song_number_container.appendChild(playButton);
            column.appendChild(song_number_container);
        } else if (j == 2) {
            column.classList.add('song-details__container');
            const songDetails = document.createElement('div');
            songDetails.classList.add('song-details');
            const image_container = document.createElement('div');
            const image = document.createElement('img');
            image.src = '../assets/images/song.jpg';
            image_container.appendChild(image);
            const song_info = document.createElement('div');
            const song_name = document.createElement('h6');
            song_name.innerText = 'نام اهنگ';
            const singer = document.createElement('h6');
            singer.innerText = 'نام خواننده';
            song_info.appendChild(song_name);
            song_info.appendChild(singer);
            songDetails.appendChild(image_container);
            songDetails.appendChild(song_info);
            column.appendChild(songDetails);
        } else if (j == 3) {
            column.classList.add('hide-column');
            column.innerText = 'نام البوم';
        } else if (j == 4) {
            // column.classList.add('hide-column');
            like_sign = document.createElement('i');
            like_sign.classList.add('far', 'fa-heart', 'likeBtn');
            like_sign.style.display = 'none';
            column.appendChild(like_sign);
        } else if (j == 5) {
            column.classList.add('hide-column');
            column.innerText = '1:50';
        } else if (j == 6) {
            details_sign = document.createElement('i');
            details_sign.classList.add('fas', 'fa-ellipsis-v', 'details_sign_button');
            column.appendChild(details_sign);
            column.classList.add('songsList-details');
        }
        row.appendChild(column);
    }
    let likedMode = 0;
    let playMode = 0;
    // let playButton;
    row.addEventListener('mouseover', () => {
        like_sign.style.display = 'block';
        song_number.style.display = 'none';
        playButton.style.display = 'block';
    })
    row.addEventListener('mouseout', () => {
        if (!likedMode) {
            like_sign.style.display = 'none';
        }
        song_number.style.display = 'block';
        playButton.style.display = 'none';
    })
    like_sign.addEventListener('click', () => {
        if (localStorage.getItem("token") === null) {
            permission();
        } else {
            if (likedMode) {
                like_sign.classList.replace('fas', 'far');
                likedMode = 0;
                showToast('از اهنگ های مورد علاقه حذف شد.');
            } else {
                like_sign.classList.replace('far', 'fas');
                likedMode = 1;
                showToast('به اهنگ های مورد علاقه اضافه شد.');

            }
        }
    })
    playButton.addEventListener('click', () => {
        if (localStorage.getItem("token") === null) {
            permission();
        } else {
            if (playMode) {

                playMode = 0;

            } else {
                window.location = './song.html';
                playMode = 1;
            }
        }
    })
    details_sign.addEventListener('click', () => {
        song_modal_container.style.display = 'block';
    })
    playlist_body.appendChild(row);
}

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

let likedMode = 0;
let playMode = 0;
like_songsList.addEventListener('click', () => {
    const like_songsList_tag = like_songsList.querySelector('i');
    likeSongHandler(like_songsList_tag);
})


function likeSongHandler(likeTag) {
    if (localStorage.getItem("token") === null) {
        permission();
    } else {
        if (likedMode) {
            likeTag.classList.replace('fas', 'far');
            likeTag.style.color = '#fff';
            likedMode = 0;
            showToast('از اهنگ های مورد علاقه حذف شد.');
        } else {
            likeTag.classList.replace('far', 'fas');
            likeTag.style.color = '#3BB954';
            likedMode = 1;
            showToast('به اهنگ های مورد علاقه اضافه شد.');

        }
    }
}