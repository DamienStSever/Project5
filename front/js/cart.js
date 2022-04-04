// Récupération des données de la page produits
let items = localStorage.getItem("cart");
let itemJson = JSON.parse(items);

// Fonction pour permettre la création des divers éléments des articles dans le panier
function createItem(type, element, className) {
    let newItem = document.createElement(type)
    newItem.setAttribute("class", className)
    element.appendChild(newItem)
    return newItem

}
// Affichage des données des articles
let maxPrice = []
let totalQuantity = []
for (let item in itemJson) {
    fetch("http://localhost:3000/api/products/" + itemJson[item].id)
        .then(function (res) {
            if (res.ok) {
                return res.json();

            }
        })

        .catch(function (error) {
            alert("Erreur", error)
        })

        .then(function (product) {
            let cartItem = document.getElementById("cart__items")

            let article = createItem("article", cartItem, "cart__item")
            article.setAttribute("data-id", itemJson[item].id)
            article.setAttribute("data-color", itemJson[item].color)

            let cartItemImg = createItem("div", article, "cart__item__img")

            let img = document.createElement("img")
            img.src = product.imageUrl
            img.alt = product.altTxt
            cartItemImg.appendChild(img)

            let cartItemContent = createItem("div", article, "cart__item__content")

            let cartItemContentDescritpion = createItem("div", cartItemContent, "cart__item__content__description")

            let nom = document.createElement("h2")
            nom.innerHTML = product.name
            cartItemContentDescritpion.appendChild(nom)

            let color = document.createElement("p")
            color.innerHTML = itemJson[item].color
            cartItemContentDescritpion.appendChild(color)

            let price = document.createElement("p")
            price.innerHTML = product.price
            cartItemContentDescritpion.appendChild(price)

            let cartItemContentSettings = createItem("div", cartItemContent, "cart__item__content__settings")

            let cartItemContentSettingsQuantity = createItem("div", cartItemContentSettings, "cart__item__content__settings__quantity")

            let quantity = document.createElement("p")
            quantity.innerHTML = itemJson[item].quantity
            cartItemContentSettingsQuantity.appendChild(quantity)

            let cartItemContentSettingsDelete = createItem("div", cartItemContentSettings, "cart__item__content__settings__delete")

            let supp = createItem("p", cartItemContentSettingsDelete, "deleteItem")
            supp.innerText = "Supprimer"

            //  Possibilité du changement de quantité dans le Panier
            let input = document.createElement("input")
            cartItemContentSettingsQuantity.appendChild(input)
            input.setAttribute("type", "number")
            input.setAttribute("min", "1")
            input.setAttribute("max", "100")
            input.setAttribute("name", "itemQuantity")
            input.setAttribute("class", "itemQuantity")
            input.setAttribute("value", quantity.innerHTML)

            input.addEventListener("change", function () {
                quantity.innerHTML = this.value

                // Changement de quantité dans le Local Storage

                let updateCart = JSON.parse(localStorage.getItem("cart"))
                updateCart[item].quantity = this.value
                localStorage.setItem("cart", JSON.stringify(updateCart))

                // Changement de la quantité total si changement de quantité
                totalQuantity.length = 0
                for (let i = 0; i < itemJson.length; i++) {
                    totalQuantity.push(Number(updateCart[i].quantity))
                }
                let quantityMax = totalQuantity.reduce((a, b) => a + b, 0)
                let totalQ = document.getElementById("totalQuantity")
                totalQ.innerHTML = quantityMax

                //Changement du prix total si changement de quantité 
                updateCart[item].price = product.price * quantity.innerHTML
                maxPrice.splice(item, 1, updateCart[item].price)
                totalPrice = maxPrice.reduce((a, b) => a + b, 0)
                let totalP = document.getElementById("totalPrice")
                totalP.innerHTML = totalPrice
            })

            // Suppression d un Article

            supp.addEventListener("click", function () {

                alert(" Le produit est supprimé")
                itemJson.splice(itemJson.indexOf(itemJson[item]), 1)
                localStorage.setItem("cart", JSON.stringify(itemJson))
                cartItem.removeChild(article)

                // Changement du total Quantité après la suppression
                totalQuantity.length = 0
                for (let i = 0; i < itemJson.length; i++) {
                    totalQuantity.push(Number(itemJson[i].quantity))
                }
                let quantityMax = totalQuantity.reduce((a, b) => a + b, 0)
                let totalQ = document.getElementById("totalQuantity")
                totalQ.innerHTML = quantityMax

                //Changement du total Prix après la suppression
                maxPrice.splice(item, 1, 0)
                totalPrice = maxPrice.reduce((a, b) => a + b, 0)
                let totalP = document.getElementById("totalPrice")
                totalP.innerHTML = totalPrice
            })


            // Total des Quantités
            totalQuantity.push(Number(itemJson[item].quantity))
            let quantityMax = totalQuantity.reduce((a, b) => a + b, 0)
            let totalQ = document.getElementById("totalQuantity")
            totalQ.innerHTML = quantityMax

            //Total Prix
            maxPrice.push(Number(product.price * quantity.innerHTML))
            let totalPrice = maxPrice.reduce((a, b) => a + b, 0)
            let totalP = document.getElementById("totalPrice")
            totalP.innerHTML = totalPrice
            
        })

}
// Fonction pour generer les messages d erreur lors du remplissage de formulaire


function erreur(id, element, texteF) {
    if (element) {
        document.getElementById(id).innerHTML = ""
    }

    else {
        document.getElementById(id).innerHTML = texteF
    }
}
// Passer la commande 
let order = document.getElementById("order")
order.addEventListener("click", function (e) {
    e.preventDefault()
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,

    }
    // Traitement des erreurs dans le formulaire via Regex
    let firstNameRegexp = new RegExp(/^[A-Za-z]{1,}$/)
    let testFirstName = firstNameRegexp.test(firstName.value)
    erreur("firstNameErrorMsg", testFirstName, "Erreur Prénom")

    let lastNameRegexp = new RegExp(/^[\w\W ]{1,}$/)
    let testLastName = lastNameRegexp.test(lastName.value)
    erreur("lastNameErrorMsg", testLastName, "Erreur Nom")

    let addressRegexp = new RegExp(/^[\w\W ]{1,}$/)
    let testAddress = addressRegexp.test(address.value)
    erreur("addressErrorMsg", testAddress, "Erreur Adresse")

    let cityRegexp = new RegExp(/^[\w\W ]{1,}$/)
    let testCity = cityRegexp.test(city.value)
    erreur("cityErrorMsg", testCity, "Erreur Ville")

    let emailRegexp = new RegExp(/^[\w]+[@]{1}[\w]+[.]{1}[\w]{1,}$/)
    let testEmail = emailRegexp.test(email.value)
    erreur("emailErrorMsg", testEmail, "Erreur Email")


    if (testFirstName == false || testLastName == false || testAddress == false || testCity == false || testEmail == false) {
        return false

    }

    // Envoi de la demande de commande
    let products = []
    for (let i = 0; i < itemJson.length; i++) {
        products.push(itemJson[i].id)
    }

    fetch("http://localhost:3000/api/products/order/", {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })

        .then(function (order) {
            document.getElementById("order")
            document.location.href = "confirmation.html?orderId=" + order.orderId
            alert("Merci pour votre commande " + contact.firstName + " " + contact.lastName)
        })
        .catch(function (error) {
            alert("Erreur  manque de données dans la commande", error)
        })
})





