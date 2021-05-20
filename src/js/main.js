//todo1     Нет открытия товара в новом окне не видит div
//todo2     Нет сортировки по поиску

document.addEventListener('DOMContentLoaded', function () {

	//Моя корзина
	let arrBasket = {};

	checkBasket(); //?Проверка товара в корзине

	//Создания карточки товара
	(async () => {
		const response = await fetch('./src/js/goods.json');
		let myProduct = await response.json();

		function displayGoods() {
			for (let key in myProduct) {
				let importPost = document.querySelector('.produkt-card');
				let createDiv = document.createElement('div');
				createDiv.className = 'createDiv';

				let newPost = `<div class="card">
						<img class="img-page" src ="${myProduct[key].img}">
						<a class='link-name' href='/product.html' data-ar="${key}" target='_blank'>${myProduct[key].name}</a>
					<div class="card-nav">
						<button id="btns-js" class="btns" type="button" data-art="${myProduct[key].id}">Add to Shopping Cart</button>
						<span class="cost">${myProduct[key].cost}$</span>
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
		// 	let artikulProduct = e.target.dataset.ar;

		// 	let productView = document.querySelector('.product-view'); //!нет доступа к диву
		// 	console.log(productView);

		// 	let productViewDiv = document.createElement('div');

		// 	let oneProduct = `<div class="card">
		// 		<img class="img-page" src ="${myProduct[artikulProduct].img}">
		// 		<a class='link-name' href='./product.html'" target='_blank'>${myProduct[artikulProduct].name}</a>
		// 	<div class="card-nav">
		// 			<span class="cost">${myProduct[artikulProduct].cost}грн</span>
		// 	</div></div>`

		// 	productViewDiv.innerHTML = oneProduct;
		// 	productView.appendChild(productViewDiv);
		// };

		// Добавления товара в корзину
		let cardButtons = document.querySelectorAll('.btns');

		for (let i = 0; i < cardButtons.length; i++) {
			cardButtons[i].addEventListener('click', addBasket);
		};
		
		function addBasket(event) {
			let articul = event.target.dataset.art;
			
			if (arrBasket[articul] != undefined) {
				arrBasket[articul]++;
			} else {
				arrBasket[articul] = 1;
			}

			localStorage.setItem('arrBasket', JSON.stringify(arrBasket));

			showBasket(); //функция показа количества товара в корзине
		};

		//Функция сортировки по цене
		let changeSelect = document.querySelector('.search-sel');
		changeSelect.addEventListener('change', mySort);

		function mySort(e) {
			let createDivs = document.querySelectorAll('.createDiv');

			for (let i = 0; i < createDivs.length; i++) {
				createDivs[i].remove();
			};

			if (e.target.value === 'more-less') {
				let sortAz = myProduct.sort((a, b) => b.cost - a.cost);
				displayGoods(sortAz);
			} else if (e.target.value === 'less-more') {
				let sortZa = myProduct.sort((a, b) => a.cost - b.cost);
				displayGoods(sortZa);
			} else if (e.target.value === 'popular') {
				let popular = myProduct.sort((a, b) => a.id - b.id);
				displayGoods(popular);
			};

			let cardButtons = document.querySelectorAll('.btns');

			cardButtons.forEach(function (item) {
				item.addEventListener('click', function (event) {
					addBasket(event);
				});
			});
		};

		//!Сортировка по названию
		//!Version1
		// let changeSelect = document.querySelector('.search-inp');
		// changeSelect.addEventListener('input', sortName);

		// function sortName() {
		// 	let valInput = this.value.trim();

		// 	let arrNameGoods = [];

		// 	for (let keyname of myProduct) {
		// 		arrNameGoods.push(keyname.name);
		// 	};

		// 	if (valInput != '') {
		// 		arrNameGoods.forEach(function (elem) {
		// 			if (elem.search(valInput) == -1) {
		// 				elem.classList.add('hide');
		// 			} else {
		// 				elem.classList.remove('hide');
		// 			};
		// 		});
		// 	} else {
		// 		arrNameGoods.forEach(function (elem) {
		// 			elem.classList.remove('hide');
		// 		});
		// 	};
		// };

		//!Version2
		//let changeSelect = document.querySelector('.search-inp');
		// changeSelect.addEventListener('input', (event) => {
		// 	let searchText = event.target.value;
		// 	filtersToParams(myProduct, searchText, 'search');
		// });

		// function filtersToParams(data, searchParam, field) {
		// 	let isCompletedArr = data.filter((item) => {
		// 		switch (field) {
		// 			case 'search':
		// 				return item['name'].includes(searchParam) ? item : false
		// 			default:
		// 				return item
		// 		}
		// 	});

		// 	displayGoods(isCompletedArr);
		// };

	})();

	//Проверка товара в корзине
	function checkBasket() {
		if (localStorage.getItem('arrBasket') != null) {
			arrBasket = JSON.parse(localStorage.getItem('arrBasket'));
		};
	};

	//Отображения количества товара возле корзины покупок
	function showBasket() {
		const  arrAllGoods = [];

		for (let items in arrBasket) {
			arrAllGoods.push(arrBasket[items]);

			let allNumBa = arrAllGoods.reduce((acc, allValue) => acc + allValue);

			let miniBasketResult = document.querySelector('.basket-res')
			let basketRes = document.createElement('div');

			let newPost = `<span>${allNumBa}</span>`

			basketRes.innerHTML = newPost;
			miniBasketResult.innerHTML = allNumBa;
		};
	};

	showBasket();
});

console.log('main--->', 'main');