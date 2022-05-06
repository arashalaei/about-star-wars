class Pagination{
    
    private container: HTMLElement;
    private data: any[];
    private limit: number;
    private count: number = 0;

    constructor(container:HTMLElement, data: any[], limit: number){
        this.container = container; // To the element it wants to add
        this.data = data;
        this.limit = limit; // show limited data  in  each page
        this.count = Math.ceil(this.data.length / this.limit); // count of pagination buttons
    }


    // pagination container with "movies" button
    private paginationContainer = (content: string) =>`
        <div style="display:flex;align-items:center;justify-content:space-between;">
            <a htef="#" name="back-to-movie" class="back-to-movie btn">movies</a> 
            <div name="pagination" class="pagination">${content}</div>
            <div style="width:56.68px">&nbsp;</div>
        </div>

    `; 

    private paginationBtns = () => {
        let bts: string = '';
        for(let i = 0; i < this.count; i++){
            bts += `<a key='${i}' name="pbtn" class='${i ? "pagination__btn": "pagination__btn pagination__btn--selected"}'>${i + 1}</a>`
        }

        return bts;
    }

    // just call this method to build up pagination
    public createPagination = () => {
        this.container.insertAdjacentHTML('beforeend', this.paginationContainer(this.paginationBtns()))
    };

}

export default Pagination;