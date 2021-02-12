const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const span = document.querySelector('span');
const button = document.querySelector('button');
const letter = document.querySelector('h1');
const displayWord = document.querySelector('h3');
const img = document.querySelector('img');

const audio = document.getElementById('my_audio');

let stopLetter = '';

const vocabular = [
    {
        wordCounter: 0,
        words: ['Авион', 'Ауто', 'Аждаја'],
    },
    {
        wordCounter: 0,
        words: ['Банана', 'Балон', 'Буре'],
    },
    {
        wordCounter: 0,
        words: ['Вук', 'Веверица', 'Воће'],
    },
    {
        wordCounter: 0,
        words: ['Грожђе', 'Град', 'Гитара'],
    },
    {
        wordCounter: 0,
        words: ['Домине', 'Дабар', 'Диносаурус'],
    },
    {
        wordCounter: 0,
        words: ['Ђумбирко', 'Ђак', 'Ђеврек'],
    },
    {
        wordCounter: 0,
        words: ['Ексери', 'Елипса', 'Енергија'],
    },
    {
        wordCounter: 0,
        words: ['Жирафа', 'Жир', 'Жаба'],
    },
    {
        wordCounter: 0,
        words: ['Зомби', 'Зец', 'Знак'],
    },
    {
        wordCounter: 0,
        words: ['Индијанaц', 'Игла', 'Играчке'],
    },
    {
        wordCounter: 0,
        words: ['Јабука', 'Јастук', 'Јаје'],
    },
    {
        wordCounter: 0,
        words: ['Крокодил', 'Компас', 'Корњача'],
    },
    {
        wordCounter: 0,
        words: ['Лизалица', 'Лубеница', 'Ловац'],
    },
    {
        wordCounter: 0,
        words: ['Љуљашка', 'Љубичица', 'Људи'],
    },
    {
        wordCounter: 0,
        words: ['Миш', 'Магнет', 'Микрофон'],
    },
    {
        wordCounter: 0,
        words: ['Нож', 'Ној', 'Наранџа'],
    },
    {
        wordCounter: 0,
        words: ['Њива', 'Њушка', 'Њоке'],
    },
    {
        wordCounter: 0,
        words: ['Око', 'Октопод', 'Ован'],
    },
    {
        wordCounter: 0,
        words: ['Пица', 'Папирка', 'Папагај'],
    },
    {
        wordCounter: 0,
        words: ['Ранац', 'Ракета', 'Риба'],
    },
    {
        wordCounter: 0,
        words: ['Сат', 'Сендвич', 'Саксија'],
    },
    {
        wordCounter: 0,
        words: ['Телевизор', 'Труба', 'Трешња'],
    },
    {
        wordCounter: 0,
        words: ['Ћурка', 'Ћускија', 'Ћуп'],
    },
    {
        wordCounter: 0,
        words: ['Уво', 'Удица', 'Усне'],
    },
    {
        wordCounter: 0,
        words: ['Фрула', 'Фењер', 'Фијакер'],
    },
    {
        wordCounter: 0,
        words: ['Хлеб', 'Храм', 'Храна'],
    },
    {
        wordCounter: 0,
        words: ['Цигле', 'Цуцла', 'Ципеле'],
    },
    {
        wordCounter: 0,
        words: ['Чесма', 'Чизме', 'Чарапе'],
    },
    {
        wordCounter: 0,
        words: ['Џак', 'Џезва', 'Џемпер'],
    },
    {
        wordCounter: 0,
        words: ['Шешир'],
    },
];

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

let counter = 0;
let character = 0;
let timer;

const onTick = () => {
    letter.innerHTML = azbukaArr[character];
    displayWord.innerHTML = vocabular[character].words[0];
    img.src = `img/${vocabular[character].words[0]}.png`;
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

        for (let word of vocabular) {
            if (word.wordCounter > word.words.length - 1) {
                word.wordCounter = 0;
            }
            if (word.words[0].charAt(0) == stopLetter) {
                counter = word.wordCounter;
                displayWord.innerHTML = word.words[counter];
                word.wordCounter++;
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

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        startStop();
    }
};
