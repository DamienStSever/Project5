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

            //  Possibilité du chagmeent de quantité dans le Panier
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

            // Suppressio d un Article

            supp.addEventListener("click", function () {

                itemJson.splice(itemJson[item], 1)
                localStorage.setItem("cart", JSON.stringify(itemJson))
                
            })


            // Total des Quantités
            let totalQuantity = []
            for (let i = 0; i < itemJson.length; i++) {
                totalQuantity.push(Number(itemJson[i].quantity))
                console.log(totalQuantity);

            }
            let quantityMax = totalQuantity.reduce((a, b) => a + b, 0)
            let totalQ = document.getElementById("totalQuantity")
            totalQ.innerHTML = quantityMax

            //Total Prix
            let totalPrice = []
            let totalPriceByProduct = []
            totalPriceByProduct = [product.price * itemJson[item].quantity]
            console.log(totalPriceByProduct);
            for (let i = 0; i < itemJson.length; i++) {
                totalPrice.push(product.price * itemJson[i].quantity)
                console.log(totalPrice);
            }
            /* let priceMax = totalPrice.reduce((a, b,) => a + b, 0)
             console.log(priceMax);
            totalP = document.getElementById("totalPrice")
            totalP.innerHTML = priceMax */


            console.log(itemJson[item].id);


        })

}

let order = document.getElementById("order")
order.addEventListener("click", function () {
    let contact = {
        firstname: document.getElementById("firstName").value,
        name: document.getElementById("lastName").value,
        adress: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }

    
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
        
    })
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }

        })
        .then(function () {
            document.getElementById("order")
        })
    
})

//}
/* .catch (function (err) {
    console.log("Erreur", err)
}) */
