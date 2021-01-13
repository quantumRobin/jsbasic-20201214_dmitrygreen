/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  [...table.rows].forEach((item, i) => item.cells[i].style.backgroundColor = 'red');
}
