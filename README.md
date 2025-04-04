# DOMRM JS

스파게티 DOM에서 `$("selector").val()` 이런 거 그만 쓰고 싶어서 만들어봄.

"Object-Relational Mapping이 있다면,   
너네가 진짜 필요한 건   
DOM-Relation Mapping 이었다."   

## Warning

그냥 웃자고 만들었습니다.
> 테스트도 대충 돌렸습니다. 

그리고 아래와 같은 코드 범벅이인 프로젝트다?
배송지가 아니라 개발자의 영혼이 배송될 수도 있습니다.

## What is DOM-RM?

정신 나간 jQuery 레거시에서 정신 차리고 객체 다루고 싶은 자들을 위한 프리즘.

이름하야 **DOMRM**


## Usage

```html
<script>
    $.latelyAddressSearch = function(){

        const layer = $("#pop_resentdelivery").find(".list-gray > ul");

        layer.find("li").remove();

        $.ajax({
            url : "<c:url value="/getlatelyOrderAddrList.json"/>",
            method : "GET",
            dataType : "json",
            beforeSend: function() {}
        }).done(function(obj) {
            if(obj.result){
                const addrinfo = obj.contents;
                let address_li = "";

                let txt = "";
                let ship_name = "";
                let phone = "";
                let mobilephone = "";
                let zipcode = "";
                let address1 = "";
                let address2 = "";
                let fulladdress = "";

                addrinfo.forEach(function(addr, idx){
                    txt = addr.txt;
                    ship_name = addr.ship_name;
                    if(ship_name == undefined){ship_name = "";}
                    phone = addr.phone;
                    if(phone == undefined){phone = "";}
                    mobilephone = addr.mobilephone;
                    if(mobilephone == undefined){mobilephone = "";}
                    zipcode = addr.zipcode;
                    if(zipcode == undefined){zipcode = "";}
                    address1 = addr.address1;
                    if(address1 == undefined){address1 = "";}
                    address2 = addr.address2;
                    if(address2 == undefined){address2 = "";}

                    address_li += "<li>";
                    address_li += "    <label name='rdo" + idx.toString() + "'>";
                    address_li += "        <input id='rdo" + idx.toString() + "' name='receiver' type='radio'/>";
                    address_li += "        <span>";
                    address_li += "            <span class='rdo-name ellipsis'>" + txt + "</span>";

                    address_li += "            <div class='address-info'>";
                    address_li += "                <p>";
                    address_li += "                    <strong class='receiver-name'>" + ship_name + "</strong>";
                    address_li += "                    <span class='receiver-phone roboto receiver-phonenumber'>" + phone + "</span>";
                    address_li += "                    <span class='receiver-phone roboto receiver-mobilenumber'>" + mobilephone + "</span>";
                    address_li += "                </p>";
                    address_li += "                <p class='receiver-addr'>";
                    address_li += "                    (<span class='receiver-zipcode'>" + zipcode + "</span>)<!-- 우편번호 -->";
                    address_li += "                    <span class='receiver-address1'>" + address1 + "</span><!-- 기본주소 -->";
                    address_li += "                    <span class='receiver-address2'>" + address2 + "</span><!-- 직접입력주소 -->";
                    address_li += "                </p>";
                    address_li += "            </div>";
                    address_li += "        </span>";
                    address_li += "    </label>";
                    address_li += "</li>";
                });

                layer.append(address_li);
            }
            else{
                if(obj.resultMessage != undefined){
                    alert(obj.resultMessage);
                }
                else{
                    alert("<spring:message code="msgSYSTEM_ERROR"/>");
                }
            }
        }).fail(function(e) {
            alert("<spring:message code="msgSYSTEM_ERROR"/>");
        });
    }
</script>
```

HTML이 이렇게 생겨먹었을 경우에 다음과 같이 써보세요.

```js
const shipAddressInfo = DOMRM.from($("#recentdelivery").find('input[name=receiver]:checked').closest('label'))
  .find('.receiver-name').textAs('ship_name')
  .find(".receiver-phonenumber").textAs("phone")
  .find(".receiver-mobilenumber").textAs("mobilephone")
  .find(".receiver-zipcode").textAs("zipcode")
  .find(".receiver-address1").textAs("address1")
  .find(".receiver-address2").textAs("address2")
  .build()
```

