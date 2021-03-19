import { img, displayWord, letter, azbukaArr } from './randomising-letter.js';
import { playAudio, playSoundEffect } from './sounds.js';
import { animatingElements } from './animating-elements.js';

export const changeLetter = (data, dataCounter, actualCounter) => {
    if (data[dataCounter].wordCounter > data[dataCounter].words.length - 1) {
        data[dataCounter].wordCounter = 0;
        actualCounter = 0;
    } else {
        actualCounter = data[dataCounter].wordCounter;
    }

    letter.innerHTML =
        azbukaArr[dataCounter] +
        `<span>${azbukaArr[dataCounter].toLowerCase()}</span>`;
    displayWord.innerHTML = data[dataCounter].words[actualCounter];
    img.src = `img/${data[dataCounter].words[actualCounter]}.png`;
    img.alt = data[dataCounter].words[actualCounter];
    playSoundEffect('click');
    playAudio(data[dataCounter].words[actualCounter]);
    animatingElements(letter, img, displayWord);
};
