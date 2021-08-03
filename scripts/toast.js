/** @format */

function showToast(content) {
  var x = document.getElementById("snackbar");
  x.innerHTML = content;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 4000);
}

//function

function showToastPlayList() {
  showToast("شما وارد نشده اید!");
}
let show_btn = document.getElementById("showToast1");

show_btn.addEventListener("click", showToastPlayList);

function showToastPlayList2() {
  showToast("میگم که شما وارد نشده اید!");
}

let show_btn2 = document.getElementById("showToast2");

show_btn2.addEventListener("click", showToastPlayList2);
