import { vocabular } from '../../data/data.js';
import { playAudio, playSoundEffect, audio } from './sounds.js';

export const progressBar = document.querySelector('.progressBar');
export const progressValue = document.querySelector('.progressValue');

export let countingPairs = 0;
export let score = 0;
export let totalScore = 0;
export let progressValueCounter = 5;
export let counter = 0;
export let character = 0;
let timer = 0;
let hideSolutionTime = 0;

export const memoryGame = document.querySelector('.memoryGame');
export const boxesContainer = document.querySelector('#boxes');
const timeCounter = document.querySelector('#timer').children[0];
const scoreBoard = {
	bestScore: document.querySelector('#bestScore').children[0],
	totalScore: document.querySelector('#totalScore').children[0],
};
export const inout = new Audio('assets/audio/inout.mp3');

const sounds = {
	show: new Audio('assets/audio/show.mp3'),
	hide: new Audio('assets/audio/hide.mp3'),
	timeIsUp: new Audio('assets/audio/time-is-up.mp3'),
	wrong: new Audio('assets/audio/wrong.mp3'),
};

export let boxes = [];
export let boxTitles = [];
export let unshuffledArray = [];
export let shuffledArray = [];
export let temporaryArray = [];

export let intervalId;

export const startTimer = () => {
	if (localStorage.getItem('bestScore')) scoreBoard.bestScore.innerHTML = localStorage.getItem('bestScore');
	temporaryArray = [];
	hideSolutionTime = 450;
	totalScore = 0;
	scoreBoard.totalScore.innerHTML = totalScore;
	score = 0;
	timer = 5;
	intervalId = setInterval(() => {
		timer--;
		const minutes = Math.floor(timer / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (timer % 60).toString().padStart(2, '0');
		console.log(`${minutes}:${seconds}`);
		timeCounter.innerHTML = `${minutes}:${seconds}`;
		if (timer <= 0) {
			clearInterval(intervalId);
			if (!localStorage.getItem('bestScore')) localStorage.setItem('bestScore', totalScore);
			if (localStorage.getItem('bestScore') && localStorage.getItem('bestScore') < totalScore) {
				localStorage.setItem('bestScore', totalScore);
			}
			progressValue.style.width = `100%`;
			progressBar.classList.add('wrong');
			for (let box of boxes) {
				showSolution(box, false);
			}
			setTimeout(() => {
				sounds.timeIsUp.play();
				for (let box of boxes) {
					box.classList.remove('shaking');
					box.classList.add('rotatingDisappearance');
					box.addEventListener('animationend', () => {
						box.classList.add('gone');
						progressBar.classList.remove('wrong');
						progressValue.style.width = `5%`;
					});
				}
			}, 2000);
			console.log(`Time is up! Total score: ${totalScore}, Best score: ${localStorage.getItem('bestScore')}`);
			return;
		}
	}, 1000);
};
export const stopTimer = () => {
	clearInterval(intervalId);
};

export const formingArrayForMemoryGame = (numberOfPairs) => {
	let numberOfDifferentWords = numberOfPairs / 2;
	let selectedWordsObj = {};
	let selectedWordsArray = [];
	for (let i = 0; i < numberOfDifferentWords; i++) {
		// let randomNumber = Math.floor(Math.random() * 30);
		for (let j = 0; j < vocabular[i].words.length; j++) {
			if (!selectedWordsObj[vocabular[i].words[j].bind]) {
				selectedWordsObj[vocabular[i].words[j].bind] = true;
				selectedWordsArray.push(vocabular[i].words[j]);
				break;
			}
		}
	}
	console.log(selectedWordsArray);
	unshuffledArray = selectedWordsArray.concat(selectedWordsArray);
	shuffledArray = unshuffledArray
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
};

export const renderBoxes = () => {
	let template = ``;
	shuffledArray.forEach((word) => {
		const firstLetter = word.name[0];
		template += `
        <div class="box" data-val="${word.bind}" >
        <div class="front square">
            <h2>${firstLetter}<span>${firstLetter.toLowerCase()}</span></h2>
            <p class="boxTitle">${word.name}</p>
            <img src="assets/img/${word.bind}.png" alt="${word.name}" />
            </div>
            <div class="back square">
            <img src="assets/gif/questionMark.gif" alt="question mark gif" />
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
	if (hideSolution) {
		sounds.show.play();
		hideSolutionTime += 5;
		setTimeout(() => {
			box.classList.remove('active');
			sounds.hide.play();
		}, hideSolutionTime);
	} else {
		sounds.wrong.play();
		box.classList.add('shaking');
		box.children[0].classList.add('pulsingRed');
	}
};

const pairMatches = () => {
	const maxScore = shuffledArray.length;
	temporaryArray.forEach((box) => {
		box.classList.add('correct');
		box.children[0].classList.add('correct');
	});
	playAudio('success');
	temporaryArray = [];
	score += 2;
	timer += 2;
	totalScore += 1;
	scoreBoard.totalScore.innerHTML = totalScore;

	let progressPercentage = (score / maxScore) * 100;
	progressValue.style.width = `${progressPercentage}%`;
	progressBar.classList.add('correct');
	if (score === maxScore) {
		setTimeout(() => {
			progressValue.style.width = `5%`;
		}, 550);
	}
	setTimeout(() => {
		progressBar.classList.remove('correct');
	}, 250);
};

const pairDoesNotMatch = () => {
	setTimeout(() => {
		temporaryArray.forEach((box) => {
			if (box.classList.contains('active')) {
				box.classList.remove('active');
				temporaryArray = [];
			}
		});
	}, 400);
};

const goToNextLevel = () => {
	score = 0;
	unshuffledArray = [];
	formingArrayForMemoryGame(shuffledArray.length + 2);
	setTimeout(() => {
		renderBoxes();
	}, 700);
};

const clickingOnBoxes = () => {
	for (let box of boxes) {
		const maxScore = shuffledArray.length;
		showSolution(box, true);
		box.addEventListener('click', (event) => {
			if (timer === 0) return;
			if (box.classList.contains('correct')) return;
			box.classList.toggle('active');
			playSoundEffect('open');
			box.classList.contains('active') ? temporaryArray.push(box) : (temporaryArray = []);
			if (temporaryArray.length == 2) {
				const firstValue = temporaryArray[0].dataset.val;
				const secondValue = temporaryArray[1].dataset.val;
				firstValue === secondValue ? pairMatches() : pairDoesNotMatch();
			}
			if (score === maxScore) goToNextLevel();
		});
	}
};
