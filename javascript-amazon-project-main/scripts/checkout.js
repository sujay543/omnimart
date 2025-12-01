import { renderOrderSummary} from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadproducts } from "../data/products.js";


Promise.all([
  new Promise((resolve) => {
  loadproducts(()=> {
    resolve();
  })
})
]).then(()=> {
   renderOrderSummary();
   renderPaymentSummary();
})



