const images = ['./images/steps/step1.png', './images/steps/step2.png', './images/steps/step3.png', 
    './images/steps/step4.png', './images/steps/step5a.png', './images/steps/step5b.png', './images/steps/step5c.png']; 
let currentIndex = 0;

const static_carousel = document.getElementById('static-carousel-id');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

prev.addEventListener('click', showPrevImage);
next.addEventListener('click', showNextImage);

function showPrevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    static_carousel.src = images[currentIndex];
}

function showNextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    static_carousel.src = images[currentIndex];
}