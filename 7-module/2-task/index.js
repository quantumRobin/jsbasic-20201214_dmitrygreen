import createElement from '../../assets/lib/create-element.js';

function modalTemplate() {
  return `
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>

    </div>
  `;
}

export default class Modal {
  constructor() {
    this._container = null;
        
    this._render()
    this.addEventListeners();
  }

  setTitle(title) {
    this._container.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    this._container.querySelector('.modal__body').append(node);
  }

  _render() {
    const modal = modalTemplate();
    this._container = createElement(modal);
  }

  open() {
    document.body.append(this._container);
    document.body.classList.add('is-modal-open');
  }

  toggleBodyClass() {
    document.body.classList.toggle('is-modal-open');
  }

  close() {
    if (!document.body.querySelector('.modal')) return; //если окно уже закрыто(т.е. удалено)
    this.toggleBodyClass(); //это выше т.к. сначала надо удалить класс, а потом элемент. а не на оборот
    document.body.querySelector('.modal').remove();
  }
 
  addEventListeners() {
    this._container.addEventListener('click', this._onCloseClick);
    document.addEventListener('keyup', this._onEscape);
  }

  _onEscape = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  _onCloseClick = (e) => {
    if(e.target.closest('.modal__close')) {
      this.close();
    }
  }
}
