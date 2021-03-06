function idProduct() {
	return new URL(window.location.href).searchParams.get('id');
}

let cart = JSON.parse(localStorage.getItem('cart')) || []; // initialisation de cart :tablau vide ou storage
let cartIcone = document.querySelector('.header-cart');

let quantityInCart = 0; //initialise le compteur avant la boucle sur chaque article

fetch(`http://localhost:3000/api/furniture/${idProduct()}`) //récupère le produit avec son idURL
	.then((response) => response.json())
	.then((product) => {
		price = product.price /= 100; // conversion
		product.quantity = 1;
		product.varnishSelect = '';
		displayProduct(product);
		selectVarnish(product);
		displayQuantityInCart();
		clicAddToCard(product);
		notificationsAddToCart(product);
	})
	.catch((err) => {
		alert('erreur du chargement des données');
	});

function displayProduct({ name, imageUrl: img, price, description, varnish }) {
	document.querySelector('.product').innerHTML += `<article class="article">
		<h2 class="product-title">${name}</h2>
		<div class="product-img-container">
			<img src=" ${img} " id="product-img" class="product-img">
		</div>
		<p class="product-text">${description}</p>
		<div class="varnishChoice"></div>

		<p class="product-price">${price}€</p> 
		<button class="btn-add" type="button">Add to cart +</button>
	</article>`;

	// document.querySelector('.title').innerHTML += `<a class="homePageLink" href="../FRONT/index.html
	// 	`;

	// Display varnishs choices
	for (let i = 0; i < varnish.length; i++) {
		let varnishContent = `<div><input type="radio" class="varnish" id="${varnish[i]}" name="varnish" value="${varnish[i]}" >
		<label for="${varnish[i]}">${varnish[i]}</label></div>`;
		let varnishChoiceContainer = document.querySelector('.varnishChoice');
		varnishChoiceContainer.innerHTML += varnishContent;
		document.querySelector('.varnish').checked = true;
	}
}

function selectVarnish(product) {
	let checkedByDefaut = document.querySelector('.varnish').value; //valuer du premier varnish par defaurt
	let selection = checkedByDefaut; //valeur par defaut
	product.varnishSelect = selection;

	document.addEventListener('change', (e) => {
		let isChecked = e.target.checked;
		if (isChecked == true) {
			selection = e.target.value; //prend que la selection clqiué
			product.varnishSelect = selection;
		}
	});

	return product.varnishSelect;
}

function displayQuantityInCart() {
	//recupère la quantité globale dan le local storage pour affichage sur l'icone
	cart.forEach((element) => {
		quantityInCart += element.quantity;
	});

	cartIcone.innerHTML = `<i class="fas fa-shopping-cart"></i><div class ="cart-number">${quantityInCart}</div>`;
}

function clicAddToCard(product) {
	let addButton = document.querySelector('.btn-add');

	addButton.addEventListener('click', () => {
		cart = JSON.parse(localStorage.getItem('cart')) || [];
		let producExistInCart = false;
		//compare les valeur du produit selectionné avec les valeurs enregistrées dans le localstorage

		let quantityInCart = 0; //initialise le compteur avant la boucle sur chaque article

		cart.forEach((element) => {
			quantityInCart += element.quantity;
			if (element._id === product._id && product.varnishSelect === element.varnishSelect) {
				element.quantity++;
				producExistInCart = true;
			}
		});
		if (!producExistInCart) {
			//false
			cart.push(product); // si le produit n'est pas dans le panier on push
		}

		//modifie l'affichage du compteur dans L'ICONE panier => +1
		cartIcone.innerHTML = `<i class="fas fa-shopping-cart"></i><div class ="cart-number">${
			quantityInCart + 1
		}</div>`; //recupère quantitée dans le panier et ajoute le dernier

		cart = localStorage.setItem('cart', JSON.stringify(cart));
		// envoie au local storage les nouvelles valeurs
	});
}

function notificationsAddToCart(product) {
	let addButton = document.querySelector('.btn-add');

	addButton.addEventListener('click', () => {
		cart = JSON.parse(localStorage.getItem('cart')) || [];
		cartIcone.classList.add('header-cart-notification'); //mouvement de l'icone lors de l'ajout
		setTimeout(function () {
			cartIcone.classList.remove('header-cart-notification');
		}, 500);

		document.querySelector('.add-to-cart-notif').classList.add('slide-in'); //apparition
		setTimeout(function () {
			document.querySelector('.add-to-cart-notif').classList.remove('slide-in');
		}, 8000);
		//delais entre les mouvements d'ajout sur l'icone

		for (let i = 0; i < cart.length; i++) {
			document.querySelector(
				'.add-to-cart-notif-message'
			).innerHTML = `	<img class="add-to-cart-notif-img" src="${cart[i].imageUrl}">	<p class="add-to-cart-notif-message"> The ${cart[i].name} with a varnish ${product.varnishSelect} has been added to your cart</p>
	`;
		}
	});
	//remove slide
	document.querySelector('.close').addEventListener('click', function () {
		document.querySelector('.add-to-cart-notif').classList.remove('slide-in');
	});
}
