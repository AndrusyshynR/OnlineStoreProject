//Моя корзина
var arrBasket = {};

checkBasket();

//Создания карточки товара
(async () => {
	var response = await fetch('./src/js/goods.json');
	var myProduct = await response.json();

	for (var key in myProduct) {
		var importPost = document.querySelector('.produkt-card');
		var createDiv = document.createElement('div');

		var newPost = `<div class="card"><img class="img-page" src ="${myProduct[key].img}"> <p class="name">${myProduct[key].name}</p> <div class="card-nav">
		<button id="btns-js" class="btns" type="button" data-art="${key}">Добавить в корзину</button> <span class="cost">${myProduct[key].cost}грн</span></div></div>`

		createDiv.innerHTML = newPost;
		importPost.appendChild(createDiv);
	}

	// Добавления товара в корзину
	var cardButtons = document.querySelectorAll('.btns');

	for (var i = 0; i < cardButtons.length; i++) {
		cardButtons[i].addEventListener('click', addBasket);
	}

	function addBasket(event) {
		var articul = event.target.dataset.art;

		if (arrBasket[articul] != undefined) {
			arrBasket[articul]++;
		} else {
			arrBasket[articul] = 1;
		}

		localStorage.setItem('arrBasket', JSON.stringify(arrBasket));

		// showBasket();
	}

	//!сортировка
	var changeSelect = document.querySelector('.search-sel');
	changeSelect.addEventListener('change', mySort);

	function mySort(e) {
		for (var items in myProduct) {
			console.log(myProduct[items].name);

			if (e.target.value === 'AZ') {
				myProduct[items].name.sort(function (a, b) {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				})

			} else if (e.target.value === 'ZA') {
				myProduct[items].name.sort(function (a, b) {
					if (a.name > b.name) {
						return -1;
					}
					if (a.name < b.name) {
						return 1;
					}
					return 0;
				})
			}
		}
	}


})();

//Проверка товара в корзине
function checkBasket() {
	if (localStorage.getItem('arrBasket') != null) {
		arrBasket = JSON.parse(localStorage.getItem('arrBasket'));
	}
};

//!Отображения товара в корзине покупок
//!Добавляет товар копируя предедущий на еденицу
// var miniBasketResult = document.querySelectorAll('.basket-res'); //Доступ к спану корзины

// function showBasket() {
// 	for (var items in arrBasket) {
// 		var countGoods =  arrBasket[items]++;

// 		var miniBasketResult = document.querySelector('.basket-res')
// 		var basketRes = document.createElement('div');

// 		var newPost = `<span>${countGoods}</span>`

// 		basketRes.innerHTML = newPost;
// 		miniBasketResult.appendChild(basketRes);
// 	}
// };

// showBasket();

console.log('main--->', 'main');