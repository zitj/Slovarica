import { audio } from './sounds.js';

export const arrowButtons = document.querySelector('.arrowButtons');
export const leftArrow = arrowButtons.querySelector('.arrowLeft');
export const rightArrow = arrowButtons.querySelector('.arrowRight');

export const nav = document.querySelector('nav');
export const logo = document.querySelector('.logo');
export const sectionButtons = nav.querySelectorAll('a');

export const randomButton = document.querySelector('.start');

export const stopRandomButton = (tim) => {
    clearInterval(tim);
    randomButton.innerHTML = 'КРЕНИ';
    randomButton.classList.add('start');
    audio.src = '';
};
