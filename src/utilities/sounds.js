import { PATHS } from './paths.js';

export const audio = document.getElementById('my_audio');

export const soundEffects = {
	show: new Audio(`${PATHS.soundEffects}/show.mp3`),
	hide: new Audio(`${PATHS.soundEffects}/hide.mp3`),
	timeIsUp: new Audio(`${PATHS.soundEffects}/time-is-up.mp3`),
	wrong: new Audio(`${PATHS.soundEffects}/wrong.mp3`),
	open: new Audio(`${PATHS.soundEffects}/open.mp3`),
};

export const playAudio = (sound, loop) => {
	audio.src = loop ? `${PATHS.soundEffects}/${sound}.mp3` : `${PATHS.voice}/${sound}.mp3`;
	audio.loop = loop;

	let playPromise = audio.play();
	if (playPromise !== undefined) {
		playPromise.then((_) => {}).catch((error) => {});
	}
};

export const playSoundEffect = (fileName) => {
	const sound = new Audio(`${PATHS.soundEffects}/${fileName}.mp3`);
	sound.play();
};
