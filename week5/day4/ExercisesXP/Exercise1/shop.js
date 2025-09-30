const products = require('./products.js');

function findProduct(productName) {
  const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
  return product || "Product not found";
}

console.log("Searching for 'Laptop':", findProduct("Laptop"));
console.log("Searching for 'Book':", findProduct("Book"));
console.log("Searching for 'Phone':", findProduct("Phone"));