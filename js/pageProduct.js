function idProduct() {
	return new URL(window.location.href).searchParams.get('id'); //
}

fetch(`http://localhost:3000/api/furniture/${idProduct()}`) //récupère le produit avec son idURL
	.then((response) => response.json())
	.then((product) => {
		price = product.price /= 100; // conversion
		product.quantity = 1;
		product.varnishSelect = '';
		displayProduct(product);
		selectVarnish(product);
		clicAddToCard(product);
	});

function displayProduct({ name, imageUrl: img, price, description, varnish }) {
	document.querySelector('.product').innerHTML += `<article class="article">
		<h2 class="article-title">${name}</h2>
		<div class="article-img-container">
			<img src=" ${img} " id="article-img" class="article-img">
		</div>
		<p class="article-text">${description}</p>
		<p class="article-price">${price}€</p> 
		<div class="varnishChoice"></div>
		<button class="btn-add" type="button">Add to card +</button>
	</article>`;

	// document.querySelector('.title').innerHTML += `<a class="homePageLink" href="../FRONT/index.html
	// 	`;

	// Display varnishs choices
	for (let i = 0; i < varnish.length; i++) {
		let varnishContent = `<div><input type="radio" class="varnish" id="${varnish[i]}" name="varnish" value="${varnish[i]}">
		<label for="${varnish[i]}">${varnish[i]}</label></div>`;
		let varnishChoiceContainer = document.querySelector('.varnishChoice');
		varnishChoiceContainer.innerHTML += varnishContent;
	}
}

function selectVarnish(product) {
	document.addEventListener('change', (e) => {
		let isChecked = e.target.checked;
		if (isChecked == true) {
			let selection = e.target.value; // prend que le premier mot du varnish
			product.varnishSelect = selection;
		}
	});

	return product.varnishSelect;
}

function clicAddToCard(product) {
	let addButton = document.querySelector('.btn-add');
	// recuperation du panier dans le local storage

	// let cart = JSON.parse(localStorage.getItem('cart')) || []; // initialisation de cart :tablau vide ou storage
	// let cartIcone = document.querySelector('.header-cart');

	// let quantityInCart = 0; //initialise le compteur avant la boucle sur chaque article
	// cart.forEach((element) => {
	// 	quantityInCart += element.quantity;
	// });

	// cartIcone.innerHTML = `<i class="fas fa-shopping-cart"></i><div class ="cart-number">${quantityInCart}</div>`; //recupère quantitée dans le panier et ajoute le dernier
	// //add to cart

	//classe notification
	addButton.addEventListener('click', () => {
		let cart = JSON.parse(localStorage.getItem('cart')) || []; // initialisation de cart :tablau vide ou storage
		//parcuorir les élements du localStorage
		let producExistInCart = false;
		//compare les valeur du produit selectionné avec les valeurs enregistrées dans le localstorage
		let cartIcone = document.querySelector('.header-cart');
		cartIcone.classList.add('header-cart-notification');
		let quantityInCart = 0; //initialise le compteur avant la boucle sur chaque article
		cart.forEach((element) => {
			quantityInCart += element.quantity;

			if (element._id === product._id && selectVarnish(product) === element.varnishSelect) {
				element.quantity++;
				producExistInCart = true;
			}
		});
		if (!producExistInCart) {
			//false
			cart.push(product); // si le produit n'est pas dans le panier on push
		}
		cartIcone.innerHTML = `<i class="fas fa-shopping-cart"></i><div class ="cart-number">${
			quantityInCart + 1
		}</div>`; //recupère quantitée dans le panier et ajoute le dernier
		cart = localStorage.setItem('cart', JSON.stringify(cart));
		// envoie au local storage les nouvelle valeur
	});
}
