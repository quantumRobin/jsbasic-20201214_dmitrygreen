/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  let i = 0;
  for(let i = 0; table.rows[i]; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
