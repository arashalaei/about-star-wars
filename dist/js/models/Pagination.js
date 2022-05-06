"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(container, data, limit) {
        this.count = 0;
        // pagination container with "movies" button
        this.paginationContainer = (content) => `
        <div style="display:flex;align-items:center;justify-content:space-between;">
            <a htef="#" name="back-to-movie" class="back-to-movie btn">movies</a> 
            <div name="pagination" class="pagination">${content}</div>
            <div style="width:56.68px">&nbsp;</div>
        </div>

    `;
        this.paginationBtns = () => {
            let bts = '';
            for (let i = 0; i < this.count; i++) {
                bts += `<a key='${i}' name="pbtn" class='${i ? "pagination__btn" : "pagination__btn pagination__btn--selected"}'>${i + 1}</a>`;
            }
            return bts;
        };
        // just call this method to build up pagination
        this.createPagination = () => {
            this.container.insertAdjacentHTML('beforeend', this.paginationContainer(this.paginationBtns()));
        };
        this.container = container; // To the element it wants to add
        this.data = data;
        this.limit = limit; // show limited data  in  each page
        this.count = Math.ceil(this.data.length / this.limit); // count of pagination buttons
    }
}
exports.default = Pagination;
