/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */

function createElement(html) {
  const table = document.createElement('table');
  table.innerHTML = html;
  return table;
}

function rowTemplate(data) {
  return `
    <tr>
      <td>${data.name}</td>
      <td>${data.age}</td>
      <td>${data.salary}</td>
      <td>${data.city}</td>
      <td><button>X</button></td>
    </tr>
  `;
}

export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this._table = null;

    this._render();
  }

  get elem() {
    return this._table;
  }
  
  _render() {
    const tableInnerHTML = this._rows.map(rowTemplate).join('');

    this._table = createElement(tableInnerHTML);

    this._table.addEventListener('click', this._onClickX);
  }

  _onClickX = (e) => {
    if(e.target.tagName != 'BUTTON') return;

    e.target.closest('tr').remove();
  }
 
}
