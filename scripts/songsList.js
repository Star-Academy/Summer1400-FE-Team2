const playlistTable = document.querySelector('.playlist-table');
const songsListTable = document.createElement('table');
const playlist_body = document.getElementById('playlist-table__body');

for (let i = 1; i <= 10; i++) {
    let row = document.createElement('tr');
    for (let j = 1; j <= 6; j++) {
        let column = document.createElement('td');
        if (j == 1) {
            column.classList.add('hide-column');
            column.innerText = i;
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
            column.classList.add('hide-column');
            const like_sign = document.createElement('i');
            like_sign.classList.add('far');
            like_sign.classList.add('fa-heart');
            column.appendChild(like_sign);
        } else if (j == 5) {
            column.classList.add('hide-column');
            column.innerText = '1:50';
        } else if (j == 6) {
            const details_sign = document.createElement('i');
            details_sign.classList.add('fas');
            details_sign.classList.add('fa-ellipsis-v');
            column.appendChild(details_sign);
            column.classList.add('songsList-details');
        }
        row.appendChild(column);
    }
    playlist_body.appendChild(row);
}