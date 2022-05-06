/**
 *  tha main jop of this class fetch all data from given url
 */
class StarShips {
    constructor(moviesData) {
        this.moviesData = moviesData;
    }
    // returns all starships by id
    async getData(id) {
        const starShipsURL = this.moviesData[id - 1].starships;
        const tarShipsFetche = [];
        starShipsURL.forEach(url => tarShipsFetche.push(fetch(url)));
        const resposnes = await Promise.all(tarShipsFetche);
        return await Promise.all(resposnes.map(res => res.json()));
    }
}
;
export default StarShips;
