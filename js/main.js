
(function () {
	let original_positions = [];
	let da_elements = document.querySelectorAll('[data-da]');
	let da_elements_array = [];
	let da_match_media = [];
	//Заполняем массивы
	if (da_elements.length > 0) {
		let number = 0;
		for (let index = 0; index < da_elements.length; index++) {
			const da_element = da_elements[index];
			const da_move = da_element.getAttribute('data-da');
			const da_array = da_move.split(',');
			if (da_array.length == 3) {
				da_element.setAttribute('data-da-index', number);
				//Заполняем массив первоначальных позиций
				original_positions[number] = {
					"parent": da_element.parentNode,
					"index": index_in_parent(da_element)
				};
				//Заполняем массив элементов 
				da_elements_array[number] = {
					"element": da_element,
					"destination": document.querySelector('.' + da_array[0].trim()),
					"place": da_array[1].trim(),
					"breakpoint": da_array[2].trim()
				}
				number++;
			}
		}
		dynamic_adapt_sort(da_elements_array);

		//Создаем события в точке брейпоинта
		for (let index = 0; index < da_elements_array.length; index++) {
			const el = da_elements_array[index];
			const da_breakpoint = el.breakpoint;
			const da_type = "max"; //Для MobileFirst поменять на min

			da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
			da_match_media[index].addListener(dynamic_adapt);

		}
	}
	//Основная функция
	function dynamic_adapt(e) {
		for (let index = 0; index < da_elements_array.length; index++) {
			const el = da_elements_array[index];
			const da_element = el.element;
			const da_destination = el.destination;
			const da_place = el.place;
			const da_breakpoint = el.breakpoint;
			const da_classname = "_dynamic_adapt_" + da_breakpoint;

			if (da_match_media[index].matches) {
				//Перебрасываем элементы
				if (!da_element.classList.contains(da_classname)) {
					let actual_index;
					if (da_place == 'first') {
						actual_index = index_of_elements(da_destination)[0];
					} else if (da_place == 'last') {
						actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
					} else {
						actual_index = index_of_elements(da_destination)[da_place];
					}
					da_destination.insertBefore(da_element, da_destination.children[actual_index]);
					da_element.classList.add(da_classname);
				}
			} else {
				//Возвращаем на место
				if (da_element.classList.contains(da_classname)) {
					dynamic_adapt_back(da_element);
					da_element.classList.remove(da_classname);
				}
			}
		}
		custom_adapt();
	}

	//Вызов основной функции
	dynamic_adapt();

	//Функция возврата на место
	function dynamic_adapt_back(el) {
		const da_index = el.getAttribute('data-da-index');
		const original_place = original_positions[da_index];
		const parent_place = original_place['parent'];
		const index_place = original_place['index'];
		const actual_index = index_of_elements(parent_place, true)[index_place];
		parent_place.insertBefore(el, parent_place.children[actual_index]);
	}
	//Функция получения индекса внутри родителя
	function index_in_parent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function index_of_elements(parent, back) {
		const children = parent.children;
		const children_array = [];
		for (let i = 0; i < children.length; i++) {
			const children_element = children[i];
			if (back) {
				children_array.push(i);
			} else {
				//Исключая перенесенный элемент
				if (children_element.getAttribute('data-da') == null) {
					children_array.push(i);
				}
			}
		}
		return children_array;
	}
	//Сортировка объекта
	function dynamic_adapt_sort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function custom_adapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
	/*
	let block = document.querySelector('.click');
	block.addEventListener("click", function (e) {
		alert('Все ок ;)');
	});
	*/
}());


$(document).ready(function () {
	$('.icon-menu').click(function (event) {
		$('.icon-menu,.menu__body').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.user-header__icon').click(function (event) {
		$('.user-header__menu').toggleClass('active');
	});
});

// закритие всплывающего блока при нажатии на любую область документа 
document.documentElement.addEventListener("click", function (e) {
	if (!e.target.closest('.icon-menu')) {
		var body = document.querySelector('body');
		var user_icon = document.querySelector('.icon-menu');
		var user_menu = document.querySelector('.menu__body');
		user_icon.classList.remove('active');
		user_menu.classList.remove('active');
		body.classList.remove('lock');
	}
});

document.documentElement.addEventListener("click", function (e) {
	if (!e.target.closest('.user-header')) {
		var user_menu = document.querySelector('.user-header__menu');
		user_menu.classList.remove('active');
	}
});


function ibg() {

	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}

ibg();
$(document).ready(function () {
	$('.main_slider__body').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 300,
		infinite: true,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 8000,
		adaptiveHeight: true,

	});
});
$(document).ready(function () {
	$('.slick').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 400,
		infinite: true,
		initialSlide: 0,
		autoplay: false,
		autoplaySpeed: false,

		appendArrows: $('.controll-slider'),
		prevArrow: '<div class="controll-slider__prev"><span></span></div>',
		nextArrow: '<div class="controll-slider__next"><span></span></div>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}

			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
				}

			}
		]

	});
});

$(document).ready(function () {
	$('.quotes__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 200,
		infinite: true,
		initialSlide: 0,
		autoplay: false,
		autoplaySpeed: false,
		fade: true,
		appendArrows: $('.slider-quotes__controll'),
		prevArrow: '<div class="controll-quotes__link"></div>',

		responsive: [
			{
				breakpoint: 768,
				settings: {

				}

			},

		]

	});
});
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
	anchor.addEventListener("click", function (event) {
		event.preventDefault();
		const blockId = anchor.getAttribute('href')
		document.querySelector('' + blockId).scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
};