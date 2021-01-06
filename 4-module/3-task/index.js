/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  
  let row = table.rows;
  let statusCellIndex = 0;

 
  for(let j = 0; row[j]; j++) {
    for(let i = 0; row[j].cells[i]; i++) {
      if(row[j].cells[i].textContent == 'Status') {
        statusCellIndex = i;
       }
       if(row[j].cells[statusCellIndex]?.dataset.avaliable) {
        row[j].cells[statusCellIndex].className = 'available';
       }
       if(!row[j].cells[statusCellIndex]?.dataset.avaliable) {
        row[j].cells[statusCellIndex].className = 'unavailable';
       }
       if(row[j].cells[statusCellIndex].dataset.avaliable) {
        row[j].cells[statusCellIndex].hidden = 'true';
       }
       if(row[j].cells[i].textContent == 'm') {
        row[j].cells[i].classList.add('male');
       }
       if(row[j].cells[i].textContent == 'f') {
        row[j].cells[i].classList.add('female');
       }
       if(typeof(row[j].cells[i].textContent) == 'number') {
        (row[j].cells[i].textContent) < 18 ? row[j].cells[i].style.textDecoration = 'line-through' : null
       }
       
    }
  }

}
