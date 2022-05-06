"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dom_js_1 = __importDefault(require("./models/Dom.js"));
const utils_js_1 = require("./views/utils.js");
const appConteinerView_js_1 = require("./views/appConteinerView.js");
const Movies_js_1 = __importDefault(require("./models/Movies.js"));
const StarShips_js_1 = __importDefault(require("./models/StarShips.js"));
const Pagination_js_1 = __importDefault(require("./models/Pagination.js"));
const moviesView_js_1 = require("./views/moviesView.js");
const starShipView_js_1 = require("./views/starShipView.js");
class Main {
    static main() {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = Dom_js_1.default.getInstance();
            const appContainerEl = dom.getElement('appContainer'); // get app container
            (0, appConteinerView_js_1.changeAppContainerBG)(appContainerEl, 5000); // change background every 5s
            const movies = new Movies_js_1.default('https://swapi.dev/api/films', [4, 5, 6, 1, 2, 3]); // get movies data by order
            const mainEl = dom.getElement('main'); // main element
            const moviesData = yield (0, moviesView_js_1.constructMoviePage)(mainEl, movies); // builds starter page
            const starships = new StarShips_js_1.default(moviesData); // 
            let starshipsData = '';
            // add click event linster to elements that do not yet exist at the start of the program
            document
                .addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                const target = e.target;
                if (target.name === 'starship-link') // go to the movie starship link
                    starshipsData = yield (0, starShipView_js_1.constructStarshipsPage)(mainEl, starships, Pagination_js_1.default, target, 0);
                if (target.name === 'back-to-movie') // back to the movie
                    yield (0, moviesView_js_1.constructMoviePage)(mainEl, movies);
                if (target.name === 'pbtn') { // click on pagination button
                    if (!target.classList.value.includes('pagination__btn--selected')) {
                        const pageNum = +target.getAttribute('key');
                        const el = document.querySelector('.center');
                        el.innerHTML = ''; // clear container
                        mainEl.classList.add('main--starships');
                        (0, starShipView_js_1.addStartShipList)(el, starshipsData.slice(pageNum * 5, (pageNum + 1) * 5)); // show data by page number
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
                    (0, starShipView_js_1.starShipDetails)(mainEl, starshipsData[id]);
                }
                if (target.name == 'back-to-starships') { // backe to starships
                    mainEl.innerHTML = '';
                    (0, utils_js_1.addHeader)(mainEl, localStorage.getItem('movieName'));
                    (0, starShipView_js_1.addStartShipList)(mainEl, starshipsData.slice(0, 5)); // show 5th first starship: 0 1 2 3 4 
                    new Pagination_js_1.default(mainEl, starshipsData, 5).createPagination(); // creart pagination
                }
            }));
        });
    }
}
Main.main();
