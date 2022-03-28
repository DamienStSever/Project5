confOrder = document.getElementById("orderId")
let params = new URLSearchParams(document.location.search)
let orderId= params.get("orderId")
confOrder.innerHTML = orderId
localStorage.clear();
