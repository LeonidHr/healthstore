document.addEventListener("DOMContentLoaded", () => {
  const productElems = document.querySelectorAll('.product-preview-elem');
  
  productElems.forEach((elem, i) => {
    elem.addEventListener("click", e => {
      addButtonClickToJson(e.target.closest('.product-preview-elem').getAttribute('id'));
    });
  })
});

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