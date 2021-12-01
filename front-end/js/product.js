// ------------------------ Page produit ------------------------------------------------------
let params = new URL(document.location).searchParams;
let idArticleChoisi = params.get("id");
console.log(idArticleChoisi);
let selectedCamera;
let cameraDiv = document.getElementById("camera");
let selectLense = document.getElementById("lensesChoice");

getProduct();
// récupération des caméras dans l'API
function getProduct() {
     fetch(`http://localhost:3000/api/cameras/${idArticleChoisi}`)
         .then(function (res) {
             return res.json();
         })
         .then(function (article) {
             getOneCamera(article);
         })
         .catch(function (error) {
             alert(error);
         })
}

// Affichage d'une camera sélectionnée
function getOneCamera(camera) {
    selectedCamera = camera;
    // Sélection des lentilles
    for (let i = 0; i < camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = camera.lenses[i];
        selectLense.appendChild(option);
    }
    // Affichage du produit
    cameraDiv.innerHTML += `<div class="cameras-product">
        <div class="bloc-product"><h4 class="cameras-name">${camera.name}</h4>
        <img class="cameras-description-img" src="${camera.imageUrl}"/>
        </div>
        <div class="all-bloc"><div class="bloc-description"><h5> Description du produit</h5>
        <p class="cameras-description">${camera.description}</p></div>
        <div class="bloc-price"><h5>Prix</h5>
        <p class="cameras-price">${camera.price/100}€</p></div></div>
        </div>`;
};

// Ajout de la sélection au panier

function addToBasket() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    console.log(products);
    let total = JSON.parse(localStorage.getItem("total")) || 0;
    let quantity = document.getElementById("cameraQuantity").value;
    selectLense = document.getElementById("lensesChoice").value;
    let totalPrice = (selectedCamera.price / 100) * quantity;
    let selectedCameraIndex = products.findIndex(item => item.camera._id == selectedCamera._id);

     if (selectedCameraIndex == -1) {
         products.push({
            size: quantity,
            selectedLense: selectLense,
            camera: selectedCamera,
            totalProductPrice: totalPrice,
        });
    } else {
        products.splice(selectedCameraIndex, 1);
        products.push({
            size: quantity,
            selectedLense: selectLense,
            camera: selectedCamera,
            totalProductPrice: totalPrice,
        });
    }
    products.forEach(product => {
        total += product.totalProductPrice;

    });

    localStorage.setItem("prixTotalBasket", total);
    localStorage.setItem("products", JSON.stringify(products));
    alert('Ajouté au panier !')
};
