// recuperer les informations contacts du local storage
localStorage.removeItem('cart'); //supprime le panier du local storage

let contact = JSON.parse(localStorage.getItem('contact')); // const
let resumeOrder = JSON.parse(localStorage.getItem('resOrder')); // const
console.log(resumeOrder);
//message confirmation
document.querySelector(
	'.confirmation-order-message'
).textContent = `Thank you ${contact.firstName}, your order n°${resumeOrder.orderId} is being prepared for shipment. We have sent you a confirmation email to this address ${contact.email}`; //change camel Case en css

//message récapitulatif
document.querySelector('.recapitulatif-order-numero').textContent = `n°${resumeOrder.orderId}`;
document.querySelector('.recapitulatif-order-product').textContent = `${resumeOrder.products}`;
document.querySelector('.recapitulatif-order-total').textContent = `${resumeOrder.products.name}€`; //boucle sur les products.name
let nameOrderProduct = resumeOrder.products.forEach((name) => {
	name.name;
	console.log(name.name);
});

document.querySelector(
	'.recapitulatif-order-address'
).innerHTML = `${contact.address}<br>${contact.city}<br>${contact.postalCode}`;
