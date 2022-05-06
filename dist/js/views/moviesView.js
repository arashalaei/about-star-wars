var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addHeader, addLoader, removeLoader } from './utils.js';
import { list, listItem } from './utils.js';
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
export const addMoviesList = (container, data) => {
    let lists = '';
    data.forEach((d) => {
        lists += listItem(innerList(d), 'flx-sb movie-list');
    });
    container.insertAdjacentHTML('beforeend', list(lists));
};
// build-up movie page
export const constructMoviePage = (container, moviesModel) => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = '';
    container.classList.remove('main--starships');
    addHeader(container, 'Movies');
    addLoader(container);
    const moviesData = yield moviesModel.getData();
    addMoviesList(container, moviesData);
    removeLoader();
    return moviesData;
});
