export const loadingScreen = document.querySelector('.loadingScreen');
export const loadingTitlte = document.getElementById('loadingTitle');
export const strText = loadingTitlte.textContent;

export const splitText = strText.split('');

loadingTitlte.textContent = '';

for (let i = 0; i < splitText.length; i++) {
    loadingTitlte.innerHTML += '<span>' + splitText[i] + '</span>';
}

const increase = () => {
    const span = loadingTitlte.querySelectorAll('span')[char];
    span.classList.add('fadeIn');
    char++;
    if (char === splitText.length) {
        clearInterval(time);
        time = null;
        return;
    }
};

export let char = 0;
export let time = setInterval(increase, 30);
