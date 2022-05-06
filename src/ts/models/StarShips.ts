import { MovieData } from './Movies.js';
/**
 *  tha main jop of this class fetch all data from given url
 */
class StarShips{
    private moviesData: MovieData[];

    constructor(moviesData: MovieData[]){
        this.moviesData = moviesData;
    }
    // returns all starships by id
    public async getData(id: number){
        const starShipsURL:string[] = this.moviesData[id - 1].starships;
        const tarShipsFetche: Promise<Response>[] = [];
        starShipsURL.forEach(url => tarShipsFetche.push(fetch(url)));
        const resposnes:Response[] = await Promise.all(tarShipsFetche);
        return  await Promise.all(
            resposnes.map(
                res => res.json()
            )
        );
    }

};

export default StarShips;