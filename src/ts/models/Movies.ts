// Explains what kind of data will be fetched
export interface MovieData {
    title: string;
    episode_id: number;
    release_date: string;
    starships: string[];
}

/**
 *  tha main jop of this class fetch all data from given url
 */
class Movies {

    private apiURL: string;
    private ordersFetch: number[]; // fetch data by order

    constructor(apiURL: string, ordersFetch: number[]){
        this.apiURL = apiURL;
        this.ordersFetch = ordersFetch;
    }
    // returns all fetched data
    public async getData(){
        const moviesURL:string[] = [];
        this.ordersFetch.forEach(id => moviesURL.push(`${this.apiURL}/${id}`))
        const moviesFetche: Promise<Response>[] = [];
        moviesURL.forEach(url => moviesFetche.push(fetch(url)));
        const resposnes:Response[] = await Promise.all(moviesFetche);
        return  await Promise.all(
            resposnes.map(
                res => res.json()
            )
        );
    }

}

export default Movies;