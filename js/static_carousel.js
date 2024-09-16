let currentIndex = 0;

const static_carousel = document.getElementById('static-carousel-id');
const caption = document.getElementById('static-carousel-caption');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const sliderData = document.querySelectorAll('#sliderData div');

prev.addEventListener('click', showPrevImage);
next.addEventListener('click', showNextImage);

function showPrevImage() {
    currentIndex = (currentIndex === 0) ? sliderData.length - 1 : currentIndex - 1;
    updateStaticCarousel(currentIndex);
}

function showNextImage() {
    currentIndex = (currentIndex === sliderData.length - 1) ? 0 : currentIndex + 1;
    updateStaticCarousel(currentIndex);
}

function updateStaticCarousel(currentIndex) {
    const newImage = sliderData[currentIndex].getAttribute('data-src');
    const newCaption = sliderData[currentIndex].getAttribute('data-caption');
    
    static_carousel.src = newImage;
    caption.innerHTML = newCaption;
    
    // Re-process MathJax for LaTeX rendering
    MathJax.typesetPromise().catch((err) => console.error(err.message));
}

// Initial rendering
updateStaticCarousel();