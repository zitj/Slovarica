const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const button = document.querySelector('button');
const letter = document.querySelector('h1');
const displayWord = document.querySelector('h3');
const img = document.querySelector('img');

let stopLetter = '';

const words = [
    {
        title: 'Авион',
        img: '',
    },
    {
        title: 'Банана',
        img: '',
    },
    {
        title: 'Вук',
        img: '',
    },
    {
        title: 'Грожђе',
        img: '',
    },
    {
        title: 'Домине',
        img: '',
    },
    {
        title: 'Ђеврек',
        img: '',
    },
    {
        title: 'Ексер',
        img: '',
    },
    {
        title: 'Жирафа',
        img: '',
    },
    {
        title: 'Зомби',
        img: '',
    },
    {
        title: 'Игла',
        img: '',
    },
    {
        title: 'Јабука',
        img: '',
    },
    {
        title: 'Крокодил',
        img: '',
    },
    {
        title: 'Лизалица',
        img: '',
    },
    {
        title: 'Љуљашка',
        img: '',
    },
    {
        title: 'Миш',
        img: '',
    },
    {
        title: 'Нож',
        img: '',
    },
    {
        title: 'Њ',
        img: '',
    },
    {
        title: 'Око',
        img: '',
    },
    {
        title: 'Парадајз',
        img: '',
    },
    {
        title: 'Ранац',
        img: '',
    },
    {
        title: 'Сат',
        img: '',
    },
    {
        title: 'Телевизор',
        img: '',
    },
    {
        title: 'Ћурка',
        img: '',
    },
    {
        title: 'Уво',
        img: '',
    },
    {
        title: 'Фрула',
        img: '',
    },
    {
        title: 'Хлеб',
        img: '',
    },
    {
        title: 'Цигла',
        img: '',
    },
    {
        title: 'Чесма',
        img: '',
    },
    {
        title: 'Џак',
        img: '',
    },
    {
        title: 'Шешир',
        img: '',
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
                img.src = word.img;
                displayWord.innerHTML = word.title;
            }
        }
    } else {
        timer = setInterval(onTick, 80);
        button.innerHTML = 'СТОП';
    }
});
