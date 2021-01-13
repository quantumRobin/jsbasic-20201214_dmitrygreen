/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */

'use strict';

function isEmpty(obj) {
  for (const value in obj) {
		return false;
	}
	return true;
}
