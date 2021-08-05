/** @format */

const playlists_section = document.getElementById("playlists");
let explain = "توضیحات..";
let title = "ژانر اهنگ ها در این گروه";
let img = "./assets/images/sample.jpg";
let id = 1;
const cards = [...Array(3)].map(
        (item, i) =>
        `
  <section class="playlists__container">
    <div class="playlists__title">
        <h3><a href="./pages/playlist.html?id=${id}">لیست اهنگ ${i + 1}</a></h3>
        <a href="./pages/playlist.html?id=${id}">مشاهده همه</a>
    </div>
    <div class="cards__container">
        ${[...Array(7)]
      .map(
        (item) =>
          ` 
            <div class="card-playlist" >
                <a class="music-link">
                    <div class="music-link__image">
                    <img src="${img}" alt="cover" />
                    <button class="play-playlists-button"><i class="fas fa-play-circle"></i></button>
                    </div>
                    <h4 class="card-playlist__title">${title}</h4>
                    <p>${explain}</p>
                </a>
            </div>
        `
      )
      .join("")}
    </div>
  </section>
  `
);

playlists_section.innerHTML = cards.join("\n");

document.querySelectorAll(".music-link").forEach((item,index) => {
  console.log(item,index);
  item.addEventListener("mouseover",()=>{
    item.querySelector(`${item} .play-playlists-button`).style.display ="block";
  })
  item.addEventListener("mouseout",()=>{
    item.querySelector(`${item} .play-playlists-button`).style.display ="none";
  })
  // **********fix this***********
  // const playBtn = item.querySelector(`.play-playlists-button`);
  // playBtn.addEventListener('click',()=>{
  //   if (localStorage.getItem("token") === null) {
  //     permission();
  //   } else {
  //     window.location.href ='./pages/songsList.html';
  //     // item.href = `./pages/song.html?id=${2}`;
  //   }
  // })

  item.addEventListener('click',()=>{
    item.href = './pages/songsList.html';
  })

});