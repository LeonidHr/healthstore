

let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains('_header-scroll')) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add('_header-scroll');
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove('_header-scroll');
				setTimeout(() => {
					headerElement.style.cssText = ``;
				}, 0);
			} else {
				headerItemHeight = headerElement.offsetHeight;
			}
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Закриваємо меню, якщо воно відкрите
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		if (typeof SmoothScroll !== 'undefined') {
			// Прокручування з використанням доповнення
			new SmoothScroll().animateScroll(targetBlockElement, '', options);
		} else {
			// Прокручування стандартними засобами
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		// FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
	} else {
		// FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
	}
};



function pageNavigation() {
	// data-goto - вказати ID блоку
	// data-goto-header - враховувати header
	// data-goto-top - недокрутити на вказаний розмір
	// data-goto-speed - швидкість (тільки якщо використовується додатковий плагін)
	// Працюємо при натисканні на пункт
	document.addEventListener("click", pageNavigationAction);
	// Якщо підключено scrollWatcher, підсвічуємо поточний пункт меню
	document.addEventListener("watcherCallback", pageNavigationAction);
	// Основна функція
	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				// if (flsModules.fullpage) {
				// 	const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
				// 	const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
				// 	if (fullpageSectionId !== null) {
				// 		flsModules.fullpage.switchingSection(fullpageSectionId);
				// 		document.documentElement.classList.contains("menu-open") ? menuClose() : null;
				// 	}
				// } else {
          menuClose();
					gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				// }
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			// Обробка пунктів навігації, якщо вказано значення navigator, підсвічуємо поточний пункт меню
			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					// Бачимо об'єкт
					// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					// Не бачимо об'єкт
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}
	// Прокручування по хешу
	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
	}
}

function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}

function menuClose() {
  document.querySelector('#side-panel').classList.remove('is-show');
  document.querySelector('.header-overlay').classList.remove('is-show');
}

pageNavigation();


// Удаление/добавление пунктам меню data-goto
changeMenuItems();

function changeMenuItems() {
  const menuItems = document.querySelectorAll('.menu__link'),
        isMain = document.querySelector('[data-main]');

  if (isMain) {
    menuItems.forEach(item => {
      if (item.dataset.go) {
        addDataForMenuItem(item);
      }
    });
  } else {
    menuItems.forEach(item => {
      if (item.dataset.go) {
        addAnchorForMenuItem(item);
      }
    });
  }
}

function addDataForMenuItem(item) {
  item.setAttribute('href', '#');

  item.dataset.gotoSpeed = 400;
  item.dataset.goto = `.${item.dataset.go}`;

}
function addAnchorForMenuItem(item) {
  item.setAttribute('href', `${item.dataset.url}#${item.dataset.go}`);

  item.dataset.gotoSpeed = '';
  item.dataset.goto = '';
}

headerScroll();

function headerScroll() {
	addWindowScrollEvent = true;
	const header = document.querySelector('header');
	const headerShow = header.hasAttribute('data-scroll-show');
	const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
	const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
	let scrollDirection = 0;
	let timer;
	document.addEventListener("scroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
			if (headerShow) {
				if (scrollTop > scrollDirection) {
					// downscroll code
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				} else {
					// upscroll code
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}
				timer = setTimeout(() => {
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}, headerShowTimer);
			}
		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			if (headerShow) {
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
			}
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}