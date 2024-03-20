import { vocabular } from '../../data/data.js';
import { randomButton, randomiseButton, arrows } from './buttons.js';
import { playAudio, playSoundEffect, audio } from './sounds.js';
import { animatingElements } from './animating-elements.js';
import { setCharacter } from './change-letter.js';

export const displayWord = document.querySelector('h3');
export const letter = document.querySelector('h1');
export const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
export const azbukaArr = azbuka.split('');
export const img = document.querySelector('img');

export const wrapper = document.querySelector('.wrapper');
export const letterSection = document.querySelector('.letterSection');
export const illustration = document.querySelector('.illustration');

const randomiseButtonText = randomiseButton.children[0];

export let characterNumber = 0;
export let timer = 0;
export let counter = 0;
export let stopLetter = '';
export let charactersAreShuffled = false;

export const stopRandomButton = () => {
	clearInterval(timer);
	randomButton.innerHTML = 'КРЕНИ';
	randomButton.classList.add('start');
	audio.src = '';
	randomiseButton.classList.remove('active');
};

export const randomizingLetter = () => {
	charactersAreShuffled = true;
	letter.innerHTML = azbukaArr[characterNumber] + `<span>${azbukaArr[characterNumber].toLowerCase()}</span>`;
	displayWord.innerHTML = vocabular[characterNumber].words[0].name;
	img.src = `assets/img/${vocabular[characterNumber].words[0].bind}.png`;

	characterNumber++;
	if (characterNumber === azbukaArr.length) {
		characterNumber = 0;
	}
};

export const startStop = () => {
	randomButton.classList.toggle('start');
	randomiseButton.classList.toggle('active');
	playSoundEffect('randomClick');

	if (randomiseButton.classList.contains('active')) {
		randomiseButtonText.innerHTML = 'СТАНИ';
		arrows.forEach((arrow) => arrow.classList.add('hide'));
	} else {
		randomiseButtonText.innerHTML = '?';
		arrows.forEach((arrow) => arrow.classList.remove('hide'));
		setCharacter(characterNumber - 1);
	}

	if (randomButton.classList.contains('start')) {
		randomButton.innerHTML = 'КРЕНИ';
		clearInterval(timer);
		stopLetter = letter.textContent[0];
		animatingElements(letter, img, displayWord);

		for (let word of vocabular) {
			if (word.wordCounter > word.words.length - 1) {
				word.wordCounter = 0;
			}
			if (word.words[0].name.charAt(0) == stopLetter) {
				counter = word.wordCounter;
				img.src = `assets/img/${word.words[0].bind}.png`;
				img.alt = word.words[0].name;
				displayWord.innerHTML = word.words[0].name;
				playAudio(word.words[0].bind);
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
