var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dom from "./models/Dom.js";
import { addHeader } from './views/utils.js';
import { changeAppContainerBG } from './views/appConteinerView.js';
import Movies from "./models/Movies.js";
import StarShips from './models/StarShips.js';
import Pagination from "./models/Pagination.js";
import { constructMoviePage } from './views/moviesView.js';
import { constructStarshipsPage, addStartShipList, starShipDetails } from './views/starShipView.js';
class Main {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = Dom.getInstance();
            const appContainerEl = dom.getElement('appContainer'); // get app container
            changeAppContainerBG(appContainerEl, 5000); // change background every 5s
            const movies = new Movies('https://swapi.dev/api/films', [4, 5, 6, 1, 2, 3]); // get movies data by order
            const mainEl = dom.getElement('main'); // main element
            const moviesData = yield constructMoviePage(mainEl, movies); // builds starter page
            const starships = new StarShips(moviesData); // 
            let starshipsData = '';
            // add click event linster to elements that do not yet exist at the start of the program
            document
                .addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                const target = e.target;
                if (target.name === 'starship-link') // go to the movie starship link
                    starshipsData = yield constructStarshipsPage(mainEl, starships, Pagination, target, 0);
                if (target.name === 'back-to-movie') // back to the movie
                    yield constructMoviePage(mainEl, movies);
                if (target.name === 'pbtn') { // click on pagination button
                    if (!target.classList.value.includes('pagination__btn--selected')) {
                        const pageNum = +target.getAttribute('key');
                        const el = document.querySelector('.center');
                        el.innerHTML = ''; // clear container
                        mainEl.classList.add('main--starships');
                        addStartShipList(el, starshipsData.slice(pageNum * 5, (pageNum + 1) * 5)); // show data by page number
                        const children = Array.from(target.parentElement.children);
                        // remove active class from other buttons
                        for (let i = 0; i < children.length; i++) {
                            if (children[i].classList.value.toString().includes('pagination__btn--selected')) {
                                children[i].classList.remove('pagination__btn--selected');
                            }
                        }
                        target.classList.add('pagination__btn--selected'); // just for change color button
                    }
                }
                if (target.name === 'starship') { // go to the starships page
                    const id = +target.getAttribute('key');
                    starShipDetails(mainEl, starshipsData[id]);
                }
                if (target.name == 'back-to-starships') { // backe to starships
                    mainEl.innerHTML = '';
                    addHeader(mainEl, localStorage.getItem('movieName'));
                    addStartShipList(mainEl, starshipsData.slice(0, 5)); // show 5th first starship: 0 1 2 3 4 
                    new Pagination(mainEl, starshipsData, 5).createPagination(); // creart pagination
                }
            }));
        });
    }
}
Main.main();