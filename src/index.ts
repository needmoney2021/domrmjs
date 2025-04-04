import $ from 'jquery'

export class DOMRM {
  static from(element: HTMLElement | JQuery): DOMRMBuilder {
    return new DOMRMBuilder(element)
  }
}

export class DOMRMBuilder {
  private data: Record<string, any> = {}
  private $element: JQuery
  
  constructor(element: HTMLElement | JQuery) {
    this.$element = $(element as any) as JQuery<HTMLElement>
  }
  
  closest(selector: string): this {
    this.$element = this.$element.closest(selector)
    return this
  }
  
  find(selector: string): this {
    this.$element = this.$element.find(selector)
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
  
  custom(key: string, fn: (el: HTMLElement | JQuery) => any): this {
    this.data[key] = fn(this.$element)
    return this
  }
  
  build(): Record<string, any> {
    return this.data
  }
}
