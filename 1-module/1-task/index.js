/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */

function factorial(n) {
 
  if(!isFinite(n) || n === "" || n === " " || n === null) {
    return n;
  }
  
  if ( n === 0 || n === 1 ) {
    return 1;
  }

  let factorial = n * (n - 1);
  
  for( i = 2; ( n - i ) >= 1; i++ ) {
    factorial *= ( n - i );
  }

  return factorial;
}


