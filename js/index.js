fetch('http://localhost:3000/api/furniture')
	.then((response) => response.json())
	.then((furniture) => {
		furniture.forEach((articleItem) => {
			articleItem.price /= 100;
			displayFurniture(articleItem); //articleItem= objet
			displayQtyCart();
		});
	})
	.catch((err) => {
		alert('erreur du chargement des données');
	});

function displayFurniture({ name, imageUrl: img, price, _id: id }) {
	// propriété et nouvaux nom de propriété pour articleItem
	document.querySelector('.furnitures').innerHTML += `
    <article class="article">
        <a class="article-page" href="product.html?id=${id}">
            <h2 class="article-title">${name}</h2>
			<p class="article-price">${price} €</p>
            <div class="article-img-container">
                <img src="${img}" class="article-img"/>

            </div>
           
        </a>
    </article>`;
}

function displayQtyCart() {
	let cart = JSON.parse(localStorage.getItem('cart')) || []; // initialisation de cart :tablau vide ou storage
	let cartIcone = document.querySelector('.header-cart');

	let quantityInCart = 0; //initialise le compteur avant la boucle sur chaque article
	cart.forEach((element) => {
		quantityInCart += element.quantity;
	});

	cartIcone.innerHTML = `<i class="fas fa-shopping-cart"></i><div class ="cart-number">${quantityInCart}</div>`; //recupère quantitée dans le panier et ajoute le dernier
	return quantityInCart;
}
