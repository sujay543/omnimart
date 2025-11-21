import {cart,removefromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updatecartQuantity } from '../data/cart.js';

let checkouthtml = '';
cart.forEach((cartItem)=>
{
  let matchingItem = 0;
  products.forEach((product) =>
  {
    if(cartItem.productId === product.id)
    {
      matchingItem = product;
    }
  });

  checkouthtml += `
  <div class="cart-item-container js-cart-item-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-update-quantity-${matchingItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary
                  js-update-link" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
});

document.querySelector('.order-summary').innerHTML = checkouthtml;
checkoutQuantity();

document.querySelectorAll('.js-delete-link').forEach((deletelink) => {
  deletelink.addEventListener('click',() => {
    const productId = deletelink.dataset.productId;
    removefromCart(productId);
    checkoutQuantity();
    document.querySelector(`.js-cart-item-${productId}`).remove();
  })
})

function checkoutQuantity(){
let totalqantity = 0;
cart.forEach((item)=>
{
  totalqantity += item.quantity;
})
document.querySelector('.js-return-to-home-link').innerHTML = totalqantity + ' items';
}

document.querySelectorAll('.js-update-link').forEach((updatelink) => {
  updatelink.addEventListener(('click'),()=>{
    const productId = updatelink.dataset.productId;
    const container = document.querySelector(`.js-cart-item-${productId}`);
    container.classList.add('is-editing-quantity');
    container.querySelector('.quantity-label').classList.add('disapear');
    container.querySelector('.update-quantity-link').classList.add('disapear');
  })
})

document.querySelectorAll(`.js-save-link`).forEach((savelink) => {
  savelink.addEventListener('click', ()=> {
  const productId = savelink.dataset.productId;
  const container = document.querySelector(`.js-cart-item-${productId}`);
    container.classList.remove('is-editing-quantity');
    container.querySelector('.quantity-label').classList.remove('disapear');
    container.querySelector('.update-quantity-link').classList.remove('disapear');
    const quantity = Number(container.querySelector('.quantity-input').value);
    if(quantity === 0)
    {
      container.remove();
      removefromCart(productId);
      checkoutQuantity();
      
    }else if(quantity < 10){
    container.querySelector(`.js-update-quantity-${productId}`).innerHTML = quantity;
    updatecartQuantity(productId,quantity);
    checkoutQuantity();
    }
  })
})
