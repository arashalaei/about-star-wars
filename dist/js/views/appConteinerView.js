// change background in every 5s
export const changeAppContainerBG = (appContainerEl, timeout) => {
    appContainerEl.style.backgroundImage = `url(./dist/img/1.webp)`;
    setInterval(() => {
        // generate random imgae number            
        const rand = Math.floor(Math.random() * 5) + 1;
        const url = `url(./dist/img/${rand}.webp)`;
        appContainerEl.style.backgroundImage = url;
    }, timeout);
};
