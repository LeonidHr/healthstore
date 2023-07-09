

const getData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

let langPath = 'ru';
const langArr = getLang();

if (langArr[0] == 'lv' && checkIndexHtml('index.htm')) {
  window.location.href = 'index-lv.htm';
}
if (langArr[0] == 'lv' || checkIndexHtml('-lv')) {
  langPath = 'lv';
}

function extractContentBetweenParentheses(str) {
  const regex = /\(([^)]+)\)/g;
  const matches = str.match(regex);
  const content = [];

  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const extracted = match.slice(1, -1); // Удаляем скобки из содержимого
      content.push(extracted);
      str = str.replace(match, ''); // Удаляем содержимое из исходной строки
    }
  }

  return { content, modifiedString: str };
}

async function viewProducts(categoryMain, filters) {
  let data;

  if (langPath == 'ru') {
    data = await getData('./assets/json/products.json');
  } else {
    data = await getData('./assets/json/products-lv.json');
  }

  let postsData = data.products;
  const badsWrap = document.getElementById('all-bads');

  toggleClass('.tabs-prod__title', '_tab-active', categoryMain); 
  viewAllProducts(postsData, badsWrap, categoryMain);


  changeFilters(categoryMain, filters);
  badsWrap.innerHTML = '';
  // postsData.forEach((el, i) => {
  for (let i = postsData.length - 1; i >= 0; i--) {
    if (postsData[i].category == filters && postsData[i].mainCategory == categoryMain) {

      const { content, modifiedString } = extractContentBetweenParentheses(postsData[i].title);

      const postEl = `
        <div id="${postsData[i].id}" class="product-preview-elem ">
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
                        href="${langPath}/product/product${postsData[i].id}.html"
                      >
                        <picture>
                          <source
                            media="(min-width:768px)"
                            data-srcset="${postsData[i].imgPath}"
                            type="image/webp"
                            class="lazyload"
                          />
                          <source
                            media="(max-width:767px)"
                            data-srcset="${postsData[i].imgPath}"
                            type="image/webp"
                            class="lazyload"
                          />
                          <img
                            src="${postsData[i].imgPath}"
                            class="lazyload"
                            alt="${postsData[i].title}"
                          />
                        </picture>
                      </a>
                    </div>
                  </div>
                
                </div>
              </div>
              <div class="product-preview__area-title">
                <div class="product-preview__title">
                  <a href="${langPath}/product/product${postsData[i].id}.html">
                    <p class="product-preview__label">${postsData[i].title}</p>
                    <p class="product-preview__text">${postsData[i].text}</p>      
                    <p class="product-preview__articul">${postsData[i].articul}</p>      
                  </a>
                </div>
              </div>
              
            </div>
          </form>
  
      
        </div>
      `;
      badsWrap.insertAdjacentHTML("beforeend", postEl);
    }
  }
  // });
  if (filters == 'all') {
    viewAllProducts(postsData, badsWrap, categoryMain);
  }
}

async function changeFilters(categoryMain, filters) {
  let data;

  if (langPath == 'ru') {
    data = await getData('./assets/json/filters.json');
  } else {
    data = await getData('./assets/json/filters-lv.json');
  }
 
  let postsData = data.filters;
  const filtersContainer = document.getElementById('filters');

  filtersContainer.innerHTML = '';

  postsData.forEach(el => {
    if (el.category == categoryMain) {
      el.content.forEach((item, i) => {
        const postEl = `
          <div id="${el.filters[i]}" class="splide__slide">
            <div
              class="tabs__head-item">
              <div class="special-products__head">
                <div class="widget_heading tabs__head-label">${el.content[i]}</div>
              </div>
            </div>
          </div>
        `;

        filtersContainer.insertAdjacentHTML("beforeend", postEl);
      });

      toggleClass('.tabs__head-item', 'is-active', filters);
    }
  });


  toggleClass('.tabs__head-item', 'is-active', filters); 
  // addClassToFirst();
}

function addClassToFirst() {
  document.querySelectorAll('.tabs__head-item').forEach(item => {
    item.classList.remove('is-active');
  });
  const itemAll = document.querySelector('#all'); 

  itemAll.querySelector('.tabs__head-item').classList.add('is-active');
}

function toggleClass(elClass, activeClass, elActive) {
  document.querySelectorAll(elClass).forEach(item => {
    item.classList.remove(activeClass);
  });

  if (activeClass == '_tab-active') {
    document.querySelector(`[data-tab=${elActive}]`).classList.add(activeClass);
  } else {
    document.getElementById(elActive).classList.add(activeClass);
  }

}


function viewAllProducts(postsData, badsWrap, category) {

  badsWrap.innerHTML = '';

  // postsData.forEach((el, i) => {
  for (let i = postsData.length - 1; i >= 0; i--) {
    if (postsData[i].mainCategory === category) {

      const { content, modifiedString } = extractContentBetweenParentheses(postsData[i].title);

      const postEl = `
        <div id="${postsData[i].id}" class="product-preview-elem ">
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
                        href="${langPath}/product/product${postsData[i].id}.html"
                      >
                      
                        <picture>
                          <img
                            src="${postsData[i].imgPath}"
                            class="lazyload"
                            alt="${postsData[i].title}"
                          />
                          
                        </picture>
                      </a>
                    </div>
                  </div>
                
                </div>
              </div>
              <div class="product-preview__area-title">
                <div class="product-preview__title">
                  <a href="${langPath}/product/product${postsData[i].id}.html">
                    <p class="product-preview__label">
                      ${modifiedString}
                    </p>
                    <p class="product-preview__label">
                      ${content.length ? `(${content})` : ''}
                    </p>
                    <p class="product-preview__text">${postsData[i].text}</p>      
                    <p class="product-preview__articul">${postsData[i].articul}</p>      
                  </a>
                </div>
              </div>
              
            </div>
          </form>

      
        </div>
      `;

      badsWrap.insertAdjacentHTML("beforeend", postEl);
    }
  }
  // });
}


