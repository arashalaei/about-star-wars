var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *  tha main jop of this class fetch all data from given url
 */
class StarShips {
    constructor(moviesData) {
        this.moviesData = moviesData;
    }
    // returns all starships by id
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const starShipsURL = this.moviesData[id - 1].starships;
            const tarShipsFetche = [];
            starShipsURL.forEach(url => tarShipsFetche.push(fetch(url)));
            const resposnes = yield Promise.all(tarShipsFetche);
            return yield Promise.all(resposnes.map(res => res.json()));
        });
    }
}
;
export default StarShips;
