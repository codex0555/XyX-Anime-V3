const headerBAR = document.querySelector('.header-bar');
const india = document.querySelector('.india');
const indiaSTATE = document.querySelector('.india-state');
const button = document.querySelector('.search-box');
const phone = document.querySelector('.phone');
const swipe = document.querySelector('.swiper-container');
const heat1 = document.querySelector('.heat');

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
        swipe.style.left = "26rem"
    }
});

// Add a separate click event listener for the india element
india.addEventListener('click', () => {
    indiaSTATE.style.display = "block";
});

window.addEventListener('resize', ()=>{
    if(window.innerWidth <= 768){
        button.addEventListener('click', ()=>{
            phone.style.display = "block";
            console.log('hvjsvdhf');
        })
        heat1.classList.contains('container');
        heat1.classList.remove('container');
        button.type = "text";
    }
    else{
        if(phone.style.display == "block"){
            phone.style.display = "none";
        }
        heat1.classList.add('container');
        button.type = "submit";
    }
})

// window.addEventListener('resize', ()=>{
//     if( window.innerWidth <= 7)
// })
