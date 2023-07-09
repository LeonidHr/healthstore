const getDataProd = async (url) => {
  const response = await fetch(url);
  return await response.json();
};


async function viewSearch() {
  let data 
  
  if (lang == 'ru') {
    data = await getDataProd('./assets/json/products.json');
  } else {
    data = await getDataProd('./assets/json/products-lv.json');
  }
  
  let postsData = data.products;
  const productsWrap = document.getElementById('search-result');
  const searchItem = getSearchName();

  postsData.forEach(el => {
    if (
      removeSpaces(removeChars(el.title.toLowerCase())).indexOf(removeSpaces(removeChars(searchItem[0].toLowerCase()))) > -1 
      || el.articul.toLowerCase().indexOf(searchItem[0].toLowerCase()) > -1
    ) {
      const postEl = `
        <div id="${el.id}" class="product-preview-elem ">
          <form
            action="/cart_items"
            method="post"
            data-product-id="248406913"
            class="product-preview is-zero-count-preorder"
          >
            <div class="product-preview__content">
              <div class="product-preview__area-photo">
                <div class="product-preview__photo">
                  <div class="img-ratio img-fit">
                    <div class="img-ratio__inner">
                      <a
                        href="${lang}/product/product${el.id}.html"
                      >
                        <picture>
                          <source
                            media="(min-width:768px)"
                            data-srcset="${el.imgPath}"
                            type="image/webp"
                            class="lazyload"
                          />
                          <source
                            media="(max-width:767px)"
                            data-srcset="${el.imgPath}"
                            type="image/webp"
                            class="lazyload"
                          />
                          <img
                            src="${el.imgPath}"
                            class="lazyload"
                            alt="${el.title}"
                          />
                        </picture>
                      </a>
                    </div>
                  </div>
                
                </div>
              </div>
              <div class="product-preview__area-title">
                <div class="product-preview__title">
                  <a href="${lang}/product/product${el.id}.html">
                    <p class="product-preview__label">${el.title}</p>
                    <p class="product-preview__text">${el.text}</p>      
                    <p class="product-preview__articul">${el.articul}</p>      
                  </a>
                </div>
              </div>
              
            </div>
          </form>
  
      
        </div>
      `;
      productsWrap.insertAdjacentHTML("beforeend", postEl);
    }
  });
}

viewSearch();

function removeSpaces(s) {
  // используем метод replace для замены всех вхождений пробелов на пустую строку ''
  return s.replace(/\s+/g, '');
}
function removeChars(s) {
  // используем регулярное выражение для замены всех вхождений символов '(', ')', и '-' на пустую строку ''
  return s.replace(/[-()]/g, '');
}

function searchItems(items, term) {
  return items.filter(item => {
    return item.title.indexOf(term) > -1;
  });
}

function getSearchName() {
  let json = sessionStorage.getItem('search');
  if (json) {
    // Если в локальном хранилище есть JSON объект, возвращаем его
    let buttonClicks = JSON.parse(json);
    return buttonClicks;
  } else {
    // Если объекта в локальном хранилище нет, возвращаем пустой JSON объект
    return '{}';
  }
}