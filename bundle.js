(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./models/Dom.js":2,"./models/Movies.js":3,"./models/Pagination.js":4,"./models/StarShips.js":5,"./views/appConteinerView.js":6,"./views/moviesView.js":7,"./views/starShipView.js":8,"./views/utils.js":9}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * to access to any element of DOM we need this Class
 */
class Dom {
    constructor() {
        // stores class name or id of elements
        this.elementString = {
            appContainer: '.app-container',
            main: '.main',
            starShipLinks: '.starship-link'
        };
        this.elements = {
            appContainer: document.querySelector(this.elementString.appContainer),
            main: document.querySelector(this.elementString.main),
            starShipLinks: document.querySelectorAll(this.elementString.starShipLinks)
        };
    }
    // to be unique
    static getInstance() {
        if (!Dom.instance) {
            Dom.instance = new Dom();
            // ... any one time initialization goes here ...
        }
        return Dom.instance;
    }
    // get elements from document
    getElement(elName) {
        return this.elements[elName];
    }
    // not anymore need this
    getElemetsString() {
        return this.elementString;
    }
}
exports.default = Dom;

},{}],3:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  tha main jop of this class fetch all data from given url
 */
class Movies {
    constructor(apiURL, ordersFetch) {
        this.apiURL = apiURL;
        this.ordersFetch = ordersFetch;
    }
    // returns all fetched data
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const moviesURL = [];
            this.ordersFetch.forEach(id => moviesURL.push(`${this.apiURL}/${id}`));
            const moviesFetche = [];
            moviesURL.forEach(url => moviesFetche.push(fetch(url)));
            const resposnes = yield Promise.all(moviesFetche);
            return yield Promise.all(resposnes.map(res => res.json()));
        });
    }
}
exports.default = Movies;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(container, data, limit) {
        this.count = 0;
        // pagination container with "movies" button
        this.paginationContainer = (content) => `
        <div style="display:flex;align-items:center;justify-content:space-between;">
            <a htef="#" name="back-to-movie" class="back-to-movie btn">movies</a> 
            <div name="pagination" class="pagination">${content}</div>
            <div style="width:56.68px">&nbsp;</div>
        </div>

    `;
        this.paginationBtns = () => {
            let bts = '';
            for (let i = 0; i < this.count; i++) {
                bts += `<a key='${i}' name="pbtn" class='${i ? "pagination__btn" : "pagination__btn pagination__btn--selected"}'>${i + 1}</a>`;
            }
            return bts;
        };
        // just call this method to build up pagination
        this.createPagination = () => {
            this.container.insertAdjacentHTML('beforeend', this.paginationContainer(this.paginationBtns()));
        };
        this.container = container; // To the element it wants to add
        this.data = data;
        this.limit = limit; // show limited data  in  each page
        this.count = Math.ceil(this.data.length / this.limit); // count of pagination buttons
    }
}
exports.default = Pagination;

},{}],5:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  tha main jop of this class fetch all data from given url
 */
