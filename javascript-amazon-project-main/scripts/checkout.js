import { renderOrderSummary} from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadProductsfetch } from "../data/products.js";


async function loadpage(){
  await loadProductsfetch();
  renderOrderSummary();
   renderPaymentSummary();
}
loadpage();
// Promise.all([
//   loadProductsfetch()
// ]).then(()=> {
//    renderOrderSummary();
//    renderPaymentSummary();
// })



