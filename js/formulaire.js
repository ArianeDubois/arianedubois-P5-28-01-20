//check validity
let validity = document.querySelector('form').checkValidity(); //retourn true/false formulaire

function checkInput() {
	document.querySelectorAll('.form-input').forEach((input, index) => {
		input.addEventListener('change', (e) => {
			if (input.checkValidity() == false) {
				let incorectMessage = document.querySelectorAll('.invalide-message-input')[index];
				incorectMessage.innerText = 'Incorrect field';
			} else {
				document.querySelectorAll('.invalide-message-input')[index].innerText = '';
			}
		});
	});
}
checkInput();

function sendInfosOrder() {
	let validity = document.querySelector('form').checkValidity(); //retourn true/false formulaire
	let products = []; //faire un tableau d'id product
	cart.forEach((article) => {
		for (let i = 0; i < article.quantity; i++) {
			products.push(article._id);
		}
	});

	if (validity && cart.length > 0) {
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
				// Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(clientInformations),
		})
			.then((response) => response.json()) //
			.then((resOrder) => {
				localStorage.setItem('resOrder', JSON.stringify(resOrder)); //envoie des données contact au local storage
				localStorage.setItem('contact', JSON.stringify(resOrder.contact)); //envoie des données contact au local storage
				window.location.href = `./confirmation-order.html?orderId=${resOrder.orderId}`;
				// window.location.href = `${window.location.origin}confirmation-order.html?orderId=${resOrder.orderId}`;
			})
			.catch((err) => {
				alert("une erreur est survenue dans l'envoie des données");
			});
	} else if (!validity || cart.length < 1) {
		document.getElementById('invalideMessage').innerText =
			'Please fill in this information and add products to your cart';
	}
}

document.querySelector('#submit').addEventListener('click', function (e) {
	e.preventDefault();
	sendInfosOrder();
});
