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

export const memoryGame = document.querySelector('.memoryGame');
export const inout = new Audio('assets/audio/inout.mp3');

export let boxes = [];
export let boxTitles = [];
export let unshuffledArray = [];
export let shuffledArray = [];
export let temporaryArray = [];

export let intervalId;

export const startTimer = () => {
	temporaryArray = [];
	totalScore = 0;
	score = 0;
	timer = 30;
	intervalId = setInterval(() => {
		timer--;
		console.log(timer);
		if (timer <= 0) {
			clearInterval(intervalId);
			if (!localStorage.getItem('bestScore')) localStorage.setItem('bestScore', totalScore);
			if (localStorage.getItem('bestScore') && localStorage.getItem('bestScore') < totalScore) {
				localStorage.setItem('bestScore', totalScore);
			}
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
	memoryGame.innerHTML = template;
	boxes = document.querySelectorAll('.box');
	boxTitles = document.querySelectorAll('.boxTitle');

	if (boxes.length > 0) clickingOnBoxes();
};

const showSolution = (box) => {
	box.classList.add('active');
	inout.play();
	setTimeout(() => {
		box.classList.remove('active');
	}, 450);
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
	formingArrayForMemoryGame(shuffledArray.length + 4);
	setTimeout(() => {
		renderBoxes();
	}, 700);
};

const clickingOnBoxes = () => {
	for (let box of boxes) {
		const maxScore = shuffledArray.length;
		showSolution(box);
		box.addEventListener('click', (event) => {
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
