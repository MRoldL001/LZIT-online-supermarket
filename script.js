let cart = []; // 购物车

// 添加商品
function add(id, name, price) {
  const itemIndex = cart.findIndex((item) => item.id === id); // 使用 findIndex 方法查找，找到返回索引，没找到返回-1
  if (itemIndex >= 0) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  update();
}

// 更新
function update() {
  const cartContainer = document.getElementById("cart-items");  // 从 html 中获取元素
  const totalContainer = document.getElementById("total-price");
  cartContainer.innerHTML = ""; // 清空(将元素设置为 "")

  let total = 0;  // 初始化总价

  // 渲染
  cart.forEach((item) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(itemTotal); // 累加总价

    const itemElement = document.createElement("div");  // 创建一个 div元素
    itemElement.innerHTML = `
            <p>
                ${item.name} x ${item.quantity} - ¥${itemTotal}
                <button onclick="del(${item.id})">删除</button>
            </p>
        `;
    cartContainer.appendChild(itemElement);
  });

  totalContainer.textContent = total.toFixed(2); // 更新总价
}

// 删除
function del(id) {
  cart = cart.filter((item) => item.id !== id);
  update();
}

// 结算
function checkout() {
  if (cart.length === 0) {
    alert("请先加入商品！");
  } else {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total = total.toFixed(2);
    alert(`总金额为 ¥${total}，感谢您的购物！`);

    // 清空
    cart = [];
    update();

    // 跳转到结算页
    const width = 500;
    const height = 500;
    const left = (window.innerWidth - width) / 2; // 计算窗口左侧边位置
    const top = (window.innerHeight - height) / 2; // 计算窗口顶部边位置

    // 居中显示新窗口
    window.open(
      "pay.html",
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }
}

// 切换标签页
function switchTab(event, tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  // 隐藏标签
  tabs.forEach((tab) => {
    tab.style.display = "none";
  });

  // 移除按钮的激活状态
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // 显示当前标签内容并设置按钮状态
  document.getElementById(tabId).style.display = "flex";  // 设置商品卡片排列方式为 flex
  event.currentTarget.classList.add("active");
}
