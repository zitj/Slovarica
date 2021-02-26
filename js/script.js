const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const wrapper = document.querySelector('.wrapper');
const letterSection = document.querySelector('.letterSection');
const illustration = document.querySelector('.illustration');
const memoryGame = document.querySelector('.memoryGame');

const span = document.querySelector('span');
const randomButton = document.querySelector('.start');
const letter = document.querySelector('h1');
const displayWord = document.querySelector('h3');
const img = document.querySelector('img');
const audio = document.getElementById('my_audio');

const nav = document.querySelector('nav');
const sectionButtons = nav.querySelectorAll('a');

const arrowButtons = document.querySelector('.arrowButtons');
const leftArrow = arrowButtons.querySelector('.arrowLeft');
const rightArrow = arrowButtons.querySelector('.arrowRight');

let boxes = [];
let boxTitles = [];
let countingPairs = 0;
let stopLetter = '';
randomButton.style.display = 'none';

//Keyboard
isKeyPressed = {
    a: false,
};

//DATA
const vocabular = [
    {
        wordCounter: 0,
        words: ['Авион', 'Ауто', 'Астронаут'],
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
        words: ['Грожђе', 'Гром', 'Гитара'],
    },
    {
        wordCounter: 0,
        words: ['Домине', 'Дрво', 'Диносаурус'],
    },
    {
        wordCounter: 0,
        words: ['Ђумбирко', 'Ђеврек'],
    },
    {
        wordCounter: 0,
        words: ['Ексери'],
    },
    {
        wordCounter: 0,
        words: ['Жирафа', 'Жир', 'Жаба'],
    },
    {
        wordCounter: 0,
        words: ['Зомби', 'Зец', 'Звезда'],
    },
    {
        wordCounter: 0,
        words: ['Играчке', 'Игла', 'Индијанaц'],
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
        words: ['Лубеница', 'Лизалица', 'Ловац'],
    },
    {
        wordCounter: 0,
        words: ['Љуљашка', 'Људи'],
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
        words: ['Њива', 'Њушка'],
    },
    {
        wordCounter: 0,
        words: ['Око', 'Октопод', 'Ован'],
    },
    {
        wordCounter: 0,
        words: ['Пица', 'Паприка', 'Папагај'],
    },
    {
        wordCounter: 0,
        words: ['Ранац', 'Ракета', 'Риба'],
    },
    {
        wordCounter: 0,
        words: ['Сат', 'Слон'],
    },
    {
        wordCounter: 0,
        words: ['Трактор', 'Телевизор', 'Труба'],
    },
    {
        wordCounter: 0,
        words: ['Ћурка', 'Ћуп'],
    },
    {
        wordCounter: 0,
        words: ['Уво', 'Удица'],
    },
    {
        wordCounter: 0,
        words: ['Фрула', 'Фењер', 'Фијакер'],
    },
    {
        wordCounter: 0,
        words: ['Хлеб', 'Храм', 'Хармоника'],
    },
    {
        wordCounter: 0,
        words: ['Цвекла', 'Цуцла', 'Цигле'],
    },
    {
        wordCounter: 0,
        words: ['Чарапе', 'Чизме', 'Чесма'],
    },
    {
        wordCounter: 0,
        words: ['Џак', 'Џемпер'],
    },
    {
        wordCounter: 0,
        words: ['Шешир', 'Шишарка'],
    },
];

letter.innerHTML = azbukaArr[0] + `<span>${azbukaArr[0].toLowerCase()}</span>`;
img.src = `img/${vocabular[0].words[0]}.png`;

let counter = 0;
let character = 0;
let timer;

//Navigation (adding and removing elements)
const classRemover = () => {
    for (let sectionButton of sectionButtons) {
        sectionButton.classList.remove('active');
    }
};

for (let sectionButton of sectionButtons) {
    sectionButton.addEventListener('click', () => {
        classRemover();
        sectionButton.classList.add('active');

        if (sectionButtons[1].classList.contains('active')) {
            randomButton.style.display = 'block';
            arrowButtons.style.display = 'none';
            defaultLetter();
        } else {
            randomButton.style.display = 'none';
            stopRandomButton();
        }

        if (sectionButtons[0].classList.contains('active')) {
            defaultLetter();
            arrowButtons.style.display = 'flex';
        }

        if (sectionButtons[2].classList.contains('active')) {
            letterSection.style.display = 'none';
            illustration.style.display = 'none';
            memoryGame.classList.add('active');
            wrapper.classList.add('game');
            formingArrayForMemoryGame();
            rednerBoxes();
        } else {
            letterSection.style.display = 'flex';
            illustration.style.display = 'flex';
            memoryGame.classList.remove('active');
            wrapper.classList.remove('game');
        }
    });
}

const stopRandomButton = () => {
    clearInterval(timer);
    randomButton.innerHTML = 'КРЕНИ';
    randomButton.classList.add('start');
    audio.src = '';
};

const defaultLetter = () => {
    character = 0;
    letter.innerHTML =
        azbukaArr[character] +
        `<span>${azbukaArr[character].toLowerCase()}</span>`;
    displayWord.innerHTML = vocabular[character].words[0];
    img.src = `img/${vocabular[character].words[0]}.png`;
    audio.src = `audio/${vocabular[character].words[0]}.mp3`;
    audio.loop = false;
    audio.play();
    for (word of vocabular) {
        word.wordCounter = 0;
    }
    animatingElements();
};

