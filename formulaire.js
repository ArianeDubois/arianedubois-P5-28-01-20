function sendInfosOrder() {
	document.querySelector('#check').addEventListener('click', function () {
		let validity = document.querySelector('form').checkValidity(); //retourn true/false formulaire
		let products = [];
		// cart = [{id:"1",qty :2},{id:"2", qty:3}]
		//products = ["1","1","2","2","2"]
		// const tab = []
		// for(let i=0; i<qty; i++){
		//     tab.push(id)
		// }
		//tab =[0,1,2,3,4]

		//faire un tableau d'id product
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
				.then((commande) => {
					commande.orderId;
					let myOrder = commande;
				});

			// .then(function (r) {
			// 	localStorage.setItem('contact', JSON.stringify(r.contact));
			// 	window.location.assign('confirmation.html?orderId=' + r.orderId);
			// });
		} else if (!validity) {
			document.getElementById('invalideMessage').innerText = 'invalid information';
		}
	});
}
sendInfosOrder();

// redirection et envoie quand je clic sur checkout(preventdefaut?)
