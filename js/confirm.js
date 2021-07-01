localStorage.removeItem('cart'); //supprime le panier du local storage

// recuperer les informations contacts du local storage
// let contact = JSON.parse(localStorage.getItem('contact')); // const ?
let resumeOrder = JSON.parse(localStorage.getItem('resOrder')); // const
let totalOrder = JSON.parse(localStorage.getItem('totalPriceCart')); // const
console.log(resumeOrder);

// //message confirmation
document.querySelector(
	'.confirmation-order-message'
).innerHTML = `Thank you <span class="name"> ${resumeOrder.contact.firstName}! </span>, your order n°${resumeOrder.orderId} is being prepared for shipment. We have sent you a confirmation email to this address ${resumeOrder.contact.email}`; //change camel Case en css,
//revoir la longueur du numero de commande

//message récapitulatif
document.querySelector('.recapitulatif-order-numero').textContent = `n°${resumeOrder.orderId}`;
document.querySelector('.recapitulatif-order-total').textContent = `${totalOrder}€`;
document.querySelector(
	'.recapitulatif-order-address'
).innerHTML = `${resumeOrder.contact.address}<br>${resumeOrder.contact.city}<br>${resumeOrder.contact.postalCode}`;
