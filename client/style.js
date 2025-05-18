//Hamburger toggle
function toggleMenu() {
  const links = document.getElementById('navbar-links');
  links.classList.toggle('active');
}

// Carousel functionality
let slideIndex = 0;
let slides = [];

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function changeSlide(direction) {
  slideIndex = (slideIndex + direction + slides.length) % slides.length;
  showSlide(slideIndex);
}

function autoSlide() {
  changeSlide(1);
}

// Swipe detection
let startX = 0;
let endX = 0;

function handleSwipe() {
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      changeSlide(1); // swipe left
    } else {
      changeSlide(-1); // swipe right
    }
  }
}

// Initialize everything on load
window.addEventListener('load', () => {
  slides = document.querySelectorAll('.carousel-slide');
  showSlide(slideIndex);
  setInterval(autoSlide, 3000);

  const carouselElement = document.getElementById('carousel');

  carouselElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carouselElement.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
});
