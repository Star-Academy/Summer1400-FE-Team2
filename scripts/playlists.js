const playlists_section = document.getElementById("playlists");
let explain = "توضیحات..";
let title = "ژانر اهنگ ها در این گروه";
let img = "./assets/images/sample.jpg";
let id = 1;


let cards;

function createCardsList(cardsNumber) {
    cards = [...Array(3)].map(
            (item, i) =>
            `
    <section class="playlists__container">
      <div class="playlists__title">
          <h3><a href="./pages/playlist.html?id=${id}">لیست اهنگ ${i + 1}</a></h3>
          <a href="./pages/playlist.html?id=${id}">مشاهده همه</a>
      </div>
      <div class="cards__container">
          ${[...Array(getCardsNumber())]
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

}

createCardsList(getCardsNumber());
playlists_section.innerHTML = cards.join("\n");


window.addEventListener('resize',()=>{
  createCardsList(getCardsNumber());
  playlists_section.innerHTML = cards.join("\n");
})


document.querySelectorAll(".music-link").forEach((item,index) => {
  item.addEventListener("mouseover",()=>{
    item.querySelector(`${item} .play-playlists-button`).style.display ="block";
  })
  item.addEventListener("mouseout",()=>{
    item.querySelector(`${item} .play-playlists-button`).style.display ="none";
  })

  item.addEventListener('click',()=>{
    item.href = './pages/songsList.html';
  })

});

function getCardsNumber(){
  let cardNumbers =1;
  if(document.body.clientWidth >601 && document.body.clientWidth <=768){
    cardNumbers =2;
  }else if(document.body.clientWidth >768  && document.body.clientWidth <=900){
    cardNumbers =3;
  }else if(document.body.clientWidth >900  && document.body.clientWidth <=1200){
    cardNumbers =4;
  }else if(document.body.clientWidth >1200  && document.body.clientWidth <=1450){
    cardNumbers =6;
  }else if(document.body.clientWidth >1450){
    cardNumbers =7;
  }
  return cardNumbers;
}