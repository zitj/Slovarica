const soundEffects = [
    'inout',
    'open',
    'click',
    'randomClick',
    'sectionClick',
    'shuffle',
    'success',
];

const preloadEachAudio = (name) => {
    let audio = new Audio(`../../audio/${name}.mp3`);
    audio.volume = 0;
    return audio.play();
};

export const loadAllAudio = (data) => {
    data.forEach((array) => {
        array.words.forEach((word) => {
            word = {
                name: word,
                playAudio: function () {
                    preloadEachAudio(this.name);
                },
            };
            word.playAudio();
        });
    });
    soundEffects.forEach((sound) => {
        sound = {
            name: sound,
            playAudio: function () {
                preloadEachAudio(this.name);
            },
        };
        sound.playAudio();
    });
};
