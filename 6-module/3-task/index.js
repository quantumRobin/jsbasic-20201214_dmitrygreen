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
    this._container = null;
    this._slidesQuantity = slides.length;
    this._clickCounter = 0;

    this._render();
    this.addEventListeners();

    this._rightArrow = this._container.querySelector(".carousel__arrow_right");
    this._leftArrow = this._container.querySelector(".carousel__arrow_left");
    this.hideElem(this._leftArrow);
  }

  get elem() {
    return this._container;
  }

  _render() {
    const _carouselSlides = this._slides.map(slideTemplate).join('');
    const _carousel = carouselTemplate(_carouselSlides);

    this._container = createElement(_carousel);
    
  }

  hideElem(elem) { elem.style.display = 'none'}
  showElem(elem) { elem.style.display = ''}
  
  _toggleArrow() {
    (this._clickCounter == this._slidesQuantity - 1) ? this.hideElem(this._rightArrow) : this.showElem(this._rightArrow);
    (this._clickCounter == 0) ? this.hideElem(this._leftArrow) : this.showElem(this._leftArrow);
  }
   
  addEventListeners() {
    this._container.onclick = this._onMenuButtonClick;
  }

  _onMenuButtonClick = (e) => {   
    
    if(e.target.closest('.carousel__button')) {
      this._onAddBtnClick(e);
    }
    
    if(e.target.closest(".carousel__arrow_right")) {
      this._onArrowRightClick();
      };
    
    if(e.target.closest(".carousel__arrow_left")) {
      this._onArrowLeftClick()
    };
  }

  _onAddBtnClick = (e) => {
    const slide = e.target.closest(`[data-id]`);
    const event = new CustomEvent('product-add', {detail: slide.dataset.id, bubbles: true});
    this._container.dispatchEvent(event);
    this._passId(event);
  }
  
  _passId = (e) => {
    console.log(e.detail);
  }

  _onArrowRightClick() {
    ++this._clickCounter;
        
    this._toggleArrow();
    this._translateCarousel();
  }

  _onArrowLeftClick() {
    --this._clickCounter;

    this._toggleArrow();
    this._translateCarousel();
  }
  
  _translateCarousel() {
    this.offsetStep = this._container.querySelector(".carousel__inner").offsetWidth;
    this._container.querySelector(".carousel__inner").style.transform = `translateX(-${this.offsetStep*this._clickCounter}px)`;
  }
}



