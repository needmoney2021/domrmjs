# DOMRMjs

**DOMRM**은 DOM을 *RM*해드립니다.  
"Remove"가 아닙니다.  
**RM = Rapid Mapping**  
병맛 DOM 구조도 데이터로 후딱 뽑아드립니다.

> jQuery 기반, 빠르고 직관적인 DOM 추출 유틸  
> 값 뽑고, 속성 뽑고, `build()` 하면 끝!

---

## 설치

```bash
npm install domrm
```

---

## 예시

```html
<form id="loginForm">
  <input name="username" value="neo" />
  <input name="password" value="matrix" />
</form>
```

```ts
import { DOMRM } from 'domrmjs'

const data = DOMRM
  .from($('#loginForm'))
  .find('[name="username"]').valAs('id')
  .find('[name="password"]').valAs('pw')
  .build()

console.log(data) // { id: 'neo', pw: 'matrix' }
```

---

## 문법

```ts
DOMRM.from(element: HTMLElement | JQuery): DOMRMBuilder
```

### 체이닝 메서드

| 메서드 | 설명 |
|--------|------|
| `find(selector)` | 자식 요소 중에서 찾기 |
| `closest(selector)` | 조상 요소 중에서 가장 가까운 거 찾기 |
| `valAs(key)` | `.val()` 값을 문자열로 저장 |
| `valAsNum(key)` | `.val()` 값을 숫자로 파싱해서 저장 |
| `textAs(key)` | `.text()` 내용을 저장 |
| `attrAs(attrName)` | 해당 속성 값을 저장 |
| `custom(key, fn)` | 커스텀 로직으로 값 추출 |
| `build()` | 데이터 객체 반환 |

---

## 커스텀 추출 예제

```ts
const data = DOMRM
  .from($('#price'))
  .custom('length', ($el) => {
    const val = $el.val()
    if (typeof val === 'string') {
      return val.length
    } else {
      throw new Error('Expected string')
    }
  })
  .build()

console.log(data) // { length: 5 }
```

---

## 철학

- jQuery 시대 유산들과 공존하며 살아가기
- 테스트는 있지만 타입 안정성은 적당히 타협
- DOM은 어차피 망가질 것이므로 유연하게 대응

---

## 테스트

```bash
npm test
```

---

## IE 지원?

> 웃으면 복이 와요.  
> 그래서 지원합니다.  
> **IE11**에서도 돌아갑니다. (polyfill 필요할 수 있음)
> 얘도 테스트 안 해봄^^

---

## 기여

Pull Request, 병맛 제안, 이슈 제보 환영합니다.  
단, 철학에 어긋나는 **과도한 진지함**은 삼가주세요.

---

## 라이선스

MIT  
*Do whatever you want. Just don’t blame me.*
