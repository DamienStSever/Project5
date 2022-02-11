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
    .then(function (product) {
        console.table(product);

        let itemImage = document.querySelector(".item__img")
        let img = document.createElement("img")
        img.src = product.imageUrl
        img.alt = product.altTxt
        itemImage.appendChild(img)

        let title = document.getElementById("title")
        title.innerHTML = product.name

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

        let addToCart = document.getElementById("addToCart")

        addToCart.addEventListener("click", () => {
            if (quantity.value > 0 && quantity.value <= 100) {
                let cartProducts = {
                    id: product._id,
                    quantity: document.getElementById("quantity").value,
                    colors: document.getElementById("colors").value,    
                    
                }
                let cartProductsAdd = JSON.parse(localStorage.getItem("cart"))
                
                if (localStorage.getItem("cart"))  {
                    cartProductsAdd.push(cartProducts)
                    let productK = JSON.stringify(cartProductsAdd)
                    localStorage.setItem("cart", productK)
                    if (cartProductsAdd[id] === product._id && cartProductsAdd[colors] === product.colors.value ) {
                       JSON.parse(cartProductsAdd[quantity]) + JSON.parse(quantity.value)
                       localStorage.setItem("cart", JSON.stringify(cartProductsAdd))
                    }

                   /* let cartProductsAdd = JSON.parse(localStorage.getItem("cart"))
                     cartProductsAdd.forEach((cartProduct) => {
                        if (cartProduct[0] === product._id && cartProduct[2] === colors.value ) {
                            cartProduct[1] += quantity.value   
                        
                        }                      
                        
                    })*/
                  
                }
                else{
                cartProductsAdd = []
                cartProductsAdd.push(cartProducts)
                let productK = JSON.stringify(cartProductsAdd)
                localStorage.setItem("cart", productK)
                console.log(cartProducts);
                }
                


            }




        })

    })
    .catch(function (err) {
        console.log("Erreur", err)

    });




