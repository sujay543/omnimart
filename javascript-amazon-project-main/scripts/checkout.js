import { renderOrderSummary} from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadproducts } from "../data/products.js";

loadproducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
})
