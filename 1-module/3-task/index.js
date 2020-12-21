/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {

  /*return str == false ? alert(`""`) : 
    str[0].toUpperCase() + str.slice(1))
  */

  if(str == false) return alert(`""`);

  return str[0].toUpperCase() + str.slice(1);  
}

ucFirst("vas");