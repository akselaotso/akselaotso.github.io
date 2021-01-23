window.onscroll = function() {onScroll()};

var sticky;

function onScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    sticky = document.getElementById("sticker");

    if (winScroll > 120) {
        sticky.style.position = "fixed";
    } else {
        sticky.style.position = "relative";
    }
} 