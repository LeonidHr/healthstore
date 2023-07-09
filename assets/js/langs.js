function addClickToLang() {
  const langs = document.querySelectorAll('[data-lang]');
  const langArr = getLang();

  langs.forEach(lang => {
    if (lang.hasAttribute(`data-${langArr[0]}`)) {
      lang.classList.add('_active');
    } 
    if (!langArr && lang.hasAttribute('data-ru')) {
      lang.classList.add('_active');
    }


    lang.addEventListener("click", e => {
      if (e.target.closest('[data-ru]')) {
        addLangToLocal('ru');
      }
      if (e.target.closest('[data-lv]')) {
        addLangToLocal('lv');
      }
    });
  });
}
addClickToLang();

function addLangToLocal(value) {
  // Проверяем, есть ли уже объект в локальном хранилище
  let json = sessionStorage.getItem('lang');
  let lang = [];
  if (json) {
    lang = JSON.parse(json);
  }

  lang = [];
  // Добавляем новое значение
  lang.push(value);

  // Сохраняем обновленный объект в локальном хранилище
  sessionStorage.setItem('lang', JSON.stringify(lang));
}

function getLang() {
  let json = sessionStorage.getItem('lang');
  if (json) {
    // Если в локальном хранилище есть JSON объект, возвращаем его
    let buttonClicks = JSON.parse(json);
    console.log(buttonClicks);
    return buttonClicks;
  } else {
    // Если объекта в локальном хранилище нет, возвращаем пустой JSON объект
    return false;
  }
}
