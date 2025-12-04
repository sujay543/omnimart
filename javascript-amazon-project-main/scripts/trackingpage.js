import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsfetch } from '../data/products.js';

const url = new URL(window.location.href);
const ordertimestr = url.searchParams.get('ordertime');
const deliverytimestr = url.searchParams.get('date');

const ordertime = dayjs(ordertimestr);
const deliverytime = dayjs(deliverytimestr);
const currentTime = dayjs();
const passed = currentTime.diff(ordertime);
const total = deliverytime.diff(ordertime);

// progress %
const progress = ((passed / total) * 100).toFixed(2);

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
          <div class="progress-label1">
            Preparing
          </div>
          <div class="progress-label2 ">
            Shipped
          </div>
          <div class="progress-label3">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>`;

   loadProductsfetch().then(()=>{
    if((progress >= 0) &&(progress < 50)){
          document.querySelector('.progress-label1').classList.add('current-status');
        }else if(progress>=50 && progress <= 99){
           document.querySelector('.progress-label2').classList.add('current-status');
        }else{
          document.querySelector('.progress-label3').classList.add('current-status');
        }
      })
        

document.querySelector('.cart-quantity').innerHTML = url.searchParams.get('upquantity');
document.querySelector('.order-tracking').innerHTML = trackinghtml;