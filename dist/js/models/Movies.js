"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  tha main jop of this class fetch all data from given url
 */
class Movies {
    constructor(apiURL, ordersFetch) {
        this.apiURL = apiURL;
        this.ordersFetch = ordersFetch;
    }
    // returns all fetched data
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const moviesURL = [];
            this.ordersFetch.forEach(id => moviesURL.push(`${this.apiURL}/${id}`));
            const moviesFetche = [];
            moviesURL.forEach(url => moviesFetche.push(fetch(url)));
            const resposnes = yield Promise.all(moviesFetche);
            return yield Promise.all(resposnes.map(res => res.json()));
        });
    }
}
exports.default = Movies;
