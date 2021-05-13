document.addEventListener('DOMContentLoaded', function () {

	//Моя корзина
	var arrBasket = {};

	checkBasket(); //?Проверка товара в корзине
	
	//Создания карточки товара
	(async () => {
		const response = await fetch('./src/js/goods.json');
		let myProduct = await response.json();

		function displayGoods() {
			for (var key in myProduct) {
				var importPost = document.querySelector('.produkt-card');
				var createDiv = document.createElement('div');
				createDiv.className = 'createDiv';

				let newPost = `<div class="card">
						<img class="img-page" src ="${myProduct[key].img}">
						<a class='link-name' href='/product.html' data-ar="${key}" target='_blank'>${myProduct[key].name}</a>
					<div class="card-nav">
						<button id="btns-js" class="btns" type="button" data-art="${key}">Добавить в корзину</button>
						<span class="cost">${myProduct[key].cost}грн</span>
					</div></div>`

				createDiv.innerHTML = newPost;
				importPost.appendChild(createDiv);
			};
		};
		displayGoods();

		//!Открытие товара в новом коне
		// let linkProduct = document.querySelectorAll('.link-name');
		
		// for (let i = 0; i < linkProduct.length; i++) {
		// 	linkProduct[i].addEventListener('click', openProductNewWindow);
		// }

		// function openProductNewWindow(e) {
		// 	var artikulProduct = e.target.dataset.ar;
		// 	console.log(artikulProduct);

		// 	var productView = document.querySelector('.product-view'); //?нет доступа к диву
		// 	console.log(productView);

		// 	var productViewDiv = document.createElement('div');

		// 	var newPro = `<div class="card">
		// 		<img class="img-page" src ="${myProduct[artikulProduct].img}">
		// 		<a class='link-name' href='./product.html'" target='_blank'>${myProduct[artikulProduct].name}</a>
		// 	<div class="card-nav">
		// 			<span class="cost">${myProduct[artikulProduct].cost}грн</span>
		// 	</div></div>`

			// productViewDiv.innerHTML = newPro;
			// productView.appendChild(productViewDiv);
		// };

		// Добавления товара в корзину
		var cardButtons = document.querySelectorAll('.btns');

		for (var i = 0; i < cardButtons.length; i++) {
			cardButtons[i].addEventListener('click', addBasket);
		};

		function addBasket(event) {

			console.log('btnCa');

			var articul = event.target.dataset.art;

			if (arrBasket[articul] != undefined) {
				arrBasket[articul]++;
			} else {
				arrBasket[articul] = 1;
			}

			localStorage.setItem('arrBasket', JSON.stringify(arrBasket));

			// showBasket(); //?функция показа количества товара в корзине
		};

		//!Сортирует но не добавляет в корзину не реагирует на кнопку
		var changeSelect = document.querySelector('.search-sel');
		changeSelect.addEventListener('change', mySort);

		function mySort(e) {
			var createDivs = document.querySelectorAll('.createDiv');

			for (let i = 0; i < createDivs.length; i++) {
				createDivs[i].remove();
			};

			if (e.target.value === 'AZ') {
				var sortAz = myProduct.sort((a, b) => b.cost - a.cost);
				displayGoods(sortAz);
				console.log(sortAz);
			} else if (e.target.value === 'ZA') {
				var sortZa = myProduct.sort((a, b) => a.cost - b.cost);
				displayGoods(sortZa);
				console.log(sortZa);
			} else if (e.target.value === 'default') {
				location.reload();//todo    не понял как сделать по умолчанию товар
			};
		};

		//!Сортировка по названию
		// var changeSelect = document.querySelector('.search-inp');
		// changeSelect.addEventListener('input', sortName);

		// function sortName() {
		// 	var val = this.value.trim();
		// 	console.log(val);
		// };

	})();

	//Проверка товара в корзине
	function checkBasket() {
		if (localStorage.getItem('arrBasket') != null) {
			arrBasket = JSON.parse(localStorage.getItem('arrBasket'));
		};
	};

	//!Отображения количества товара возле корзины покупок
	// function showBasket() {
	// 	for (var items in arrBasket) {

	// 		var countGoods = arrBasket[items];

	// 		var miniBasketResult = document.querySelector('.basket-res')
	// 		var basketRes = document.createElement('div');

	// 		var newPost = `<span>${countGoods}</span>`

	// 		basketRes.innerHTML = newPost;
	// 		miniBasketResult.innerHTML = countGoods;
	// 	}
	// };
	// showBasket();

});

console.log('main--->', 'main');