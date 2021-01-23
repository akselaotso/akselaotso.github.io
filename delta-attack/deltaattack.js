function openNav() {
    document.getElementById("opening").style.height = "100vh";
}

function closeNav() {
    document.getElementById("opening").style.height = "0px";
}

window.onscroll = function() {onScroll()};

function onScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
    document.getElementById("some").style.opacity = 1 / scrolled;

    var first = document.getElementById("one");
    var second = document.getElementById("two");
    var third = document.getElementById("three");

    if (scrolled < 40) {
        first.style.display = "block";
        second.style.display = "none";
        third.style.display = "none";
    } else if (scrolled > 90) {
        first.style.display = "none";
        second.style.display = "none";
        third.style.display = "block";
    } else {
        first.style.display = "none";
        second.style.display = "block";
        third.style.display = "none";
    }
} 
