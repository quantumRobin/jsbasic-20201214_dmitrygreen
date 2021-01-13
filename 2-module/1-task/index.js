/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
'use strict';

function sumSalary(salariesData) {
	let sum = 0;

	for(const prop in salariesData) {
	 
	 if ( isFinite(salariesData[prop]) ) {
	   sum += salariesData[prop];
	 }
	}
	
	return sum;
}
