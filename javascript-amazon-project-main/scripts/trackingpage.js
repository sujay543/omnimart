import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const url = new URL(window.location.href);

const trackinghtml = 
`<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${ dayjs(url.searchParams.get('date')).format('dddd D')}
        </div>

        <div class="product-info">
         ${url.searchParams.get('name')}
        </div>

        <div class="product-info">
          Quantity: ${url.searchParams.get('quantity')}
        </div>

        <img class="product-image" src="${url.searchParams.get('image')}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`
;
document.querySelector('.cart-quantity').innerHTML = url.searchParams.get('upquantity');
document.querySelector('.order-tracking').innerHTML = trackinghtml;