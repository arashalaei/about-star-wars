var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { listItem, list, addHeader, addLoader, removeLoader } from '././utils.js';
const innerList = (data, id) => `
    <a key=${id} href="#" class="btn" name="starship" >${data.name}</a>
`;
// add innerLists to the list
export const addStartShipList = (container, data) => {
    let lists = '';
    data.forEach((d, idx) => {
        lists += listItem(innerList(d, idx), 'flx-ce movie-list');
    });
    container.insertAdjacentHTML('beforeend', list(lists, 'center'));
};
// list of starship
export const constructStarshipsPage = (container, starshipsModel, paginationModel, target, page) => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = '';
    container.classList.add('main--starships');
    const movieName = target.getAttribute('movie-name'); // get movie name
    addHeader(container, `${movieName} StarShips`);
    const id = +target.getAttribute('key'); // get movie id
    addLoader(container);
    const starshipsData = yield starshipsModel.getData(id);
    container.setAttribute('key', id.toString()); // set movie id
    container.setAttribute('name', movieName); // set movie add
    addStartShipList(container, starshipsData.slice(page * 5, (page + 1) * 5));
    removeLoader();
    new paginationModel(container, starshipsData, 5).createPagination();
    localStorage.setItem('movieName', movieName); // save movie name in local storage
    return starshipsData;
});
// starship details page
export const starShipDetails = (container, data) => __awaiter(void 0, void 0, void 0, function* () {
    container.innerHTML = '';
    container.classList.add('main--starships');
    addHeader(container, data.model);
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
    lists += listItem(`<h2>crew: </h2> <h3>${data.crew}</h3>`, 'flx-ce');
    lists += listItem(`<h2>manufacturer: </h2>  <h3>${data.manufacturer}</h3>`, 'flx-ce');
    lists += listItem(`<h2>passengers: </h2>  <h3>${data.passengers}</h3>`, 'flx-ce');
    if (data.films) {
        lists += listItem('<h2>films: </h2>' + moviesName, 'flx-ce');
    }
    // add elements string to the container
    container.insertAdjacentHTML('beforeend', list(lists, 'center'));
    container.insertAdjacentHTML('beforeend', '<div><a name="back-to-starships" class="btn back-to-movie">starships</a><div></div><div></div></div>');
});
