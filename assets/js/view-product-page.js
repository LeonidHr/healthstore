// function getLastButtonClicksJson() {
//   let json = localStorage.getItem('buttonClicks');
//   if (json) {
//     // Если в локальном хранилище есть JSON объект, возвращаем его
//     let buttonClicks = JSON.parse(json);
//     return buttonClicks;
//   } else {
//     // Если объекта в локальном хранилище нет, возвращаем пустой JSON объект
//     return '{}';
//   }
// }

// let lastButtonClicksJson = getLastButtonClicksJson();
// console.log(lastButtonClicksJson);

const getData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

async function viewProduct() {
  const data = await getData('../assets/json/products.json');
  let postsData = data.products;
  const product = document.getElementById('product-wrap');
  const path = document.getElementById('page-path');
  const documetnId = document.documentElement.getAttribute('id');

  viewAnalogs(postsData);

  const pathContent = `
    <div class="breadcrumb-wrapper delemeter_3">
      <ul class="breadcrumb">
        <li class="breadcrumb-item home">
          <a class="breadcrumb-link" title="Главная" href="../index.htm">Главная</a
          >
        </li>

        <li class="breadcrumb-item" data-breadcrumbs="2">
          <a class="breadcrumb-link">${postsData[documetnId].mainCategory}</a
          >
        </li>

        <li class="breadcrumb-item" data-breadcrumbs="2">
          <a class="breadcrumb-link">${postsData[documetnId].title}</a>
        </li>
      </ul>
    </div>
  `

  path.insertAdjacentHTML("beforeend", pathContent);
  document.title = postsData[documetnId].title;


  let img2 = '';
  let imgMain2 = '';

  if (postsData[documetnId].imgPath2) {
    img2 = `
      <div
      class="splide__slide product__slide-tumbs js-product-gallery-tumbs-slide is-active is-visible is-current"
      data-product-img-id="529685436"
      data-product-img-index="0"
      id="splide02-slide01"
      style="
        margin-right: 1rem;
        width: calc(((100% + 1rem) / 7) - 1rem);
      "
      tabindex="0"
    >
      <div
        class="img-ratio img-ratio_contain product__photo-tumb"
      >
        <div class="img-ratio__inner">
          <picture>
            <source
              data-srcset="../${postsData[documetnId].imgPath2}"
              type="image/webp"
              class="lazyload entered"
              data-ll-status="entered"
              srcset="../${postsData[documetnId].imgPath2}"
            />
            <img
              data-src="../${postsData[documetnId].imgPath2}"
              class="lazyload entered loaded"
              alt="${postsData[documetnId].title}"
              data-ll-status="loaded"
              src="../${postsData[documetnId].imgPath2}"
            />
          </picture>
        </div>
      </div>
    </div>
    `;

    imgMain2 = `
      <div
        class="splide__slide product__slide-main"
        data-product-img-id="529685437"
        data-product-img-index="2"
        id="splide01-slide03"
        style="
          margin-right: 1px;
          width: calc(((100% + 1px) / 1) - 1px);
        "
        aria-hidden="true"
      >
        <a
          class="img-ratio img-fit product__photo"
          data-alt=""
          data-fslightbox="product-photos-lightbox-423834350"
          data-type="image"
          href="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
          tabindex="-1"
        >
          <div class="img-ratio__inner">
            <picture>
              <source
                data-srcset="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
                type="image/webp"
                class="lazyload entered exited"
                data-ll-status="entered"
                srcset="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
              />
              <img
                src="../img/" data-src="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
                class="lazyload entered loaded"
                alt=""
                data-ll-status="loaded"
                src="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
              />
            </picture>
          </div>
        </a>
      </div>
    `;
  }

  let buttons = `
    <button data-num="5" type="button">5 шт.</button>
    <button data-num="10" type="button">10 шт.</button>
    <button data-num="15" type="button">15 шт. </button>
    <button data-num="20" type="button">20 шт.</button>
  `;

  if (postsData[documetnId].isHerbs) {
    buttons = `<button data-num="5" type="button">5 гр.</button>`;
  }



  const postEl = `
    <div id="${postsData[documetnId].id}" data-product data-gallery-type="all-photos" class="product is-zero-count-preorder">
    <div class="product__area-photo">
      <div class="product__gallery js-product-gallery">
        <div style="display: none" class="js-product-all-images">
          
        

          <div class="splide__slide product__slide-main">
            <a
              class="img-ratio img-fit product__photo"
              data-alt="${postsData[documetnId].title}"
              data-fslightbox="product-photos-lightbox"
              data-type="image"
              href="../${postsData[documetnId].imgPath}"
            >
              <div class="img-ratio__inner">
                <picture>
                  <source
                    data-srcset="../${postsData[documetnId].imgPath}"
                    type="image/webp"
                    class="lazyload"
                  />
                  <img
                    src="../${postsData[documetnId].imgPath}" data-src="../${postsData[documetnId].imgPath}"
                    class="lazyload"
                    alt="${postsData[documetnId].title}"
                  />
                </picture>
              </div>
            </a>
          </div>
          <div
            class="splide__slide product__slide-tumbs js-product-gallery-tumbs-slide"
            data-product-img-id="529685434"
          >
            <div
              class="img-ratio img-ratio_contain product__photo-tumb"
            >
              <div class="img-ratio__inner">
                <picture>
                  <source
                    data-srcset="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
                    type="image/webp"
                    class="lazyload"
                  />
                  <img
                    src="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}" data-src="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
                    class="lazyload"
                    alt="Triphala (Unifarma) Добовка для пищеварения"
                  />
                </picture>
              </div>
            </div>
          </div>

          <div
            class="splide__slide product__slide-main"
            data-product-img-id="529685437"
          >
            <a
              class="img-ratio img-fit product__photo"
              data-alt="Styx Naturcosmetic Эфирное масло Каяпут,10 мл"
              data-fslightbox="product-photos-lightbox"
              data-type="image"
              href="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
            >
              <div class="img-ratio__inner">
                <picture>
                  <source
                    data-srcset="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
                    type="image/webp"
                    class="lazyload"
                  />
                  <img
                    src="../img/" data-src="../${postsData[documetnId].imgPath2 ? postsData[documetnId].imgPath2 : postsData[documetnId].imgPath}"
                    class="lazyload"
                    alt="Styx Naturcosmetic Эфирное масло Каяпут,10 мл"
                  />
                </picture>
              </div>
            </a>
          </div>
          
        </div>

        <div class="product__gallery-main">
          <div
            class="splide js-product-gallery-main is-initialized splide--slide splide--ltr splide--draggable is-active"
            id="splide01"
          >
            <div
              class="splide__track"
              id="splide01-track"
              style="padding-left: 0px; padding-right: 0px"
            >
              <div
                class="splide__list"
                id="splide01-list"
                style="transform: translateX(0px)"
              >
                <div
                  class="splide__slide product__slide-main is-active is-visible"
                  data-product-img-id="529685436"
                  data-product-img-index="0"
                  id="splide01-slide01"
                  style="
                    margin-right: 1px;
                    width: calc(((100% + 1px) / 1) - 1px);
                  "
                  tabindex="0"
                >
                  <a
                    class="img-ratio img-fit product__photo"
                    data-alt="Styx Naturcosmetic Эфирное масло Каяпут,10 мл"
                    data-fslightbox="product-photos-lightbox-423834350"
                    data-type="image"
                    href="../${postsData[documetnId].imgPath}"
                  >
                    <div class="img-ratio__inner">
                      <picture>
                        <source
                          data-srcset="../${postsData[documetnId].imgPath}"
                          type="image/webp"
                          class="lazyload entered"
                          data-ll-status="entered"
                          srcset="../${postsData[documetnId].imgPath}"
                        />
                        <img
                          data-src="../${postsData[documetnId].imgPath}"
                          class="lazyload entered loaded"
                          alt="Styx Naturcosmetic Эфирное масло Каяпут,10 мл"
                          data-ll-status="loaded"
                          src="../${postsData[documetnId].imgPath}"
                        />
                      </picture>
                    </div>
                  </a>
                </div>
                ${imgMain2}
                
              </div>
            </div>
            <div class="splide__arrows">
              <button
                type="button"
                class="splide__arrow splide__arrow--prev"
                aria-controls="splide01-track"
                aria-label="Previous slide"
                disabled=""
                style="display: flex !important;"
              >
                <span
                  class="splide__arrow-icon icon-angle-left"
                ></span>
              </button>
              <button
                type="button"
                class="splide__arrow splide__arrow--next"
                aria-controls="splide01-track"
                aria-label="Next slide"
                style="display: flex !important;"
              >
                <span
                  class="splide__arrow-icon icon-angle-right"
                ></span>
              </button>
            </div>
            <ul class="splide__pagination">
              <li>
                <button
                  class="splide__pagination__page is-active"
                  type="button"
                  aria-controls="splide01-slide01"
                  aria-label="Go to slide 1"
                  aria-current="true"
                ></button>
              </li>
              <li>
                <button
                  class="splide__pagination__page"
                  type="button"
                  aria-controls="splide01-slide02"
                  aria-label="Go to slide 2"
                ></button>
              </li>
              <li>
                <button
                  class="splide__pagination__page"
                  type="button"
                  aria-controls="splide01-slide03"
                  aria-label="Go to slide 3"
                ></button>
              </li>
            </ul>
          </div>

          <div class="stickers">
            <div
              class="sticker sticker-sale"
              data-product-card-sale-value=""
              data-sticker-title="sticker-sale"
            ></div>
            <div
              class="sticker sticker-preorder"
              data-sticker-title="sticker-preorder"
            >
              Предзаказ
            </div>
          </div>
        </div>
        <div class="product__gallery-tumbs" style="--img-ratio: 1">
          <div
            class="splide js-product-gallery-tumbs is-initialized splide--slide splide--ltr splide--draggable is-active"
            id="splide02"
          >
            <div
              class="splide__track"
              id="splide02-track"
              style="padding-left: 0px; padding-right: 0px"
            >
              <div
                class="splide__list"
                id="splide02-list"
                style="transform: translateX(0px)"
              >
                <div
                  class="splide__slide product__slide-tumbs js-product-gallery-tumbs-slide is-active is-visible is-current"
                  data-product-img-id="529685436"
                  data-product-img-index="0"
                  id="splide02-slide01"
                  style="
                    margin-right: 1rem;
                    width: calc(((100% + 1rem) / 7) - 1rem);
                  "
                  tabindex="0"
                >
                  <div
                    class="img-ratio img-ratio_contain product__photo-tumb"
                  >
                    <div class="img-ratio__inner">
                      <picture>
                        <source
                          data-srcset="../${postsData[documetnId].imgPath}"
                          type="image/webp"
                          class="lazyload entered"
                          data-ll-status="entered"
                          srcset="../${postsData[documetnId].imgPath}"
                        />
                        <img
                          data-src="../${postsData[documetnId].imgPath}"
                          class="lazyload entered loaded"
                          alt="${postsData[documetnId].title}"
                          data-ll-status="loaded"
                          src="../${postsData[documetnId].imgPath}"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
                ${img2}
                
            
              </div>
            </div>
            <div class="splide__arrows">
              <button
                type="button"
                class="splide__arrow splide__arrow--prev"
                aria-controls="splide02-track"
                disabled=""
                aria-label="Previous slide"
                style="display: flex !important;"
              >
                <span
                  class="splide__arrow-icon icon-angle-left"
                ></span>
              </button>
              <button
                type="button"
                class="splide__arrow splide__arrow--next"
                aria-controls="splide02-track"
                disabled=""
                aria-label="Next slide"
                style="display: flex !important;"
              >
                <span
                  class="splide__arrow-icon icon-angle-right"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form
      action="/cart_items"
      method="post"
      class="product__area-form product-form"
    >

      <div class="product-form__area-title">
        <h1 class="product__title heading">
        ${postsData[documetnId].title}
        </h1>
        <p class="product-preview__text">${postsData[documetnId].text}</p>   
        <div class="product-form__area-sku">
        <div class="product__sku">
          <!-- data-product-card-sku='{"skuLabel": "арт. "}' -->
          <span>${postsData[documetnId].articul}</span>
        </div>
      </div>
        <div class="product__area-description">
          <div class="product__full-description static-text">
            <div class="cut-block js-cut-block" data-max-height="0">
              <div class="cut-block__content-wrapper">
                <div class="cut-block__content">
                  <div class="product__block-title">Состав</div>
                  <div class="product__description-content static-text">
                  
                   
                    <div
                      class="t396__elem tn-elem tn-elem__3127325921620230892027"
                      data-elem-id="1620230892027"
                      data-elem-type="shape"
                      data-field-top-value="410"
                      data-field-top-res-480-value="469"
                      data-field-left-value="0"
                      data-field-left-res-480-value="0"
                      data-field-height-value="1"
                      data-field-width-value="100"
                      data-field-axisy-value="top"
                      data-field-axisx-value="left"
                      data-field-container-value="grid"
                      data-field-topunits-value="px"
                      data-field-leftunits-value="px"
                      data-field-heightunits-value="px"
                      data-field-widthunits-value="%"
                      data-fields="width,height,top,left,container,axisx,axisy,widthunits,heightunits,leftunits,topunits"
                    >
                      <div class="tn-atom"></div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div class="cut-block__controls">
                <span class="cut-block__controls-link _show button-link js-show-cut-block">
                Состав
                <img src="../img/arrow-down.svg" />
                </span>
                <span
                  class="cut-block__controls-link _hide button-link js-hide-cut-block"
                >
                  Свернуть
                  <img src="../img/arrow-down.svg" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="product-form__area-price">
      <div class="product__price">
        <span class="product__price-cur" data-product-card-price-from-cart="">
          ${postsData[documetnId].price}
          <span> €</span>
        </span>
        <span
          class="product__price-old"
          data-product-card-old-price=""
        ></span>
        за шт.
      </div>
    </div>

      <div class="product-form__area-variants-bundle">
        <input type="hidden" name="variant_id" value="579206704" />
      </div>

      <div class="product-form__counters">
        <div class="product__block-title">Кол-во шт.</div>
        <div class="product-form__counters-btns">
          ${buttons}
        </div>
      </div>

      <div class="product-form__area-controls">
        <div class="product__controls">
          <div class="product__controls-left">
            <div
              class="product__buy-btn-area"
              id="product-detail-buy-area"
            >
              <div class="product__buy-btn-area-inner">
                <div
                  class="add-cart-counter"
                  data-add-cart-counter='{"step": "1"}'
                >
                  <button type="button" class="button button_size-l add-cart-counter__btn" data-add-cart-counter-btn="">
                      <span class="button__icon icon-cart"></span>
                      <span class="add-cart-counter__btn-label">
                      В корзину
                    </span>
                  </button>
                  <div class="add-cart-counter__controls">
                    <button
                      data-add-cart-counter-minus=""
                      class="button button_size-l add-cart-counter__controls-btn"
                      type="button"
                    >
                      -
                    </button>
                    <a
                      href="../cart_items.html"
                      class="button button_size-l add-cart-counter__detail"
                    >
                      <span class="add-cart-counter__detail-text"
                        >В корзине
                        <span data-add-cart-counter-count=""></span>
                        шт</span
                      >
                      <span class="add-cart-counter__detail-dop-text"
                        >Перейти</span
                      >
                    </a>
                    <button
                      data-add-cart-counter-plus=""
                      class="button button_size-l add-cart-counter__controls-btn"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  data-product-card-preorder=""
                  class="button button_size-l button_wide product__preorder-btn"
                  type="button"
                >
                  Предзаказ
                </button>
              </div>

              <span
                class="button button_size-l product__not-available"
                >Нет в наличии</span
              >
            </div>
          </div>
          <div class="product__controls-right"></div>
        </div>
      </div>


      <div class="product-form__area-short-description">
        <div class="product__short-description static-text"></div>
      </div>
    </form>
  </div>
  `;

  product.insertAdjacentHTML("beforeend", postEl);


  const descr = document.querySelector('.product__description-content');
  
  postsData[documetnId].descr.forEach((text, i) => {
    descr.insertAdjacentHTML("beforeend", `
      <p>
        ${postsData[documetnId].descr[i]}  
      </p>
    `);
  });

  addBtnsClick();
}

