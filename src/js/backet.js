//Корзина
var arrBasket = {};

(async () => {
	var response = await fetch('./src/js/goods.json');
	var goods = await response.json();

	checkBasket();
	displayArrBasket(goods);

	//Отрисовка товара в корзине
	// function displayArrBasket() {
	// 	for (var key in arrBasket) {
	// 		//Вычисляю сумму товара 
	// 		var sum = `${arrBasket[key]}` * `${goods[key].cost}`;

	// 		var basketProdukt = document.querySelector('.basket-store');
	// 		var produktDiv = document.createElement('div');  //!добавляю каждый раз новый див 

	// 		var newPostBasket = `<div class="basket-produkt">
	// 		<button class="all-btns delite-all" data-art="${key}">X</button>
	// 		<p class="name-goods-backet">Почти твоя ${goods[key].name}</p>
	// 		<img class="img-arrbasket" src ="${goods[key].img}">
	// 		<p>${arrBasket[key]}</p>
	// 		<span class="sum">${sum}грн</span>
	// 		<button class="all-btns minus-product" data-art="${key}">-</button>
	// 		<button class="all-btns add-product" data-art="${key}">+</button>
	// 		</div>`

	// 		produktDiv.innerHTML = newPostBasket;
	// 		basketProdukt.appendChild(produktDiv); //! ты должен перезатирать а не добавлять
	// 	}
	// }

	//Удаление товара с корзины
	var deliteGoods = document.querySelectorAll('.delite-all');
	for (var i = 0; i < deliteGoods.length; i++) {
		deliteGoods[i].addEventListener('click', delGoods);
	};

	function delGoods(event) {
		var articul = event.target.dataset.art;
		delete arrBasket[articul];

		saveArrBasketLs();
		// displayArrBasket();

		location.reload();
	};

	//Добавление товара в корзине
	var btnAdd = document.querySelectorAll('.add-product');
	for (var i = 0; i < btnAdd.length; i++) {
		btnAdd[i].addEventListener('click', addGoods);
	};

	function addGoods(event) {
		var articul = event.target.dataset.art;
		arrBasket[articul]++;

		saveArrBasketLs();
		// displayArrBasket();

		location.reload();
	};

	//Отбавление количества товара в корзине
	var btnMinus = document.querySelectorAll('.minus-product');
	for (var i = 0; i < btnMinus.length; i++) {
		btnMinus[i].addEventListener('click', minusGoods);
	};

	function minusGoods(event) {
		var articul = event.target.dataset.art;

		if (arrBasket[articul] > 1) {
			arrBasket[articul]--;
		} else {
			delete arrBasket[articul];
		}

		saveArrBasketLs();
		// displayArrBasket();

		location.reload();
	};

})();

//Отрисовка товара в корзине
function displayArrBasket(arrGoods) {
	for (var key in arrBasket) {
		//Вычисляю сумму товара 
		var sum = `${arrBasket[key]}` * `${arrGoods[key].cost}`;

		var basketProdukt = document.querySelector('.basket-store');
		var produktDiv = document.createElement('div');

		var newPostBasket = `<div class="basket-produkt">
			<button class="all-btns delite-all" data-art="${key}">X</button>
			<p class="name-goods-backet">Почти твоя ${arrGoods[key].name}</p>
			<img class="img-arrbasket" src="${arrGoods[key].img}">
			<p>${arrBasket[key]}</p>
			<span class="sum">${sum}грн</span>
			<button class="all-btns minus-product" data-art="${key}">-</button>
			<button class="all-btns add-product" data-art="${key}">+</button>
			</div>`

		produktDiv.innerHTML = newPostBasket;
		basketProdukt.appendChild(produktDiv); //! перезатирать а не добавлять
	}
};

//Проверка товара в корзине
function checkBasket() {
	if (localStorage.getItem('arrBasket') != null) {
		arrBasket = JSON.parse(localStorage.getItem('arrBasket'));
	}
};

function saveArrBasketLs() {
	localStorage.setItem('arrBasket', JSON.stringify(arrBasket));
};

console.log('backet--->', 'backet');


//todo 1. В корзине сделать общею сумму за весь товар.
//todo 2. после кнопки оплата сделать попап