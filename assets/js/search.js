// const forms = document.querySelectorAll('.header__search-form');

// forms.forEach(form => {
//   form.addEventListener("submit", e => {
//     e.preventDefault();
//     addSearchToLocal(form.q.value);
//     window.location.href = 'search.html';
//   });
// });

// function addSearchToLocal(value) {
//   // Проверяем, есть ли уже объект в локальном хранилище
//   let json = localStorage.getItem('search');
//   let search = [];
//   if (json) {
//     search = JSON.parse(json);
//   }

//   search = [];
//   // Добавляем новое значение
//   search.push(value);

//   // Сохраняем обновленный объект в локальном хранилище
//   localStorage.setItem('search', JSON.stringify(search));
// }