viewProduct();


function viewAnalogs(postsData) {
  const analogsWrap = document.getElementById('analogs-wrap');
  const randomNumbers = generateRandomNumbers();

  for (let i = 0; i < 5; i++) {

    const postEl = `
      <div id="${postsData[randomNumbers[i]].id}" class="product-preview-elem _sending">
        <form
          action="/cart_items"
          method="post"
          class="product-preview is-zero-count-preorder"
        >
          <div class="product-preview__content">
            <div class="product-preview__area-photo">
              <div class="product-preview__photo">
                <div class="img-ratio img-fit">
                  <div class="img-ratio__inner">
                    <a
                      href="product${postsData[randomNumbers[i]].id}.html"
                    >
                      <picture>
                        <source
                          media="(min-width:768px)"
                          data-srcset="../${postsData[randomNumbers[i]].imgPath}"
                          type="image/webp"
                          class="lazyload"
                        />
                        <source
                          media="(max-width:767px)"
                          data-srcset="../${postsData[randomNumbers[i]].imgPath}"
                          type="image/webp"
                          class="lazyload"
                        />
                        <img
                          src="../${postsData[randomNumbers[i]].imgPath}"
                          data-src="../${postsData[randomNumbers[i]].imgPath}"
                          class="lazyload"
                          alt="${postsData[randomNumbers[i]].title}"
                        />
                      </picture>
                    </a>
                  </div>
                </div>
              
              </div>
            </div>
            <div class="product-preview__area-title">
              <div class="product-preview__title">
                <a href="product${postsData[randomNumbers[i]].id}.html">
                  <p class="product-preview__label">${postsData[randomNumbers[i]].title}</p>
                  <p class="product-preview__text">${postsData[randomNumbers[i]].text}</p>      
                  <p class="product-preview__articul">${postsData[randomNumbers[i]].articul}</p>      
                </a>
              </div>
            </div>
            
          </div>
        </form>

    
      </div>
    `;
  
    analogsWrap.insertAdjacentHTML("beforeend", postEl);
  }
}

