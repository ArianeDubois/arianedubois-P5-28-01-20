fetch('http://localhost:3000/api/furniture')
	.then((response) => response.json())
	.then((data) => {
		for (let articleItem of data) {
			let article = new articleInfos(
				articleItem.name,
				articleItem.price,
				articleItem.imageUrl,
				articleItem.description
			); //classe avec les données de l'api
			diplayArticles(article.title, article.img, article.price, article.description);
		}
	});

class articleInfos {
	constructor(title, price, img, description) {
		this.title = title;
		this.price = price / 100 + ' €'; // conversion
		this.img = img;
		this.description = description;
	}
}

function diplayArticles(title, img, price, description) {
	document.querySelector('.furnitures').innerHTML += `<article class="article">
        <h2 class="article-title"> ${title}</h2>
        <div class="article-img-container"><img src=" ${img} " id="article-img" class="article-img"></div>
        <p class="article-text">${description}</p>
        <p class="article-price">${price}</p> 
        <button class="btn-add" type="button">Add to card +</button>
        </article>`;
	clicAddToCard();
}

// -1- Clic button Remove => function removeArticleCart
let removeButton = document.querySelectorAll('.btn-remove');
for (let i = 0; i < removeButton.length; i++) {
	removeButton[i].addEventListener('click', removeArticleCart);
}

// -2- Clic button add => function infosArticle ... => function addToCard
/// pb
function clicAddToCard() {
	let addButton = document.querySelectorAll('.btn-add');
	for (let i = 0; i < addButton.length; i++) {
		addButton[i].addEventListener('click', infosArticle);
	}
}

// -3- input quantité article cart => écouter les changement et changeQuantity => changeTotal
let cartArticleQuantity = document.querySelectorAll('.cart-article-quantity');
for (let i = 0; i < cartArticleQuantity.length; i++) {
	cartArticleQuantity[i].addEventListener('change', changeQuantity);
}

//1
function removeArticleCart(e) {
	let removeButtonClicked = e.target;
	removeButtonClicked.parentElement.remove();
	displayTotal(); //! la valeur ne reprend plus les quantités inscrites après remove
}

// -2- recupère les informations de l'élement parent => function addToCard
function infosArticle(e) {
	let buttonAddClicked = e.target;
	let articleToCart = buttonAddClicked.parentElement;
	let titleArticle = articleToCart.querySelector('.article-title').innerText;
	let priceArticle = articleToCart.querySelector('.article-price').innerText;
	let imgArticle = articleToCart.querySelector('#article-img').src;
	AddArticleToCart(titleArticle, priceArticle, imgArticle);
	displayTotal();
}

// -2- ajoute les infomrations dans la classe Html du panier
function AddArticleToCart(title, price, img) {
	let onCartArticle = document.createElement('div');
	onCartArticle.classList.add('cart-article'); //ajouter une classe

	let onCartArticleContent = `
    <img src="  ${img} " id="cart-article-img" class="cart-article-img">
    <p class="cart-article-title"> ${title}</p>
    <p class="cart-article-price">${price}</p> 
    <input class="cart-article-quantity" type="number" value="1"  min="1" max="10">
    <button class="btn-remove" type="button">X</button>
    `;
	onCartArticle.innerHTML += onCartArticleContent; //ajouter le contenu html à la div produit
	document.querySelector('.cart-content-add').appendChild(onCartArticle);

	//suprimer l'article en appelant la fonction remove
	onCartArticle.querySelector('.btn-remove').addEventListener('click', removeArticleCart);
	onCartArticle
		.querySelector('.cart-article-quantity')
		.addEventListener('change', changeQuantity);
}

// 3
function changeQuantity(e) {
	let quantity = e.target.value;
	displayTotal(quantity);
}

//-4- affiche prix total
function displayTotal(quantity) {
	let totalPriceValue = 0;
	let totalPriceDisplay = document.querySelector('.cart-infos-total');
	let item = document.querySelectorAll('.cart-article-price');

	for (var i = 0; i < item.length; i++) {
		console.log(item[i]); // ! boucle sur les clics
		if (quantity > 1) {
			totalPriceValue += parseFloat(item[i].innerText) * quantity; //
		} else {
			totalPriceValue += parseFloat(item[i].innerText);
		}
	}

	totalPriceDisplay.textContent = `Total:${totalPriceValue} €`;
}
