import { addHeader, addLoader, removeLoader } from './utils.js'; 
import { MovieData } from './../models/Movies.js';
import { list, listItem } from './utils.js';

// detail of the movie like: title, id, date
const innerList = (data: MovieData) => `
    <div class="movie-list__details">
        <h2>${data.title}(${data.episode_id})</h2>
        <span class="movie-list__details-release_data">${data.release_date}</span>
    </div>
    <div>
        <a key=${data.episode_id} movie-name="${data.title}" href="#" name="starship-link" class="btn starship-link">StarShips</a>
    </div>
`;

// add list of movies to the container
export const addMoviesList = (container: HTMLElement, data: MovieData[]) => {    
    let lists: string = '';    
    data.forEach((d) => {
        lists += listItem(innerList(d), 'flx-sb movie-list');
    });
    container.insertAdjacentHTML('beforeend', list(lists))
}

// build-up movie page
export const constructMoviePage = async (container: HTMLElement, moviesModel:any) => {
    container.innerHTML = '';
    container.classList.remove('main--starships');
    addHeader(container, 'Movies');
    addLoader(container);
    const moviesData = await moviesModel.getData();
    addMoviesList(container, moviesData)
    removeLoader();

    return moviesData;
}