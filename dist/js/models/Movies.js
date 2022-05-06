/**
 *  tha main jop of this class fetch all data from given url
 */
class Movies {
    constructor(apiURL, ordersFetch) {
        this.apiURL = apiURL;
        this.ordersFetch = ordersFetch;
    }
    // returns all fetched data
    async getData() {
        const moviesURL = [];
        this.ordersFetch.forEach(id => moviesURL.push(`${this.apiURL}/${id}`));
        const moviesFetche = [];
        moviesURL.forEach(url => moviesFetche.push(fetch(url)));
        const resposnes = await Promise.all(moviesFetche);
        return await Promise.all(resposnes.map(res => res.json()));
    }
}
export default Movies;
