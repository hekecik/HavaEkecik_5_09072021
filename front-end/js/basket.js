// ------------------------ Page panier ------------------------------------------------------
let params = new URL(document.location).searchParams;
let idArticleChoisi = params.get("id");

getProductAdded();

function getProductAdded() {
    const cameraSelected = JSON.parse(localStorage.getItem("product"));
    const cameraQuantity = JSON.parse(localStorage.getItem("productQuantity"));
    const cameraLenses = JSON.parse(localStorage.getItem("productLensesChoice"));

    console.log(cameraSelected);
    console.log(cameraQuantity);
    console.log(cameraLenses);

}

// Confirmer la commande
// function validOrdrer() {

// }