const animatingElements = () => {
    let elements = [letter, img];
    for (let element of elements) {
        element.classList.add('animate');
        element.addEventListener('animationend', () => {
            element.classList.remove('animate');
        });
    }
};

//Lectures section
const changeLetter = () => {
    if (
        vocabular[character].wordCounter >
        vocabular[character].words.length - 1
    ) {
        vocabular[character].wordCounter = 0;
        counter = 0;
    } else {
        counter = vocabular[character].wordCounter;
    }

    letter.innerHTML =
        azbukaArr[character] +
        `<span>${azbukaArr[character].toLowerCase()}</span>`;
    displayWord.innerHTML = vocabular[character].words[counter];
    img.src = `img/${vocabular[character].words[counter]}.png`;
    audio.src = `audio/${vocabular[character].words[counter]}.mp3`;
    audio.loop = false;
    audio.play();
    animatingElements();
};

const forward = () => {
    character++;
    if (character === azbukaArr.length) {
        character = 0;
        for (let word of vocabular) {
            word.wordCounter++;
        }
    }

    changeLetter();
};

const backward = () => {
    character--;
    if (character == -1) {
        character = azbukaArr.length - 1;
    }
    changeLetter();
};

//Randomizing letter section
const randomizingLetter = () => {
    letter.innerHTML =
        azbukaArr[character] +
        `<span>${azbukaArr[character].toLowerCase()}</span>`;
    displayWord.innerHTML = vocabular[character].words[0];
    img.src = `img/${vocabular[character].words[0]}.png`;

    character++;
    if (character === azbukaArr.length) {
        character = 0;
    }
};

const startStop = () => {
    randomButton.classList.toggle('start');

    if (randomButton.classList.contains('start')) {
        randomButton.innerHTML = 'КРЕНИ';
        clearInterval(timer);
        stopLetter = letter.textContent[0];
        animatingElements();

        for (let word of vocabular) {
            if (word.wordCounter > word.words.length - 1) {
                word.wordCounter = 0;
            }
            if (word.words[0].charAt(0) == stopLetter) {
                counter = word.wordCounter;
                img.src = `img/${word.words[counter]}.png`;
                displayWord.innerHTML = word.words[counter];
                audio.src = `audio/${word.words[counter]}.mp3`;
                audio.loop = false;
                audio.play();
                word.wordCounter++;
            }
        }
    } else if (!randomButton.classList.contains('start')) {
        audio.src = 'audio/shuffle.mp3';
        audio.loop = true;
        audio.play();
        //randomize letter
        timer = setInterval(randomizingLetter, 80);
        randomButton.innerHTML = 'СТАНИ';
    }
};

//Memory game
let unshuffledArray = [];
let shuffledArray = [];

let trialVersion = [];

const formingArrayForMemoryGame = () => {
    character = 12;
    for (let i = 0; unshuffledArray.length < 6; i++) {
        unshuffledArray.push(vocabular[character].words[0]);
        unshuffledArray.push(vocabular[character + 1].words[0]);
        unshuffledArray.push(vocabular[character + 2].words[0]);
    }

    shuffledArray = unshuffledArray
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

    console.log(shuffledArray);
};

const rednerBoxes = () => {
    let template = '';
    shuffledArray.forEach((el) => {
        template += `
        <div class="box" data-val="${el}" >
        <div class="front square">
            <h2>${el[0]}<span>${el[0].toLowerCase()}</span></h2>
            <p class="boxTitle">${el}</p>
            <img src="img/${el}.png" alt="${el}" />
            </div>
            <div class="back square">
            <img src="gif/questionMark.gif" alt="question mark gif" />
         </div>
        </div>
        `;
    });

    memoryGame.innerHTML = template;
    boxes = document.querySelectorAll('.box');
    boxTitles = document.querySelectorAll('.boxTitle');

    if (boxes.length > 0) {
        clickingOnBoxes();
    }
};

const clickingOnBoxes = () => {
    for (let box of boxes) {
        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active');
        }, 500);
        box.addEventListener('click', () => {
            box.classList.toggle('active');
            if (box.classList.contains('active')) {
                trialVersion.push(box.dataset.val);
            }

            if (trialVersion.length > 2) {
                trialVersion.pop();
                box.classList.remove('active');
                console.log(trialVersion);
            }

            if (trialVersion.length == 2) {
                console.log(trialVersion);
                if (trialVersion[0] === trialVersion[1]) {
                    for (b of boxes) {
                        if (b.dataset.val == trialVersion[0]) {
                            b.classList.add('correct');
                        }
                    }
                }
            }
            setTimeout(() => {
                box.classList.remove('active');
                trialVersion.shift();
                console.log(trialVersion);
            }, 800);
        });
    }
};

//Triggers on Mouse
randomButton.addEventListener('click', startStop);
leftArrow.addEventListener('click', backward);
rightArrow.addEventListener('click', forward);
//Triggers on Keyboard
document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
        startStop;
    }
};
document.onkeydown = (keyDownEvent) => {
    isKeyPressed[keyDownEvent.key] = true;
    if (keyDownEvent.key == 'ArrowLeft') {
        backward();
    }
    if (keyDownEvent.key == 'ArrowRight') {
        forward();
    }
};
animatingElements();
