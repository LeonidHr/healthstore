
function checkUrl(val) {
  if (window.location.href.indexOf(val) > -1) {
    return true;
  } else {
    return false;
  }
}

document.querySelector('footer').innerHTML = `
<div
  class="layout widget-type_system_widget_v4_delimeters"
  style="
    --delimeter-type: solid;
    --border-size: 3px;
    --layout-wide-bg: true;
    --layout-pt: 2vw;
    --layout-pb: 1vw;
    --layout-wide-content: false;
    --layout-edge: false;
    --hide-desktop: false;
    --hide-mobile: false;
  "
>
  <div class="layout__content">
    <div class="delimeter">
      <div class="delimeter_line"></div>
    </div>
  </div>
</div>

<div
  class="layout widget-type_system_widget_v4_footer_7"
  style="
    --logo-max-width: 140px;
    --hide-pay: false;
    --pay-img-1: 'https://static.insales-cdn.com/files/1/1311/14550303/original/Group.svg';
    --pay-img-2: 'https://static.insales-cdn.com/files/1/1305/14550297/original/Visa.svg';
    --hide-social: false;
    --layout-wide-bg: true;
    --layout-pt: 1vw;
    --layout-pb: 2vw;
    --layout-content-max-width: 1408px;
    --layout-wide-content: false;
    --layout-edge: false;
    --hide-desktop: false;
    --hide-mobile: false;
  "
>
  <div class="layout__content">
    <div class="footer-wrap">
      <div class="footer__area-social">
        <div class="social-items">
          <div class="social-img-item">
            <img src="" />
          </div>

          <div class="social-img-item">
            <img src="" />
          </div>

          <div class="social-img-item">
            <img src="" />
          </div>

          <div class="social-img-item">
            <img src="" />
          </div>

          <div class="social-img-item">
            <img src="" />
          </div>

          <div class="social-img-item">
            <img src="" />
          </div>

          <div class="social-img-item">
            <img src="" />
          </div>
        </div>
      </div>
      <div class="footer__area-contacts">
        <div class="footer__wrap">
          <div class="phone-info">
            Health Store - все для вашего здоровья доступно, без переплат.
          </div>
        </div>
      </div>
      <div class="footer__area-pay">
        <div class="pay-img-item">
          <img src="${checkUrl('/product/') ? '../../' : ''}files/1/1311/14550303/original/Group.svg" />
        </div>

        <div class="pay-img-item">
          <img src="${checkUrl('/product/') ? '../../' : ''}files/1/1305/14550297/original/Visa.svg" />
        </div>

        <div class="pay-img-item">
          <img src="" />
        </div>

        <div class="pay-img-item">
          <img src="" />
        </div>

        <div class="pay-img-item">
          <img src="" />
        </div>
      </div>
      <div class="footer_copyright">
        <div class="footer__wrap">
          Точки выдачи заказов: 
        </div>
        <div class="footer__locations">
          <p><a href="https://goo.gl/maps/DNmtjrK46RDiRiPq6">Slokas 52 (Riga)</a></p>
          <p>
            <a href="https://goo.gl/maps/b2Ke5sVrsYu35ox6A">Arena Riga (Riga)</a>
          </p>
        </div>
        <p>
          E-mail:<a href="mailto:dsriga@gmail.com"> dsriga@gmail.com</a>
        </p>
        <p><a href="tel:+37126858674">Tel. +371 26858674</a></p>
        <p>(Whats App/Telegram)</p>
      </div>
    </div>
  </div>
</div>
`;