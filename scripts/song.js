const musicContainer = document.querySelector('.music__container');
const playBtn = document.getElementById('playpause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const replayBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const likeBtn = document.querySelector('.btn--like');
const moreBtn = document.getElementById('more');


let currTime = document.querySelector('#curtime');
let durTime = document.querySelector('#durtime');


const songs = ['hope', 'La-Vie-En-Rose', 'Rainy City', 'When She Flows'];
const progress = document.getElementById('progress');

const progressContainer = document.getElementById('progress-container');


// keep track of song
let songIndex = 2;
loadSong(songs[songIndex]);

function loadSong(song) {
    console.log(song);
    title.innerHTML = song;
    audio.src = `../assets/songs/${song}.mp3`;
    cover.src = `../assets/images/songs-cover/${song}.jpg`;
}

// play song

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('img').src = '../assets/Icons/pause-button.svg';
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('img').src = '../assets/Icons/play-button.svg';
    audio.pause();
}

function prevSong() {
    if (isShuffle) {
        let random = Math.floor(Math.random() * songs.length);
        while (songIndex === random) {
            random = Math.floor(Math.random() * songs.length);
        }
        songIndex = random;
        console.log('prevsong: ', songIndex);
    } else {
        songIndex--;
    }
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    if (isShuffle) {
        let random = Math.floor(Math.random() * songs.length);
        while (songIndex === random) {
            random = Math.floor(Math.random() * songs.length);
        }
        songIndex = random;
    } else {
        songIndex++;
    }
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

playBtn.addEventListener('click', () => {
    console.log('hello', musicContainer);
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
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
    const { duration, currentTime } = e.srcElement;
    let sec;
    let sec_d;

    //define minutes curretTime
    let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    // define seconds currentTime
    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            for (let i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);
    currTime.innerHTML = min + ':' + sec;
    // define minutes duration
    let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;

    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {
            for (let i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' : Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }
    get_sec_d(duration);
    durTime.innerHTML = min_d + ':' + sec_d;
}


let isLoop = 0;

function replaySongHandler() {
    if (!isLoop) {
        audio.loop = true;
        replayBtn.querySelector('img').src = '../assets/Icons/right-arrow-button.svg';
        isLoop = 1;
    } else {
        audio.loop = false;
        replayBtn.querySelector('img').src = '../assets/Icons/loop-button.svg';
        isLoop = 0;
    }

}

let isShuffle = 0;

function shuffleSongHandler() {
    if (!isShuffle) {
        isShuffle = 1;
        shuffleBtn.querySelector('img').src = '../assets/Icons/shuffle-button.svg';
    } else {
        isShuffle = 0;
        shuffleBtn.querySelector('img').src = '../assets/Icons/shuffle-disabled-button.svg';
    }
}

let isLiked = 0;

function likeSongHandler() {
    if (!isLiked) {
        isLiked = 1;
        likeBtn.querySelector('img').src = '../assets/Icons/like.svg';
    } else {
        isLiked = 0;
        likeBtn.querySelector('img').src = '../assets/Icons/favorite_border_white_24dp.svg';
    }
}

// change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time/song update
audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
progressContainer.addEventListener('click', setProgress);

// song ends
audio.addEventListener('ended', nextSong);

//Time of song
audio.addEventListener('timeupdate', DurTime);


replayBtn.addEventListener('click', replaySongHandler);
shuffleBtn.addEventListener('click', shuffleSongHandler);
likeBtn.addEventListener('click', likeSongHandler);
moreBtn.addEventListener('click', () => {
    let path = window.location.pathname.split("/").pop();
    // sessionStorage.setItem('currentSong', `${songs[songIndex]}`);
    window.location = path == 'index.html' ? './pages/songsList.html' : './songsList.html';
})