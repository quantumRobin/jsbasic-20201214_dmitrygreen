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

function spanTemplate(stepsQantity, value) {
  let active = 'slider__step-active';
  let span = '';

  for(let i = 0; i < stepsQantity; i++) {
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
    this.valuePercents = this.value*(100/(this.steps-1));
    this.container = null;
    
    this._render();

    this.slider = this.container.closest('.slider');
    this.sliderThumb = this.container.querySelector('.slider__thumb');
    this.sliderProgress = this.container.querySelector('.slider__progress');
    this.sliderStepsCollection = this.container.querySelector('.slider__steps').children;

    this._addEventListeners();
    this._initialThumbPosition();

    //почему не работает байнд?
    //this._onStepClick = this._onStepClick.bind(this);
    
    //ненужно байндить все методы. достаточно того что верхняя ф-я с байнд?
    //this._changeValue = this._changeValue.bind(this);
    //this._changeValuePercents = this._changeValuePercents.bind(this);
    //this._toggleStepActiveClass = this._toggleStepActiveClass.bind(this);
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
    this.sliderThumb.style.left = `${this.valuePercents}%`;
    this.sliderProgress.style.width = `${this.valuePercents}%`;
  }
 
  _addEventListeners() {
    this.container.addEventListener('click', this._onStepClick);
  }

  _onStepClick = (e) => {
    if(!e.target.closest('.slider')) return;
    this._changeValue(e);
    this._changeValuePercents();
    this._toggleStepActiveClass(e);
    
    this.container.dispatchEvent(
      new CustomEvent('slider-change', {detail: this.value, bubbles: true})
    );
  }

  _changeValue(e) {
    const sliderLeft = this.container.getBoundingClientRect().left; 
    let left = e.clientX - sliderLeft; 
    let leftRelative = left / this.container.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    this.valuePercents = this.value / segments * 100;
    document.querySelector('.slider__value').innerHTML = this.value;
  } 
    
  _changeValuePercents() {
    this.sliderThumb.style.left = `${this.valuePercents}%`;
    this.sliderProgress.style.width = `${this.valuePercents}%`;
  }
  
  _toggleStepActiveClass(e) {
    for(let step of this.sliderStepsCollection){
      step.classList.remove('slider__step-active');
    }
    e.target.classList.add('slider__step-active');
  }
}
