import { renderOrderSummary} from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadProductsfetch } from "../data/products.js";


Promise.all([
  loadProductsfetch()
]).then(()=> {
   renderOrderSummary();
   renderPaymentSummary();
})



