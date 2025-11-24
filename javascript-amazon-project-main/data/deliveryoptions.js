

export let deliveryoptions = [
  {
    id: '1',
    deliverydays: 7,
    deliveryprice: 0
  },
  {
    id: '2',
    deliverydays: 3,
    deliveryprice: 499
  },
  {
    id: '3',
    deliverydays: 1,
    deliveryprice: 999
  }
]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryoptions.forEach((option) => {
    if (option.id === deliveryOptionId){
      deliveryOption = option;
    }
  })
  return deliveryOption || deliveryoptions[0];
}