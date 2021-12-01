// ------------------------ Page de confirmation ------------------------------------------------------
let confirmOrder = document.getElementById("validOrder");
let users = JSON.parse(localStorage.getItem("orderInfos"));

function validationOrder() {

    confirmOrder.innerHTML += `<div class="valid__order__content text-center">
        <h4> Commande validée ! <br> Merci ${users.contact.firstName} ${users.contact.lastName}</h4>
        <p>Votre numéro de commande<br><span class="order-id">${users.orderId}</span> </p>
        <p>Elle vous sera livrée à l'adresse suivante :<br> ${users.contact.address} ${users.contact.city} </p>
    </div>`;
};
validationOrder();

window.addEventListener("unload", function () {
    localStorage.clear()
});
