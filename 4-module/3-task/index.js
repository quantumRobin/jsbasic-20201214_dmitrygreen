/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  
  let rowsArr = [...table.rows];
  let tHeadArr = [...table.querySelector('tHead').querySelectorAll('td')];
  let statusIndex = null;
  let genderIndex = null;
  let ageIndex = null;

  findIndex();
  addStatusClass();
  addGenderClass();
  checkAge();

  function findIndex() {
    tHeadArr.forEach((item, i) => {
      if(item.textContent == 'Status') {
        statusIndex = i;
      }
      if(item.textContent == 'Gender') {
        genderIndex = i;
      }
      if(item.textContent == 'Age') {
        ageIndex = i;
      }
    })
  }

  function addStatusClass() {
    
    rowsArr.forEach((item, i) => {
      let dataAttr = item.cells[statusIndex]?.dataset.available; 

      if(dataAttr === undefined && i != 0) {
        item.hidden = true;
      }
      if(dataAttr == "false") {
        item.classList.add('unavailable');
      }
      if(dataAttr == "true") {
        item.classList.add('available');
      }
    })
  }

  function addGenderClass() {
    
    rowsArr.forEach((item) => {
      let cell = item.cells[genderIndex];

      (cell.textContent == 'f' ) ? item.classList.add('female') : item.classList.add('male');
    })
  }

  function checkAge() {

    rowsArr.forEach((item, i) => {
      let cell = item.cells[ageIndex];

      if( cell.textContent < 18 ) {
        item.style.textDecoration = 'line-through';
      } 
    })
  }
}
