# DOMRMjs

**DOMRM** *RM*s DOM.   
It does not mean "Remove".   
**RM = Rapid Mapping or Relational Mapping**
It can extract data from mental-sucking spaghetti DOM.

> A Utility draws data from DOM, based on jQuery, and is rapid and intuitive.   
> Find elements, draw value, and run `build()`, that's all.

---

## Installment

Wanna use it as `<script>`:

```html
<script src="https://unpkg.com/domrm/dist/domrm.umd.js"></script>
```

Or as node module:

```bash
npm install domrm
```

> I'm gonna test this... ^^

---

## Example(Node)

```html
<form id="loginForm">
  <input name="username" value="neo" />
  <input name="password" value="matrix" />
</form>
```

```ts
import DOMRM from 'domrmjs'

const data = DOMRM
  .from($('#loginForm'))
  .find('[name="username"]').valAs('id')
  .find('[name="password"]').valAs('pw')
  .build()

console.log(data) // { id: 'neo', pw: 'matrix' }
```

## Example(CDN)

**Load jQuery first.**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DOMRM</title>
    <!-- JQuery first -->
    <script src="https://code.jquery.com/jquery-3.7.1.slim.js" integrity="sha256-UgvvN8vBkgO0luPSUl2s8TIlOSYRoGFAX4jlCIm9Adc=" crossorigin="anonymous"></script>
    <script src="dist/domrm.umd.js"></script>
</head>
<body>
    <div id="app">
        <div id="container">
            <input id="name" value="needmoney">
            <input id="email" value="needmoney@test.co.kr">
        </div>
    </div>
    <div id="universe">
        <section class="planet" id="earth">
            <div class="continent">
                <div class="country">
                    <div class="korea">
                        <div class="city">
                            <div class="person">
                                <input class="name" value="장원영">
                                <input class="email" value="LuckyVicky@example.com">
                            </div>
                        </div>
                    </div>
                    <div class="japan">
                        <div class="city">
                            <div class="tokyo">
                                <div class="person">
                                    <input class="name" value="Tsubomi">
                                    <input class="email" value="tsubomi@example.com">
                                </div>
                            </div>
                            <div class="osaka">
                                <div class="person">
                                    <input class="name" value="Sora">
                                    <input class="email" value="sora@aoi.co.jp">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', () => {
            console.info(DOMRM)
            let data = DOMRM.from($('#container'))
                    .find('#name').valAs('name')
                    .find('#email').valAs('email')
                    .build()
            console.info(data)

            data = DOMRM.from($('.korea'))
                    .descend('.person')
                    .find('.name').valAs('kName')
                    .find('.email').valAs('kEmail')
                    .ascend('.country')
                    .descend('.japan')
                    .descend('.tokyo')
                    .find('.name').valAs('tName')
                    .find('.email').valAs('tEmail')
                    .ascend('.country')
                    .descend('.osaka')
                    .find('.name').valAs('oName')
                    .find('.email').valAs('oEmail')
                    .build()
            console.info(data)
        })
    </script>
</body>
</html>
```

![example-result.png](example-result.png)

## Syntax

```ts
DOMRM.from(element: HTMLElement | JQuery): DOMRMBuilder
```

### Methods

| 메서드 | 설명                                                    |
|:-----|-------------------------------------------------------|
| find(selector) | Find a descendant element from current root           |
| descend(selector) | Find the nearest descendant element from current root |
| ascend(selector) | Move current root up to the closest matching parent            |
| valAs(key) | Save .val() value as a string                   |
| valAsNum(key) | Save .val() as a parsed number                    |
| textAs(key) | Save .text() content                      |
| attrAs(attrName) | Save the value of an attribute               |
| custom(key, fn) | Apply custom function to current element                 |
| build() | Return the collected data                          |

---

## custom(key, fn)

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

## Agenda

- Living in coexistence with the legacies of the jQuery era.
- There are tests, but type safety is moderately compromised.
- Since the DOM will break anyway, respond flexibly.

---

## 테스트

```bash
npm test
```

---

## IE Support?

> It supports it. Might not do it though. Give it a try^^.

---

## Contribute

Pull Requests, silly proposals, and issue reports are welcome.   
However, please refrain from **excessive seriousness** that goes against our philosophy.

---

## License

MIT  
*Do whatever you want. Just don’t blame me.*
