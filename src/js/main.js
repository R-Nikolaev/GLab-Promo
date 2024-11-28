/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import { MousePRLX } from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper from 'swiper/bundle';

import {BaseHelpers} from './helpers/base-helpers';
import {PopupManager} from './modules/popup-manager';
import {BurgerMenu} from './modules/burger-menu';
import {Tabs} from './modules/tabs';
import {Accordion} from './modules/accordion';

BaseHelpers.checkWebpSupport ();

BaseHelpers.calcScrollbarWidth ();

BaseHelpers.addTouchClass ();

// BaseHelpers.addLoadedClass();

// BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager ();

/**
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu ().init ();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

// new Tabs('tabs-example', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });

// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

const stepSlider = new Swiper ('.step-slider', {
  slidesPerView: 1,
  spaceBetween: 24,
  initialSlide: 1,
  centeredSlides: false,
  autoHeight: true,
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    1399: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: '.step-next',
    prevEl: '.step-prev',
  },
  pagination: {
    el: '.step-pagination',
    clickable: true,
  },
});

function countdown() {
    const targetDate = new Date('2025-06-01T00:00:00'); // Дата ЕГЭ

    function getDayLabel(days) {
        if (days % 10 === 1 && days % 100 !== 11) {
            return "день";
        } else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
            return "дня";
        } else {
            return "дней";
        }
    }

    function updateTimer() {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            // Обновляем текст с количеством дней и правильным окончанием
            document.querySelector('.d-none.d-lg-block p').innerHTML =
                `До ЕГЭ -2025 осталось <span><b id="days-left">${days}</b></span> ${getDayLabel(days)}`;

            // Обновляем оставшиеся дни, часы и минуты
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
        } else {
            clearInterval(timerInterval);
            document.querySelector('.d-none.d-lg-block p').innerHTML =
                'До ЕГЭ -2025 осталось <span><b id="days-left">0</b></span> дней';
            document.getElementById('days').textContent = "0";
            document.getElementById('hours').textContent = "0";
            document.getElementById('minutes').textContent = "0";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

countdown();




