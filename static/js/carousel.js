function displayImage(src) {
    document.getElementById('mainImage').src = src;
    var new_src = src.replace('hd', 'giga');
    document.getElementById('reveal').src = new_src;
}

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.mini-slider img');
    const totalSlides = slides.length;
    currentSlide += direction;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    document.querySelector('.mini-slider').style.transform = `translateX(-${currentSlide * 150}px)`;
}