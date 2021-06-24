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

// function printContact({ firstName, lastName, address }) {
// 	console.log(firstName);
// 	console.log(lastName);
// 	console.log(address);
// }
// const contact = {
// 	firstName: 'John',
// 	lastName: 'Doe',
// 	address: '11 rue de bois',
// };

// printContact(contact);

// il faut tous les lancer d'habbord un par un ?
// on a besoin d'une connnection internet ?
