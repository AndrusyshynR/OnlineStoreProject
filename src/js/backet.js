document.addEventListener('DOMContentLoaded', function () {

	//Корзина
	let arrBasket = {};

	(async () => {
		const response = await fetch('./src/js/goods.json');
		let goods = await response.json();

		checkBasket();
		displayArrBasket(goods);

		//Отрисовка товара в корзине
		function displayArrBasket(arrGoods) {
			const arrAllSum = [];

			for (let key in arrBasket) {
				//Вычисляю сумму товара 
				let sum = `${arrBasket[key]}` * `${arrGoods[key].cost}`;
				arrAllSum.push(sum);

				let basketProdukt = document.querySelector('.basket-store');
				let produktDiv = document.createElement('div');

				let newPostBasket = `<div class="basket-produkt">
			<p class="name-goods-backet">Your ${arrGoods[key].name}</p>
			<img class="img-arrbasket" src="${arrGoods[key].img}">
			<span class="sum">${sum}$</span>
			<button class="all-btns minus-product" data-art="${key}">minus</button>
			<p class="sum quantity">${arrBasket[key]}</p>
			<button class="all-btns add-product" data-art="${key}">add</button>
			<button class="all-btns delite-all" data-art="${key}">delete</button>
			</div>`

				produktDiv.innerHTML = newPostBasket;
				basketProdukt.appendChild(produktDiv);
			};

			let allSum = arrAllSum.reduce((acc, allValue) => acc + allValue);

			//Блок оплата товара
			function blockPaymentGoods() {
				let basketProdukt = document.querySelector('.basket-store');
				let paymentDiv = document.createElement('div');

				let paymentNav = `<div class="payment-goods">
				<button class="btn-payment" type="button">Payment for goods</button>
				<span class="sum-payment">${allSum}$</span>
			</div>`

				paymentDiv.innerHTML = paymentNav;
				basketProdukt.appendChild(paymentDiv);
			};

			blockPaymentGoods();
		};

		//Оплата товара
		let btnPayment = document.querySelector('.btn-payment');
		btnPayment.addEventListener('click', paymentGoods);

		function paymentGoods() {
			let allProdukt = document.querySelectorAll('.basket-produkt');
			let popup = document.querySelector('.popup-payment');

			popup.classList.add('popup-show');

			for (let i = 0; i < allProdukt.length; i++) {
				allProdukt[i].remove();
			};

			localStorage.removeItem('arrBasket');
			
			setTimeout(function () {
				popup.classList.remove('popup-show');
				location.reload();
			}, 3000);
		};

		//Удаление товара с корзины
		let deliteGoods = document.querySelectorAll('.delite-all');
		for (let i = 0; i < deliteGoods.length; i++) {
			deliteGoods[i].addEventListener('click', delGoods);
		};

		function delGoods(event) {
			let articul = event.target.dataset.art;
			delete arrBasket[articul];

			saveArrBasketLs();
			displayArrBasket(location.reload());
		};

		//Прибавление товара в корзине
		let btnAdd = document.querySelectorAll('.add-product');
		for (let i = 0; i < btnAdd.length; i++) {
			btnAdd[i].addEventListener('click', addGoods);
		};

		function addGoods(event) {
			let articul = event.target.dataset.art;
			arrBasket[articul]++;

			saveArrBasketLs();
			displayArrBasket(location.reload());
		};

		//Отбавление количества товара в корзине
		let btnMinus = document.querySelectorAll('.minus-product');
		for (let i = 0; i < btnMinus.length; i++) {
			btnMinus[i].addEventListener('click', minusGoods);
		};

		function minusGoods(event) {
			let articul = event.target.dataset.art;

			if (arrBasket[articul] > 1) {
				arrBasket[articul]--;
			} else {
				delete arrBasket[articul];
			}

			saveArrBasketLs();
			displayArrBasket(location.reload());
		};

	})();

	//Проверка товара в корзине
	function checkBasket() {
		if (localStorage.getItem('arrBasket') != null) {
			arrBasket = JSON.parse(localStorage.getItem('arrBasket'));
		}
	};

	//Сохранение товара в корзине
	function saveArrBasketLs() {
		localStorage.setItem('arrBasket', JSON.stringify(arrBasket));
	};

});

console.log('backet--->', 'backet');