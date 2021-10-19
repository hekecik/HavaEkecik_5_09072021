
// ------------------------ Page d'accueil ------------------------------------------------------
getArticles();

function getArticles() {
    fetch("http://localhost:3000/api/cameras")
        .then(function (res) {
            return res.json();
        })
        .then(function(articles) {
            console.log(articles);
            displayArticles(articles);
        })
        .catch (function(error) {
            alert(error);
        })
}

function displayArticles(cameras) {
    cameras.forEach(camera => {
        console.log(camera)
        const cameraDiv = document.getElementById("cameras");
        cameraDiv.innerHTML += `<div>
        <p>${camera.name}</p>
        <a href="product.html?id=${camera._id}"> <img class="cameras-img" src="${camera.imageUrl}"/></a>
        </div>`;
    });
}

// ------------------------ Page produit ------------------------------------------------------
