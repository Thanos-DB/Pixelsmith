let carouselIndex = 0;
const images = document.querySelectorAll('.images-selection img');

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

function moveCarousel(direction) {
    const container = document.getElementById('image-carousel');
    const totalImages = images.length;
    
    // Update the index (loop around using modulo)
    carouselIndex = (carouselIndex + direction + totalImages) % totalImages;

    // Calculate scroll position based on the widths of previous images
    let scrollPosition = 0;
    for (let i = 0; i < carouselIndex; i++) {
        scrollPosition += images[i].offsetWidth; // Get the actual width of each image
    }

    // Scroll to the correct position dynamically
    container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    // Check if we need to loop back to the first image after the last image
    if (carouselIndex === 0 && direction === 1) {
        setTimeout(() => {
            container.scrollTo({
                left: 0,
                behavior: 'auto'  // Instantly jump to the start after the transition
            });
        }, 500); // Small delay to allow the smooth scroll to finish
    }

    // Check if we need to loop back to the last image when moving backward from the first
    if (carouselIndex === totalImages - 1 && direction === -1) {
        let lastScrollPosition = 0;
        for (let i = 0; i < totalImages; i++) {
            lastScrollPosition += images[i].offsetWidth;
        }
        setTimeout(() => {
            container.scrollTo({
                left: lastScrollPosition,
                behavior: 'auto'  // Instantly jump to the last image after the transition
            });
        }, 500); // Small delay to allow the smooth scroll to finish
    }
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
        activeButton.classList.remove('is-light'); // Remove 'is-selected' from previous button
        activeButton.classList.add('is-dark'); // Add 'is-dark' back to the previous button
    }
    
    // Add 'is-selected' class to the currently pressed button
    buttonElement.classList.remove('is-dark'); // Remove 'is-dark' from current button
    buttonElement.classList.add('is-light'); // Add 'is-selected' to current button


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
        activeButton2.classList.remove('is-light'); // Remove 'is-selected' from previous button
        activeButton2.classList.add('is-dark'); // Add 'is-dark' back to the previous button
    }
    
    // Add 'is-selected' class to the currently pressed button
    buttonElement.classList.remove('is-dark'); // Remove 'is-dark' from current button
    buttonElement.classList.add('is-light'); // Add 'is-selected' to current button


    // Update the reference to the active button
    activeButton2 = buttonElement;
}