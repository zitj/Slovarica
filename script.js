const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const button = document.querySelector('button');
const letter = document.querySelector('h1');
const displayWord = document.querySelector('h3');
const img = document.querySelector('img');

const audio = document.getElementById('my_audio');

let stopLetter = '';

// DATA
const data = [
    'Авион',
    'Банана',
    'Вук',
    'Грожђе',
    'Домине',
    'Ђумбирко',
    'Ексери',
    'Жирафа',
    'Зомби',
    'Индијанaц',
    'Јабука',
    'Крокодил',
    'Лизалица',
    'Љуљашка',
    'Миш',
    'Нож',
    'Њива',
    'Око',
    'Пица',
    'Ранац',
    'Сат',
    'Телевизор',
    'Ћурка',
    'Уво',
    'Фрула',
    'Хлеб',
    'Цигле',
    'Чесма',
    'Џак',
    'Шешир',
];

letter.innerHTML = azbukaArr[0];
img.src = `img/${data[0]}.png`;

let character = 0;
let timer;

const onTick = () => {
    letter.innerHTML = azbukaArr[character];
    displayWord.innerHTML = data[character];
    img.src = `img/${data[character]}.png`;
    character++;
    if (character === azbukaArr.length) {
        character = 0;
    }
};

const startStop = () => {
    button.classList.toggle('start');

    if (button.classList.contains('start')) {
        button.innerHTML = 'КРЕНИ';
        clearInterval(timer);
        stopLetter = letter.textContent;

        for (let word of data) {
            if (word.charAt(0) == stopLetter) {
                img.src = `img/${word}.png`;
                displayWord.innerHTML = word;
                audio.src = `audio/${word}.mp3`;
                audio.loop = false;
                audio.play();
            }
        }
    } else {
        audio.src = 'audio/shuffle.mp3';
        audio.loop = true;
        audio.play();
        timer = setInterval(onTick, 80);
        button.innerHTML = 'СТАНИ';
    }
};

button.addEventListener('click', startStop);
