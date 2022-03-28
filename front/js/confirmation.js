// Reception du numéro de commande et envoi de ce numero à l utilisateur.
confOrder = document.getElementById("orderId")
let params = new URLSearchParams(document.location.search)
let orderId = params.get("orderId")
confOrder.innerHTML = orderId
localStorage.clear();
