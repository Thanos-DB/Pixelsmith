window.onload = function() {
    // Automatically select the third image in the carousel when the page loads
    document.querySelector('#image-selector button').click();
    document.querySelector('#resolution-selector button').click();

    const thirdImage = document.querySelectorAll('.carousel-container img')[1];  // Index 2 is the third image
    if (thirdImage) {
        selectImage(thirdImage);  // Automatically select the third image
    }
};