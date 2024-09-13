const lens = document.getElementById("zoom-lens");
const mainImage = document.getElementById("main-image");
const container2 = document.getElementById("zoom-in-image");

function changeImage(imageSrc) {
    mainImage.src = imageSrc;
}

// Function to move the lens and zoom in on the image
function moveLens(event) {
    let containerRect = container2.getBoundingClientRect();
    let lensSize = lens.getBoundingClientRect();
    // let x = event.clientX - containerRect.left - (lensSize.width / 2);
    // let y = event.clientY - containerRect.top - (lensSize.height / 2);

    let x = event.clientX - containerRect.left;
    let y = event.clientY - containerRect.top;

    // Boundary check to keep the lens within the image
    // Boundary check to keep the lens within the image
    if (x > containerRect.width - lensSize.width / 2) x = containerRect.width - lensSize.width / 2;
    if (x < lensSize.width / 2) x = lensSize.width / 2;
    if (y > containerRect.height - lensSize.height / 2) y = containerRect.height - lensSize.height / 2;
    if (y < lensSize.height / 2) y = lensSize.height / 2;

    lens.style.left = (x - lensSize.width / 2) + "px";
    lens.style.top = (y - lensSize.height / 2) + "px";
    lens.style.visibility = "visible";

    let zoomX = (x / containerRect.width) * mainImage.width;
    let zoomY = (y / containerRect.height) * mainImage.height;

    lens.style.backgroundImage = `url(${mainImage.src})`;
    lens.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`;
    lens.style.backgroundPosition = `-${zoomX * 2 - lensSize.width / 2}px -${zoomY * 2 - lensSize.height / 2}px`;
}


// Hide lens when not hovering over image
function hideLens() {
    lens.style.visibility = "hidden";
}

container2.addEventListener("mousemove", moveLens);
container2.addEventListener("mouseleave", hideLens);