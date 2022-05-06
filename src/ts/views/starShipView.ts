import { listItem, list, addHeader, addLoader, removeLoader } from '././utils.js';

const innerList = (data: any, id: number) => `
    <a key=${id} href="#" class="btn" name="starship" >${data.name}</a>
`;
// add innerLists to the list
export const addStartShipList = (container: HTMLElement, data: any[]) => {
    let lists: string = '';    
    data.forEach((d, idx) => {
        lists += listItem(innerList(d, idx), 'flx-ce movie-list');
    });
    container.insertAdjacentHTML('beforeend', list(lists, 'center'))
};

// list of starship
export const constructStarshipsPage = async (container: HTMLElement, starshipsModel:any, paginationModel: any, target: any, page: number) => {
    container.innerHTML = '';
    container.classList.add('main--starships');
    const movieName = (target.getAttribute('movie-name') as string); // get movie name
    addHeader(container, `${movieName} StarShips`);
    const id = +(target.getAttribute('key') as string); // get movie id
    addLoader(container);
    const starshipsData = await starshipsModel.getData(id);
    container.setAttribute('key', id.toString()); // set movie id
    container.setAttribute('name', movieName); // set movie add
    addStartShipList(container, starshipsData.slice(page * 5, (page+1) * 5));
    removeLoader();
    new paginationModel(container,starshipsData, 5).createPagination();
    localStorage.setItem('movieName', movieName); // save movie name in local storage
    return starshipsData
};

// starship details page
export const starShipDetails = async (container: HTMLElement, data: any) => {
    container.innerHTML = '';
    container.classList.add('main--starships');
    addHeader(container, data.model);
    let lists: string = '';  
    let moviesName: string = '';
    let promises: any[] = [];
    // fetch movies name 
    data.films.forEach((movie:string) =>{
        promises.push((fetch(movie)))
    })
    const resposnes:Response[] = await Promise.all(promises);
    const dataMovies = await Promise.all(resposnes.map(res => res.json())); // convert to json
    dataMovies.forEach(({title}, idx: number) =>{
        if(idx !== (dataMovies.length - 1))
            moviesName +=  `<div style="font-size:1.3rem">${title}</div>---`;
        else
            moviesName +=  `<div style="font-size:1.3rem">${title}</div>`

    });
    // element string 
    lists += listItem(`<h2>crew: </h2> <h3>${data.crew}</h3>`, 'flx-ce');
    lists += listItem(`<h2>manufacturer: </h2>  <h3>${data.manufacturer}</h3>`, 'flx-ce');
    lists += listItem(`<h2>passengers: </h2>  <h3>${data.passengers}</h3>`, 'flx-ce');
    if(data.films){
        lists += listItem('<h2>films: </h2>' + moviesName, 'flx-ce');
    } 
    // add elements string to the container
    container.insertAdjacentHTML('beforeend', list(lists, 'center'));
    container.insertAdjacentHTML('beforeend', '<div><a name="back-to-starships" class="btn back-to-movie">starships</a><div></div><div></div></div>')
}