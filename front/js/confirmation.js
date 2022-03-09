confOrder = document.getElementById("orderId")
confOrder.innerHTML = localStorage.getItem("orderId")
console.log(localStorage.getItem("orderId"))
localStorage.clear();