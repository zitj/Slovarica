export const loadImagesContainer = document.querySelector(
    '.loadImagesContainer'
);

export const loadAllImages = (data) => {
    let template = '';

    data.forEach((array) => {
        array.words.forEach((word) => {
            template += `
                <img src="assets/img/${word}.png">
            `;
        });
        loadImagesContainer.innerHTML = template;
    });
};