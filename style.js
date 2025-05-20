//HAMBURGER NAVBAR TOGGLE
function toggleMenu() {
  const links = document.getElementById('navbar-links');
  links.classList.toggle('active');
}

// CAROUSEL
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let intervalId;

  // Auto-slide every 3 seconds
  function startAutoSlide() {
    intervalId = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  // Stop auto-slide on user interaction
  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Go to next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  // Go to previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Update carousel position and indicators
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
    
    // Restart auto-slide timer
    stopAutoSlide();
    startAutoSlide();
  }

  // Handle swipe gestures
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoSlide();
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoSlide();
  });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      nextSlide(); // Swipe left
    } else if (diff < -50) {
      prevSlide(); // Swipe right
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      currentIndex = parseInt(indicator.dataset.slide);
      updateCarousel();
    });
  });

  // Start auto-sliding
  startAutoSlide();
});