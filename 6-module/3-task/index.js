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
    this.slidesQuantity = slides.length;
    this.clickCounter = 0;
    this.rightArrow = null;
    this.leftArrow = null;

    this._render();
    this.addEventListeners();
  }

  get elem() {
    return this._container;
  }

  _render() {
    const _carouselSlides = this._slides.map(slideTemplate).join('');
    const _carousel = carouselTemplate(_carouselSlides);

    this._container = createElement(_carousel);
    this.rightArrow = this._container.querySelector(".carousel__arrow_right");
    this.leftArrow = this._container.querySelector(".carousel__arrow_left");
    
    this.hideElem(this.leftArrow);
  }
   
  addEventListeners() {
    this._container.addEventListener('click', this._onMenuButtonClick);
    this._container.addEventListener('product-add', this._passId);
  }

  _onMenuButtonClick = (e) => {   

    if(e.target.closest('.carousel__button')) {
      const slide = e.target.closest(`[data-id]`);
      const event = new CustomEvent('product-add', {detail: slide.dataset.id, bubbles: true});
      this._container.dispatchEvent(event);
    }
    
    if(e.target.closest(".carousel__arrow_right")) {
        ++this.clickCounter;
        
        this.toggleArrow();
        this.translateCarousel();
      };

      if(e.target.closest(".carousel__arrow_left")) {
        --this.clickCounter;

        this.toggleArrow();
        this.translateCarousel();
      };

  }

  _passId = (e) => {
    console.log(e.detail);
  }

  hideElem(elem) { elem.style.display = 'none'}
  showElem(elem) { elem.style.display = ''}
  
  toggleArrow() {
    (this.clickCounter == this.slidesQuantity - 1) ? this.hideElem(this.rightArrow) : this.showElem(this.rightArrow);
    (this.clickCounter == 0) ? this.hideElem(this.leftArrow) : this.showElem(this.leftArrow);
    }
  
  translateCarousel() {
    this.offsetStep = this._container.querySelector(".carousel__inner").offsetWidth;
    this._container.querySelector(".carousel__inner").style.transform = `translateX(-${this.offsetStep*this.clickCounter}px)`;
  }
}



