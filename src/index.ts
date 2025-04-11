import $ from 'jquery'

if (typeof $ !== 'function') {
  throw new Error('jQuery is not loaded or $ is not defined.')
}

const DOMRM = {
  from(element: HTMLElement | JQuery): DOMRMBuilder {
    return new DOMRMBuilder(element)
  }
}

export class DOMRMBuilder {
  private $root: JQuery
  private data: Record<string, any> = {}
  private $element: JQuery
  
  constructor(element: HTMLElement | JQuery) {
    this.$root = $(element as any) as JQuery
    this.$element = this.$root
  }
  
  find(selector: string): this {
    this.$element = this.$root.find(selector)
    return this
  }
  
  ascend(selector: string): this {
    this.$root = this.$root.closest(selector)
    this.$element = this.$root
    return this
  }
  
  descend(selector: string): this {
    this.$root = this.$root.find(selector)
    this.$element = this.$root
    return this
  }
  
  valAs(key: string): this {
    this.data[key] = this.$element.val()
    return this
  }
  
  valAsNum(key: string): this {
    const val = this.$element.val()
    this.data[key] = typeof val === "string" ? parseFloat(val) : Number(val)
    return this
  }
  
  textAs(key: string): this {
    this.data[key] = this.$element.text().trim()
    return this
  }
  
  attrAs(key: string): this {
    this.data[key] = this.$element.attr(key)
    return this
  }
  
  custom(key: string, fn: (el: JQuery) => any): this {
    this.data[key] = fn(this.$element)
    return this
  }
  
  build(): Record<string, any> {
    return this.data
  }
}

if (typeof window !== 'undefined') {
  (window as any).DOMRM = DOMRM
}

export default DOMRM
