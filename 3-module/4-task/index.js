/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, ageLimit) {
 	return users
	.filter( ({age}) => age <= ageLimit)
	.map( ( {name, balance} ) => `${name}` + ', ' + `${balance}`)
  .join(`\n`);
}
