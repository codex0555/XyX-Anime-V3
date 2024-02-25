const headerBAR = document.querySelector('.header-bar');
const india = document.querySelector('.india');
const indiaSTATE = document.querySelector('.india-state');
const button = document.querySelector('.search-box');
const phone = document.querySelector('.phone');
const swipe = document.querySelector('.swiper-container');
const heat1 = document.querySelector('.heat');
let isPhoneVisible = false; // Variable to track phone visibility

// Function to handle resizing logic
function handleResize() {
    if (window.innerWidth < 768) {
        heat1.classList.remove('container');
        button.type = "text";
    } else {
        heat1.classList.add('container');
        button.type = "submit";
    }
}

// Attach event listener for window resize
window.addEventListener('resize', handleResize);

// Initial call to handleResize function to set initial state on page load
handleResize();

headerBAR.addEventListener('click', () => {
    if (headerBAR.classList.contains('agu')) {
        indiaSTATE.style.display = "none";
        india.style.display = "none";
        headerBAR.classList.remove('agu');
        swipe.style.left = "auto";
    } else {
        india.style.display = "block";
        headerBAR.classList.add('agu');
        swipe.style.position = "relative";
        swipe.style.left = "26rem";
    }
});

// Click event listener for the india element
india.addEventListener('click', () => {
    indiaSTATE.style.display = "block";
});

// Click event listener for the search button
button.addEventListener('click', () => {
    // Check if the screen width is smaller than 768 pixels
    if (window.innerWidth < 768) {
        // Toggle phone visibility
        phone.style.display = isPhoneVisible ? "none" : "block";
        isPhoneVisible = !isPhoneVisible; // Toggle visibility state
    }
});
