document.addEventListener('DOMContentLoaded', function() {
    const waLinks = document.querySelectorAll('.list-wa');
    const iframe = document.querySelector('.iframe');
    const idmm = window.location.href;
    const linkid = idmm.split('/')[1].split('-episode')[0];

    waLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var episodeNumber = this.getAttribute('data-link');
            console.log('Clicked link for episode:', episodeNumber);

            var newUrl = '/watc/'+ linkid + episodeNumber;
            history.pushState({}, '', newUrl);
            console.log('New URL:', newUrl);

            // Reload the existing iframe
            iframe.src = ;
        });
    });
});
