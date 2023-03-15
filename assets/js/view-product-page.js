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
  let imgMain3 = '';

  if (postsData[documetnId].imgPath2) {
    img2 = `
      <div>
        <img style="max-height: 400px; max-width:500px" src="../${postsData[documetnId].imgPath2}" alt="Состав" />
      </div>
    `;
  }

  if(postsData[documetnId].imgPathSlide) {
    imgMain2 = `
      <a href="../${postsData[documetnId].imgPathSlide}" class="swiper-product__slide swiper-slide">
        <img src="../${postsData[documetnId].imgPathSlide}" alt="${postsData[documetnId].title}" />
      </a>
    `;
    
    imgMain3 = `
      <a href="../${postsData[documetnId].imgPathSlide}" class="swiper-product-thumbs__slide swiper-slide">
        <img  src="../${postsData[documetnId].imgPathSlide}" alt="${postsData[documetnId].title}" />
      </a>
    `;
  }

  let buttons = `
    <button data-num="5" type="button">5 шт.</button>
    <button data-num="10" type="button">10 шт.</button>
    <button data-num="15" type="button">15 шт. </button>
    <button data-num="20" type="button">20 шт.</button>
  `;

  if (postsData[documetnId].isHerbs) {
    buttons = `<button data-num="1" type="button">10 гр.</button>`;
  }
  if (postsData[documetnId].isOther) {
    buttons = `<button data-num="1" type="button">50 гр.</button>`;
  }
  if (postsData[documetnId].isBadsGr) {
    buttons = `<button data-num="50" type="button">50 гр.</button>`;
  }
  

  const postEl = `
      <div id="${postsData[documetnId].id}" data-product data-gallery-type="all-photos" class="product is-zero-count-preorder">
      <div class="product__area-photo">
      <div class="swiper-product swiper">
        <div class="swiper-product__wrapper swiper-wrapper" data-gallery id="lightgallery">
          <a href="../${postsData[documetnId].imgPath}" class="swiper-product__slide swiper-slide">
            <img  src="../${postsData[documetnId].imgPath}" alt="${postsData[documetnId].title}" />
          </a>
          ${imgMain2}

        </div>
        <button type="button" class="swiper-button-prev"></button>
        <button type="button" class="swiper-button-next"></button>
      </div>
      <div class="swiper-product-thumbs swiper"> 
        <div class="swiper-product-thumbs__wrapper swiper-wrapper" data-gallery id="lightgallery">
          <a href="../${postsData[documetnId].imgPath}" class="swiper-product-thumbs__slide swiper-slide">
            <img src="../${postsData[documetnId].imgPath}" alt="${postsData[documetnId].title}" />
          </a>
          ${imgMain3}

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
          <p class="product-page__text">${postsData[documetnId].text}</p>   
          <div class="product-form__area-sku">
          <div class="product__sku">
            <!-- data-product-card-sku='{"skuLabel": "арт. "}' -->
            <span>${postsData[documetnId].articul}</span>
          </div>
        </div>
          
        <div data-showmore class="more-block">
          <div data-showmore-content="0" class="block__content">
            <h6>Состав</h6>
            <div>
              ${img2}
            </div>
          </div>
          <button hidden data-showmore-button type="button" class="block__more">
            <div>
              <span>Состав</span>
              <span>Скыть</span>
            </div>
            <img src="../img/arrow-down.svg" />
          </button>
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
          за ${postsData[documetnId].unit}
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
                      <a
                        href="../cart_items.html"
                        class="button button_size-l add-cart-counter__detail"
                      >
                        <span class="add-cart-counter__detail-text"
                          >В корзине
                          <span data-add-cart-counter-count=""></span>
                        </span
                        >
                        <span class="add-cart-counter__detail-dop-text"
                          >Перейти</span
                        >
                      </a>
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
        <p class="product__text">
          * Перед применением этого или любого другого товара с нашего сайта, проконсультируйтесь с врачом
        </p>
        
      </form>
    </div>
  `;

  product.insertAdjacentHTML("beforeend", postEl);


  const descr = document.querySelector('[data-showmore-content] div');
  
  postsData[documetnId].descr.forEach((text, i) => {
    descr.insertAdjacentHTML("beforeend", `
      <p>
        ${postsData[documetnId].descr[i]}  
      </p>
    `);
  });

  document.querySelector('meta[name="description"]').setAttribute("content", postsData[documetnId].title);


  const countBtns = document.querySelectorAll('.product-form__counters-btns button');
  countBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      addProductToCart(e.target.closest('[data-product]').getAttribute('id'), e.target.dataset.num);
      // addToCart(e.target.closest('[data-product]').getAttribute('id'), e.target.dataset.num);
    });

    initSliders();

    

    // document.querySelectorAll('.lg-container').forEach(lg => {
    //   lg.style.display = 'none';
    // });
    // document.querySelector('.lg-container').style.display = "block";

  });

  const galleries = document.querySelectorAll('[data-gallery]');
  if (galleries.length) {
    let galleyItems = [];
    galleries.forEach(gallery => {
      galleyItems.push({
        gallery,
        galleryClass: lightGallery(gallery, {
          licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
          speed: 500,
        })
      })
    });
  }


  addBtnsClick();
  showMore();
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
  let json = sessionStorage.getItem('prodToCart');
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
  sessionStorage.setItem('prodToCart', JSON.stringify(uniqueArray));
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
      addCartBtnCount.innerHTML = btn.innerHTML;
    });
  });
}


