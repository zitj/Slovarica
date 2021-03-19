import { vocabular } from '../../data/data.js';
import { randomButton } from './buttons.js';
import { playAudio, playSoundEffect } from './sounds.js';
import { animatingElements } from './animating-elements.js';

export const displayWord = document.querySelector('h3');
export const letter = document.querySelector('h1');
export const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
export const azbukaArr = azbuka.split('');
export const img = document.querySelector('img');

export const wrapper = document.querySelector('.wrapper');
export const letterSection = document.querySelector('.letterSection');
export const illustration = document.querySelector('.illustration');
export const memoryGame = document.querySelector('.memoryGame');

export let character = 0;
export let timer = 0;
export let counter = 0;
export let stopLetter = '';

export const randomizingLetter = () => {
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

export const startStop = () => {
    randomButton.classList.toggle('start');
    playSoundEffect('randomClick');

    if (randomButton.classList.contains('start')) {
        randomButton.innerHTML = 'КРЕНИ';
        clearInterval(timer);
        stopLetter = letter.textContent[0];
        animatingElements(letter, img, displayWord);

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
        playAudio('shuffle', true);
        //randomize letter
        timer = setInterval(randomizingLetter, 80);
        randomButton.innerHTML = 'СТАНИ';
    }
};
