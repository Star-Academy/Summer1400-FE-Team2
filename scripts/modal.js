/** @format */

const modal = document.getElementById("modal");
const span = document.getElementById("modal-close");
const text = document.getElementById("modal-text");
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function showModal1() {
  modal.style.display = "block";
  text.innerHTML = "شما روی من کلیک کردی D:";
}
