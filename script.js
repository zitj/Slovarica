const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const button = document.querySelector('button');
const letter = document.querySelector('h1');
const img = document.querySelector('img');

let stopLetter = '';

const words = [
    {
        title: 'Авион',
        img:
            'https://w7.pngwing.com/pngs/607/226/png-transparent-airplane-cartoon-plane-creative-train-marine-mammal-photography-decoupage.png',
    },
];

letter.innerHTML = azbukaArr[0];
img.src = words[0].img;

let stop = false;
let character = 0;
let timer;

function onTick() {
    letter.innerHTML = azbukaArr[character];
    character++;
    if (character === azbukaArr.length && !stop) {
        character = 0;
    }
}

button.addEventListener('click', () => {
    button.classList.toggle('start');
    if (button.classList.contains('start')) {
        button.innerHTML = 'СТАРТ';
        clearInterval(timer);
        stopLetter = letter.textContent;
        for (let word of words) {
            if (word.title.charAt(0) == stopLetter) {
                console.log(word.img);
                img.src = word.img;
            }
        }
    } else {
        timer = setInterval(onTick, 80);
        button.innerHTML = 'СТОП';
    }
});
