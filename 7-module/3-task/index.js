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
    this.container = null;
    
    this.render();
    this.addEventListeners();
    this.initialThumbPosition();
  }

  get elem() {
    return this.container;
  }

  render() {
    const spans = spanTemplate(this.steps, this.value);
    const slider = sliderTemplate(this.value, spans);

    this.container = createElement(slider);
  }

  initialThumbPosition() {
    let leftPercents = this.value*(100/(this.steps-1));
    this.container.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
    this.container.querySelector('.slider__progress').style.width = `${leftPercents}%`;
  }
 
  addEventListeners() {
    this.container.addEventListener('click', this._onStepClick);
  }

  _onStepClick(e) {
    if(!e.target.closest('.slider')) return;
    
    const target = e.target;
    const steps = document.querySelector('.slider__steps').children;
    const slider = document.querySelector('.slider');

    const sliderLeft = slider.getBoundingClientRect().left; 
    let left = e.clientX - sliderLeft; 
    let leftRelative = left / slider.offsetWidth;
    let segments = steps.length - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    document.querySelector('.slider__value').innerHTML = this.value;

    let valuePercents = this.value / segments * 100;
    document.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    document.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    for(let step of steps){
      step.classList.remove('slider__step-active');
    }
    
    target.classList.add('slider__step-active');

    document.querySelector('.slider').dispatchEvent(new CustomEvent('slider-change', {detail: this.value, bubbles: true}));
  }
}
