import createElement from '../../assets/lib/create-element.js';

function slideTemplate({ name = 'Title', price = '0', image ='', id ='' } = {}) {
  return `
    <div class="carousel__slide" data-id="${id}">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${price.toFixed(2)}</span>
        <div class="carousel__title">${name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `;
}

function carouselTemplate(data) {
  return `
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${data}
      </div>
    </div>

  `;
}

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
    this._carousel = null;

    this._render();
  }

  get elem() {
    return this._carousel;
  }

  _render() {
    const _carouselSlides = this._slides.map(slideTemplate).join('');
    const _carouselInnerHTML = carouselTemplate(_carouselSlides);

    this._carousel = createElement(_carouselInnerHTML);

    this.addEventListeners();
  }
   
  addEventListeners() {
    this._carousel.addEventListener('click', this._onPlusClick);
    this._carousel.addEventListener('product-add', this._passId);
  }

  _onPlusClick = (e) => {    
    if(!e.target.closest('.carousel__button')) return;
    const slide = e.target.closest(`[data-id]`);
    const event = new CustomEvent('product-add', {detail: slide.dataset.id, bubbles: true})
    this._carousel.dispatchEvent(event);
  }

  _passId(){
    
  }

}

setTimeout(() => {initCarousel()}, 0); 

function initCarousel() {
	const carouselHolder = document.querySelector('.carousel');
	const rightArrow = document.querySelector(".carousel__arrow_right");
	const leftArrow = document.querySelector(".carousel__arrow_left");
	const offsetStep = document.querySelector(".carousel__inner").offsetWidth;
	const carousel = document.querySelector(".carousel__inner");
  let slidesQuantity = [...document.querySelectorAll('.carousel__slide')].length;
  
	let clickCounter = 0;
  hideElem(leftArrow);

	function hideElem(elem) { elem.style.display = 'none'};
	function showElem(elem) { elem.style.display = ''};
		
	function toggleArrow() {
		(clickCounter == slidesQuantity - 1) ? hideElem(rightArrow) : showElem(rightArrow);
		(clickCounter == 0) ? hideElem(leftArrow) : showElem(leftArrow);
	}

	function translateCarousel() {
			carousel.style.transform = `translateX(-${offsetStep*clickCounter}px)`;
	}

	carouselHolder.onclick = (e) => {
		if(e.target.closest('.carousel__arrow_right') && e.target.closest(".carousel__arrow_left")) return;

		if(e.target.closest(".carousel__arrow_right")) {
			++clickCounter;
			
			toggleArrow();
			translateCarousel();
		};

		if(e.target.closest(".carousel__arrow_left")) {
			--clickCounter;

			toggleArrow();
			translateCarousel();
		};

	}
} 