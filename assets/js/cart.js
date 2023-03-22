function getProdId() {
  let json = sessionStorage.getItem('prodToCart');
  if (json) {
    // Если в локальном хранилище есть JSON объект, возвращаем его
    let buttonClicks = JSON.parse(json);
    return buttonClicks;
  } else {
    // Если объекта в локальном хранилище нет, возвращаем пустой JSON объект
    return [];
  }
}

const getData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

async function viewProductsCard() {
  const data = await getData('./assets/json/products.json');
  let postsData = data.products;
  const cartWrap = document.getElementById('cards-wrap');
  const summWrap = document.getElementById('cart-summ');
  let summ = 0;
  let prodId = getProdId();

  if (prodId.length > 0) {
    let a = 0;
    
    //name="photo-${a += 1}" 

    prodId.forEach((item, i) => {
      const postEl = `
        <div id=${postsData[item.id].id} data-num="${i}" class="checkout__cart cart-checkout checkout-grid">
          <div class="cart-checkout__name">
            <button type="button" class="cart-checkout__exit">
              <img src="./img/exit.svg" alt="Выкитуть с корзины">
            </button>

            <div class="cart-checkout__img">
              <input  value="/${postsData[item.id].imgPath}" readonly style="display:none" />
              <img src="${postsData[item.id].imgPath}" alt="${postsData[item.id].title}">
            </div>
            <div class="cart-checkout__content">
              <div class="cart-checkout__title cart-checkout__text">
                <textarea name="title-${a += 1}" value="${postsData[item.id].title}" readonly>${postsData[item.id].title}</textarea>  
              </div>
              <div class="cart-checkout__articul">
                <div>Артикул</div> 
                <input name="articul-${a += 1}" value="${postsData[item.id].articul}" readonly/>
                <span></span>
              </div>
            </div>
          </div>
          <div class="cart-checkout__count cart-checkout__text">
            <input name="count-${a += 1}" value="${postsData[item.id].unit == '50 гр.' ? item.count * 50 : postsData[item.id].unit == '100 гр.' ? item.count * 10 : postsData[item.id].unit == '10 гр.' ? item.count * 10 : item.count} ${postsData[item.id].unit == '100 гр.' || postsData[item.id].unit == '10 гр.' || postsData[item.id].unit == '50 гр.' ? 'гр.' : postsData[item.id].unit}" readonly/>
            <span></span> 
          </div>
          <div class="cart-checkout__price cart-checkout__count cart-checkout__text">
            <input name="price-one-${a += 1}"  value="${postsData[item.id].price} €" readonly/>
          </div>
          <div class="cart-checkout__price cart-checkout__count cart-checkout__text">
            <input name="price-${a += 1}" value="${formatDecimal(postsData[item.id].price * item.count)} €" readonly/>
          <span></span>
          </div>
        </div>
      `;

      cartWrap.insertAdjacentHTML("beforeend", postEl);
  
      summ += postsData[item.id].price * +item.count;
    });
  

    // document.addEventListener("click", () => {
    //   console.log(document.querySelector('#file1').value);
    // });
    

    summWrap.value = formatDecimal(summ);
  
    document.querySelectorAll('.cart-checkout__exit').forEach(btnExit => {
        btnExit.addEventListener("click", e => {
          removeProduct(e, prodId);
          // removeItemFromCookieArray(e, prodId);

          viewProductsCard();
        });
      
    });
  } else {
    document.querySelector('.js-cart-empty').style.display = "block";
    document.getElementById('checkout').style.display = "none";
  }
}

viewProductsCard();

function formatDecimal(num) {
  if (Number.isInteger(num)) { // проверяем, является ли число целым
    return num.toString(); // если число целое, возвращаем его строковое представление
  } else {
    return num.toFixed(2); // если число дробное, возвращаем строку с двумя цифрами после точки
  }
}

function removeProduct(e, prodId) {
  const carts = document.querySelectorAll('.cart-checkout');

  prodId.forEach(item => {
    if (item.id == e.target.closest('.cart-checkout').getAttribute('id')) {
      prodId.splice(e.target.closest('.cart-checkout').dataset.num, 1);
    }
  });

  carts.forEach(cart => {
    cart.remove();
  });

  sessionStorage.setItem('prodToCart', JSON.stringify(prodId));

}



document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('design-btn').addEventListener("click", smoothScroll);
});

function smoothScroll() {
  document.querySelector('.checkout__form').classList.add('_view');
  
  setTimeout(() => {
    window.scrollTo({
      top: document.querySelector('.checkout__form').offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }, 200);
}