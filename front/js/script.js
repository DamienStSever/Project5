// Récupération des données sur l API

fetch("http://localhost:3000/api/products/")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    // Mise en place des données sur la page index
    .then(function (products) {
        let items = document.getElementById("items")
        for (let i = 0; i < products.length; i++) {
            console.table(products[i]);


            let card = document.createElement("a")
            items.appendChild(card)
            card.href = "./product.html?id=" + products[i]._id


            let article = document.createElement("article")
            card.appendChild(article)

            let h3 = document.createElement("h3")
            h3.setAttribute("clasx", "productName")
            h3.innerHTML = products[i].name
            article.appendChild(h3)

            let p = document.createElement("p")
            p.innerHTML = products[i].description
            p.setAttribute("class", "productDescription")
            article.appendChild(p)

            let img = document.createElement("img")
            img.src = products[i].imageUrl
            img.alt = products[i].altTxt
            article.appendChild(img)
        }


    })
    .catch(function (err) {
        console.log("Erreur", err)

    });
