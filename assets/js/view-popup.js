const getPopupData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

async function viewPopup() {
  let data = null;
  let isProduct = false;

  if (hasProductInUrl()) {
    isProduct = true;
    data = await getPopupData('../assets/json/popups.json');
  } else {
    data = await getPopupData('./assets/json/popups.json');
  }

  let postsData = data.popups;
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    console.log(popup.id);
    const popupContent = document.querySelector(`#${popup.id} .popup__content`);


    postsData.forEach(el => {
      if (el.category == popup.id) {

        const postEl = `
          <button data-close type="button" class="popup__close">
            <img class="img-fluid" src="${isProduct ? '../' : ''}img/exit.svg" alt="Закрыть окно">
          </button>
          <div class="popup-about__content">
            <h3 class="popup__title popup__title_left popup-about__title">${el.title}</h3>
            <div class="popup-about__text text">
              
            </div>
            <div class="popup-about__logo">
              <img class="img-fluid" src="${isProduct ? '../' : ''}${el.imgPath}" alt="Healthstore logo">
            </div>
          </div>
        `;

        popupContent.insertAdjacentHTML("beforeend", postEl);

        const popupText = popupContent.querySelector('.popup-about__text');

        el.text.forEach((item, i) => {
          popupText.insertAdjacentHTML("beforeend", `
            <p>
              ${el.text[i]}
            </p>
          `);
        });
      }
    });
  }); 
}

function hasProductInUrl() {
  const url = window.location.href;
  return url.includes("product/");
}

viewPopup();