let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Створюємо подію 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Створюємо подію
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}


function showMore() {
	// window.addEventListener("load", function (e) {
		const showMoreBlocks = document.querySelectorAll('[data-showmore]');
		let showMoreBlocksRegular;
		let mdQueriesArray;
		if (showMoreBlocks.length) {
			// Отримання звичайних об'єктів
			showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
				return !item.dataset.showmoreMedia;
			});
			// Ініціалізація звичайних об'єктів
			showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

			document.addEventListener("click", showMoreActions);
			window.addEventListener("resize", showMoreActions);

			// Отримання об'єктів з медіа-запитами
			mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
			if (mdQueriesArray && mdQueriesArray.length) {
				mdQueriesArray.forEach(mdQueriesItem => {
					// Подія
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
				});
				initItemsMedia(mdQueriesArray);
			}
		}
		function initItemsMedia(mdQueriesArray) {
			mdQueriesArray.forEach(mdQueriesItem => {
				initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		function initItems(showMoreBlocks, matchMedia) {
			showMoreBlocks.forEach(showMoreBlock => {
				initItem(showMoreBlock, matchMedia);
			});
		}
		function initItem(showMoreBlock, matchMedia = false) {
			showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
			let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
			let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
			showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
			if (matchMedia.matches || !matchMedia) {
				if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			} else {
				_slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		}
		function getHeight(showMoreBlock, showMoreContent) {
			let hiddenHeight = 0;
			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
			if (showMoreType === 'items') {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
				const showMoreItems = showMoreContent.children;
				for (let index = 1; index < showMoreItems.length; index++) {
					const showMoreItem = showMoreItems[index - 1];
					hiddenHeight += showMoreItem.offsetHeight;
					if (index == showMoreTypeValue) break
				}
			} else {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
				hiddenHeight = showMoreTypeValue;
			}
			return hiddenHeight;
		}
		function getOriginalHeight(showMoreContent) {
			let parentHidden;
			let hiddenHeight = showMoreContent.offsetHeight;
			showMoreContent.style.removeProperty('height');
			if (showMoreContent.closest(`[hidden]`)) {
				parentHidden = showMoreContent.closest(`[hidden]`);
				parentHidden.hidden = false;
			}
			let originalHeight = showMoreContent.offsetHeight;
			parentHidden ? parentHidden.hidden = true : null;
			showMoreContent.style.height = `${hiddenHeight}px`;
			return originalHeight;
		}
		function showMoreActions(e) {
			const targetEvent = e.target;
			const targetType = e.type;
			if (targetType === 'click') {
				if (targetEvent.closest('[data-showmore-button]')) {
					const showMoreButton = targetEvent.closest('[data-showmore-button]');
					const showMoreBlock = showMoreButton.closest('[data-showmore]');
					const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
					const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
					if (!showMoreContent.classList.contains('_slide')) {
						showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
						showMoreBlock.classList.toggle('_showmore-active');
					}
				}
			} else if (targetType === 'resize') {
				showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
				mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
			}
		}
	// });
}

function dataMediaQueries(array, dataSetValue) {
	// Отримання об'єктів з медіа-запитами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Ініціалізація об'єктів з медіа-запитами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Отримуємо унікальні брейкпоінти
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Працюємо з кожним брейкпоінтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Об'єкти з потрібними умовами
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}


function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper-product')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper-product', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			// modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 600,

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

      thumbs: {
        swiper: {
          el: `.swiper-product-thumbs`, 
          slideToClickedSlide: true,

          breakpoints: {
            320: {
              spaceBetween: 8,
              slidesPerView: 2,
            },
            680: {
              slidesPerView: 5,
            },
            767: {
              spaceBetween: 24,
              slidesPerView: 5,
            }
          }
        },	
      },
		});
	}
}
