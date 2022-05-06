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
