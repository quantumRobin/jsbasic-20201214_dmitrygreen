/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */

function factorial(n) {
 
  if(n === null || typeof(n) != "number") {
    return alert('not a number');

  } else if ( n === 0 || n === 1 ) {
    return 1;
  }

  let factorial = n * (n - 1);
  
  for( i = 2; ( n - i ) >= 1; i++ ) {
    factorial *= ( n - i );
  }

  return factorial;
}


