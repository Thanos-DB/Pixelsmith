window.onload = function() {
    // Automatically select the third image in the carousel when the page loads
    document.querySelector('#image-selector button').click();
    document.querySelector('#resolution-selector button').click();

    const thirdImage = document.querySelectorAll('.carousel-container img')[1];  // Index 2 is the third image
    if (thirdImage) {
        selectImage(thirdImage);  // Automatically select the third image
    }

};

const highResImages = [
    './images/girl_giga.jpg',
    './images/small_world_giga.jpg',  
    './images/jewels_giga.jpg',  
    './images/lego_giga.jpg',  
    './images/fantasy_forest_giga.jpg',  
    './images/heaven_giga.jpg',  
    './images/mars_landscape_giga.jpg',  
    './images/van_gogh_giga.jpg', 
    './images/waterfall_giga.jpg',  
];

function preloadImages(imageList) {
    imageList.forEach(imageSrc => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageSrc;
        document.head.appendChild(link);
    });  
}

// Call the function to preload images
preloadImages(highResImages);