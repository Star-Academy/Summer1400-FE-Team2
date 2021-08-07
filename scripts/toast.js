/** @format */

function showToast(content) {
    const snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = content;
    snackbar.className = "show";
    setTimeout(function() {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}