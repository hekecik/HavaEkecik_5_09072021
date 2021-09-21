// let id = '5be1ed3f1c9d44000030b061';
//Récuperer L'id dans l'url , ajouter bouton panier (local storage)

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');

function getProduct() {
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function(product) {
            console.log(product);
            getOneCamera(product);
        })
        .catch (function(error) {
            alert(error);
        })
}

function getOneCamera(camera){
        console.log(camera)
        const cameraDiv = document.getElementById("camera");
        cameraDiv.innerHTML += `<div>
        <p>${camera.description}</p>
        <p ${camera.lenses}" /p>
        <img src="${camera.imageUrl}"/>
        </div>`;
}
getProduct();
