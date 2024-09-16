const lensGiga = document.getElementById("giga-lens");
const ImageGiga = document.getElementById("giga-image");
const containerGiga = document.getElementById("giga-container");
const leftHalfGiga = document.getElementById("giga-lens-left");
const rightHalfGiga = document.getElementById("giga-lens-right");

// Set the zoom factor for the left image
let leftZoomFactor = 8; // Adjust this value to control the left-side zoom level
let rightZoomFactor = 1; // Adjust this value to control the left-side zoom level

// Preload high-resolution images using JavaScript
const highResImageGiga = new Image();
const highResComparisonImageGiga = new Image();

let imagesLoaded = 0;

highResImageGiga.onload = onImageLoad;
highResComparisonImageGiga.onload = onImageLoad;

highResImageGiga.src = './images/galaxy_giga.jpg';
highResComparisonImageGiga.src = './images/galaxy_hd.jpg';

function onImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        // Ensure images have dimensions
        if (!highResImageGiga.width) {
            highResImageGiga.width = highResImageGiga.naturalWidth;
            highResImageGiga.height = highResImageGiga.naturalHeight;
        }
        if (!highResComparisonImageGiga.width) {
            highResComparisonImageGiga.width = highResComparisonImageGiga.naturalWidth;
            highResComparisonImageGiga.height = highResComparisonImageGiga.naturalHeight;
        }

        // Activate event listeners after images are loaded
        containerGiga.addEventListener("mousemove", moveLensGiga);
        containerGiga.addEventListener("mouseleave", hideLensGiga);
    }
}

// Function to move the lens and zoom in on both images
function moveLensGiga(event) {
    let containerRect = containerGiga.getBoundingClientRect();
    let lensRect = lensGiga.getBoundingClientRect();

    // Get cursor position relative to the container
    let x = event.clientX - containerRect.left;
    let y = event.clientY - containerRect.top;

    // Position the lens so its left edge aligns with the cursor
    let lensLeft = x;
    let lensTop = y - lensRect.height / 2;

    // Adjust lens position if it goes beyond the container
    if (lensLeft + lensRect.width > containerRect.width) {
        lensLeft = containerRect.width - lensRect.width;
    }
    if (lensLeft < 0) lensLeft = 0;
    if (lensTop < 0) lensTop = 0;
    if (lensTop + lensRect.height > containerRect.height) {
        lensTop = containerRect.height - lensRect.height;
    }

    lensGiga.style.left = lensLeft + "px";
    lensGiga.style.top = lensTop + "px";
    lensGiga.style.visibility = "visible";

    // Calculate percentage position within the container
    let percentX = x / containerRect.width;
    let percentY = y / containerRect.height;

    // Calculate zoom positions for the images
    // Left image (low-res with zoom factor)
    let leftImageX = percentX * highResComparisonImageGiga.width * leftZoomFactor;
    let leftImageY = percentY * highResComparisonImageGiga.height * leftZoomFactor;

    // Right image (high-res)
    let rightImageX = percentX * highResImageGiga.width * rightZoomFactor;
    let rightImageY = percentY * highResImageGiga.height * rightZoomFactor;

    // Adjust background positions
    // For left half, shift background to align cursor with the right edge of the left half
    let leftZoomX = -leftImageX + lensRect.width / 2;
    let leftZoomY = -leftImageY + lensRect.height / 2;

    // For right half, cursor aligns with left edge, no adjustment needed
    let rightZoomX = -rightImageX + 0;
    let rightZoomY = -rightImageY + lensRect.height / 2;

    // Set background images and positions
    leftHalfGiga.style.backgroundImage = `url(${highResComparisonImageGiga.src})`;
    leftHalfGiga.style.backgroundSize = `${highResComparisonImageGiga.width * leftZoomFactor}px ${highResComparisonImageGiga.height * leftZoomFactor}px`;
    leftHalfGiga.style.backgroundPosition = `${leftZoomX}px ${leftZoomY}px`;

    rightHalfGiga.style.backgroundImage = `url(${highResImageGiga.src})`;
    rightHalfGiga.style.backgroundSize = `${highResImageGiga.width * rightZoomFactor}px ${highResImageGiga.height * rightZoomFactor}px`;
    rightHalfGiga.style.backgroundPosition = `${rightZoomX}px ${rightZoomY}px`;
}

// Hide lens when not hovering over image
function hideLensGiga() {
    lensGiga.style.visibility = "hidden";
}