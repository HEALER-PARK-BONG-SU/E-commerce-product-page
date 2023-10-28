function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`Sorry check ${selection} selector`);
}

function Gallery(element) {
  this.container = element;
  this.list = [...document.querySelectorAll('.img-l')];
  this.mainImg = getElement('.light-box-main-img');
  this.overLay = getElement('.overlay');
  this.smallImgContainer = getElement('.lightbox-img-container');
  this.closeBtn = getElement('.close-btn');
  this.prevBtn = getElement('.prev-btn');
  this.nextBtn = getElement('.next-btn');
  this.closeModal = this.closeModal.bind(this);
  this.nextImg = this.nextImg.bind(this);
  this.prevImg = this.prevImg.bind(this);
  this.chooseImg = this.chooseImg.bind(this);
  this.container.addEventListener(
    'click',
    function (e) {
      if (
        e.target.classList.contains('img-l') ||
        e.target.classList.contains('main-img')
      ) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selected, list) {
  this.setMainImage(selected);
  this.smallImgContainer.innerHTML = list
    .map((img) => {
      return `<img src="${img.src}" data-id="${img.dataset.id}" class="${
        img.dataset.id === selected.dataset.id
          ? 'light-box-small-img selected'
          : 'light-box-small-img'
      }">`;
    })
    .join('');
  this.overLay.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImg);
  this.prevBtn.addEventListener('click', this.prevImg);
  this.smallImgContainer.addEventListener('click', this.chooseImg);
};

Gallery.prototype.setMainImage = function (selected) {
  this.mainImg.src = selected.src;
};

Gallery.prototype.closeModal = function () {
  this.overLay.classList.remove('open');
};

Gallery.prototype.nextImg = function () {
  const selected = this.smallImgContainer.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.smallImgContainer.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};

Gallery.prototype.prevImg = function () {
  const selected = this.smallImgContainer.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.smallImgContainer.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};
Gallery.prototype.chooseImg = function (e) {
  if (e.target.classList.contains('light-box-small-img')) {
    const selected = this.smallImgContainer.querySelector('.selected');
    selected.classList.remove('selected');
    e.target.classList.add('selected');
    this.setMainImage(e.target);
  }
};

const lightBox = new Gallery(getElement('.lightbox'));
// counter-cart functionality
const btns = [...document.querySelectorAll('.btn')];
const cartBtn = getElement('.add-to-cart');
const amount = getElement('.amount');
const cart = getElement('.cart');
const highlightedOrders = getElement('.highlighted-orders');
const cartContainer = getElement('.cart-item');

let counter = 0;
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('decrease') ||
      e.target.classList.contains('minus')
    ) {
      if (counter === 0) return;
      counter--;
    }
    if (
      e.target.classList.contains('increase') ||
      e.target.classList.contains('plus')
    ) {
      counter++;
    }
    amount.textContent = counter;

    cartBtn.addEventListener('click', () => {
      highlightedOrders.textContent = counter;
      highlightedOrders.classList.add('show-highlighted-orders');
      if (counter === 0) {
        highlightedOrders.classList.remove('show-highlighted-orders');
        amount.textContent = counter;
        cartContainer.innerHTML = ``;
        cartContainer.innerHTML = `<p class="cart-heading">Cart</p>
         <p class="empty">Your cart is empty</p>`;
        return;
      }
      cartContainer.innerHTML = `<p class="cart-heading">Cart</p>
              <div class="flex">
                <img
                  src="./images/image-product-1.jpg"
                  class="cart-img"
                  alt=""
                />
                <div class="small-flex">
                  <p>Fall Limited Edition Sneakers</p>
                  <p class="price-amount">
                    $125.00 x <span class="show-amount">${counter}</span
                    ><span class="total-price"> $${counter * 125}</span>
                  </p>
                </div>
           
                <img src="./images/icon-delete.svg" class="remove-order">
              </div>
              <button class="cart-btn">Checkout</button>`;

      const removeOrder = getElement('.remove-order');

      removeOrder.addEventListener('click', () => {
        counter = 0;
        highlightedOrders.classList.remove('show-highlighted-orders');
        amount.textContent = counter;
        cartContainer.innerHTML = ``;
        cartContainer.innerHTML = `<p class="cart-heading">Cart</p>
         <p class="empty">Your cart is empty</p>`;
      });
    });
  });
});

cart.addEventListener('click', () => {
  cartContainer.classList.toggle('show-total-order');
});

window.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cart')) {
    if (cartContainer.classList.contains('show-total-order')) {
      cartContainer.classList.remove('show-total-order');
    }
  }
});

window.addEventListener('scroll', (e) => {
  let scrollHeight = window.pageYOffset;
  if (scrollHeight > 1) {
    cartContainer.classList.remove('show-total-order');
  }
});
// menu open close functionality
const bars = getElement('.nav-open');
const close = getElement('.nav-close');
const sidebar = getElement('.nav-links');

bars.addEventListener('click', () => {
  sidebar.style.left = 0;
});

close.addEventListener('click', () => {
  sidebar.style.left = `${-250}px`;
});

// slider
const slides = document.querySelectorAll('.slide');
const slidePrevBtn = document.querySelector('.slider-prev-btn');
const slideNextBtn = document.querySelector('.slider-next-btn');

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

let slideCounter = 0;
slidePrevBtn.addEventListener('click', () => {
  slideCounter--;
  carousel();
});
slideNextBtn.addEventListener('click', () => {
  slideCounter++;
  carousel();
});

function carousel() {
  if (slideCounter < 0) {
    slideCounter = 3;
  }
  if (slideCounter > 3) {
    slideCounter = 0;
  }

  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${slideCounter * 100}%)`;
  });
}

