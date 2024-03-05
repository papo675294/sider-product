/*hot_item-add*/
document.querySelectorAll(".hot_btn").forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    evt.preventDefault(); //防止頁面跳轉
    //alert("成功正確"); //確保自己選取正確
    let hot_item = btn.closest(".hot_item");
    //closest會從btn向上每一個DOM歷遍，直到獲取hot_item這個元素
    let hot_title = hot_item.querySelector(".hot_title").textContent;
    let hot_price = hot_item.querySelector(".hot_price").textContent;
    let imgDiv = hot_item.querySelector(".hot_img"); //選擇hot_img這個DIV
    let imgUrl = imgDiv.style.backgroundImage.slice(5, -2);
    //slice(5, -2);這個方式只限定行內套用，取出url(/第五位之後到結束前的第二個
    // console.log(

    //   `商品名稱：${hot_title}，價格：${hot_price}，商品圖片 URL：{imgUrl}`
    // );//測試 是否有正確讀取$

    //創建一個購物車項目，將前面獲取的元素放入
    let cartItem = document.createElement("div");
    cartItem.classList.add("shopping_cart_item");
    // 這邊出現了一個錯誤，這樣產生的價格會是修改後的價格*倍數，計算金額不是我要的
    //所以這邊要在宣告一個獲取保存原始價格
    // console.log(hot_price.replace("元", ""));
    cartItem.dataset.price = hot_price.replace("元", "");
    // console.log(hot_price.replace("元", ""));
    //這邊使用dataset而不使用getAttribute(),setAttribute()
    //因為這邊單純獲取data-price的值

    //將剛創好的cartItem放入前面所選取的元素
    cartItem.innerHTML = `
    <img src="${imgUrl}" class="shopping_cart_img" />
    <a href="#!" class="shopping_cart_link">${hot_title}</a>
    <div class="shopping_cart_quantity">
    <span class="btn btn_add">+</span>
    <input
      class="shopping_cart_input"
      type="text"
      inputmode="numeric"
    />
    <span class="btn btn_sub">-</span>
  </div>
    <p class="shopping_cart_price">${hot_price}</p>
    <div class="shopping_cart_delete">
      <i class="fa-solid fa-trash"></i>
    </div>
    `;
    let cartContent = document.querySelector(".shopping_cart_content");
    cartContent.appendChild(cartItem);
    //同時更新商品數量
    updateItemCount();
    //加入時就更新價格
    updateTotalPrice();
  });
});

/*這邊使用事件委派系統，將監聽項目都定位為shopping_cart_content
當點擊內部不同元素使用IF判斷式執行相應事件*/

/*TotalPrice*/
function updateTotalPrice() {
  // 得到所有價格元素
  let getAllPrice = document.querySelectorAll(
    ".shopping_cart_item:not(.demo) .shopping_cart_price"
  );
  //:not(.demo)排除示範商品，以免被算進數量

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

/*updatePriceAndTotal=btn_add&btn_sub + TotalPrice + price_change
因為三者皆有重複的代碼，為了簡潔提取部分重複的代碼，採用呼叫的方式撰寫
之前寫的在shopping_cart_original.js檔案*/

function updatePriceAndTotal(input) {
  let shopping_cart_item = input.closest(".shopping_cart_item:not(.demo)");
  //:not(.demo)排除示範商品，以免被算進數量
  let originalPrice = Number(shopping_cart_item.dataset.price); //取得原始價格而不是修改後的價格
  let shopping_cart_price = shopping_cart_item.querySelector(
    ".shopping_cart_price"
  ); //
  let shopping_cart_quantity = input.value;
  if (shopping_cart_quantity === "" || shopping_cart_quantity <= 0) {
    input.value = 1;
    // 這是網頁上輸入框的最小值
    shopping_cart_quantity = 1;
    //這是變數上的值，不影響網頁但影響使用後續的程式碼撰寫
  }
  shopping_cart_price.textContent =
    originalPrice * shopping_cart_quantity + "元";
  updateTotalPrice();
}
/*input_change*/
document
  .querySelector(".shopping_cart_content")
  .addEventListener("change", (evt) => {
    // input是輸入當下就去判斷裡面的值是否空或是<=0
    // change是輸入完畢離開框框之後才進行判斷
    let input = evt.target.closest(".shopping_cart_input");
    if (input) {
      // alert("選擇正確");確定選到框框有反應後接續寫判斷式
      //更新總價
      updatePriceAndTotal(input);
    }
  });

/*add&sub_change*/
document
  .querySelector(".shopping_cart_content")
  .addEventListener("click", (evt) => {
    if (evt.target.closest(".btn_add")) {
      //alert("你點到+了");正確
      let input = evt.target
        .closest(".shopping_cart_item")
        .querySelector(".shopping_cart_input");
      input.value = Number(input.value) + 1;
      //重新選擇item裡面的input是因為每一個都是獨立的，這樣才會針對選擇的input進行增減
      //Number是為了保證得到的值為數字
      updatePriceAndTotal(input);
    } else if (evt.target.closest(".btn_sub")) {
      //alert("你點到-了");正確
      let input = evt.target
        .closest(".shopping_cart_item")
        .querySelector(".shopping_cart_input");
      input.value = Number(input.value) - 1;
      //重新選擇item裡面的input是因為每一個都是獨立的，這樣才會針對選擇的input進行增減
      //Number是為了保證得到的值為數字
      if (input.value === "" || input.value <= 0) {
        input.value = 1;
      }
      updatePriceAndTotal(input);
    }
  });
/*delete_change*/
document
  .querySelector(".shopping_cart_content")
  .addEventListener("click", (evt) => {
    // 檢查點擊的按鈕是否為刪除按鈕
    if (evt.target.closest(".shopping_cart_delete")) {
      // alert("點到刪除了"); //判斷正確
      // 如果是就closest找到shopping_cart_item移除掉這個項目
      evt.target.closest(".shopping_cart_item").remove();

      //更新總價
      updateTotalPrice();
      //更新商品數量
      updateItemCount();
    }
  });

/*shopping_cart_countChange*/

// 購物車數量=購物車裡面的項目數量

function updateItemCount() {
  let shopping_cart = document.querySelector(".shopping_cart");
  let count = document.querySelectorAll(
    ".shopping_cart_item:not(.demo)"
  ).length;
  //:not(.demo)排除示範商品，以免被算進數量
  shopping_cart.setAttribute("data-count", count);
}
