/*btn_add&btn_sub*/
document
  .querySelector(".shopping_cart_content")
  .addEventListener("click", (evt) => {
    // 檢查點擊的按鈕是否為add按鈕
    if (evt.target.closest(".btn_add")) {
      //alert("點到+了"); //判斷正確
      let input = evt.target
        .closest(".shopping_cart_item")
        .querySelector(".shopping_cart_input");
      //品項很多，只針對我當下點擊到的商品裡面的input進行數量上的變動
      input.value = Number(input.value) + 1; //數量穩定上升

      //為了確保點擊之後數量增加，總價格跟著變化
      let cartItem = input.closest(".shopping_cart_item");
      let priceElement = cartItem.querySelector(".shopping_cart_price");
      let originalPrice = Number(cartItem.dataset.price);
      priceElement.textContent = originalPrice * input.value + "元";
      //更新總價
      updateTotalPrice();
    } else if (evt.target.closest(".btn_sub")) {
      //alert("點到-了"); //判斷正確
      let input = evt.target
        .closest(".shopping_cart_item")
        .querySelector(".shopping_cart_input");
      //品項很多，只針對我當下點擊到的商品裡面的input進行數量上的變動
      input.value = Number(input.value) - 1; //數量有減少
      if (input.value === "" || input.value <= 0) {
        input.value = 1;
        // 這邊額外寫判定是因為不寫的話數量會出現負數
      }
      // 更新該商品的價格
      let cartItem = input.closest(".shopping_cart_item");
      let priceElement = cartItem.querySelector(".shopping_cart_price");
      let originalPrice = Number(cartItem.dataset.price);
      priceElement.textContent = originalPrice * input.value + "元";
      //更新總價
      updateTotalPrice();
    }
  });
function updateTotalPrice() {
  // 得到所有價格元素
  let getAllPrice = document.querySelectorAll(".shopping_cart_price");

  //計算總價
  let totalPrice = 0;
  getAllPrice.forEach((getAllPrice) => {
    let price = Number(getAllPrice.textContent.replace("元", ""));
    // 從getAllPrice獲取到商品的價格，但我們不需要元，否則會影響Number的處理結果
    // 使用replace(原本的值,取代的值)這邊就是把元取代為空，移除的意思
    totalPrice += price;
    // 0加上我得到的所有商品的價格
  });

  let total_price = document.querySelector(".total_price");
  total_price.textContent = "總計:" + totalPrice + "元";
}

/*price_change*/
document
  .querySelector(".shopping_cart_content")
  .addEventListener("change", (evt) => {
    // input是輸入當下就去判斷裡面的值是否空或是<=0
    // change是輸入完畢離開框框之後才進行判斷
    let input = evt.target.closest(".shopping_cart_input");
    if (input) {
      // alert("選擇正確");確定選到框框有反應後接續寫判斷式
      let cartItem = input.closest(".shopping_cart_item");
      let priceElement = cartItem.querySelector(".shopping_cart_price");
      console.log(cartItem.dataset.price);
      let originalPrice = Number(cartItem.dataset.price);
      // 從cartItem獲取到商品的價格，但我們不需要元，否則會影響Number的處理結果
      // 而不從priceElement取得值是因為這個值是修改後的值，會造成日後計算問題

      //更新價格
      let quantity = input.value;
      if (quantity === "" || quantity <= 0) {
        input.value = 1;
        quantity = 1;
      }
      // 預防數字為0之後 所有價格*0都變成0
      priceElement.textContent = originalPrice * quantity + "元";
      // priceElement的文本內容=價格乘上數量+元
      //更新總價
      updateTotalPrice();
    }
  });
