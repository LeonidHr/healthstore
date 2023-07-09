
const forms = document.querySelectorAll('.header__search-form');


let lang = 'ru';
const arrLang = getLang();

if (arrLang[0] == 'lv' || checkUrl('-lv') || checkUrl('index-lv.html')) {
  lang = 'lv';
}


forms.forEach(form => {

  form.addEventListener("submit", e => {
    e.preventDefault();
    addSearchToLocal(form.q.value);

    if (lang == 'ru') {
      if (hasProductInUrl()) {
        window.location.href = '../search-ru.html';
      } else {
        window.location.href = 'search-ru.html';
      }
    } else {
      if (hasProductInUrl()) {
        window.location.href = '../search-lv.html';
      } else {
        window.location.href = 'search-lv.html';
      }
    }
  });
});

function hasProductInUrl() {
  const url = window.location.href;
  return url.includes("product/");
}

function addSearchToLocal(value) {
  // Проверяем, есть ли уже объект в локальном хранилище
  let json = sessionStorage.getItem('search');
  let search = [];
  if (json) {
    search = JSON.parse(json);
  }

  search = [];
  // Добавляем новое значение
  search.push(value);

  // Сохраняем обновленный объект в локальном хранилище
  sessionStorage.setItem('search', JSON.stringify(search));
}

function checkUrl(val) {
  if (window.location.href.indexOf(val) > -1) {
    return true;
  } else {
    return false;
  }
}