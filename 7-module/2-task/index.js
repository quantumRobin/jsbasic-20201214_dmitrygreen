import createElement from '../../assets/lib/create-element.js';

function modalTemplate(title, body) {
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
            ${title}
          </h3>
        </div>

        <div class="modal__body">
          ${body}
        </div>
      </div>

    </div>
  `;
}
export default class Modal {
  constructor() {
    this._container = null;
    this.title = '';
    this.html = '';
    
    this._render()
    this.addEventListeners();
    this.toggleBodyClass = this.toggleBodyClass.bind(this);
  }

  _render() {
    this.modal = modalTemplate(this.title, this.html);
    this._container = createElement(this.modal);
  }

  open() {
    document.querySelector('.container').append(this._container);
    document.querySelector('body').classList.add('is-modal-open');
  }

  toggleBodyClass = () => {
    document.querySelector('body').classList.toggle('is-modal-open');
  }

  close() {
    document.querySelector('.modal').remove();
    this.toggleBodyClass();
  }
 
  setTitle(title) {
    this._container.querySelector('.modal__title').innerHTML = title;
  }

  setBody(html) {
    this._container.querySelector('.modal__body').append(html);
  }

  addEventListeners() {
    this._container.addEventListener('click', this._onCloseClick);

    document.addEventListener('keyup', this._onEscape);
  }

  _onEscape(event) {
    if (event.code === 'Escape') {
      document.querySelector('.modal').remove();
      this.toggleBodyClass();
    }
  }

  _onCloseClick = (e) => {
    if(e.target.closest('.modal__close')) {
      this._container.remove();
      this.toggleBodyClass();
    }
  }

}
