// change background in every 5s
export const changeAppContainerBG = 
    (appContainerEl: HTMLDivElement, timeout: number): void => {
        appContainerEl.style.backgroundImage = `url(./dist/img/1.webp)`;
        setInterval(() => {
            // generate random imgae number            
            const rand: number = Math.floor(Math.random() * 5) + 1;
            const url: string = `url(./dist/img/${rand}.webp)`
            appContainerEl.style.backgroundImage = url;
        }, timeout)
    }