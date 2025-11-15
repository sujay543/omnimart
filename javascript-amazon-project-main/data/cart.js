export let cart = [];

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
}


