const dubarrow = document.querySelector('#more_arrow1');
const subarrow = document.querySelector('#more_arrow');

const getURL = window.location.href;
const URL1 = new URL(getURL);
const page = URL1.searchParams.get('id');

console.log(page);

dubarrow.addEventListener('click', () => {
    let i = page;
    i++;
    const tabURL = window.location.href;

    const newTAB = tabURL.replace(page,i);

    window.location.href = newTAB;
})

subarrow.addEventListener('click', () => {
    let i = page;
    i++;
    const tabURL = window.location.href;

    const newTAB = tabURL.replace(page,i);

    window.location.href = newTAB;
})

