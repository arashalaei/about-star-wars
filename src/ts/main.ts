import Dom from "./models/Dom.js";
import { addHeader } from './views/utils.js';
import { changeAppContainerBG } from './views/appConteinerView.js';
import Movies from "./models/Movies.js";
import StarShips from './models/StarShips.js';
import Pagination from "./models/Pagination.js";
import { constructMoviePage } from './views/moviesView.js';
import { constructStarshipsPage, addStartShipList, starShipDetails } from './views/starShipView.js';

class Main{

    public static async main():Promise<void>{
        const dom = Dom.getInstance();

        const appContainerEl: HTMLDivElement = dom.getElement('appContainer') as HTMLDivElement; // get app container
        changeAppContainerBG(appContainerEl, 5000);// change background every 5s
        const movies = new Movies('https://swapi.dev/api/films', [4, 5, 6, 1, 2, 3]); // get movies data by order
        const mainEl: HTMLElement = dom.getElement('main') as HTMLElement; // main element
        const moviesData = await constructMoviePage(mainEl, movies); // builds starter page
        const starships = new StarShips(moviesData);// 

        let starshipsData:any = '';
        // add click event linster to elements that do not yet exist at the start of the program
        document
            .addEventListener('click', async e => {
                const target = e.target as any;
                if(target.name === 'starship-link') // go to the movie starship link
                    starshipsData = await constructStarshipsPage(mainEl, starships, Pagination, target, 0)
                if(target.name === 'back-to-movie') // back to the movie
                    await  constructMoviePage(mainEl, movies);
                if(target.name === 'pbtn'){ // click on pagination button
                    if(!target.classList.value.includes('pagination__btn--selected')){
                        const pageNum: number = +(target.getAttribute('key') as string);
                        const el = document.querySelector('.center') as HTMLElement
                        el.innerHTML = ''; // clear container
                        mainEl.classList.add('main--starships');
                        addStartShipList(el, starshipsData.slice(pageNum * 5, (pageNum+1) * 5)); // show data by page number
                        const children = Array.from(target.parentElement.children) as any;
                        // remove active class from other buttons
                        for(let i = 0 ; i < children.length; i++){
                            if(children[i].classList.value.toString().includes('pagination__btn--selected')){
                                children[i].classList.remove('pagination__btn--selected')
                            }
                        }    
                        target.classList.add('pagination__btn--selected');// just for change color button
                    }
                }
                if(target.name === 'starship'){// go to the starships page
                    const id: number = +(target.getAttribute('key') as string);
                    starShipDetails(mainEl, starshipsData[id]);                    
                }
                if(target.name == 'back-to-starships'){ // backe to starships
                    mainEl.innerHTML = '';
                    addHeader(mainEl, localStorage.getItem('movieName') as string)
                    addStartShipList(mainEl, starshipsData.slice(0, 5)); // show 5th first starship: 0 1 2 3 4 
                    new Pagination(mainEl,starshipsData, 5).createPagination(); // creart pagination
                }
            })

    }   
}

Main.main();