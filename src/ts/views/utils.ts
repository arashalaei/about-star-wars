/**
 * in here there are some useful component such: 
 * list , add / remocve loader and add header to the container 
 */

export const listItem = (content: string, classes: string = '') => `
    <li class='${classes}'>${content}</li>
`;

export const list = (content: string, classes: string = '') => `
    <ul class='${classes} list'>${content}</ul>
`;

export const addHeader = (container: HTMLElement, name: string) =>{
    container.insertAdjacentHTML('afterbegin',  `<h1>${name}</h1>`);
}

export const addLoader = (container: HTMLElement) =>{
    container.insertAdjacentHTML('beforeend',  `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
}

export const removeLoader = () => {
    document.querySelector('.lds-ring')!.remove();
}