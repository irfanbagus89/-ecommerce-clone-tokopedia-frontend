export const getItemPrice = (item) => {
  return item.price != null && item.price !== 0
    ? item.price
    : item.original_price;
};

export const hasDiscount = (item) => {
  return item.price != null && item.price !== 0 && item.price < item.original_price;
};

export const getOriginalPrice = (item) => {
  return hasDiscount(item) ? item.original_price : null;
};
