// ------------------------ Page d'accueil ------------------------------------------------------
getArticles();
// Récupération des articles auprès de l'API
   function getArticles() {
    fetch("http://localhost:3000/api/cameras")
        .then(function (res) {
            return res.json();
        })
        // Envoi de la liste des caméras dans le localStorage
        .then(function (articles) {
            displayArticles(articles);
        })
        .catch(function (error) {
            alert(error);
        })
}

// affichage de la liste des caméras
function displayArticles(cameras) {
    cameras.forEach(camera => {
        const cameraDiv = document.getElementById("cameras");
        cameraDiv.innerHTML += `<div>
        <p class="camera-name">${camera.name}</p>
        <a href="product.html?id=${camera._id}"> <img class="cameras-img" src="${camera.imageUrl}"/></a>
        </div>`;
    });
}
