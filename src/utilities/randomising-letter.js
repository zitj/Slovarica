import { vocabular } from '../../data/data.js';
import { randomiseButton, arrows } from './buttons.js';
import { playAudio, playSoundEffect, audio } from './sounds.js';
import { animatingElements } from './animating-elements.js';
import { setCharacter } from './change-letter.js';
import { PATHS } from './paths.js';

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

export const stopRandomButton = () => {
	clearInterval(timer);
	audio.src = '';
	randomiseButton.classList.remove('active');
	randomiseButtonText.innerHTML = '?';
	arrows.forEach((arrow) => arrow.classList.remove('hide'));
};

export const randomizingLetter = () => {
	if (characterNumber === azbukaArr.length) characterNumber = 0;
	let randomisedLetter = azbukaArr[characterNumber];
	let randomisedWord = vocabular[characterNumber].words[0];
	letter.innerHTML = randomisedLetter + `<span>${randomisedLetter.toLowerCase()}</span>`;
	displayWord.innerHTML = randomisedWord.name;
	characterNumber++;
};

export const startAndStopRandomising = () => {
	randomiseButton.classList.toggle('active');
	playSoundEffect('randomClick');
	let shuffleIsOn = randomiseButton.classList.contains('active') ? true : false;

	if (shuffleIsOn) {
		randomiseButtonText.innerHTML = 'СТАНИ';
		playAudio('shuffle', true);
		const gif = new Image();
		gif.src = `${PATHS.gif}/randomise.gif`;
		img.src = gif.src;
		timer = setInterval(randomizingLetter, 80);
		arrows.forEach((arrow) => arrow.classList.add('hide'));
	} else {
		stopRandomButton();
		// stopLetter = letter.textContent[0];
		animatingElements(letter, img, displayWord);
		let randomisedCharacterNumber = characterNumber == 0 ? 0 : characterNumber - 1;
		setCharacter(randomisedCharacterNumber);
		const randomisedWord = vocabular[randomisedCharacterNumber].words[0];
		img.src = `${PATHS.illustrations.centered}/${randomisedWord.bind}.png`;
		playAudio(randomisedWord.bind);
	}
};
