import {cart,removefromCart,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updatecartQuantity } from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryoptions } from '../data/deliveryoptions.js';


renderOrderSummary();
function renderOrderSummary(){
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

  const optionId = cartItem.deliveryoptionid;
  let deliveryOption;
  deliveryoptions.forEach((option)=>{
    if(option.id === optionId){
      deliveryOption = option;
    }
  })

   const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliverydays, 'days');
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );


    
  checkouthtml += `
  <div class="cart-item-container js-cart-item-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                ${generateDeliveryoptions(matchingItem.id,cartItem)}
                
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

function generateDeliveryoptions(productid,cartItem){
    let html = '';
    deliveryoptions.forEach((options) => {
    const today = dayjs();
    const deliveryDate = today.add(options.deliverydays, 'days');
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    const priceCents = options.deliveryprice=== 0 ? 'FREE' : `$${formatCurrency(options.deliveryprice)} -`

    const isChecked = options.id=== cartItem.deliveryoptionid;

    html += `
     <div class="delivery-option js-delivery-option"
     data-product-id = "${productid}"
     data-delivery-id = "${options.id}">
                  <input type="radio"
                  ${isChecked ? 'checked': ' '}
                    class="delivery-option-input"
                    name="delivery-option-${productid}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceCents} Shipping
                    </div>
                  </div>
                </div>
    `
  })
  return html;
}

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId,deliveryId} = element.dataset;
    updateDeliveryOption(productId,deliveryId);
    renderOrderSummary();
  })
})
}