function waterfall() {
  //得到主要容器的寬度
  var content = document.getElementsByClassName("waterFall")[0];
  var contentWidth = content.offsetWidth;
  //console.log(contentWidth); //測試是否成功

  //獲取img的寬度
  var imgs = content.children;
  //console.log(imgs); //得到waterFall底下所有waterFall_box
  var imgHeight = imgs[0].offsetWidth;
  //console.log(imgHeight); //得到單獨一個waterFall_box的寬度了

  //計算第一行可以排列幾個用容器寬度/單獨一個waterFall_box的寬度
  //var numbs = contentWidth / imgHeight;
  //console.log(numbs);//會得到5.3...的小數點
  var numbs = Math.floor(contentWidth / imgHeight);
  //這邊要取得整數所以使用Math.floor無條件捨去
  //console.log(numbs);//成功得到整數

  //收集第一行的所有高度在於之後用來新的進行比對
  var arrHeight = [];
  for (var i = 0; i < imgs.length; i++) {
    if (i < numbs) {
      //i < numbs就代表都是第一行的元素因為大於就會排到第二行了
      arrHeight.push(imgs[i].offsetHeight);
    } else {
      //創建一個元素的對象(比較)
      var obj = {
        minH: arrHeight[0],
        minI: 0,
      };
      for (var j = 0; j < arrHeight.length; j++) {
        if (arrHeight[j] < obj.minH) {
          obj.minH = arrHeight[j];
          obj.minI = j;
        }
      }
      console.log(obj); //{minH: 144, minI: 1}
      imgs[i].style.position = "absolute"; //跳脫display屬性
      imgs[i].style.left = imgs[obj.minI].offsetLeft + "px"; //距離左邊的位置
      imgs[i].style.top = obj.minH + "px"; //obj.minH = imgs[i].offsetHeight
      arrHeight[obj.minI] = arrHeight[obj.minI] + imgs[i].offsetHeight;
      //因為用absolute定位後就要去重新計算新的高度
      //重新尋找新的最小高度
    }
  }
  console.log(arrHeight); //(5) [194, 144, 194, 194, 269]
}

window.onload = waterfall;

window.onresize = waterfall;

document.querySelectorAll(".waterFall_icon i.fa-heart").forEach((i) => {
  //為每一個fa-heart添加點擊之後的效果
  i.addEventListener("click", (evt) => {
    if (evt.target) {
      evt.target.classList.toggle("icon_heart");
    }
  });
});

document.querySelectorAll(".waterFall_icon i.fa-star").forEach((i) => {
  //為每一個fa-heart添加點擊之後的效果
  i.addEventListener("click", (evt) => {
    if (evt.target) {
      evt.target.classList.toggle("icon_star");
    }
  });
});

//這個寫法只能記錄當前
//如果要完整記錄瀏覽次數需要後端部屬
document.querySelectorAll(".waterFall_box").forEach((box) => {
  box.addEventListener("click", () => {
    //因為不需要使用到事件對象所以()不用寫evt等
    let eyeIcon = box.querySelector(".fa-eye");
    //waterFall_box裡面找到fa-eye
    let counter = eyeIcon.querySelector(".clickCount");
    //fa-eye找到span的class元素
    let count = parseInt(counter.textContent, 10);
    //parseInt()確保我們得到的textContent字串轉成數字
    //再將得到的數字+1 如果是字串的話會變成11而不是2
    counter.textContent = count + 1;
  });
});
