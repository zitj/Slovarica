import { vocabular } from '../../data/data.js';
import { playAudio, playSoundEffect, audio } from './sounds.js';

export const progressBar = document.querySelector('.progressBar');
export const progressValue = document.querySelector('.progressValue');

export let countingPairs = 0;
export let score = 0;
export let progressValueCounter = 5;

export const memoryGame = document.querySelector('.memoryGame');
export const inout = new Audio('assets/audio/inout.mp3');

export let boxes = [];
export let boxTitles = [];

export let unshuffledArray = [];
export let shuffledArray = [];

export let temporaryArray = [];

export let counter = 0;
export let character = 0;

export const formingArrayForMemoryGame = () => {
    counter = vocabular[character].wordCounter;
    let counterTwo = vocabular[character + 1].wordCounter;
    let counterThree = vocabular[character + 2].wordCounter;

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

export const renderBoxes = () => {
    let template = ``;
    shuffledArray.forEach((el) => {
        template += `
        <div class="box" data-val="${el}" >
        <div class="front square">
            <h2>${el[0]}<span>${el[0].toLowerCase()}</span></h2>
            <p class="boxTitle">${el}</p>
            <img src="assets/img/${el}.png" alt="${el}" />
            </div>
            <div class="back square">
            <img src="assets/gif/questionMark.gif" alt="question mark gif" />
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
        inout.play();
        setTimeout(() => {
            box.classList.remove('active');
        }, 450);

        box.addEventListener('click', (e) => {
            if (box.classList.contains('correct')) {
                return;
            }
            box.classList.toggle('active');
            playSoundEffect('open');
            if (box.classList.contains('active')) {
                temporaryArray.push(box.dataset.val);
            } else {
                temporaryArray = [];
            }

            if (temporaryArray.length == 2) {
                if (temporaryArray[0] === temporaryArray[1]) {
                    for (let b of boxes) {
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
                        for (let b of boxes) {
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
                    for (let word of vocabular) {
                        word.wordCounter++;
                        if (word.words.length <= word.wordCounter) {
                            word.wordCounter = 0;
                        }
                    }
                }
                unshuffledArray = [];
                formingArrayForMemoryGame();
                setTimeout(() => {
                    for (let b of boxes) {
                        b.remove();
                    }
                    renderBoxes();
                }, 700);
            }
        });
    }
};
