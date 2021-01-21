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

function categoryTemplate({id='', name=''} ={}) {
  return `
    <a href="#" class="ribbon__item" data-id="${id}">${name}</a>

  `;
}


export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
    this._container = null;

    this._render();
  }

  get elem() {
    return this._container;
  }

  _render() {
    const categories = this._categories.map(categoryTemplate).join('');
    const ribbonMenu = ribbonMenuTemplate(categories);

    this._container = createElement(ribbonMenu);
  }

}
