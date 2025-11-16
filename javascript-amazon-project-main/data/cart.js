export let cart = JSON.parse(localStorage.getItem('cart'))||[];


function savetoStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function addtoCart(productId)
{ 
  let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });
   const quantitySelector = Number(document.querySelector(
        `.js-quantity-selector-${productId}`
      ).value);
    

    if(matchingItem){
      matchingItem.quantity+=quantitySelector;
    }else{
      cart.push(
        {
          productId: productId,
          quantity: quantitySelector
        })
    } 
    
    savetoStorage();
}

export function removefromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  console.log(cart);
  savetoStorage();
}


