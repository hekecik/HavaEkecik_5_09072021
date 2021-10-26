// ------------------------ Page produit ------------------------------------------------------
let params = new URL(document.location).searchParams;
let idArticleChoisi = params.get("id");
let selectedCamera;

const APIURL = "http://localhost:3000/api/cameras";


getProduct();
// récupération des caméras dans le localStorage
function getProduct() {
    const listArticles = JSON.parse(localStorage.getItem("article"));
    const article = listArticles.filter(articleChoice => articleChoice._id == idArticleChoisi);
    getOneCamera(article[0]);
}

// Affichage d'une camera sélectionnée
function getOneCamera(camera) {
    selectedCamera = camera;
    const cameraDiv = document.getElementById("camera");
    const selectLense = document.getElementById("lensesChoice");
    // Sélection des lentilles
    for (let i = 0; i < camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = camera.lenses[i];
        selectLense.appendChild(option);
    }
    // Affichage du produit
    cameraDiv.innerHTML += `<div class="cameras-product">
        <img class="cameras-description-img" src="${camera.imageUrl}"/>
        <h4 class="cameras-name">${camera.name}</h4>
        <div class="bloc-description"><h5> Description du produit</h5>
        <p class="cameras-description">${camera.description}</p></div>
        <div class="bloc-price"><h5>Prix</h5>
        <p class="cameras-price">${camera.price/100}€</p></div>
        </div>`;
}

// Ajout de la sélection au panier
addToBasket()

function addToBasket() {

    localStorage.setItem("product", JSON.stringify(selectedCamera));
    localStorage.setItem("productQuantity", JSON.stringify(cameraNum.value));
    localStorage.setItem("productLensesChoice", JSON.stringify(lensesChoice.value));

    //if(localStorage.getItem("product") != null)
    // alors ajoute au panier
    // sinon affiche votre panier est vide
}
