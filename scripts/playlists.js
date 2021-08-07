const playlists = document.getElementById("playlists");
const namePlaylists = [
  "آهنگ های جدید",
  "آلبوم جدید",
  "آهنگ های پیشنهادی",
  "محبوب ها",
];

const fillData = (data, cardsNumber) => {
  return namePlaylists.map(
    (item, i) => `
    <section class="playlists__container">
      <div class="playlists__title">
          <h3><a href="./pages/playlist.html?id=${i + 1}"> ${item} </a></h3>
          <a href="./pages/playlist.html?id=${i + 1}">مشاهده همه</a>
      </div>
      <div class="cards__container">
          ${data
            .slice(i * 15, i * 15 + cardsNumber)
            .map(
              (song) =>
                ` 
              <div class="card-playlist" >
                  <a class="music-link" href="./pages/song.html?id=${song.id}">
                      <div class="music-link__image">
                      <img src="${song.cover}" alt="cover" />
                      <button class="play-playlists-button"><i class="fas fa-play-circle"></i></button>
                      </div>
                      <h4 class="card-playlist__title">${song.name}</h4>
                      <p>${song.artist}</p>
                  </a>
              </div>
          `
            )
            .join("")}
      </div>
    </section>
    `
  );
};

function createCardsList(cardsNumber) {
  GetData("getAllSongs")
    .then((res) => {
      showToast("درحال بارگزاری آهنگ ها");
      playlists.innerHTML = fillData(res.songs, cardsNumber).join("\n");
    })
    .catch(() => {
      showToast("خطا در ارتباط با سرور");
    });
}

createCardsList(getCardsNumber());

window.addEventListener("resize", () => {
  createCardsList(getCardsNumber());
});

function getCardsNumber() {
  let cardNumbers = 1;
  if (document.body.clientWidth > 601 && document.body.clientWidth <= 768) {
    cardNumbers = 2;
  } else if (
    document.body.clientWidth > 768 &&
    document.body.clientWidth <= 900
  ) {
    cardNumbers = 3;
  } else if (
    document.body.clientWidth > 900 &&
    document.body.clientWidth <= 1200
  ) {
    cardNumbers = 4;
  } else if (
    document.body.clientWidth > 1200 &&
    document.body.clientWidth <= 1450
  ) {
    cardNumbers = 6;
  } else if (document.body.clientWidth > 1450) {
    cardNumbers = 7;
  }
  return cardNumbers;
}
