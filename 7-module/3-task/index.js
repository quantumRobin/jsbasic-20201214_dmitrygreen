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
    
    this._onStepClick = this._onStepClick.bind(this);

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
    this.sliderThumb.style.left = `${this.valuePercents}%`;
    this.sliderProgress.style.width = `${this.valuePercents}%`;
  }
 
  _addEventListeners() {
    this.container.addEventListener('click', this._onStepClick);
  }

  _onStepClick(e) {
    if(!e.target.closest('.slider')) return;
    this._calculateValueByPosition(e);
    this._changeValue(this.approximateValue);
    this._changeValuePercents();
    this._toggleStepActiveClass();
    
    this.container.dispatchEvent(
      new CustomEvent('slider-change', {detail: this.value, bubbles: true})
    );
  }

  _calculateValueByPosition(e) {
    const sliderLeft = this.container.getBoundingClientRect().left; 
    let left = e.clientX - sliderLeft; 
    let leftRelative = left / this.container.offsetWidth;
    this.segments = this.steps - 1;
    this.approximateValue = leftRelative * this.segments;
  }

  _changeValue() {
    this.value = Math.round(this.approximateValue);
    this.valuePercents = this.value*(100/(this.steps-1));
    document.querySelector('.slider__value').innerHTML = this.value;
  } 
    
  _changeValuePercents() {
    this.sliderThumb.style.left = `${this.valuePercents}%`;
    this.sliderProgress.style.width = `${this.valuePercents}%`;
  }
  
  _toggleStepActiveClass() {
    let sliderStepsCollection = this.sliderStepsCollection;
    for(let step of sliderStepsCollection){
      step.classList.remove('slider__step-active');
    }
    for(let i = 0; i < sliderStepsCollection.length; i++) {
      if(i == this.value) {
        sliderStepsCollection[i].classList.add('slider__step-active');
      }
    }
  }
}
