const azbuka = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ';
const azbukaArr = azbuka.split('');

const letter = document.querySelector('h1');
let stop = false;

for (let i = 0; i < azbukaArr.length; i++) {}

let character = 0;
let timer = setInterval(onTick, 100);

function onTick() {
    letter.innerHTML = azbukaArr[character];
    character++;
    if (character === azbukaArr.length) {
        character = 0;
    }
}
