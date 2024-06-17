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


// const slider = document.getElementById('slider');
// const topImageDiv = document.querySelectorAll('.slider-image')[0];

// slider.oninput = function() {
//     topImageDiv.style.left = `${this.value}%`;
// }
