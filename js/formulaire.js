function sendInfosOrder() {
	let validity = document.querySelector('form').checkValidity(); //retourn true/false formulaire
	let products = []; //faire un tableau d'id product
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
		let clientInformations = { contact, products, totalPriceCart }; //
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
				localStorage.setItem('resOrder', JSON.stringify(resOrder)); //envoie des données contact au local storage
				localStorage.setItem('contact', JSON.stringify(resOrder.contact)); //envoie des données contact au local storage
				window.location.href = `${window.location.origin}/confirmationOrder.html?orderId=${resOrder.orderId}`;
			});
	} else if (!validity) {
		document.getElementById('invalideMessage').innerText =
			'please fill in the information above';
	}
}

document.querySelector('#submit').addEventListener('click', function (e) {
	e.preventDefault();
	sendInfosOrder();
});
