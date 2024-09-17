let currentPosition = 0;
let slideWidth;  // Dynamically calculated based on each image's width
let totalSlides; // Total slides after cloning
let totalOriginalSlides; // Original number of slides before cloning
const resetOffset = 300;  // Adjust this value to control how early the reset happens

function moveCarouselContinuously() {
    const carousel = document.querySelector('.carousel-container');

    // Move the carousel continuously
    currentPosition -= 1; // Move 1px at a time

    // Reset earlier before the last set fully scrolls out of view
    if (currentPosition <= -(slideWidth * totalOriginalSlides) + resetOffset) {
        currentPosition = 0; // Reset to the start earlier
    }

    carousel.style.transform = `translateX(${currentPosition}px)`;
}

// Clone the images to create a continuous effect
function cloneImages() {
    const slides = document.querySelectorAll('.carousel-container img');
    const carousel = document.querySelector('.carousel-container');
    totalOriginalSlides = slides.length;

    // Clone each slide three times to ensure a minimum of 3 clones
    for (let i = 0; i < 3; i++) {
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            carousel.appendChild(clone);
        });
    }

    // After cloning, update the total number of slides
    totalSlides = document.querySelectorAll('.carousel-container img').length;
}

// Adjust the width of each slide
function adjustSlideWidth() {
    const slides = document.querySelectorAll('.carousel-container img');
    slideWidth = slides[0].offsetWidth; // Use the width of the first slide as reference
}

// Start the continuous scroll
function startContinuousCarousel() {
    adjustSlideWidth();  // Set slide width on load
    cloneImages();  // Clone the images after widths are adjusted
    setInterval(moveCarouselContinuously, 10); // Move every 10ms for a smooth transition
}

// Adjust the slide width when the window is resized
window.addEventListener('resize', adjustSlideWidth);

// Initialize the carousel when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    startContinuousCarousel();
});


// Function to select an image from the carousel
function selectImage(img) {
    const backgroundImage = img.getAttribute('data-low-res');
    const foregroundImage = img.getAttribute('data-high-res');
    const backgroundImageElement = document.getElementById('background-image');
    const foregroundImageElement = document.getElementById('foreground-image');

    // Update images
    backgroundImageElement.src = backgroundImage;
    foregroundImageElement.src = foregroundImage;

    // Update the text in the background and foreground text boxes
    const backgroundText = img.getAttribute('data-background-text');
    const foregroundText = img.getAttribute('data-foreground-text');
    document.querySelector('.background-text-box').textContent = backgroundText;
    document.querySelector('.foreground-text-box').textContent = foregroundText;

    // Adjust the container size to fit natural image dimensions
    backgroundImageElement.onload = function () {
        document.getElementById('image-comparison').style.width = backgroundImageElement.naturalWidth + 'px';
        document.getElementById('image-comparison').style.height = backgroundImageElement.naturalHeight + 'px';
    };
}

const slider = document.getElementById('slider');
const foregroundImage = document.getElementById('foreground-image');
const container = document.getElementById('image-comparison');

container.addEventListener('mousemove', (event) => {
    const containerRect = container.getBoundingClientRect();
    let offset = event.clientX - containerRect.left;
    if (offset < 0) offset = 0;
    if (offset > containerRect.width) offset = containerRect.width;
    slider.style.left = offset + 'px';
    
    // Adjust the clip-path to show the foreground image on the right of the slider
    foregroundImage.style.clipPath = `inset(0 0 0 ${offset}px)`;
});


// Object to store different image resolutions for each image
const imagesResolutions = {
    woman: {
        low: './images/emma_1024.jpg',
        medium: './images/emma_2048.jpg',
        high: './images/emma_4096.jpg'
    },
    turian: {
        low: './images/turian_1024.jpg',
        medium: './images/turian_2048.jpg',
        high: './images/turian_4096.jpg'
    },
    // Add more images and their respective resolutions here
};

// Function to update resolution buttons based on selected image
function updateResolutionButtons() {
    const selectedImage = document.getElementById('image-options').value;
    const resolutionSelector = document.getElementById('resolution-selector');

    // Update button onclick handlers to match the selected image's resolutions
    resolutionSelector.innerHTML = `
        <button class="external-link button is-normal is-rounded is-dark" 
                onclick="changeImage('${imagesResolutions[selectedImage].low}')">1024×1024</button>
        <button class="external-link button is-normal is-rounded is-dark" 
                onclick="changeImage('${imagesResolutions[selectedImage].medium}')">2048×2048</button>
        <button class="external-link button is-normal is-rounded is-dark" 
                onclick="changeImage('${imagesResolutions[selectedImage].high}')">4096×4096</button>
    `;
}

// Function to change the displayed image
function changeImage(imageSrc) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = imageSrc;
}


let selectedImage = '';
let currentResolution = '1024';  // Default resolution is set to 1024
let activeButton = null; // Store the currently active button
let activeButton2 = null; // Store the currently active button

// Function to select an image and show it at the same resolution as the previously selected resolution
function selectImage2(image, buttonElement) {
    selectedImage = image;

    // Show resolution buttons once an image is selected
    document.getElementById("resolution-selector").style.display = 'block';

    // Display the selected image at the current resolution
    if (image === 'image1') {
        document.getElementById("main-image").src = './images/emma_' + currentResolution + '.jpg';
    } else if (image === 'image2') {
        document.getElementById("main-image").src = './images/turian_' + currentResolution + '.jpg';
    } 

    // Handle button state: Remove 'is-selected' from the previously active button and add it to the current button
    if (activeButton) {
        activeButton.classList.remove('is-dark'); 
        activeButton.classList.add('is-light');
    }
    
    // Add 'is-selected' class to the currently pressed button
    buttonElement.classList.add('is-dark'); 
    buttonElement.classList.remove('is-light');


    // Update the reference to the active button
    activeButton = buttonElement;
}

// Function to change the resolution of the selected image and update the button styles
function changeImageResolution(resolution, buttonElement) {
    currentResolution = resolution; // Update the current resolution

    // Update the image based on the selected resolution
    if (selectedImage === 'image1') {
        document.getElementById("main-image").src = './images/emma_' + resolution + '.jpg';
    } else if (selectedImage === 'image2') {
        document.getElementById("main-image").src = './images/turian_' + resolution + '.jpg';
    } 

    // Handle button state: Remove 'is-selected' from the previously active button and add it to the current button
    if (activeButton2) {
        activeButton2.classList.remove('is-dark');
        activeButton2.classList.add('is-light'); 
    }
    
    // Add 'is-selected' class to the currently pressed button
    buttonElement.classList.remove('is-light');
    buttonElement.classList.add('is-dark');


    // Update the reference to the active button
    activeButton2 = buttonElement;
}