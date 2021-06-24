let cart = JSON.parse(localStorage.getItem('cart')) || []; // recuperer les valeurs du local storage ou retourner un tableau vide

let totalPriceArticle = 0;
let totalPriceCart = 0; // initailisation globale de la varioable pour pouvoir lui assigner les valeurs (+=)
let totalPriceDisplay = document.querySelector('.cart-infos-total');

cart.forEach((article, index) => {
	displayArticleToCart(article);
	changeQuantity(article, index);
	displayTotalPrice(article, index);
	// // removeArticle(article, index);
});

function displayArticleToCart({ name, imageUrl: img, price, _id: id, quantity, varnishSelect }) {
	let onCartArticle = document.createElement('div');

	let onCartArticleContent = `
	<div class="cart-article" >
    <img src=" ${img}" class="cart-article-img">
    <p class="cart-article-title"> ${name}</p>
    <p class="cart-article-price">${price}</p> 
    <p class="cart-article-varnish">${varnishSelect}</p> 
    <input id="${id}" class="cart-article-quantity"  type="number" value="${quantity}"  min="1" max="10">
    <button class="btn-remove" type="button">X</button>
    `;
	onCartArticle.innerHTML += onCartArticleContent; //ajouter le contenu html à la div produit
	document.querySelector('.cart-content-add').appendChild(onCartArticle);
}

//remove Article
document.querySelectorAll('.btn-remove').forEach((crossButton, index) => {
	crossButton.addEventListener('click', (e) => {
		cart.splice(index, 1);
		e.target.parentElement.remove();
		localStorage.setItem('cart', JSON.stringify(cart)); //envoie les nouveaux compte du panier a local storage
		window.location.reload(); //rafraichir la page pour renvoyer les nouvelles données panier
	});
});

function displayTotalPrice(article, index) {
	totalPriceArticle = article.quantity * article.price;
	totalPriceCart += totalPriceArticle;
	totalPriceDisplay.textContent = `Total:${totalPriceCart} €`;
	localStorage.setItem('totalPriceCart', JSON.stringify(totalPriceCart));
}

function changeQuantity(article, index) {
	let buttonQuantity = document.querySelectorAll('.cart-article-quantity');
	let totalPriceDisplay = document.querySelector('.cart-infos-total');

	buttonQuantity[index].addEventListener('change', function (e) {
		let quantityStorage = article.quantity;
		quantityStorage = parseInt(e.target.value);
		totalPriceArticle = article.quantity * article.price;
		// console.log(quantity);

		//ici ne marche qu'avec la quantité, et garde en mémoire la quantiité enregistrée au début
		if (quantityStorage > article.quantity) {
			totalPriceCart += article.price;
		} else if (quantityStorage < article.quantity) {
			totalPriceCart -= article.price; //  * article.quantity
		}

		totalPriceDisplay.textContent = `Total:${totalPriceCart} €`;
	});
}
