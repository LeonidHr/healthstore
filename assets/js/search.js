
const forms = document.querySelectorAll('.header__search-form');

forms.forEach(form => {

  form.addEventListener("submit", e => {
    e.preventDefault();
    addSearchToLocal(form.q.value);

    if (hasProductInUrl()) {
      window.location.href = '../search.html';
    } else {
      window.location.href = 'search.html';
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