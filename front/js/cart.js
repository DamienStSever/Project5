// Récupération des données de la page produits

let items = localStorage.getItem("cart");
let itemJson = JSON.parse(items);



console.table(items)

// Affichage des données des articles

for (let item in itemJson) {
    fetch("http://localhost:3000/api/products/"+ itemJson[item].id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
                
            }
        })

   // for (let item in itemJson) {
        .then(function (product){

        
        let cart__item = document.getElementById("cart__items")

        let article = document.createElement("article")
        cart__item.appendChild(article)
        article.setAttribute("class", "cart__item")
        article.setAttribute("data-id", itemJson[item].id)
        article.setAttribute("data-color", itemJson[item].color)

        let cart__item__img = document.createElement("div")
        article.appendChild(cart__item__img)
        cart__item__img.setAttribute("class", "cart__item__img")

         let img = document.createElement("img")
        img.src = product.imageUrl
        img.alt = product.altTxt
        cart__item__img.appendChild(img) 

        let cart__item__content = document.createElement("div")
        cart__item__content.setAttribute("class", "cart__item__content")
        article.appendChild(cart__item__content)

        let cart__item__content__descritpion = document.createElement("div")
        cart__item__content__descritpion.setAttribute("class", "cart__item__content__descritpion")
        cart__item__content.appendChild(cart__item__content__descritpion)

        let nom = document.createElement("h2")
        nom.innerHTML = product.name
        cart__item__content__descritpion.appendChild(nom)
        console.log(nom)

        let color = document.createElement("p")
        color.innerHTML = itemJson[item].color
        cart__item__content__descritpion.appendChild(color)

        let price = document.createElement("p")
        price.innerHTML = product.price + ("€")
        cart__item__content__descritpion.appendChild(price)

        let cart__item__content__settings = document.createElement("div")
        cart__item__content__settings.setAttribute("class", "cart__item__content__settings")
        cart__item__content.appendChild(cart__item__content__settings)

        let cart__item__content__settings__quantity = document.createElement("div")
        cart__item__content__settings__quantity.setAttribute("class" ,"cart__item__content__settings__quantity")
        cart__item__content__settings.appendChild(cart__item__content__settings__quantity)

        let quantity = document.createElement("p")
        quantity.innerHTML = itemJson[item].quantity
        cart__item__content__settings__quantity.appendChild(quantity)


        let input = document.createElement("input")
        cart__item__content__settings__quantity.appendChild(input)
        input.setAttribute("type", "number")
        input.setAttribute("min", "1")
        input.setAttribute("max", "100")
        input.setAttribute("name", "itemQuantity")
        input.setAttribute("class", "itemQuantity")
        input.addEventListener("change", function () {
            quantity.dataset.thisvalue
        })
        let cart__item__content__settings__delete = document.createElement("div")
        cart__item__content__settings__delete.setAttribute("class", "cart__item__content__settings__delete")
        cart__item__content__settings.appendChild(cart__item__content__settings__delete)

        let supp = document.createElement("p")
        supp.innerText = "Supprimer"
        supp.setAttribute("class", "deleteItem")
        cart__item__content__settings__delete.appendChild(supp)

        
    })
    }        

//}
/* .catch (function (err) {
    console.log("Erreur", err)
}) */