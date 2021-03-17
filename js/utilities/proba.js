export const nav = document.querySelector('nav');
export const sectionButtons = nav.querySelectorAll('a');

export const classRemover = () => {
    for (let sectionButton of sectionButtons) {
        sectionButton.classList.remove('active');
    }
};

export const sections = () => {
    sectionButtons.forEach((el) => {
        console.log(el);
    });
    // for (let sectionButton of sectionButtons) {
    //     sectionButton.addEventListener('click', () => {
    //         playSoundEffect('sectionClick');
    //         classRemover();
    //         sectionButton.classList.add('active');

    //         if (sectionButtons[1].classList.contains('active')) {
    //             randomButton.style.display = 'block';
    //             arrowButtons.style.display = 'none';
    //             defaultLetter();
    //         } else {
    //             randomButton.style.display = 'none';
    //             stopRandomButton();
    //         }

    //         if (sectionButtons[0].classList.contains('active')) {
    //             defaultLetter();
    //             arrowButtons.style.display = 'flex';
    //         }

    //         if (sectionButtons[2].classList.contains('active')) {
    //             letterSection.style.display = 'none';
    //             illustration.style.display = 'none';
    //             memoryGame.classList.add('active');
    //             progressBar.classList.add('active');
    //             score = 0;
    //             character = 0;
    //             progressValue.style.width = `5%`;
    //             progressValueCounter = 5;
    //             wrapper.classList.add('game');
    //             formingArrayForMemoryGame();
    //             renderBoxes();
    //         } else {
    //             letterSection.style.display = 'flex';
    //             illustration.style.display = 'flex';
    //             memoryGame.classList.remove('active');
    //             progressBar.classList.remove('active');
    //             wrapper.classList.remove('game');
    //         }
    //     });
    // }
};
