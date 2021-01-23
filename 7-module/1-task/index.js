import createElement from '../../assets/lib/create-element.js';

function ribbonMenuTemplate(categories){
  return `
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
        ${categories}
      </nav>

      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `;
}

function categoryTemplate(categories = {}) {
  let active = '';
  
  if(categories.id == '' || categories.id == 'on-the-side') {
    active = 'ribbon__item_active';
  }

  return `
    <a href="#" class="ribbon__item ${active}" data-id="${categories.id}">${categories.name}</a>
  `;
}


export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
    this._container = null;
    this._categoriesQuantity = categories.length;

    this._render();
    this.ribbonInner = this._container.querySelector('.ribbon__inner');
    this._addEventListners();
   //this._onArrowClick = this._onArrowClick.bind(this);
   //this._onRibbonScroll = this._onRibbonScroll.bind(this);
  }
  
  get elem() {
    return this._container;
  }

  _render() {
    const categories = this._categories.map(categoryTemplate).join('');
    const ribbonMenu = ribbonMenuTemplate(categories);

    this._container = createElement(ribbonMenu);
  }

  _addEventListners() {
   this._container.addEventListener('click', this._onMenuBtnClick);
   this.ribbonInner.addEventListener('scroll', this._onRibbonScroll);
  }

  _onMenuBtnClick = ({target}) => {
            
    if(target.closest('.ribbon__arrow_right')) {
      this.ribbonInner.scrollBy(350, 0);
    }

    if(target.closest('.ribbon__arrow_left')) {
      this.ribbonInner.scrollBy(-350, 0);
    }
  
    if(target.closest('.ribbon__item')) {
      let selected = this.ribbonInner.querySelectorAll('.ribbon__item_active');

      for(let elem of selected) { 
        elem.classList.remove('ribbon__item_active');
      }

      target.closest('.ribbon__item').classList.add('ribbon__item_active'); 

      const event = new CustomEvent('ribbon-select', {detail: target.closest('.ribbon__item').dataset.id, bubbles: true})
      this._container.dispatchEvent(event);

      console.log(event.detail);
      return false;
    }
  }

  _onRibbonScroll = () => {
          
    const arrowRight = this._container.querySelector('.ribbon__arrow_right');
    const arrowLeft = this._container.querySelector('.ribbon__arrow_left');

    if( this.ribbonInner.scrollLeft && (this.ribbonInner.scrollWidth - this.ribbonInner.clientWidth != this.ribbonInner.scrollLeft) ) {
      if(!arrowRight.classList.contains('ribbon__arrow_visible')) {
        arrowRight.classList.toggle('ribbon__arrow_visible');
      }
      if(!arrowLeft.classList.contains('ribbon__arrow_visible')) {
        arrowLeft.classList.toggle('ribbon__arrow_visible');
      }
    }  

    if( this.ribbonInner.scrollLeft == 0) {
      arrowRight.classList.toggle('ribbon__arrow_visible');
    }    
     
    if(this.ribbonInner.scrollWidth - this.ribbonInner.clientWidth == this.ribbonInner.scrollLeft ) {
      arrowLeft.classList.toggle('ribbon__arrow_visible');
    }
  }
  
}
