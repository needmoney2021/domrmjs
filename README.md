# DOMRM JS

스파게티 DOM에서 `$("selector").val()` 이런 거 그만 쓰고 싶어서 만들어봄.

경고 : 그냥 웃자고 만들었습니다. 운영에서 쓰지 마세요. 그리고 아래와 같은 코드 범벅이인 프로젝트다? 도망치세요.

## What is DOM-RM?

``` javascript

var amount = $('input[name=amount]').val()
...
$.ajax({
    url: "<c:url value="/doom/moredoom/getCheckPreOrderInsert.json"/>",
    method: "GET",
    dataType: "json",
    data: {
        "cart_gubun": $("input[name=cart_gubun]").val(),
        "item_idx_arr": item_idx_arr,
        "orderdate": $("input[name=orderdate]").val(),
        "card1_card_amount": card1_card_amount,
        "card2_card_amount": card2_card_amount,
        "card3_card_amount": card3_card_amount,
        "vaccount_amount": vaccount_amount,
        "mileage_code": $("select[name=mileage_code] option:checked").val(),
        "mileage_amount": mileage_amount,
        "pay_no": $("input[name=pay_no]").val(),
        "prepay_amount": prepay_amount,
        "coupon": $("input[name=coupon]").val(),
        "coupon_amount": coupon_amount,
        "certi_card_amount": certi_card_amount,
        "totalPrice": totalPrice
    },
})
...
let itemContainer = $(this).closest(".col-box");
orderItems.push({
  round: i,
  itemcode: itemContainer.find("input[name=itemcode_arr]").val(),
  quantity: parseInt($(this).val())
});
```

이건 거의 프론트에서 JSON 만드는 DAO.
심지어 jQuery로 돔 긁어서 엔티티 만들어 보내는 걸 보면 위 코드에는 ORM 개념이 들어가 있음.

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
const shipAddressInfo = DOMRM.from($("#recentdelivery").find('input[name=receiver]:checked').closet('label'))
  .find('.receiver-name').textAs('ship_name')
  .find(".receiver-phonenumber").textAs("phone")
  .find(".receiver-mobilenumber").textAs("mobilephone")
  .find(".receiver-zipcode").textAs("zipcode")
  .find(".receiver-address1").textAs("address1")
  .find(".receiver-address2").textAs("address2")
  .build()
```

