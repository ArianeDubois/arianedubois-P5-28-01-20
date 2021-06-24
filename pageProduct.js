function idProduct() {
	return new URL(window.location.href).searchParams.get('id'); //
}

fetch(`http://localhost:3000/api/furniture/${idProduct()}`) //récupère le produit avec son idURL
	.then((response) => response.json())
	.then((product) => {
		let price = (product.price /= 100);
		product.quantity = 1;
		product.varnishSelect = '';
		displayProduct(product);
		//delete option vernis () avant de l'ajouter au panier
		selectVarnish(product);

		clicAddToCard(product);
	});

function displayProduct({ name, imageUrl: img, price, description, _id: id, varnish }) {
	document.querySelector('.product').innerHTML += `<article class="article">
		<h2 class="article-title">${name}</h2>
		<div class="article-img-container">
			<img src=" ${img} " id="article-img" class="article-img">
		</div>
		<p class="article-text">${description}</p>
		<p class="article-price">${price}</p> 
		<div class="varnishChoice">
			<div>
				<input type="radio" class="varnish" id="${varnish[0]}" name="varnish" value=${varnish[0]}">
				<label for="${varnish[0]}">${varnish[0]}</label>
			</div>

			<div>
				<input type="radio" class="varnish" id="${varnish[1]}" name="varnish" value="${varnish[1]}">
				<label for="${varnish[1]}">${varnish[1]}</label>
			</div>

			<div>
				<input type="radio" class="varnish" id="${varnish[2]}" name="varnish" value="${varnish[2]}">
				<label for="${varnish[2]}">${varnish[2]}</label>
			</div>
		</div>
		<button class="btn-add" type="button">Add to card +</button>
	</article>`;

	document.querySelector('.title').innerHTML += `<a class="homePageLink" href="../FRONT/index.html
		`;
}

function selectVarnish(product) {
	document.addEventListener('change', (e) => {
		let isChecked = e.target.checked;
		if (isChecked == true) {
			let selection = e.target.value;
			product.varnishSelect = selection;
		}
	});
}

function clicAddToCard(product) {
	let addButton = document.querySelector('.btn-add');
	// recuperation du panier dans le local storage
	addButton.addEventListener('click', () => {
		let cart = JSON.parse(localStorage.getItem('cart')) || []; // initialisation de cart :tablau vide ou storage
		//parcuorir les élements du localStorage
		let producExistInCart = false;
		cart.forEach((element) => {
			if (element._id === product._id) {
				element.quantity++;
				producExistInCart = true;
			}
		});
		console.log(producExistInCart);

		if (!producExistInCart) {
			//false
			cart.push(product); // si le produit n'est pas dans le panier on push
		}

		cart = localStorage.setItem('cart', JSON.stringify(cart));
		// envoie au local storage mon cart avec son nouveau push
	});
}
