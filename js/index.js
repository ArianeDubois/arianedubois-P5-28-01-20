fetch('http://localhost:3000/api/furniture')
	.then((response) => response.json())
	.then((furniture) => {
		furniture.forEach((articleItem) => {
			articleItem.price /= 100;
			displayFurniture(articleItem); //articleItem= objet
		});
	});

function displayFurniture({ name, imageUrl: img, price, _id: id }) {
	// propriété et nouvaux nom de propriété pour articleItem
	document.querySelector('.furnitures').innerHTML += `
    <article class="article">
        <a class="article-page" href="product.html?id=${id}">
            <h2 class="article-title">${name}</h2>
            <div class="article-img-container">
                <img src="${img}" class="article-img"/>

            </div>
            <p class="article-price">${price} €</p>
        </a>
    </article>`;
}

// for (let i = 0; i < 20; i++) {
// 	document.querySelector('.background').innerHTML += `<div class="border" id='${i}'></div>`;
// }
