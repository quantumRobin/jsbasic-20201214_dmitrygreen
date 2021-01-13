/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let result = str
	.split(',').join(' ').split(' ')
	.filter((item) => isFinite(item))
	.map((item)=> Number(item));
	
	let min = Math.min(...result);
	let max = Math.max(...result);
	
	return {min, max};
}