class StarShips {
    constructor(moviesData) {
        this.moviesData = moviesData;
    }
    // returns all starships by id
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const starShipsURL = this.moviesData[id - 1].starships;
            const tarShipsFetche = [];
            starShipsURL.forEach(url => tarShipsFetche.push(fetch(url)));
            const resposnes = yield Promise.all(tarShipsFetche);
            return yield Promise.all(resposnes.map(res => res.json()));
        });
    }
}
;
exports.default = StarShips;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeAppContainerBG = void 0;
// change background in every 5s
const changeAppContainerBG = (appContainerEl, timeout) => {
    appContainerEl.style.backgroundImage = `url(./dist/img/1.webp)`;
    setInterval(() => {
        // generate random imgae number            
        const rand = Math.floor(Math.random() * 5) + 1;
        const url = `url(./dist/img/${rand}.webp)`;
        appContainerEl.style.backgroundImage = url;
    }, timeout);
};
exports.changeAppContainerBG = changeAppContainerBG;

},{}],7:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMoviePage = exports.addMoviesList = void 0;
const utils_js_1 = require("./utils.js");
const utils_js_2 = require("./utils.js");
// detail of the movie like: title, id, date
const innerList = (data) => `
    <div class="movie-list__details">
        <h2>${data.title}(${data.episode_id})</h2>
        <span class="movie-list__details-release_data">${data.release_date}</span>
    </div>
    <div>
        <a key=${data.episode_id} movie-name="${data.title}" href="#" name="starship-link" class="btn starship-link">StarShips</a>
    </div>
`;
// add list of movies to the container
const addMoviesList = (container, data) => {
    let lists = '';
    data.forEach((d) => {
        lists += (0, utils_js_2.listItem)(innerList(d), 'flx-sb movie-list');
    });
    container.insertAdjacentHTML('beforeend', (0, utils_js_2.list)(lists));
};
exports.addMoviesList = addMoviesList;
// build-up movie page
const constructMoviePage = (container, moviesModel) => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = '';
    container.classList.remove('main--starships');
    (0, utils_js_1.addHeader)(container, 'Movies');
    (0, utils_js_1.addLoader)(container);
    const moviesData = yield moviesModel.getData();
    (0, exports.addMoviesList)(container, moviesData);
    (0, utils_js_1.removeLoader)();
    return moviesData;
});
exports.constructMoviePage = constructMoviePage;

},{"./utils.js":9}],8:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.starShipDetails = exports.constructStarshipsPage = exports.addStartShipList = void 0;
const utils_js_1 = require("././utils.js");
const innerList = (data, id) => `
    <a key=${id} href="#" class="btn" name="starship" >${data.name}</a>
`;
// add innerLists to the list
const addStartShipList = (container, data) => {
    let lists = '';
    data.forEach((d, idx) => {
        lists += (0, utils_js_1.listItem)(innerList(d, idx), 'flx-ce movie-list');
    });
    container.insertAdjacentHTML('beforeend', (0, utils_js_1.list)(lists, 'center'));
};
exports.addStartShipList = addStartShipList;
// list of starship
const constructStarshipsPage = (container, starshipsModel, paginationModel, target, page) => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = '';
    container.classList.add('main--starships');
    const movieName = target.getAttribute('movie-name'); // get movie name
    (0, utils_js_1.addHeader)(container, `${movieName} StarShips`);
    const id = +target.getAttribute('key'); // get movie id
    (0, utils_js_1.addLoader)(container);
    const starshipsData = yield starshipsModel.getData(id);
    container.setAttribute('key', id.toString()); // set movie id
    container.setAttribute('name', movieName); // set movie add
    (0, exports.addStartShipList)(container, starshipsData.slice(page * 5, (page + 1) * 5));
    (0, utils_js_1.removeLoader)();
    new paginationModel(container, starshipsData, 5).createPagination();
    localStorage.setItem('movieName', movieName); // save movie name in local storage
    return starshipsData;
});
exports.constructStarshipsPage = constructStarshipsPage;
// starship details page
const starShipDetails = (container, data) => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = '';
    container.classList.add('main--starships');
    (0, utils_js_1.addHeader)(container, data.model);
    let lists = '';
    let moviesName = '';
    let promises = [];
    // fetch movies name 
    data.films.forEach((movie) => {
        promises.push((fetch(movie)));
    });
    const resposnes = yield Promise.all(promises);
    const dataMovies = yield Promise.all(resposnes.map(res => res.json())); // convert to json
    dataMovies.forEach(({ title }, idx) => {
        if (idx !== (dataMovies.length - 1))
            moviesName += `<div style="font-size:1.3rem">${title}</div>---`;
        else
            moviesName += `<div style="font-size:1.3rem">${title}</div>`;
    });
    // element string 
    lists += (0, utils_js_1.listItem)(`<h2>crew: </h2> <h3>${data.crew}</h3>`, 'flx-ce');
    lists += (0, utils_js_1.listItem)(`<h2>manufacturer: </h2>  <h3>${data.manufacturer}</h3>`, 'flx-ce');
    lists += (0, utils_js_1.listItem)(`<h2>passengers: </h2>  <h3>${data.passengers}</h3>`, 'flx-ce');
    if (data.films) {
        lists += (0, utils_js_1.listItem)('<h2>films: </h2>' + moviesName, 'flx-ce');
    }
    // add elements string to the container
    container.insertAdjacentHTML('beforeend', (0, utils_js_1.list)(lists, 'center'));
    container.insertAdjacentHTML('beforeend', '<div><a name="back-to-starships" class="btn back-to-movie">starships</a><div></div><div></div></div>');
});
exports.starShipDetails = starShipDetails;

},{"././utils.js":9}],9:[function(require,module,exports){
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

},{}]},{},[1]);
