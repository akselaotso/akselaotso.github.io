const animatedElements = document.querySelectorAll(".anim");

observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `
                ${entry.target.dataset.type || "fade-down"} 
                ${entry.target.dataset.duration || "1s"} 
                ${entry.target.dataset.delay || "0s"} forwards 
                ${entry.target.dataset.curve || "ease-out"}`;
        } else {
            entry.target.style.animation = 'none';
        }
    });
});

animatedElements.forEach((element) => {
    observer.observe(element)
});