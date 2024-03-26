import { vocabular } from '../../data/data.js';
import { PATHS } from './paths.js';
import { playSoundEffect, soundEffects } from './sounds.js';

const memoryGame = document.querySelector('.memoryGame');
const progressBar = document.querySelector('.progressBar');
const progressValue = document.querySelector('.progressValue');

const boxesContainer = document.querySelector('#boxes');

const playAgainButton = document.querySelector('#playAgainBtn');
const timeCounter = document.querySelector('#counterTimer');
const bonusTime = document.querySelector('#bonusTime');
const scoreBoard = {
	bestScore: document.querySelector('#bestScore').children[0],
	totalScore: document.querySelector('#totalScore').children[0],
};
const scores = document.querySelector('#scores');

let boxes = [];
let boxTitles = [];
let unshuffledArray = [];
let shuffledArray = [];
let openedBoxes = [];
let timeouts = [];

let score = 0;
let totalScore = 0;
let time = 0;
let hideSolutionTime = 0;

export const showGameElements = () => {
	memoryGame.classList.add('active');
	progressBar.classList.add('active');
	progressBar.addEventListener('animationend', () => {
		scores.classList.add('active');
	});
};
export const hideGameElements = () => {
	memoryGame.classList.remove('active');
	progressBar.classList.remove('active');
	scores.classList.remove('active');
};

export const startGame = () => {
	settingGameStart();
	startTimer();
	formingArrayForMemoryGame(4);
	renderBoxes();
};

export const clearTimeouts = () => {
	timeouts.forEach((timeout) => clearInterval(timeout));
};

playAgainButton.addEventListener('click', () => {
	startGame();
});

