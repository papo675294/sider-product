// 獲取所有 .sort_content 元素的集合
const sortContents = document.querySelectorAll(".sort_content");

// 定義一個函數，根據滑鼠的位置來改變漸層的百分比
function transformElement(x, y, img) {
  let box = img.getBoundingClientRect(); // 用 img 變數來替換 element 變數
  // getBoundingClientRect(); 這是一個可以獲取元素的外框等等
  const percentage = parseInt(((x - box.x) / box.width) * 1000) / 10;
  img.style.setProperty("--per", `${percentage}%`);
  //增加一個變量控制用於漸層
  /*setProperty 是一個方法
  它可以設置或修改 CSSStyleDeclaration 
  物件中的一個屬性的值。它需要傳入三個參數：屬性名稱、屬性值和 (屬性優先級非必要)。 */
}

// 遍歷每個 .sort_content 元素，並為它們添加滑鼠移動事件監聽器
sortContents.forEach((sortContent) => {
  // 獲取每個 .sort_content 元素的子元素 .sort_img
  const img = sortContent.querySelector(".sort_img");
  // 為每個 .sort_content 元素添加滑鼠移動事件監聽器
  sortContent.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(function () {
      transformElement(e.clientX, e.clientY, img);
    });
  });
});
