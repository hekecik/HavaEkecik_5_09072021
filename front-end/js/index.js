function getArticles() {
    fetch("http://localhost:3000/api/cameras")
        .then(function (httpBodyresponse) {
            return httpBodyresponse.json();
        })
        .then(function(articles) {
            console.log(articles);
            displayArticles(articles);
        })
        .catch (function(error) {
            alert(error);
        })
}

function displayArticles(articles) {
    console.log('articles', articles);
    let cameras = document.getElementById("cameras");
}
getArticles();
