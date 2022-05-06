
/**
 * to access to any element of DOM we need this Class
 */
class Dom{
    private static instance: Dom;
    private elementString:{[props:string]:string};
    private elements:{[props:string]:HTMLElement};

    private constructor(){
        // stores class name or id of elements
        this.elementString = {
            appContainer: '.app-container', 
            main: '.main', 
            starShipLinks: '.starship-link'
        };

        this.elements = {
            appContainer: document.querySelector(this.elementString.appContainer) as HTMLDivElement, 
            main: document.querySelector(this.elementString.main) as HTMLElement,
            starShipLinks: document.querySelectorAll(this.elementString.starShipLinks) as any
        }
    }

    // to be unique
    static getInstance():Dom{
        if (!Dom.instance) {
            Dom.instance = new Dom();
            // ... any one time initialization goes here ...
        }
        return Dom.instance;
    }
    // get elements from document
    public getElement(elName: string): HTMLElement{
        return this.elements[elName];
    }
    // not anymore need this
    public getElemetsString():{[props:string]:string}{
        return this.elementString
    }
}

export default Dom;