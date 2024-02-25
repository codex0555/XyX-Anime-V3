    // Initialize Swiper after content is loaded
    const swiper = new Swiper('.swiper-container', {
      loop: true, // Enable infinite loop
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
