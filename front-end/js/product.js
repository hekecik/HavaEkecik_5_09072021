let params = new URL(document.location).searchParams;
let id = params.get("id");

const APIURL = "http://localhost:3000/api/cameras";

const productDescription = document.querySelector(".bloc-description");
const productPrice = document.querySelector(".cameras-price");
const cameraNumber = document.querySelector("#cameraNum");
const lensesChoice = document.querySelector("#lensesChoice");

function getProduct() {
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function(product) {
            console.log(product);
            var camera = product;
            getOneCamera(camera);
        })
        .catch (function(error) {
            alert(error);
        })
}


function getOneCamera(camera){
        console.log(camera)
        const cameraDiv = document.getElementById("camera");
        const selectLense = document.getElementById("lensesChoice");
        for (let i = 0; i < camera.lenses.length; i++) {
            let option = document.createElement("option");
            option.innerText = camera.lenses[i];
            selectLense.appendChild(option);
        }

        cameraDiv.innerHTML += `<div class="cameras-product">
        <p ${camera.lenses}/p>
        <img class="cameras-description-img" src="${camera.imageUrl}"/>
        <div class="bloc-description"><h3> Description du produit</h3>
        <p class="cameras-description">${camera.description}</p></div>
        <div class="bloc-price"><h3>Prix</h3>
        <p class="cameras-price">${camera.price/100} </p></div>
        </div>`;

        const divAddLocalStorage = document.getElementById("btn-add-local-storage");
        divAddLocalStorage.innerHTML += `<button class="p-2 mt-3" onclick="addToLocalStorage()">Ajouter au panier</button>`;
}

function addToLocalStorage(camera){
    console.log(camera); 
}
function getOptionCamera(product){
    productSelectedlenses.forEach(product => {
    let optionProduct = document.createElement("option");
    document.getElementById("lensesChoice").innerHTML = `<option>${camera.lenses}</option>`;
})
}

getProduct();
