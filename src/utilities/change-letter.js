import { img, displayWord, letter, azbukaArr } from './randomising-letter.js';
import { playAudio, playSoundEffect } from './sounds.js';
import { animatingElements } from './animating-elements.js';
import { vocabular } from '../../data/data.js';
import { sectionButtons } from './buttons.js';

export let character = 0;
export let counter = 0;

export const changeLetter = (data, dataCounter, actualCounter) => {
	if (data[dataCounter].wordCounter > data[dataCounter].words.length - 1) {
		data[dataCounter].wordCounter = 0;
		actualCounter = 0;
	} else {
		actualCounter = data[dataCounter].wordCounter;
	}

	letter.innerHTML = azbukaArr[dataCounter] + `<span>${azbukaArr[dataCounter].toLowerCase()}</span>`;
	displayWord.innerHTML = data[dataCounter].words[actualCounter].name;
	img.src = `assets/img/${data[dataCounter].words[actualCounter].bind}.png`;
	img.alt = data[dataCounter].words[actualCounter].name;
	playSoundEffect('click');
	playAudio(data[dataCounter].words[actualCounter].bind);
	animatingElements(letter, img, displayWord);
};

export const defaultLetter = (data) => {
	character = 0;
	letter.innerHTML = azbukaArr[character] + `<span>${azbukaArr[character].toLowerCase()}</span>`;
	displayWord.innerHTML = data[character].words[0].name;
	img.src = `assets/img/${data[character].words[0].bind}.png`;
	img.alt = data[character].words[0].name;
	playAudio(data[character].words[0].bind);

	data.forEach((array) => {
		array.wordCounter = 0;
	});

	animatingElements(letter, img, displayWord);
};

export const forward = () => {
	if (sectionButtons[2].classList.contains('active') || sectionButtons[1].classList.contains('active')) {
		return;
	}
	character++;

	if (character === azbukaArr.length) {
		character = 0;
		for (let word of vocabular) {
			word.wordCounter++;
		}
	}

	changeLetter(vocabular, character, counter);
};

// Arrow back
export const backward = () => {
	if (sectionButtons[2].classList.contains('active') || sectionButtons[1].classList.contains('active')) {
		return;
	}
	character--;
	if (character == -1) {
		character = azbukaArr.length - 1;
	}

	changeLetter(vocabular, character, counter);
};
