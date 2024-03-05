import { vocabular } from '../data/data.js';
import { animatingElements } from './utilities/animating-elements.js';
import { playSoundEffect } from './utilities/sounds.js';
import { sectionButtons, randomButton, logo, leftArrow, rightArrow, arrowButtons } from './utilities/buttons.js';
import { loadingScreen } from './utilities/loading-screen.js';
import { defaultLetter, forward, backward } from './utilities/change-letter.js';
import { wrapper, letterSection, illustration, displayWord, letter, azbukaArr, img, stopRandomButton, startStop } from './utilities/randomising-letter.js';

import { memoryGame, formingArrayForMemoryGame, renderBoxes, progressBar, progressValue, shuffledArray, startTimer, intervalId, unshuffledArray, score, stopTimer } from './utilities/memory-game.js';

const span = document.querySelector('span');
let stopLetter = '';
randomButton.style.display = 'none';
let timerInterval;

//Keyboard
const isKeyPressed = {
	a: false,
};

//Application
letter.innerHTML = azbukaArr[0] + `<span>${azbukaArr[0].toLowerCase()}</span>`;
img.src = `assets/img/${vocabular[0].words[0].bind}.png`;
img.alt = vocabular[0].words[0].name;

let counter = 0;
let character = 0;
// let timer;

// Navigation (adding and removing elements)
const classRemover = () => {
	for (let sectionButton of sectionButtons) {
		sectionButton.classList.remove('active');
	}
};

// SECTIONS
for (let sectionButton of sectionButtons) {
	sectionButton.addEventListener('click', () => {
		playSoundEffect('sectionClick');
		stopTimer();
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
			wrapper.classList.add('game');
			startTimer();
			formingArrayForMemoryGame(4);
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

const startApp = () => {
	animatingElements(letter, img, displayWord);
	defaultLetter(vocabular);
};

const endLoadingScreen = () => {
	startApp();
	wrapper.style.opacity = 0;
	setTimeout(() => {
		loadingScreen.style.opacity = 0;
		loadingScreen.style.zIndex = -10;
		wrapper.style.opacity = 1;
	}, 500);
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
