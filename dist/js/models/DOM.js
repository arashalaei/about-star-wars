/**
 * to access to any element of DOM we need this Class
 */
class Dom {
    constructor() {
        // stores class name or id of elements
        this.elementString = {
            appContainer: '.app-container',
            main: '.main',
            starShipLinks: '.starship-link'
        };
        this.elements = {
            appContainer: document.querySelector(this.elementString.appContainer),
            main: document.querySelector(this.elementString.main),
            starShipLinks: document.querySelectorAll(this.elementString.starShipLinks)
        };
    }
    // to be unique
    static getInstance() {
        if (!Dom.instance) {
            Dom.instance = new Dom();
            // ... any one time initialization goes here ...
        }
        return Dom.instance;
    }
    // get elements from document
    getElement(elName) {
        return this.elements[elName];
    }
    // not anymore need this
    getElemetsString() {
        return this.elementString;
    }
}
export default Dom;
