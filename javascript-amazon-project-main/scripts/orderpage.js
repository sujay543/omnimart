import { orders } from "../data/order.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsfetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let orderpagehtml = '';

function renderOrders(){
orders.forEach((element)=> {
  
  let productshtml = '';
 element.products.forEach( (product)=>{
        const matchingproduct =  getProduct(product.productId);
            const dateString = dayjs(product.estimatedDeliveryTime).format('dddd D');
      
        
          productshtml +=`<div class="product-image-container">
              <img src="${matchingproduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingproduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dateString}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?date=${product.estimatedDeliveryTime}&name=${matchingproduct.name}&quantity=${product.quantity}&image=${matchingproduct.image}&upquantity=${orders.length}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
            

 }) 
  const dateString = dayjs(element.orderTime).format('dddd D');
 orderpagehtml += ` <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(element.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${element.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productshtml}
          </div>
        </div>`
})
  document.querySelector('.js-orders-grid').innerHTML = orderpagehtml;
  document.querySelector('.cart-quantity').innerHTML = orders.length;
}

loadProductsfetch().then(() => {renderOrders()});

// '[{"id":"b97d560a-89b1-48bd-9f09-bc8311264ace",
// "orderTime":"2025-12-03T23:55:48.589Z",
// "totalCostCents":2089,
// "products":[{"productId":"54e0eccd-8f36-462b-b68a-8182611d9add",
//   "quantity":1,"estimatedDeliveryTime":"2025-12-10T23:55:48.589Z",
//   "variation":null}]},
//   {"id":"d0cde11b-d6a9-42f9-a359-d2ce0c350931",
//     "orderTime":"2025-12-03T23:54:58.939Z",
//     "totalCostCents":2089,
//     "products":[{"productId":"54e0eccd-8f36-462b-b68a-8182611d9add",
//       "quantity":1,
//       "estimatedDeliveryTime":"2025-12-10T23:54:58.939Z",
//       "variation":null}]}]'