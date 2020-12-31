'use strict';

let calculator = {
  
  num1: 0,
  num2: 0,
  
  read(value1, value2){
    this.num1 = value1;
    this.num2 = value2;
  },

  sum(){
    return this.num1 + this.num2;
  },

  mul(){
    return this.num1 * this.num2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
