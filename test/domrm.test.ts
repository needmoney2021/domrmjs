import $ from 'jquery'
import DOMRM from '../src'

describe('DOMRM 병맛 테스트', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="wrapper">
        <input type="text" id="input" value="abc" data-code="123" />
        <span id="text">Hello DOMRM</span>
      </div>
    `
  })
  
  it('valAs로 입력 값을 추출할 수 있다', () => {
    const data = DOMRM.from($('#input')).valAs('value').build()
    expect(data).toEqual({ value: 'abc' })
  })
  
  it('textAs로 텍스트 콘텐츠를 추출할 수 있다', () => {
    const data = DOMRM.from($('#text')).textAs('label').build()
    expect(data).toEqual({ label: 'Hello DOMRM' })
  })
  
  it('attrAs로 속성을 추출할 수 있다', () => {
    const data = DOMRM.from($('#input')).attrAs('data-code').build()
    expect(data).toEqual({ 'data-code': '123' })
  })
  
  it('custom으로 커스텀 추출이 가능하다', () => {
    const data = DOMRM.from($('#input')).custom('length', ($el) => {
      const value = $el.val()
      if (typeof value === 'string') {
        return value.length
      } else {
        throw new Error('The value is not a string.')
      }
    }).build()
    expect(data).toEqual({ length: 3 })
  })
  
  it('find와 closest도 체이닝 가능해야 한다', () => {
    const data = DOMRM
      .from($('#input'))
      .ascend('#wrapper')
      .find('#text').textAs('label')
      .build()
    
    expect(data).toEqual({ label: 'Hello DOMRM' })
  })
  
  it('valAsNum으로 숫자 값을 추출할 수 있다', () => {
    document.body.innerHTML = `<input id="input" value="123.45" />`
    const data = DOMRM.from($('#input')).valAsNum('price').build()
    expect(data).toEqual({ price: 123.45 })
  })
})
