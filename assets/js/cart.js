// function getProdId() {
//   let json = localStorage.getItem('prodToCart');
//   if (json) {
//     // Если в локальном хранилище есть JSON объект, возвращаем его
//     let buttonClicks = JSON.parse(json);
//     return buttonClicks;
//   } else {
//     // Если объекта в локальном хранилище нет, возвращаем пустой JSON объект
//     return '{}';
//   }
// }

// function getCookie(name) {
//   let matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

function getCookie(name) {
  // Разбиваем строку с куками на массив пар "имя=значение"
  const cookies = document.cookie.split(';');

  // Ищем пару с заданным именем
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      // Если нашли, возвращаем значение
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  // Если не нашли, возвращаем null
  return '[]';
}

function jsonStringToArray(jsonString) {
  // Преобразуем JSON-строку в JavaScript-объект
  const json = JSON.parse(jsonString);
  // const parseJson = JSON.parse(json);


  // Если json не является массивом, возвращаем ошибку
  if (!Array.isArray(json)) {
    throw new Error('JSON строка не является массивом');
  }
  
  // Возвращаем массив объектов
  return json;
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
  let prodId = jsonStringToArray(getCookie('prodToCart'));

  if (prodId.length > 0) {
    prodId.forEach((item, i) => {
      const postEl = `
        <div id=${postsData[item.id].id} data-num="${i}" class="checkout__cart cart-checkout checkout-grid">
          <div class="cart-checkout__name">
            <button type="button" class="cart-checkout__exit">
              <img src="./img/exit.svg" alt="Выкитуть с корзины">
            </button>
            <div class="cart-checkout__img">
              <img src="${postsData[item.id].imgPath}" alt="${postsData[item.id].title}">
            </div>
            <div class="cart-checkout__content">
              <div class="cart-checkout__title cart-checkout__text">${postsData[item.id].title}</div>
              <div class="cart-checkout__articul">
                <div>Артикул</div> 
                <span>${postsData[item.id].articul}</span>
              </div>
            </div>
          </div>
          <div class="cart-checkout__count cart-checkout__text">
            <span>${postsData[item.id].unit == '100 гр.' ? item.count * 100 : postsData[item.id].unit == '100 гр.' ? item.count * 10 : item.count} </span> 
            ${postsData[item.id].unit == '100 гр.' || postsData[item.id].unit == '10 гр.' ? 'гр.' : postsData[item.id].unit}
          </div>
          <div class="cart-checkout__price cart-checkout__text"><span>${postsData[item.id].price}</span> €</div>
          <div class="cart-checkout__price cart-checkout__text"><span>${formatDecimal(postsData[item.id].price * item.count)}</span> €</div>
        </div>
      `;
      cartWrap.insertAdjacentHTML("beforeend", postEl);
  
      summ += postsData[item.id].price * +item.count;
    });
  
    summWrap.innerHTML = formatDecimal(summ);
  
    document.querySelectorAll('.cart-checkout__exit').forEach(btnExit => {
        btnExit.addEventListener("click", e => {
          // removeProduct(e, prodId);
          removeItemFromCookieArray(e, prodId);

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

  localStorage.setItem('prodToCart', JSON.stringify(prodId));

}

function removeItemFromCookieArray(e, prodId) {
  // Получаем значение cookies
  const carts = document.querySelectorAll('.cart-checkout');
  // Получаем текущее значение куки (если есть)
  // const cart = JSON.parse(getCookies('prodToCart') || '[]');

  // console.log(cart);

  prodId.forEach(item => {
    if (item.id == e.target.closest('.cart-checkout').getAttribute('id')) {
      prodId.splice(e.target.closest('.cart-checkout').dataset.num, 1);
    }
  });

  // var cookies = document.cookie.split(';');
  // var cookieValue = '';
  // for (var i = 0; i < cookies.length; i++) {
  //   var cookie = cookies[i].trim();
  //   if (cookie.indexOf(cookieName + '=') == 0) {
  //     cookieValue = decodeURIComponent(cookie.substring(cookieName.length + 1));
  //     break;
  //   }
  // }

  // Преобразуем значение cookies в массив
  // var array = JSON.parse(cart);

  // Удаляем элемент из массива
  // cart.splice(indexToRemove, 1);

  // Преобразуем массив обратно в строку
  cookieValue = JSON.stringify(prodId);

  // Сохраняем массив в cookies
  // document.cookie = cookieName + '=' + encodeURIComponent(cookieValue);
  setCookie('prodToCart', cookieValue, { expires: 7, path: '/' });

  carts.forEach(cart => {
    cart.remove();
  });
}



// Функции для работы с куками
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookies(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}







document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('design-btn').addEventListener("click", smoothScrollBy300px);
});

function smoothScrollBy300px() {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}