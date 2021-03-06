const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const loadImagesContainer = document.querySelector('.loadImagesContainer');
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

const progressBar = document.querySelector('.progressBar');
const progressValue = document.querySelector('.progressValue');

let boxes = [];
let boxTitles = [];
let countingPairs = 0;
let score = 0;
let progressValueCounter = 5;

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
        words: ['Веверица', 'Вук', 'Воће'],
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
img.alt = vocabular[0].words[0];

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
            progressBar.classList.add('active');
            score = 0;
            character = 0;
            progressValue.style.width = `5%`;
            progressValueCounter = 5;
            wrapper.classList.add('game');
            formingArrayForMemoryGame();
            renderBoxes();
        } else {
            letterSection.style.display = 'flex';
            illustration.style.display = 'flex';
            memoryGame.classList.remove('active');
            progressBar.classList.remove('active');
            wrapper.classList.remove('game');
        }
    });
}

const loadAllImages = () => {
    let template = '';

    vocabular.forEach((array) => {
        array.words.forEach((word) => {
            template += `
                <img src="img/${word}.png">
            `;
        });
        loadImagesContainer.innerHTML = template;
    });
};

const stopRandomButton = () => {
    clearInterval(timer);
    randomButton.innerHTML = 'КРЕНИ';
    randomButton.classList.add('start');
    audio.src = '';
};

const animatingElements = () => {
    let elements = [letter, img, displayWord];
    for (let element of elements) {
        element.classList.add('animate');
        element.addEventListener('animationend', () => {
            element.classList.remove('animate');
        });
    }
};

const playAudio = (sound) => {
    audio.src = `audio/${sound}.mp3`;
    audio.loop = false;

    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
    }
};

const defaultLetter = () => {
    character = 0;
    letter.innerHTML =
        azbukaArr[character] +
        `<span>${azbukaArr[character].toLowerCase()}</span>`;
    displayWord.innerHTML = vocabular[character].words[0];
    img.src = `img/${vocabular[character].words[0]}.png`;
    img.alt = vocabular[character].words[0];
    playAudio(vocabular[character].words[0]);
    for (word of vocabular) {
        word.wordCounter = 0;
    }
    animatingElements();
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
    img.alt = vocabular[character].words[counter];

    playAudio(vocabular[character].words[counter]);
    animatingElements();
};

const forward = () => {
    if (
        sectionButtons[2].classList.contains('active') ||
        sectionButtons[1].classList.contains('active')
    ) {
        return;
    }
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
    if (
        sectionButtons[2].classList.contains('active') ||
        sectionButtons[1].classList.contains('active')
    ) {
        return;
    }
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
                img.alt = word.words[counter];
                displayWord.innerHTML = word.words[counter];

                playAudio(word.words[counter]);
                word.wordCounter++;
            }
        }
    } else if (!randomButton.classList.contains('start')) {
        playAudio('shuffle');
        //randomize letter
        timer = setInterval(randomizingLetter, 80);
        randomButton.innerHTML = 'СТАНИ';
    }
};

//Memory game
let unshuffledArray = [];
let shuffledArray = [];

let temporaryArray = [];

const formingArrayForMemoryGame = () => {
    counter = vocabular[character].wordCounter;
    counterTwo = vocabular[character + 1].wordCounter;
    counterThree = vocabular[character + 2].wordCounter;

    for (let i = 0; unshuffledArray.length < 6; i++) {
        unshuffledArray.push(vocabular[character].words[counter]);
        unshuffledArray.push(vocabular[character + 1].words[counterTwo]);
        unshuffledArray.push(vocabular[character + 2].words[counterThree]);
    }

    shuffledArray = unshuffledArray
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};

const renderBoxes = () => {
    let template = ``;
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
        playAudio('inout');
        setTimeout(() => {
            box.classList.remove('active');
        }, 450);

        box.addEventListener('click', (e) => {
            box.classList.toggle('active');
            playAudio('open');
            if (box.classList.contains('active')) {
                temporaryArray.push(box.dataset.val);
            } else {
                temporaryArray = [];
            }

            if (temporaryArray.length == 2) {
                if (temporaryArray[0] === temporaryArray[1]) {
                    for (b of boxes) {
                        if (b.dataset.val == temporaryArray[0]) {
                            b.classList.add('correct');
                            b.children[0].classList.add('correct');

                            playAudio('success');
                        }
                    }
                    temporaryArray = [];
                    score += 2;
                    progressValueCounter += 33.3;
                    if (progressValueCounter >= 99) {
                        progressValue.style.width = `100%`;
                        setTimeout(() => {
                            progressValue.style.width = `5%`;
                            progressValueCounter = 5;
                        }, 550);
                    }
                    progressValue.style.width = `${progressValueCounter}%`;
                    progressBar.classList.add('correct');
                    setTimeout(() => {
                        progressBar.classList.remove('correct');
                    }, 250);
                } else {
                    setTimeout(() => {
                        for (b of boxes) {
                            if (b.classList.contains('active')) {
                                b.classList.remove('active');
                                temporaryArray = [];
                            }
                        }
                    }, 400);
                }
            }
            // Everything is paired
            if (score == 6) {
                score = 0;
                character += 3;
                if (character > 27) {
                    character = 0;
                    for (word of vocabular) {
                        word.wordCounter++;
                        if (word.words.length <= word.wordCounter) {
                            word.wordCounter = 0;
                        }
                    }
                }
                unshuffledArray = [];
                formingArrayForMemoryGame();
                setTimeout(() => {
                    for (b of boxes) {
                        b.remove();
                    }
                    renderBoxes();
                }, 700);
            }
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

playAudio(vocabular[0].words[0]);
animatingElements();
loadAllImages();
defaultLetter();
