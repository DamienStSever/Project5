// Récupération des données de la page produits

let items = localStorage.getItem("cart");
let itemJson = JSON.parse(items);



console.table(items)

// Affichage des données des articles

for (let item in itemJson) {
    fetch("http://localhost:3000/api/products/" + itemJson[item].id)
        .then(function (res) {
            if (res.ok) {
                return res.json();

            }
        })


        .then(function (product) {


            let cartItem = document.getElementById("cart__items")

            let article = document.createElement("article")
            cartItem.appendChild(article)
            article.setAttribute("class", "cart__item")
            article.setAttribute("data-id", itemJson[item].id)
            article.setAttribute("data-color", itemJson[item].color)

            let cartItemImg = document.createElement("div")
            article.appendChild(cartItemImg)
            cartItemImg.setAttribute("class", "cart__item__img")

            let img = document.createElement("img")
            img.src = product.imageUrl
            img.alt = product.altTxt
            cartItemImg.appendChild(img)

            let cartItemContent = document.createElement("div")
            cartItemContent.setAttribute("class", "cart__item__content")
            article.appendChild(cartItemContent)

            let cartItemContentDescritpion = document.createElement("div")
            cartItemContentDescritpion.setAttribute("class", "cart__item__content__descritpion")
            cartItemContent.appendChild(cartItemContentDescritpion)

            let nom = document.createElement("h2")
            nom.innerHTML = product.name
            cartItemContentDescritpion.appendChild(nom)

            let color = document.createElement("p")
            color.innerHTML = itemJson[item].color
            cartItemContentDescritpion.appendChild(color)

            let price = document.createElement("p")
            price.innerHTML = product.price
            cartItemContentDescritpion.appendChild(price)

            let cartItemContentSettings = document.createElement("div")
            cartItemContentSettings.setAttribute("class", "cart__item__content__settings")
            cartItemContent.appendChild(cartItemContentSettings)

            let cartItemContentSettingsQuantity = document.createElement("div")
            cartItemContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity")
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)

            let quantity = document.createElement("p")
            quantity.innerHTML = itemJson[item].quantity
            cartItemContentSettingsQuantity.appendChild(quantity)

            let cartItemContentSettingsDelete = document.createElement("div")
            cartItemContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete")
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete)

            let supp = document.createElement("p")
            supp.innerText = "Supprimer"
            supp.setAttribute("class", "deleteItem")
            cartItemContentSettingsDelete.appendChild(supp)

            //  Possibilité du changement de quantité dans le Panier
            let input = document.createElement("input")
            cartItemContentSettingsQuantity.appendChild(input)
            input.setAttribute("type", "number")
            input.setAttribute("min", "1")
            input.setAttribute("max", "100")
            input.setAttribute("name", "itemQuantity")
            input.setAttribute("class", "itemQuantity")

            input.addEventListener("change", function () {
                quantity.innerHTML = this.value 
                
                // Changement de quantité dans le Local Sotrage
                let updateCart = JSON.parse(localStorage.getItem("cart"))
                updateCart[item].quantity = this.value
                localStorage.setItem("cart", JSON.stringify(updateCart))
            })

            // Suppression d un Article

            supp.addEventListener("click", function () {
                console.log(itemJson.indexOf(itemJson[item]));
                alert(" Le produit est supprimé")
                location.reload()
                itemJson.splice(itemJson.indexOf(itemJson[item]), 1)
                localStorage.setItem("cart", JSON.stringify(itemJson))

            })


            // Total des Quantités
            let totalQuantity = []
            for (let i = 0; i < itemJson.length; i++) {
                totalQuantity.push(Number(itemJson[i].quantity))
            }
            let quantityMax = totalQuantity.reduce((a, b) => a + b, 0)
            let totalQ = document.getElementById("totalQuantity")
            totalQ.innerHTML = quantityMax

            //Total Prix
            let totalPrice = []
            console.log(totalPrice);
            let totalPriceByProduct = []
            totalPriceByProduct = [product.price * itemJson[item].quantity]
            console.log(totalPriceByProduct);
            
            totalPrice.push(Number(totalPriceByProduct))

            
            let priceMax = totalPrice.reduce((a, b) => a + b, 0)
            console.log(priceMax);
            let totalP = document.getElementById("totalPrice")
            totalP.innerHTML = priceMax

        })

}


// Passer la commande 
let order = document.getElementById("order")
order.addEventListener("click", function (e) {
    e.preventDefault()
    console.log("order");
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
       
    }
    // Traitement des erreurs dans le formulaire via Regx
    if (/^[\w\W]{1,}$/.test(firstName.value)){
    }
    else{
        window.alert("Erreur Prénom");
    }

    if (/^[\w\W]{1,}$/.test(lastName.value)){
    }
    else{
        window.alert("Erreur Nom")
    }

    if (/^[\w\W ]{1,}$/.test(address.value)){

    }
    else{
        window.alert("Erreur adresse")
    }

    if (/^[\w\W ]{1,}$/.test(city.value)){

    }
    else{
        window.alert("Erreur Ville")
    }
    if (/^[\w]+[@]{1}[\w]+[.]{1}[\w]{1,}$/.test(email.value)){

    }
    else{
        window.alert("Erreur email")
    }

    // Envoi de la demande de commande
    let products = []
    for (let i = 0; i < itemJson.length; i++) {
        products.push(itemJson[i].id)
    }
    console.log(products);
    
    fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          body : JSON.stringify({ contact, products }),
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          }
          

    })
        .then(function (res) {
            console.log(res);
            if (res.ok) {
                return res.json()
            }

        })
        .then(function (order) {
            console.log(order);
            document.getElementById("order")
        })

})

//}
/* .catch (function (err) {
    console.log("Erreur", err)
}) */
