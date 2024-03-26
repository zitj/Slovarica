import { vocabular } from '../data/data.js';
import { animatingElements } from './utilities/animating-elements.js';
import { audio, playSoundEffect } from './utilities/sounds.js';
import { sectionButtons, logo, leftArrow, rightArrow, arrowButtons, navButtons, randomiseButton } from './utilities/buttons.js';
import { loadingScreen } from './utilities/loading-screen.js';
import { setDefaultLetter, forward, backward } from './utilities/change-letter.js';
import { wrapper, letterSection, illustration, displayWord, letter, azbukaArr, img, startAndStopRandomising, stopRandomButton } from './utilities/randomising-letter.js';
import { clearTimeouts, hideGameElements, showGameElements, startGame } from './utilities/memory-game.js';

//Keyboard
const isKeyPressed = {
	a: false,
};

//Application
letter.innerHTML = azbukaArr[0] + `<span>${azbukaArr[0].toLowerCase()}</span>`;
img.src = `assets/img-game-cards/${vocabular[0].words[0].bind}.png`;
img.alt = vocabular[0].words[0].name;

// Navigation (adding and removing elements)
const classRemover = () => {
	for (let sectionButton of sectionButtons) {
		sectionButton.classList.remove('active');
	}
};

const lecturePageActive = () => {
	if (navButtons.lecture.classList.contains('active')) {
		setDefaultLetter();
		arrowButtons.style.display = 'flex';
		letterSection.style.display = 'flex';
		illustration.style.display = 'flex';
	}
};

const gamePageActive = () => {
	if (navButtons.games.classList.contains('active')) {
		stopRandomButton();
		letterSection.style.display = 'none';
		illustration.style.display = 'none';
		vocabular.forEach((el) => (el.wordCounter = 0));
		wrapper.classList.add('game');
		showGameElements();
		startGame();
	} else {
		hideGameElements();
		wrapper.classList.remove('game');
	}
};

// SECTIONS
for (let sectionButton of sectionButtons) {
	sectionButton.addEventListener('click', () => {
		audio.pause();
		playSoundEffect('sectionClick');
		clearTimeouts();
		classRemover();
		sectionButton.classList.add('active');
		lecturePageActive();
		gamePageActive();
	});
}

const startApp = () => {
	animatingElements(letter, img, displayWord);
	setDefaultLetter();
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
leftArrow.addEventListener('click', backward);
rightArrow.addEventListener('click', forward);
randomiseButton.addEventListener('click', startAndStopRandomising);
logo.addEventListener('click', () => {
	location.reload();
});

//Triggers on Keyboard
document.body.onkeyup = function (keyUpEvent) {
	if (keyUpEvent.keyCode === 32) startAndStopRandomising();
};

document.onkeydown = (keyDownEvent) => {
	isKeyPressed[keyDownEvent.key] = true;
	keyDownEvent.preventDefault();
	if (keyDownEvent.key == 'ArrowLeft') backward();
	if (keyDownEvent.key == 'ArrowRight') forward();
};

endLoadingScreen();
