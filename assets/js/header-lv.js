// let langPath = 'ru';
// const langArr = getLang();

document.querySelector('header').innerHTML = `
<button data-goto="header" class="button-back" type="button">
  <img src="/img/arrow-top.svg" alt="Вернуться назад">
</button>

<div
  class="layout widget-type_system_widget_v4_header_11"
  style="
    --logo-max-width: 120px;
    --hide-catalog: false;
    --hide-search: false;
    --hide-language: true;
    --hide-compare: true;
    --hide-personal: false;
    --hide-favorite: false;
    --hide-social: false;
    --bage-bg: #ee632c;
    --bage-bg-is-dark: true;
    --bage-bg-minor-shade: #f07240;
    --bage-bg-minor-shade-is-dark: true;
    --bage-bg-major-shade: #f18155;
    --bage-bg-major-shade-is-dark: true;
    --bage-bg-half-shade: #f6b095;
    --bage-bg-half-shade-is-light: true;
    --catalog-location: show-immediately;
    --live-search: false;
    --mobile-panel-right-btn: cart;
    --layout-wide-bg: true;
    --layout-pt: 1vw;
    --layout-pb: 1vw;
    --layout-wide-content: false;
    --hide-desktop: false;
    --hide-mobile: false;
  "
>
  <div class="layout__content">
    <div class="header header_no-languages">
      <div class="header__content">
        <div class="header__area-show-menu">
          <button
            type="button"
            class="button button_size-s header__show-menu-btn js-show-side-panel"
          >
            <span class="icon icon-bars"></span>
            <span class="header__show-menu-text">Izvēlne</span>
          </button>
        </div>

        <div class="header__area-logo">
          <a href="/index-lv.htm" class="header__logo">
            <img
              src="/img/logo.svg"
              alt="Health store"
              title="Health store"
            />
          </a>
        </div>

        <div class="header__area-controls">
          <div class="header__search">
            <form
              action="/search"
              method="get"
              class="header__search-form"
            >
              <input
                type="text"
                autocomplete="off"
                class="form-control form-control_size-l header__search-field"
                name="q"
                value=""
                placeholder="Поиск"
              />
              <input type="hidden" name="lang" value="ru" />
              <div
                class="header__search__results"
                data-search-result=""
              ></div>
            </form>
            <button
              type="button"
              class="header__search-btn js-show-search"
            >
              <span class="icon icon-search _show"></span>
              <span class="icon icon-times _hide"></span>
            </button>
          </div>

          <a
            href="https://health.ispace.lv/cart_items-lv.html"
            class="header__control-btn header__cart"
          >
            <span class="icon icon-cart">
              <span
                class="header__control-bage cart-empty"
                data-cart-positions-count=""
              ></span>
            </span>
          </a>

          <a
            href="tel:+79160022497"
            class="header__control-btn header__mobile-phone"
          >
            <span class="icon icon-phone"></span>
          </a>

          <div class="header__langs header__langs_desc">
            <a href="https://health.ispace.lv/ru/product/product${document.documentElement.getAttribute('id')}.html" data-ru data-lang class="header__lang-link">
              <img src="/img/ru.png" alt="">
            </a>
            <a href="https://health.ispace.lv/lv/product/product${document.documentElement.getAttribute('id')}.html" data-lv data-lang class="header__lang-link">
              <img src="/img/lv.png" alt="">
            </a>
        </div>
      </div>
    </div>

    <div
      id="side-panel"
      class="side-panel side-panel_no-languages"
      style="visibility: hidden"
    >
      <div class="side-panel__content">
        <div class="side-panel__head">

          <a
            href="client_account/session/new.html"
            class="header__control-btn header__cabinet"
          >
            <span class="icon icon-cart"></span>
          </a>

          <button
            type="button"
            class="button hide-side-panel-btn-mobile js-hide-side-panel"
          >
            <span class="icon icon-times"></span>
          </button>
        </div>

        <div class="mobile-collections">
          <div class="header__collections-head">Katalogs</div>
        </div>

        <div class="menu">
          <div class="menu__head">Izvēlne</div>

          <div class="menu__section">
            <ul class="menu__list" data-menu-handle="main-menu">
              <li class="menu__item">
                <div class="menu__controls">
                  <a href="#" data-popup="#popup-about" class="menu__link">
                    Par mums 
                  </a>
                </div>
              </li>
              <li class="menu__item">
                <div class="menu__controls">
                  <a href="#" class="menu__link" data-goto="#products">
                  Katalogs
                  </a>
                </div>
              </li>
              <li class="menu__item">
                <div class="menu__controls">
                  <a href="#" data-popup="#popup-payment" class="menu__link">
                    Apmaksa un piegāde
                  </a>
                </div>
              </li>
              <li class="menu__item">
                <div class="menu__controls">
                  <a href="#" data-goto="#footer" class="menu__link">
                    Kontakti
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="contacts">
          
          <div class="contacts__head">Kontakti</div>
          <div class="phone-list">
            
            <div class="phone">
              <div class="address">
                Health Store (Riga)
              </div>
            </div>
          </div>
          <div class="address">
            E-mail:<a href="mailto:dsriga@gmail.com"> dsriga@gmail.com</a>
          </div>
          <div class="address">
            <a class="phone-value" href="tel:+37126858674">Tel. +371 26858674</a>
            <p>(Whats App/Telegram)</p>
          </div>
        </div>

        <div class="adress">
        <div class="contacts__head">Valodas</div>
        <div class="header__langs header__langs_desc">
          <a href="https://health.ispace.lv/ru/product/product${document.documentElement.getAttribute('id')}.html" data-ru data-lang class="header__lang-link">
            <img src="/img/ru.png" alt="">
          </a>
          <a href="https://health.ispace.lv/lv/product/product${document.documentElement.getAttribute('id')}.html" data-lv data-lang class="header__lang-link">
            <img src="/img/lv.png" alt="">
          </a>
        </div>
      </div>

      <div class="header__search">
        <div class="contacts__head">Meklēt</div>
        <form
          action="/search"
          method="get"
          class="header__search-form"
        >
          <input
            type="text"
            autocomplete="off"
            class="form-control form-control_size-l header__search-field"
            name="q"
            value=""
            placeholder="Meklēt"
          />
          <input type="hidden" name="lang" value="ru" />
          <div
            class="header__search__results"
            data-search-result=""
          ></div>
          <button type="submit" class="header__search-btn js-show-search  _show _hide">
            <span class="icon icon-search "></span>
          </button>
        </form>
      </div>

        <div class="soclinks"></div>
      </div>
      <button
        type="button"
        class="button button_size-m hide-side-panel-btn js-hide-side-panel"
      >
        <span class="icon icon-times"></span>
      </button>
    </div>

    <div class="header-overlay js-hide-side-panel"></div>
  </div>
</div>

<div
  class="layout widget-type_system_widget_v4_collections_menu_1"
  style="
    border: none;
    --align-items: flex-start;
    --layout-wide-bg: true;
    --layout-pt: 0.5rem;
    --layout-pb: 0.5rem;
    --layout-wide-content: false;
    --layout-edge: false;
    --hide-desktop: true;
    --hide-mobile: false;
  "
>
`;