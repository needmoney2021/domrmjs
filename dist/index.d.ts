export declare class DOMRM {
    static from(element: HTMLElement | JQuery): DOMRMBuilder;
}
export declare class DOMRMBuilder {
    private data;
    private $element;
    constructor(element: HTMLElement | JQuery);
    closest(selector: string): this;
    find(selector: string): this;
    valAs(key: string): this;
    valAsNum(key: string): this;
    textAs(key: string): this;
    attrAs(key: string): this;
    custom(key: string, fn: (el: HTMLElement | JQuery) => any): this;
    build(): Record<string, any>;
}
