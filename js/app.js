// load api 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts((data)))
}
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="fs-6 my-3">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p><span>Average rating: ${product.rating.rate}</span> <span><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i> (${product.rating.count})</span></p>
      <h2 class="fs-5">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now border-radius btn btn-dark px-4 text-capitalize">add to cart</button>
      <button onclick="loadDetails('${product.id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="border-radius btn btn-outline-dark px-4 text-capitalize">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// count selected product
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice('price', price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  console.log(getInputValue("price").toFixed(2), getInputValue("delivery-charge").toFixed(2), getInputValue("total-tax").toFixed(2), grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// load single details 
const loadDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => modalDetails(data))
}
// display details to modal
const modalDetails = (details) => {
  console.log(details);
  document.getElementById('modal-details').innerHTML = `
    <div>
      <img class="h-25 w-50 mb-3" src= ${details.image} />
    </div>
    <h5>Product Title: ${details.title}</h5>
    <h6>Price: $ ${details.price}</h6>
  `;
}