import { menuList } from "./product-data/menuList.js";
import { ramenList } from "./product-data/ramensList.js";
import { burgerList } from "./product-data/burgerList.js";
import { friesList } from "./product-data/friesList.js";
import { saucesList } from "./product-data/sauces.js";
import { bowlsList } from "./product-data/bowlsList.js";
import { wokList } from "./product-data/wokList.js";

let menuNavContainer = document.getElementById("menu-nav__container");
let menuCatalog = document.getElementById("menu-catalog");
let cart = document.getElementById("cart");
let cartMamount = document.getElementById("cartM__amount");
let cartM = document.getElementById("cartM");

cartM.addEventListener("click", (e) => {
  cart.style.right = cart.style.right === "5%" ? "-100%" : "5%";
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (!cart.contains(e.target) && !cartM.contains(e.target)) {
    cart.style.right = "-100%";
  }
});

cart.addEventListener("click", (e) => {
  e.stopPropagation();
});

let cartItems = [];

const updateCart = () => {
  if (cartItems.length < 1) {
    cart.innerHTML = `
    
    <div class="cart__header">
    
      <h3 class="cart__header-title">Cart</h3>
      <div id="cart__total-amount" class="cart__total-amount">0</div>
    </div>
    <div> It's still empty here :(</div>`;
    cartMamount.innerHTML = cartItems.length;
  } else {
    let totalAmount = 0;
    let itemsQuantity = 0;
    cart.innerHTML = cart.innerHTML = `
    <div class="cart__header">
      <h3 class="cart__header-title">Cart</h3>
      <div id="cart__total-amount" class="cart__total-amount">0</div>
    </div>
    <div class="cart__list">
      ${cartItems
        .map((item, index) => {
          totalAmount += item.price * item.quantity;
          itemsQuantity += item.quantity;
          return `
            <div class="cart__item">
              <div class="cart__item-content">
                <div class="cart__imgWrap">
                  <img class="cart__img" src="${item.img}" alt="${item.title}" />
                </div>
                <div class="cart__item-info-wrap">
                  <h5 class="cart__item-info-title">${item.title}</h5>
                  <span class="cart__item-info-price">${item.price}$</span>
                </div>
              </div>
              <div class="cart__info-counter">
                <button class="cart__info-counter-minus" data-index="${index}">-</button>
                <div class="cart__info-counter-amount">${item.quantity}</div>
                <button class="cart__info-counter-plus" data-index="${index}">+</button>
              </div>
            </div>`;
        })
        .join("")}
      <div class="cart__footer">
        <div class="cart__footer-total-wrap">
          <span class="cart__info-total-title">Total</span>
          <span class="cart__info-total-amount">${totalAmount}$</span>
        </div>
        <button class="cart__button">Make an order</button>
      </div>
    </div>`;
    cartMamount.innerHTML = itemsQuantity;
    document.getElementById("cart__total-amount").innerHTML = itemsQuantity;
  }

  document.querySelectorAll(".cart__info-counter-minus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
      } else {
        cartItems.splice(index, 1);
      }
      updateCart();
    });
  });

  document.querySelectorAll(".cart__info-counter-plus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartItems[index].quantity++;
      updateCart();
    });
  });
};

updateCart();

const addToCart = (product, quantity) => {
  const existingItem = cartItems.find((item) => item.title === product.title);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }
  updateCart();
  console.log(cartItems);
};

menuList.forEach((item) => {
  const menuItem = document.createElement("button");

  menuItem.className = "menu-nav__item";
  menuItem.innerHTML = `
  
    <img src="${item.img}" alt="${item.title}" class="item-img">
    <span>${item.title}</span>
`;

  menuItem.addEventListener("click", (event) => {
    event.preventDefault();

    const allMenuItems = document.querySelectorAll(".menu-nav__item");
    allMenuItems.forEach((el) => el.classList.remove("active"));

    menuItem.classList.add("active");

    if (item.id === 1) {
      renderProdutCards(item.id, burgerList);
    } else if (item.id === 2) {
      renderProdutCards(item.id, ramenList);
    } else if (item.id === 3) {
      renderProdutCards(item.id, friesList);
    } else if (item.id === 4) {
      renderProdutCards(item.id, wokList);
    } else if (item.id === 5) {
      renderProdutCards(item.id, bowlsList);
    } else if (item.id === 6) {
      renderProdutCards(item.id, saucesList);
    }
  });

  menuNavContainer.appendChild(menuItem);
});

burgerList.forEach((product) => {
  const menuCartItem = document.createElement("div");
  menuCartItem.className = "menu-cart-item";
  menuCartItem.innerHTML = `
   <div class="cart-item__img-wrap"><img src="${product.img}" alt="${product.title}" class="cart-item__img"></div>
  <p class="cart-item__price">${product.price}$</p>
  <p class="cart-item__title">${product.title}</p>
  <button class="cart-item__button" >Add</button>`;
  menuCatalog.appendChild(menuCartItem);

  menuCartItem.addEventListener("click", () => {
    showModal(product);
  });
});

const renderProdutCards = (id, productList) => {
  menuCatalog.innerHTML = "";

  if (productList && productList.length > 0) {
    productList.forEach((product) => {
      const menuCartItem = document.createElement("div");
      menuCartItem.className = "menu-cart-item";
      menuCartItem.innerHTML = `
       <div class="cart-item__img-wrap"><img src="${product.img}" alt="${product.title}" class="cart-item__img"></div>
      <p class="cart-item__price">${product.price}$</p>
      <p class="cart-item__title">${product.title}</p>
      <button class="cart-item__button" >Add</button>`;
      menuCatalog.appendChild(menuCartItem);

      menuCartItem.addEventListener("click", () => {
        showModal(product);
      });
    });
  }
};

const showModal = (product) => {
  const modal = document.getElementById("modal");
  const modalBody = modal.querySelector(".modal-body");

  let quantity = 1;

  modalBody.innerHTML = `
  <h2 class="modal-item__title">${product.title}</h2>
  <div class="modal-item__bodyWrap">
    <img class="modal-item__img" src="${product.img}">
    <p class="modal-item__descr">${product.description}</p>
  </div>
  <div class="modal-item__footer">
  <div class="modal-item__addBtnNcounter">
    <button class="modal-item__addBtn">Add to cart</button>
      <div class="modal-item__counter">
           <div class="modal-item__counter-minus">-</div>
           <div class="modal-item__counter-amount">${quantity}</div>
            <div class="modal-item__counter-plus">+</div>
            </div>
      </div>
    <span class="modal-item__price">${product.price}$</span>
  </div>`;
  modal.style.display = "block";

  const closeModalButton = document.querySelector(".modal-close-button");
  closeModalButton.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const minusButton = modal.querySelector(".modal-item__counter-minus");
  const plusButton = modal.querySelector(".modal-item__counter-plus");
  const quantityDisplay = modal.querySelector(".modal-item__counter-amount");

  minusButton.onclick = () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  };

  plusButton.onclick = () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  };

  const addToCartButton = modal.querySelector(".modal-item__addBtn");
  addToCartButton.onclick = () => {
    addToCart({ ...product }, quantity);
    modal.style.display = "none";
  };
};
