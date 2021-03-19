export const audio = document.getElementById('my_audio');

export const playAudio = (sound, loop) => {
    audio.src = `audio/${sound}.mp3`;
    audio.loop = loop;

    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then((_) => {}).catch((error) => {});
    }
};

export const playSoundEffect = (soundEffect) => {
    let sound = new Audio(`audio/${soundEffect}.mp3`);
    sound.play();
};
