export const animatingElements = (a, b, c) => {
    let elements = [a, b, c];
    for (let element of elements) {
        element.classList.add('animate');
        element.addEventListener('animationend', () => {
            element.classList.remove('animate');
        });
    }
};
