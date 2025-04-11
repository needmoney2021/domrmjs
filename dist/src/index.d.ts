declare const DOMRM: {
    from(element: HTMLElement | JQuery): DOMRMBuilder;
};
export declare class DOMRMBuilder {
    private $root;
    private data;
    private $element;
    constructor(element: HTMLElement | JQuery);
    find(selector: string): this;
    ascend(selector: string): this;
    descend(selector: string): this;
    valAs(key: string): this;
    valAsNum(key: string): this;
    textAs(key: string): this;
    attrAs(key: string): this;
    custom(key: string, fn: (el: JQuery) => any): this;
    build(): Record<string, any>;
}
export default DOMRM;
