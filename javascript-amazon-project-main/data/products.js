export  function getProduct(productId){
  let matchingProduct;
  products.forEach((product) => {
    if(product.id == productId){
      matchingProduct = product;
    }
  })
  return matchingProduct;
}




export let products = [];

// export function loadproducts(fun){
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener('load',() => {
//     products = JSON.parse(xhr.response);
//     fun();
//   })
//   xhr.open("GET", "https://supersimplebackend.dev/products");
//   xhr.send();
//   }
  

export function loadProductsfetch(){
  const promise = fetch("https://supersimplebackend.dev/products").then((response)=> {
    return response.json();
  }).then((productsData)=>{
    products = productsData;
  })
  return promise;
}

loadProductsfetch();