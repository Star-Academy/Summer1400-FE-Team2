/** @format */

function showToast(content) {
  var x = document.getElementById("snackbar");
  x.innerHTML = content;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 4000);
}
