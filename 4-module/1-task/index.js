/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
	let ul = document.createElement('ul');
	
	function liTemplate(friend) {
		return `<li>${friend.firstName} ${friend.lastName}</li>`;
	}
	
	ul.innerHTML += friends
	.map(liTemplate)
	.join('\n');
   
	return ul;
}
