// Récupération de l iD du produit
var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search);
if (search_params.has('id')) {
    var id = search_params.get('id');
}

fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
            ;
        }
    })

    // Affichage des différents éléments du produits
    .then(function (product) {
        console.table(product);

        let itemImage = document.querySelector(".item__img")
        let img = document.createElement("img")
        img.src = product.imageUrl
        img.alt = product.altTxt
        itemImage.appendChild(img)

        let title = document.getElementById("title")
        //title.innerHTML = product.name
        

        let price = document.getElementById("price")
        price.innerHTML = product.price

        let description = document.getElementById("description")
        description.innerHTML = product.description

        let colors = document.getElementById("colors")
        let options = product.colors
        options.forEach(function (option) {
            const opt = document.createElement("option")
            opt.value = option
            opt.text = option
            colors.add(opt, null)
    
        })

        // Possibilite d ajouter les articles dans le panier. ( en choisissant la quantité et la couleur)
        let addToCart = document.getElementById("addToCart")

        addToCart.addEventListener("click", () => {
            if (quantity.value > 0 && quantity.value <= 100 && colors.value != "") {
                let cartProducts = {
                    id: product._id,
                    quantity: document.getElementById("quantity").value,
                    color: document.getElementById("colors").value,

                }
                let cartProductsAdd = JSON.parse(localStorage.getItem("cart"))
                // Si produit existe deja dans le panier mise à jour de la quantité
                if (cartProductsAdd) {
                    let resultFind = cartProductsAdd.find(
                        (sameProduct) => sameProduct.id === cartProducts.id && sameProduct.color === cartProducts.color);
                    if (resultFind) {
                        console.log("mise a jour ");
                        resultFind.quantity = parseInt(resultFind.quantity) + parseInt(cartProducts.quantity);
                        localStorage.setItem("cart", JSON.stringify(cartProductsAdd))
                    }

                    // Ajout d un nouveau produit dans le panier
                    else {
                        console.log("ajout d un nouveau produit");
                        cartProductsAdd.push(cartProducts)
                        localStorage.setItem("cart", JSON.stringify(cartProductsAdd))
                    }

                }
                // creation du panier
                else {
                    console.log("Creation du panier");
                    cartProductsAdd = []
                    cartProductsAdd.push(cartProducts)
                    localStorage.setItem("cart", JSON.stringify(cartProductsAdd))
                }
            }
        })
    })
    .catch(function (err) {
        console.log("Erreur", err)

    });




