const images = document.querySelectorAll(".anim");

observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `${entry.target.dataset.type || "fade-down"} ${entry.target.dataset.duration || "1s"} ${entry.target.dataset.delay || "0s"} forwards ${entry.target.dataset.curve || "ease-out"}`;//takes the values lmao, the second behind the || is the default
        } else {
            entry.target.style.animation = 'none';
        }
    })
})

images.forEach(image => {
    observer.observe(image)
})