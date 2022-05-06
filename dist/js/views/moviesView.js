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
export const constructMoviePage = async (container, moviesModel) => {
    container.innerHTML = '';
    container.classList.remove('main--starships');
    addHeader(container, 'Movies');
    addLoader(container);
    const moviesData = await moviesModel.getData();
    addMoviesList(container, moviesData);
    removeLoader();
    return moviesData;
};
