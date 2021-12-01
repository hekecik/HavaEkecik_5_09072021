// ------------------------ Page panier ------------------------------------------------------
let cameraInBasket = document.getElementById("cart__items");
let products = JSON.parse(localStorage.getItem("products"));
let totalPrice = JSON.parse(localStorage.getItem("prixTotalBasket"));

//----- Affichage des produits sélectionnés -------------------------
function getProductAdded() {
    if (products == 0 || products === null) {
        cameraInBasket.innerHTML += `<p class="text-center">panier vide</p>`;
    } else {
        products.forEach(product => {
            cameraInBasket.innerHTML += `<article class="cart__item">
    <div class="cart__item__content">
        <div class="cart__item__img">
            <img src="${product.camera.imageUrl}">
        </div>
        <div class="cart__item__content__description d-flex">
            <div class="cart__item__content__title">
                <h5>Produit</h5>
                <p>${product.camera.name}</p>
            </div>
            <div class="cart__item__content__title">
                <h5>Lentille</h5>
                <p>${product.selectedLense}</p>
            </div>
            <div class="cart__item__content__title">
                <h5>Prix</h5>
                <p>${product.totalProductPrice}€</p>
            </div>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : ${product.size} </p>
                <span type="number" class="itemQuantity" name="cameraQuantity" min="1" max="100"/>
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
    </article>`;
        });
    }
}
getProductAdded();

//---- Affichage du prix total du panier ---------
function TotalPriceOfBasket() {

    if (totalPrice == 0 || totalPrice === null) {
        let visible = document.querySelector(".cart__price");
        visible.classList.add("hidden-price");
    } else {
        cameraInBasket.innerHTML += ` <div class="cart__price">
        <p>Total<span> ${totalPrice} </> €</p>
        </div>`;

    }
};
TotalPriceOfBasket();

//------- Suppression d'un produit du panier ----------------------
function deleteProduct() {
    let cancelBtn = document.querySelectorAll(".cart__item__content__settings__delete");
    let priceToDelete;

    for (let i = 0; i < cancelBtn.length; i++) {
        cancelBtn[i].addEventListener("click", (e) => {
            e.preventDefault();

            //Selection de l'élément à supprimer en fonction de son id et sa quantité
            priceToDelete = products[i].totalProductPrice;
            let idDelete = products[i].camera._id;
            let quantityDelete = products[i].camera.size;

            products = products.filter(el => el.camera._id !== idDelete || el.quantityDelete !== quantityDelete);
            totalPriceBasket = totalPrice - priceToDelete;

            localStorage.setItem("prixTotalBasket", totalPriceBasket);
            localStorage.setItem("products", JSON.stringify(products));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        });
    };
};
deleteProduct();

// Formulaire --------------------------------------------------------------//
let inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
let orderSubmit = document.getElementById('order-submit');

// Message d'erreur général formulaire
    const errorDisplay = (tag, message, valid) => {
        const container = document.querySelector("." + tag + "-container");
        const span = document.querySelector("." + tag + "-container > span");

        if (!valid) {
            container.classList.add("error");
            span.textContent = message;
        } else {
            container.classList.remove("error");
            span.textContent = "";
        }
};

// Vérifier la valeur des inputs ---------------------------------------------------//
    const firstNameChecker = (value) => {
        if (value == "") {
            errorDisplay("firstName", "Le champ est vide");
            firstName = "";
        } else {
            errorDisplay("firstName", "", true);
            firstName = value;
        }
    };
    const lastNameChecker = (value) => {
        if (value == "") {
            errorDisplay("lastName", "Le champ est vide");
            lastName = "";
        } else {
            errorDisplay("lastName", "", true);
            lastName = value;
        }
    };
    const addressChecker = (value) => {
        if (!value.match('([0-9a-zA-Z,\. ]*) ?([0-9]{5}) ?')) {
            errorDisplay("address", "L'adresse n'est pas valide");
            address = "";
        } else {
            errorDisplay("address", "", true);
            address = value;
        }
    };
    const cityChecker = (value) => {
        if (value == "") {
            errorDisplay("city", "Le champ est vide");
            city = "";
        } else {
            errorDisplay("city", "", true);
            city = value;
        }
    };
    const emailChecker = (value) => {
        if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
            errorDisplay("email", "Le mail n'est pas valide");
            email = "";
        } else {
            errorDisplay("email", "", true);
            email = value;
        }
    };

//----- Écouter leur valeur -----------------------------------------------------///
    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            switch (e.target.id) {
                case "firstName":
                    firstNameChecker(e.target.value);
                    break;
                case "lastName":
                    lastNameChecker(e.target.value);
                    break;
                case "address":
                    addressChecker(e.target.value);
                    break;
                case "city":
                    cityChecker(e.target.value);
                    break;
                case "email":
                    emailChecker(e.target.value);
                    break;
                default:
                    null;
            }
        });
    });

    //* Création de l'objet général client
function Client(firstName, lastName, address, city, email) {
    (this.firstName = firstName),
    (this.lastName = lastName),
    (this.address = address),
    (this.city = city),
    (this.email = email);
}
//---- Submit evenement -----------------------------------------------------------------------------//
let listProductOrdered = [];

function validOrder() {
if (firstName.value || lastName.value || address.value || city.value || email.value == "") {

    alert('Veuillez renseignez correctement vos informations');

} else {

    for (let i = 0; i < products.length; i++) {
        listProductOrdered.push(products[i].camera._id)
    }
    localStorage.setItem("products", JSON.stringify(listProductOrdered))
    listProductOrdered = localStorage.getItem("products")
    listProductOrdered = JSON.parse(listProductOrdered)

    let newClient = new Client(
        firstName,
        lastName,
        address,
        city,
        email
    );
    //* Fetch POST ----------------------------------------------------------------
    fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contact: {
                    firstName: newClient.firstName,
                    lastName: newClient.lastName,
                    address: newClient.address,
                    city: newClient.city,
                    email: newClient.email,
                },
                products: listProductOrdered,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            localStorage.setItem("orderInfos", JSON.stringify(data))
            document.location = "./confirmation.html";
        })
        .catch((error) => console.log("erreur de type : ", error))
    }

};