const setTimeToMinutes = () => {
	const minutes = Math.floor(time / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (time % 60).toString().padStart(2, '0');
	timeCounter.innerHTML = `${minutes}:${seconds}`;
};

const gameOver = () => {
	progressValue.style.width = `100%`;
	progressBar.classList.add('wrong');
	let gameOverTimeout = setTimeout(() => {
		soundEffects.timeIsUp.play();
		for (let box of boxes) {
			if (!box.classList.contains('correct')) {
				box.classList.remove('shaking');
				box.classList.add('rotatingDisappearance');
				box.addEventListener('animationend', () => {
					box.classList.add('gone');
					progressBar.classList.remove('wrong');
					progressValue.style.width = `5%`;
					playAgainButton.classList.add('show');
					boxesContainer.classList.add('gameOver');
					totalScore = 0;
					scoreBoard.totalScore.innerHTML = totalScore;
				});
			}
		}
	}, 2000);
	timeouts.push(gameOverTimeout);
};

const settingGameStart = () => {
	if (localStorage.getItem('bestScore')) {
		scoreBoard.bestScore.innerHTML = localStorage.getItem('bestScore');
	} else {
		scoreBoard.bestScore.innerHTML = 0;
	}
	playAgainButton.classList.remove('show');
	progressBar.classList.remove('wrong');
	boxesContainer.classList.remove('gameOver');
	progressValue.style.width = `5%`;
	openedBoxes = [];
	hideSolutionTime = 600;
	totalScore = 0;
	scoreBoard.totalScore.innerHTML = totalScore;
	score = 0;
	time = 15;
	// time = 4500;
	setTimeToMinutes();
};

const startTimer = () => {
	let tickingInterval = setInterval(() => {
		time--;
		setTimeToMinutes();
		if (time <= 0) {
			clearInterval(tickingInterval);
			setBestScore();
			for (let box of boxes) showSolution(box, false);
			gameOver();
			return;
		}
	}, 1000);
	timeouts.push(tickingInterval);
};

const setBestScore = () => {
	if (!localStorage.getItem('bestScore')) {
		localStorage.setItem('bestScore', totalScore);
		scoreBoard.bestScore.innerHTML = totalScore;
	}
	if (localStorage.getItem('bestScore') && localStorage.getItem('bestScore') < totalScore) {
		localStorage.setItem('bestScore', totalScore);
		scoreBoard.bestScore.innerHTML = totalScore;
	}
};

const formingArrayForMemoryGame = (numberOfPairs) => {
	let numberOfDifferentWords = numberOfPairs / 2;
	let selectedWordsObj = {};
	let selectedWordsArray = [];
	for (let i = 0; i < numberOfDifferentWords; i++) {
		let randomNumber = Math.floor(Math.random() * 30);
		for (let j = 0; j < vocabular[randomNumber].words.length; j++) {
			if (!selectedWordsObj[vocabular[randomNumber].words[j].bind]) {
				selectedWordsObj[vocabular[randomNumber].words[j].bind] = true;
				selectedWordsArray.push(vocabular[randomNumber].words[j]);
				break;
			}
		}
	}
	unshuffledArray = selectedWordsArray.concat(selectedWordsArray);
	shuffledArray = unshuffledArray
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
};

const renderBoxes = () => {
	let template = ``;
	shuffledArray.forEach((word) => {
		const firstLetter = word.name[0];
		template += `
        <div class="box" data-val="${word.bind}" >
        <div class="front square">
            <h2>${firstLetter}<span>${firstLetter.toLowerCase()}</span></h2>
            <p class="boxTitle">${word.name}</p>
            <img src="${PATHS.illustrations.memoryGame}/${word.bind}.png" alt="${word.name}" />
            </div>
            <div class="back square">
            <img src="${PATHS.gif}/questionMark.gif" alt="question mark gif" />
         </div>
        </div>
        `;
	});
	boxesContainer.innerHTML = template;
	boxes = document.querySelectorAll('.box');
	boxTitles = document.querySelectorAll('.boxTitle');

	if (boxes.length > 0) clickingOnBoxes();
};

const showSolution = (box, hideSolution) => {
	box.classList.add('active');
	if (box.children[0].classList.contains('pulsingRed')) return;
	if (hideSolution) {
		soundEffects.show.play();
		let hideSolutionTimeout = setTimeout(() => {
			box.classList.remove('active');
			soundEffects.hide.play();
		}, hideSolutionTime);
		timeouts.push(hideSolutionTimeout);
	} else {
		revealSolutionFor(box);
	}
};

const revealSolutionFor = (box) => {
	soundEffects.wrong.play();
	box.classList.add('shaking');
	box.children[0].classList.add('pulsingRed');
	timeCounter.classList.add('timeIsUp');
	timeCounter.addEventListener('animationend', () => timeCounter.classList.remove('timeIsUp'));
};

const pairMatches = () => {
	openedBoxes.forEach((box) => {
		box.classList.add('correct');
		box.children[0].classList.add('correct');
	});
	openedBoxes = [];
	playSoundEffect('success');
	score += 2;
	time += 2;
	setTimeToMinutes();
	animateTimeCounter();
	totalScore += 1;
	scoreBoard.totalScore.innerHTML = totalScore;
	increaseProgressBarPercentage();
	setBestScore();
};

const animateTimeCounter = () => {
	timeCounter.classList.add('bonus');
	timeCounter.addEventListener('animationend', () => timeCounter.classList.remove('bonus'));
	bonusTime.innerHTML = `+2`;
	bonusTime.classList.add('fadeOutToTopGreen');
	bonusTime.addEventListener('animationend', () => bonusTime.classList.remove('fadeOutToTopGreen'));
};

const increaseProgressBarPercentage = () => {
	const maxScore = shuffledArray.length;
	let progressPercentage = (score / maxScore) * 100;
	progressValue.style.width = `${progressPercentage}%`;
	progressBar.classList.add('correct');
	if (score === maxScore) {
		let progressValueTimeout = setTimeout(() => {
			progressValue.style.width = `5%`;
		}, 550);
		timeouts.push(progressValueTimeout);
	}
	let progressBarTimeout = setTimeout(() => {
		progressBar.classList.remove('correct');
	}, 250);
	timeouts.push(progressBarTimeout);
};

const pairDoesNotMatch = () => {
	let pairDoesNotMatchTimeout = setTimeout(() => {
		openedBoxes.forEach((box) => {
			if (box.classList.contains('active')) {
				box.classList.remove('active');
				openedBoxes = [];
			}
		});
	}, 400);
	timeouts.push(pairDoesNotMatchTimeout);
};

const goToNextLevel = () => {
	score = 0;
	unshuffledArray = [];
	formingArrayForMemoryGame(shuffledArray.length + 2);
	hideSolutionTime += 30;
	let renderBoxesTimeout = setTimeout(() => {
		renderBoxes();
	}, 700);
	timeouts.push(renderBoxesTimeout);
};

const clickingOnBoxes = () => {
	for (let box of boxes) {
		const maxScore = shuffledArray.length;
		showSolution(box, true);
		box.addEventListener('click', (event) => {
			if (openedBoxes.length == 2) return;
			if (timer === 0) return;
			if (box.classList.contains('correct')) return;
			if (box.children[0].classList.contains('pulsingRed')) return;
			box.classList.toggle('active');
			playSoundEffect('open');
			box.classList.contains('active') ? openedBoxes.push(box) : (openedBoxes = []);
			if (openedBoxes.length == 2) {
				const firstValue = openedBoxes[0].dataset.val;
				const secondValue = openedBoxes[1].dataset.val;
				firstValue === secondValue ? pairMatches() : pairDoesNotMatch();
			}
			if (score === maxScore) goToNextLevel();
		});
	}
};