function generateRandomNumbers() {
  const numbers = [];
  while (numbers.length < 5) {
    const randomNumber = Math.floor(Math.random() * 17);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}

window.addEventListener("load", () => {
  const productElems = document.querySelectorAll('.product-preview-elem');
  const countBtns = document.querySelectorAll('.product-form__counters-btns button');

  countBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      addProductToCart(e.target.closest('[data-product]').getAttribute('id'), e.target.dataset.num);
    });
  });

  productElems.forEach((elem, i) => {
    elem.addEventListener("click", e => {
      addButtonClickToJson(e.target.closest('.product-preview-elem').getAttribute('id'));
    });
  })
});

function removeDuplicates(array) {
  const uniqueObjects = {};
  const uniqueArray = [];

  for (let i = array.length - 1; i >= 0; i--) {
    const currentObject = array[i];
    if (!uniqueObjects[currentObject.id]) {
      uniqueObjects[currentObject.id] = true;
      uniqueArray.push(currentObject);
    }
  }

  return uniqueArray;
}

function addProductToCart(prodNum, prodCount) {
  // Проверяем, есть ли уже объект в локальном хранилище
  let json = localStorage.getItem('prodToCart');
  let prodToCart = [];
  if (json) {
    prodToCart = JSON.parse(json);
  }

  let product = {
    id: prodNum,
    count: prodCount
  }

  // Добавляем новое значение
  prodToCart.push(product);

  const uniqueArray = removeDuplicates(prodToCart);

  // Сохраняем обновленный объект в локальном хранилище
  localStorage.setItem('prodToCart', JSON.stringify(uniqueArray));
}

function addButtonClickToJson(buttonNumber) {
  // Проверяем, есть ли уже объект в локальном хранилище
  let json = localStorage.getItem('buttonClicks');
  let buttonClicks = [];
  if (json) {
    buttonClicks = JSON.parse(json);
  }

  buttonClicks = [];
  // Добавляем новое значение
  buttonClicks.unshift(buttonNumber);

  // Сохраняем обновленный объект в локальном хранилище
  localStorage.setItem('buttonClicks', JSON.stringify(buttonClicks));
}


function removeSending() {
  const elems = document.querySelectorAll('.product-preview-elem');

  elems.forEach(elem => {
    elem.classList.remove('_sending');
  });
}

function addBtnsClick() {
  const btns = document.querySelectorAll('.product-form__counters-btns button');
  const addCartBtn = document.querySelector('.add-cart-counter');
  const addCartBtnCount =  addCartBtn.querySelector('[data-add-cart-counter-count]');


  btns.forEach(btn => {
    btn.addEventListener("click", e => {
      addCartBtn.classList.add('is-add-cart');
      addCartBtnCount.innerHTML = btn.dataset.num;
    });
  });
}
