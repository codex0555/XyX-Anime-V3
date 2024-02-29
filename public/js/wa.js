document.addEventListener('DOMContentLoaded', function() {
    const waLinks = document.querySelectorAll('.list-wa');
    const iframe = document.querySelector('.iframe');
    const idmm = window.location.href;
    const linkid = idmm.split('/watc/')[1].split('/current-')[0];
    const parentContainer = document.querySelector('.watc-server-net');
    const sut = document.querySelector('#dut');
    const fdub = idmm.split('/dub-')[1].split('/1')[0];
    const fsub = idmm.split('/current-')[1].split('/sub-')[0];

    // Change the display style of the `sut` element based on conditions
if (fsub > fdub) {
    // If the current is greater than the dub, display none
    sut.style.display = 'none';
} else if (fsub === fdub) {
    // If the current is equal to dub, display block
    sut.style.display = 'block';
} else {
    // If the current is smaller than the dub, display block
    sut.style.display = 'block';
}

// After changing the display style, reload the contents of the `sut` div
sut.innerHTML = sut.innerHTML;



parentContainer.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default behavior of the link click

    const target = e.target.closest('a[data-link]'); // Find the closest <a> element with data-link attribute
    if (!target) return; // If the clicked element is not a link with data-link attribute, do nothing

    const dub = target.getAttribute('data-link');
    const link = '?' + new URLSearchParams({ id: dub }).toString(); // Construct the new URL
    const mj = new URL(window.location.href);
    const mn = mj.pathname.split('/current-')[1].split('/sub-')[0];
    const dh = mj.searchParams.get('id');

    history.pushState({}, '', link); // Update the browser's history with the new URL

   
    iframe.src = `https://xyxanime.rf.gd/playerx?id=${linkid}${dh}-episode-${mn}`;
    
});

    



    waLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var episodeNumber = this.getAttribute('data-link');
            console.log('Clicked link for episode:', episodeNumber);
            const sub2 = episodeNumber.split('/current-')[1].split('/sub-')[0];
           

            var newUrl = '/watch/'+ linkid + episodeNumber;
            history.pushState({}, '', newUrl);
            console.log('New URL:', newUrl);

           // newUrl = newUrl.split('/watch/')[1];
            // Reload the iframe
            // iframe.src = ``;
            iframe.src = `https://xyxanime.rf.gd/playerx?id=${linkid}-episode-${sub2}`;
        });
    });
});
