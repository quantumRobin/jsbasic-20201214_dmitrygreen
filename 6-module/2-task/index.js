import createElement from '../../assets/lib/create-element.js';

function cardTemplate({ name = 'Title', price = '0', image ='' } = {}) {
  return `
    <div class="card">
      <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
    </div>
  `;
}

export default class ProductCard {
  constructor(product) {
    this._name = product.name;
    this._price = product.price;
    this._category = product.category;
    this._image = product.image;
    this._id = product.id;
    this._container = null;
      
    this._render();
  }
  
  get elem() {
    return this._container;
  }

  destroy() {
    this._container.removeEventListener('click', this._onPlusClick);
    this._container.remove();
  }
  
  _render() {
    const template = cardTemplate({
      name: this._name,
      price: this._price,
      image: this._image,
    })
 
   this._container  = createElement(template);
   
   this.addEventListeners();
  }
   
  addEventListeners() {
    this._container.addEventListener('click', this._onPlusClick);
    this._container.addEventListener('product-add', console.log);
  }

  _onPlusClick = (e) => {    
    if(!e.target.closest('.card__button')) return;

    const event = new CustomEvent('product-add', {detail: this._id, bubbles: true})
    this._container.dispatchEvent(event);
  }
}



