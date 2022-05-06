"use strict";
/**
 * in here there are some useful component such:
 * list , add / remocve loader and add header to the container
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLoader = exports.addLoader = exports.addHeader = exports.list = exports.listItem = void 0;
const listItem = (content, classes = '') => `
    <li class='${classes}'>${content}</li>
`;
exports.listItem = listItem;
const list = (content, classes = '') => `
    <ul class='${classes} list'>${content}</ul>
`;
exports.list = list;
const addHeader = (container, name) => {
    container.insertAdjacentHTML('afterbegin', `<h1>${name}</h1>`);
};
exports.addHeader = addHeader;
const addLoader = (container) => {
    container.insertAdjacentHTML('beforeend', `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
};
exports.addLoader = addLoader;
const removeLoader = () => {
    document.querySelector('.lds-ring').remove();
};
exports.removeLoader = removeLoader;
