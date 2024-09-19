const sliderBaseImage = document.getElementById("image-slider-base");
const sliderBar = document.getElementById("slider-demo");
const sliderValue = document.getElementById("sliderValue");

// Change image and update slider value on input
sliderBar.addEventListener("input", function() {
  const imageIndex = sliderBar.value;
  sliderBaseImage.src = `./images/slider/cyberpunk_x4_${imageIndex}.png`; // Change the image
  sliderValue.textContent = `Slider value: ${imageIndex}`; // Update the displayed slider value
  
  // Adjust the position of the value display based on slider position
  const sliderWidth = sliderBar.offsetWidth;
  const newLeft = (sliderBar.value - sliderBar.min) / (sliderBar.max - sliderBar.min) * sliderWidth;
  sliderValue.style.left = `${newLeft}px`;
});