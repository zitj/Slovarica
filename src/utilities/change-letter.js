import { img, displayWord, letter, azbukaArr } from './randomising-letter.js';
import { playAudio, playSoundEffect } from './sounds.js';
import { animatingElements } from './animating-elements.js';
import { vocabular } from '../../data/data.js';
import { navButtons } from './buttons.js';
import { PATHS } from './paths.js';

export let characterID = 0;
export let counter = 0;

export const changeLetter = () => {
	const currentLetter = azbukaArr[characterID];
	const currentWord = vocabular[characterID].words[0];

	letter.innerHTML = currentLetter + `<span>${currentLetter.toLowerCase()}</span>`;
	displayWord.innerHTML = currentWord.name;
	img.src = `${PATHS.illustrations.centered}/${currentWord.bind}.png`;
	img.alt = currentWord.name;
	playAudio(currentWord.bind);
	animatingElements(letter, img, displayWord);
	playSoundEffect('click');
};

export const setDefaultLetter = () => {
	characterID = 0;
	const defaultLetter = azbukaArr[characterID];
	const defaultWord = vocabular[characterID].words[0];

	letter.innerHTML = defaultLetter + `<span>${defaultLetter.toLowerCase()}</span>`;
	displayWord.innerHTML = defaultWord.name;
	img.src = `${PATHS.illustrations.centered}/${defaultWord.bind}.png`;
	img.alt = defaultWord.name;
	playAudio(defaultWord.bind);
	animatingElements(letter, img, displayWord);
};

export const setCharacter = (randomCharacter) => (characterID = randomCharacter);

export const forward = () => {
	if (!navButtons.lecture.classList.contains('active')) return;
	characterID++;
	if (characterID === azbukaArr.length) characterID = 0;
	changeLetter();
};

export const backward = () => {
	if (!navButtons.lecture.classList.contains('active')) return;
	characterID--;
	if (characterID == -1) characterID = azbukaArr.length - 1;
	changeLetter();
};
