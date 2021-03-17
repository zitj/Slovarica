import { animatingElements } from './animating-elements.js';
import { playAudio } from './sounds.js';

export const defaultLetter = (
    character,
    letter,
    img,
    displayWord,
    vocabular,
    audio,
    azbukaArr
) => {
    character = 0;
    letter.innerHTML =
        azbukaArr[character] +
        `<span>${azbukaArr[character].toLowerCase()}</span>`;
    displayWord.innerHTML = vocabular[character].words[0];
    img.src = `img/${vocabular[character].words[0]}.png`;
    img.alt = vocabular[character].words[0];
    playAudio(audio, vocabular[character].words[0]);

    vocabular.forEach((array) => {
        array.wordCounter = 0;
    });

    animatingElements(letter, img, displayWord);
};
