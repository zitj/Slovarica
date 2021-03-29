import { vocabular } from '../data/data.js';
import { loadAllImages } from './utilities/load-images.js';
import { animatingElements } from './utilities/animating-elements.js';
import { playAudio, playSoundEffect, audio } from './utilities/sounds.js';
import {
    sectionButtons,
    randomButton,
    logo,
    leftArrow,
    rightArrow,
    arrowButtons,
} from './utilities/buttons.js';
import { loadingScreen } from './utilities/loading-screen.js';
import {
    changeLetter,
    defaultLetter,
    forward,
    backward,
} from './utilities/change-letter.js';
import {
    wrapper,
    letterSection,
    illustration,
    displayWord,
    letter,
    azbukaArr,
    img,
    randomizingLetter,
    stopRandomButton,
    startStop,
} from './utilities/randomising-letter.js';

import {
    memoryGame,
    formingArrayForMemoryGame,
    renderBoxes,
    progressBar,
    progressValue,
    score,
    shuffledArray,
    temporaryArray,
} from './utilities/memory-game.js';

const span = document.querySelector('span');
let stopLetter = '';
randomButton.style.display = 'none';

//Keyboard
const isKeyPressed = {
    a: false,
};

//Application
letter.innerHTML = azbukaArr[0] + `<span>${azbukaArr[0].toLowerCase()}</span>`;
img.src = `img/${vocabular[0].words[0]}.png`;
img.alt = vocabular[0].words[0];

let counter = 0;
let character = 0;
// let timer;

//Navigation (adding and removing elements)
const classRemover = () => {
    for (let sectionButton of sectionButtons) {
        sectionButton.classList.remove('active');
    }
};

for (let sectionButton of sectionButtons) {
    sectionButton.addEventListener('click', () => {
        playSoundEffect('sectionClick');
        classRemover();
        sectionButton.classList.add('active');

        if (sectionButtons[1].classList.contains('active')) {
            randomButton.style.display = 'block';
            arrowButtons.style.display = 'none';
            defaultLetter(vocabular);
        } else {
            randomButton.style.display = 'none';
            stopRandomButton();
        }

        if (sectionButtons[0].classList.contains('active')) {
            defaultLetter(vocabular);
            arrowButtons.style.display = 'flex';
        }

        if (sectionButtons[2].classList.contains('active')) {
            letterSection.style.display = 'none';
            illustration.style.display = 'none';
            memoryGame.classList.add('active');
            progressBar.classList.add('active');
            vocabular.forEach((el) => (el.wordCounter = 0));
            // score = 0;
            character = 0;
            progressValue.style.width = `5%`;
            // progressValueCounter = 5;
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

//Memory game
// let unshuffledArray = [];
// let shuffledArray = [];

// let temporaryArray = [];

// const formingArrayForMemoryGame = () => {
//     counter = vocabular[character].wordCounter;
//     let counterTwo = vocabular[character + 1].wordCounter;
//     let counterThree = vocabular[character + 2].wordCounter;

//     for (let i = 0; unshuffledArray.length < 6; i++) {
//         unshuffledArray.push(vocabular[character].words[counter]);
//         unshuffledArray.push(vocabular[character + 1].words[counterTwo]);
//         unshuffledArray.push(vocabular[character + 2].words[counterThree]);
//     }

//     shuffledArray = unshuffledArray
//         .map((a) => ({ sort: Math.random(), value: a }))
//         .sort((a, b) => a.sort - b.sort)
//         .map((a) => a.value);
// };

// const renderBoxes = () => {
//     let template = ``;
//     shuffledArray.forEach((el) => {
//         template += `
//         <div class="box" data-val="${el}" >
//         <div class="front square">
//             <h2>${el[0]}<span>${el[0].toLowerCase()}</span></h2>
//             <p class="boxTitle">${el}</p>
//             <img src="img/${el}.png" alt="${el}" />
//             </div>
//             <div class="back square">
//             <img src="gif/questionMark.gif" alt="question mark gif" />
//          </div>
//         </div>
//         `;
//     });
//     memoryGame.innerHTML = template;
//     boxes = document.querySelectorAll('.box');
//     boxTitles = document.querySelectorAll('.boxTitle');

//     if (boxes.length > 0) {
//         clickingOnBoxes();
//     }
// };

// const clickingOnBoxes = () => {
//     for (let box of boxes) {
//         box.classList.add('active');
//         inout.play();
//         setTimeout(() => {
//             box.classList.remove('active');
//         }, 450);

//         box.addEventListener('click', (e) => {
//             box.classList.toggle('active');
//             playSoundEffect('open');
//             if (box.classList.contains('active')) {
//                 temporaryArray.push(box.dataset.val);
//             } else {
//                 temporaryArray = [];
//             }

//             if (temporaryArray.length == 2) {
//                 if (temporaryArray[0] === temporaryArray[1]) {
//                     for (let b of boxes) {
//                         if (b.dataset.val == temporaryArray[0]) {
//                             b.classList.add('correct');
//                             b.children[0].classList.add('correct');

//                             playAudio('success');
//                         }
//                     }
//                     temporaryArray = [];
//                     score += 2;
//                     progressValueCounter += 33.3;
//                     if (progressValueCounter >= 99) {
//                         progressValue.style.width = `100%`;
//                         setTimeout(() => {
//                             progressValue.style.width = `5%`;
//                             progressValueCounter = 5;
//                         }, 550);
//                     }
//                     progressValue.style.width = `${progressValueCounter}%`;
//                     progressBar.classList.add('correct');
//                     setTimeout(() => {
//                         progressBar.classList.remove('correct');
//                     }, 250);
//                 } else {
//                     setTimeout(() => {
//                         for (let b of boxes) {
//                             if (b.classList.contains('active')) {
//                                 b.classList.remove('active');
//                                 temporaryArray = [];
//                             }
//                         }
//                     }, 400);
//                 }
//             }
//             // Everything is paired
//             if (score == 6) {
//                 score = 0;
//                 character += 3;
//                 if (character > 27) {
//                     character = 0;
//                     for (let word of vocabular) {
//                         word.wordCounter++;
//                         if (word.words.length <= word.wordCounter) {
//                             word.wordCounter = 0;
//                         }
//                     }
//                 }
//                 unshuffledArray = [];
//                 formingArrayForMemoryGame();
//                 setTimeout(() => {
//                     for (let b of boxes) {
//                         b.remove();
//                     }
//                     renderBoxes();
//                 }, 700);
//             }
//         });
//     }
// };
const startApp = () => {
    animatingElements(letter, img, displayWord);
    loadAllImages(vocabular);
    defaultLetter(vocabular);
};

const endLoadingScreen = () => {
    setTimeout(() => {
        loadingScreen.style.opacity = 0;
        loadingScreen.style.zIndex = -10;
        startApp();
    }, 1800);
};

//Triggers on Mouse
randomButton.addEventListener('click', startStop);
leftArrow.addEventListener('click', backward);
rightArrow.addEventListener('click', forward);
logo.addEventListener('click', () => {
    location.reload();
});

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

endLoadingScreen();
