/**
 * in here there are some useful component such:
 * list , add / remocve loader and add header to the container
 */
export const listItem = (content, classes = '') => `
    <li class='${classes}'>${content}</li>
`;
export const list = (content, classes = '') => `
    <ul class='${classes} list'>${content}</ul>
`;
export const addHeader = (container, name) => {
    container.insertAdjacentHTML('afterbegin', `<h1>${name}</h1>`);
};
export const addLoader = (container) => {
    container.insertAdjacentHTML('beforeend', `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
};
export const removeLoader = () => {
    document.querySelector('.lds-ring').remove();
};
