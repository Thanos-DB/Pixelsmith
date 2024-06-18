document.addEventListener("DOMContentLoaded", function() {
  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function(reveal) {
    var imageUrl = reveal.getAttribute('data-image');
    reveal.style.backgroundImage = `url('${imageUrl}')`;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var sliders = document.querySelectorAll('.slider-container-bg');
  sliders.forEach(function(slider) {
    reveal.style.clipPath = 'inset(0 0 0 50%)';
  });
});

function slideMove() {
  var slider = document.getElementById('slider');
  var reveal = document.getElementById('reveal');
  var sliderValue = slider.value;
  reveal.style.clipPath = 'inset(0 0 0 ' + sliderValue + '%)';
}

// document.getElementById('slider').addEventListener('input', slideMove);

window.onload = function() {
  var image = document.getElementById('mainImage');
  var slider = document.getElementById('slider');

  function adjustThumbHeight() {
      var imageHeight = image.clientHeight; // Get the height of the image
      var thumbHeight = imageHeight;  // Let's say we want the thumb to be 50% of the image height

      // Create a style element to hold the rule because pseudo-elements can't be styled directly via JavaScript
      var styleSheet = document.createElement('style');
      document.head.appendChild(styleSheet);
      styleSheet.sheet.insertRule(
          `#slider::-webkit-slider-thumb { height: ${thumbHeight}px !important; }`, 
          0
      );
  }

  // Adjust the thumb height on image load
  image.onload = adjustThumbHeight;

  // If the image is already loaded (e.g., cached), manually trigger the height adjustment
  if (image.complete) {
      adjustThumbHeight();
  }
};
