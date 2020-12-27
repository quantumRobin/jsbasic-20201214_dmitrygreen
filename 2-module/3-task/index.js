'use strict';

let calculator = {
  read(){
    this.num1 = +prompt("enter num1");
    this.num2 = +prompt("enter num2");
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