let lastClicks = getLastButtonClicksJson('mainFilterClicks');
let lastClicksFilter = getLastButtonClicksJson('filterClicks');

if (lastClicks[0] == 'pins') {
  lastClicks[0] = 'capsules';
}

if (
  getUrlHashText(window.location.href) != 'bads' &&
  getUrlHashText(window.location.href) != 'vitamins' &&
  getUrlHashText(window.location.href) != 'capsules' &&
  getUrlHashText(window.location.href) != 'herbs' &&
  getUrlHashText(window.location.href) != 'other'
) {
  addButtonClickToJson('bads', 'mainFilterClicks');
  if (!checkUrlHash(window.location.href)) {
    window.location.href += `#bads`;
  }
  viewProducts('bads', 'all');
} else if (checkUrlHash(window.location.href) && getUrlHashText(window.location.href) != lastClicks[0]) {
  addButtonClickToJson(getUrlHashText(window.location.href), 'mainFilterClicks');
  viewProducts(getUrlHashText(window.location.href), 'all');
} else if (checkUrlHash(window.location.href) && lastClicksFilter) {
  viewProducts(getUrlHashText(window.location.href), lastClicksFilter[0]);
} else if (checkUrlHash(window.location.href)) {
  viewProducts(getUrlHashText(window.location.href), 'all');
} else {
  if(lastClicks && lastClicksFilter) {
    viewProducts(lastClicks[0], lastClicksFilter[0]);
  } else if (lastClicks) {
    viewProducts(lastClicks[0], 'all');
  } else if (lastClicksFilter) {
    viewProducts('bads', lastClicksFilter[0]);
  } else {
    viewProducts('bads', 'all');
  }
}


function getLastButtonClicksJson(name) {
  let json = localStorage.getItem(name);
  if (json) {
    // Если в локальном хранилище есть JSON объект, возвращаем его
    let buttonClicks = JSON.parse(json);
    return buttonClicks;
  } else {
    // Если объекта в локальном хранилище нет, возвращаем пустой JSON объект
    return false;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#main-filter').addEventListener("click", e => {
    if (e.target.closest('.tabs-prod__title')) {
      addButtonClickToJson('all', 'filterClicks');
      addButtonClickToJson(e.target.closest('.tabs-prod__title').dataset.tab, 'mainFilterClicks');
      viewProducts(e.target.closest('.tabs-prod__title').dataset.tab, 'all');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#bads-nav').addEventListener("click", e => {
    if (e.target.closest('.splide__slide')) {
      addButtonClickToJson(e.target.closest('.splide__slide').getAttribute('id'), 'filterClicks');
      
      lastClicks = getLastButtonClicksJson('mainFilterClicks');
      lastClicksFilter = getLastButtonClicksJson('filterClicks');

      if(lastClicks && lastClicksFilter) {
        viewProducts(lastClicks[0], lastClicksFilter[0]);
      } else if (lastClicks) {
        viewProducts(lastClicks[0], 'all');
      } else if (lastClicksFilter) {
        viewProducts('bads', lastClicksFilter[0]);
      } else {
        viewProducts('bads', 'all');
      }
    }
  });
});

function removeLocalItems(name) {
  // Проверяем, есть ли уже объект в локальном хранилище
  let json = localStorage.getItem(name);
  let buttonClicks = [];
  if (json) {
    buttonClicks = JSON.parse(json);
  }

  buttonClicks = [];

  // Сохраняем обновленный объект в локальном хранилище
  localStorage.setItem(name, JSON.stringify(buttonClicks));
}

function addButtonClickToJson(buttonNumber, name) {
  // Проверяем, есть ли уже объект в локальном хранилище
  let json = localStorage.getItem(name);
  let buttonClicks = [];
  if (json) {
    buttonClicks = JSON.parse(json);
  }

  buttonClicks = [];
  // Добавляем новое значение
  buttonClicks.unshift(buttonNumber);

  // Сохраняем обновленный объект в локальном хранилище
  localStorage.setItem(name, JSON.stringify(buttonClicks));
}

function addToPath() {
  let lastClicks = getLastButtonClicksJson('mainFilterClicks');

  if (lastClicks[0] && !checkUrlHash(window.location.href)) {
    window.location.href += `#${lastClicks[0]}`;
  }
}

function checkUrlHash(url) {
  return url.includes("#");
}

function getUrlHashText(url) {
  const hashIndex = url.indexOf("#");
  if (hashIndex === -1) {
    return "";
  } else {
    return url.substring(hashIndex + 1);
  }
}

// addToPath();

function handleUrlHashChange() {
  const hash = window.location.hash.substring(1); // извлекаем фрагмент без символа "#"
  
  const mainNav = document.querySelectorAll('[data-nav]');

  mainNav.forEach(item => {
    if (hash == item.dataset.tab) {
      viewProducts(getUrlHashText(window.location.href), 'all');
    }
  });
}

window.addEventListener("hashchange", handleUrlHashChange);

initSliders();

function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.filters-slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.filters-slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			// modules: [Navigation],
			observer: true,
			observeParents: true,
			speed: 600,
      breakpoints: {
        270: {
          slidesPerView: 3.6,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 4.5,
          spaceBetween: 0,
        },
        540: {
          slidesPerView: 5,
          spaceBetween: 0,
        }
      }
		});
	}
}

function checkIndexHtml(val) {
  if (window.location.href.indexOf(val) > -1) {
    return true;
  } else {
    return false;
  }
}