function sendInfosOrder() {
	let validity = document.querySelector('form').checkValidity(); //retourn true/false formulaire
	let products = []; //faire un tableau d'id product

	// cart = [{id:"1",qty :2},{id:"2", qty:3}]
	//products = ["1","1","2","2","2"]
	// const tab = []
	// for(let i=0; i<qty; i++){
	//     tab.push(id)
	// }
	//tab =[0,1,2,3,4]

	cart.forEach((article) => {
		for (let i = 0; i < article.quantity; i++) {
			products.push(article._id);
		}
	});

	if (validity) {
		let contact = {
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			email: document.getElementById('addressMail').value,
			address: document.getElementById('residentialAddress').value,
			city: document.getElementById('city').value,
			postalCode: document.getElementById('number').value,
		};
		let clientInformations = { contact, products }; //
		// envoie les données infosClient à l'api
		fetch('http://localhost:3000/api/furniture/order', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(clientInformations),
		})
			.then((response) => response.json()) //
			.then((resOrder) => {
				resOrder.orderId;
				resOrder.contact;
				resOrder.product;
				console.log(window.location);
				// localStorage.removeItem('cart'); //supprime le panier du local storage
				localStorage.setItem('resOrder', JSON.stringify(resOrder)); //envoie des données contact au local storage
				window.location.href = `${window.location.origin}/confirmationOrder.html?orderId=${resOrder.orderId}`;
			});

		// .then(function (res) {
		// 	localStorage.setItem('contact', JSON.stringify(res.clientInformations.contact));

		// 	// localStorage.removeItem('shoppingCart')//page confirmation
		// 	window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`;

		// 	window.location.assign(
		// 		'validationCommande.html?orderId=' + res.clientInformations.orderId
		// 	);
		// });
	} else if (!validity) {
		document.getElementById('invalideMessage').innerText = 'invalid information';
	}
}

document.querySelector('#submit').addEventListener('click', function (e) {
	e.preventDefault();
	sendInfosOrder();
});

console.log(document.querySelector('form.action'));
