function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};

function sliderTemplate(value, spans = '') {
  return `
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
        ${spans}
      </div>
    </div>
  `;
};

function spanTemplate(steps, value) {
  let active = 'slider__step-active';
  let span = '';

  for(let i = 0; i < steps; i++) {
    if(i != value) {
      active = '';
    }
    span += `<span class='${active}'></span>`;
  }
  return span;
};

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.leftPercents = null;
    this.leftRelative = null;
    this.container = null;
    this.pageY = null;
    
    this._render();

    this.slider = this.elem.closest('.slider');
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderStepsCollection = this.elem.querySelector('.slider__steps').children;

    this._addEventListeners();
    this._initialThumbPosition();
  }

  get elem() {
    return this.container;
  }

  _render() {
    const spans = spanTemplate(this.steps, this.value);
    const slider = sliderTemplate(this.value, spans);

    this.container = createElement(slider);
  }

  _initialThumbPosition() {
    this.leftPercents = this.value*(100/(this.steps-1));
    this.sliderThumb.style.left = `${this.leftPercents}%`;
    this.sliderProgress.style.width = `${this.leftPercents}%`;
  }
 
  _addEventListeners() {
    this.sliderThumb.addEventListener('mousedown', this._onMouseDown);

    this.sliderThumb.ondragstart = () => { return false; };

    document.onmouseup = () => {
      document.removeEventListener('mousemove', this._onMouseMove);
      this.elem.classList.remove('slider_dragging');
      document.onmouseup = null;
    };
  }

  _onMouseDown = (event) => {
    if(!event.target.closest('.slider')) return;
  
    //this.sliderThumb.style.top = this.sliderThumb.getBoundingClientRect().top;

    this.moveAt(event.pageX);

    document.addEventListener('mousemove', this._onMouseMove);
    
  }
  _onMouseMove = (event) => {
    this.elem.classList.add('slider_dragging');
    this.moveAt(event.pageX);
    this._changeValuePercents(event);
    this._changeValue(event);
  }

  moveAt = (pageX) => {
    this.sliderThumb.style.left = pageX + 'px';
    
  }

  _changeValuePercents = (event) => {
    let left = event.clientX - this.container.getBoundingClientRect().left;
    
    this.leftRelative = left / this.container.offsetWidth;
    if (this.leftRelative < 0) {
      this.leftRelative = 0;
    }

    if (this.leftRelative > 1) {
      this.leftRelative = 1;
    }

    this.leftPercents = this.leftRelative * 100;

    this.sliderThumb.style.left = `${this.leftPercents}%`;
    this.sliderProgress.style.width = `${this.leftPercents}%`;
  }

  _changeValue = () => {
    let segments = this.steps - 1;
    let approximateValue = this.leftRelative * segments;
    this.value = Math.round(approximateValue);

    this.elem.querySelector('.slider__value').innerHTML = this.value;

    this.container.dispatchEvent(
      new CustomEvent('slider-change', {detail: this.value, bubbles: true})
    );
  }
}