const net = document.querySelector('.net');

window.addEventListener('resize', ()=>{
    if( window.innerWidth <= 550){
        net.classList.contains('container');
        net.classList.remove('container');
    }
    else{
        net.classList.add('container');
    }
})