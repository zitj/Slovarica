import { vocabular } from '../../data/data.js';
import { playAudio, playSoundEffect, audio } from './sounds.js';

export const progressBar = document.querySelector('.progressBar');
export const progressValue = document.querySelector('.progressValue');

export let countingPairs = 0;
export let score = 0;
export let progressValueCounter = 5;

export const memoryGame = document.querySelector('.memoryGame');
export const inout = new Audio('assets/audio/inout.mp3');

export let boxes = [];
export let boxTitles = [];

export let unshuffledArray = [];
export let shuffledArray = [];

export let temporaryArray = [];

export let counter = 0;
export let character = 0;

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

const clickingOnBoxes = () => {
	for (let box of boxes) {
		showSolution(box);
		box.addEventListener('click', (e) => {
			if (box.classList.contains('correct')) return;
			box.classList.toggle('active');
			playSoundEffect('open');
			if (box.classList.contains('active')) {
				temporaryArray.push(box.dataset.val);
			} else {
				temporaryArray = [];
			}
			if (temporaryArray.length == 2) {
				const maxScore = shuffledArray.length;

				if (temporaryArray[0] === temporaryArray[1]) {
					for (let box of boxes) {
						if (box.dataset.val == temporaryArray[0]) {
							box.classList.add('correct');
							box.children[0].classList.add('correct');
							playAudio('success');
						}
					}
					temporaryArray = [];
					score += 2;
					let progressPercentage = (score / maxScore) * 100;
					console.log('Progress percentage %: ', progressPercentage);
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
				} else {
					setTimeout(() => {
						for (let b of boxes) {
							if (b.classList.contains('active')) {
								b.classList.remove('active');
								temporaryArray = [];
							}
						}
					}, 400);
				}
			}
			// Everything is paired
			if (score == shuffledArray.length) {
				score = 0;
				unshuffledArray = [];
				formingArrayForMemoryGame(shuffledArray.length + 4);
				setTimeout(() => {
					for (let b of boxes) {
						b.remove();
					}
					renderBoxes();
				}, 700);
			}
		});
	}
};
