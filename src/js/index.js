import '../assets/_sprite.svg';
import '../styles/style.scss';
import 'swiper/swiper-bundle.css';
import animOnScroll from "./modules/animOnScroll";
import initAnchors from "./modules/anchors";
import Swiper, {Pagination} from 'swiper';
import Menu from "./modules/menu";
import Form from "./modules/forms";

Swiper.use([Pagination]);

window.addEventListener('DOMContentLoaded', function () {
  animOnScroll();
  initAnchors();
  new Menu('.menu', {
    triggerClass: '.menu .menu__button'
  }).init()

  const specSlider = new Swiper('.slider-container', {
    wrapperClass: 'slider-wrapper',
    slideClass: 'slide',
    slidesPerView: 1,
    slidesPerGroup: 1,
    grabCursor: true,
    pagination: {
      el: '.slider-pagination',
      type: 'bullets',
      bulletClass: 'slider-bullet',
      bulletActiveClass: 'slider-bullet--active'
    }
  })

  const gallerySlider = new Swiper('.gallery', {
    wrapperClass: 'gallery__body',
    slideClass: 'gallery__image',
    slidesPerView: 1,
    slidesPerGroup: 1,
    grabCursor: true,
    loop: true,
    breakpoints: {
      350: {
        slidesPerView: 2
      },
      650: {
        slidesPerView: 3
      },
      950: {
        slidesPerView: 4
      }
    },
    pagination: {
      el: '.slider-pagination',
      type: 'bullets',
      bulletClass: 'slider-bullet',
      bulletActiveClass: 'slider-bullet--active'
    }
  })

  new Form({
    selector: 'form',
    url: 'https://forms-backend.firebaseio.com/proj.json'
  }).init();
})