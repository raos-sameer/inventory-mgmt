function calculateSalesForUK(
  userInputs,
  uk_sales,
  germany_sales,
  param,
  item_type
) {
  let remaining = 0;
  let remaining_cost = 0;
  let total_cost = 0;
  let transport_cost = 400;
  let discount = 80;
  if (userInputs[item_type] <= uk_sales[item_type]) {
    total_cost = total_cost + userInputs[item_type] * uk_sales[param];
    uk_sales[item_type] = uk_sales[item_type] - userInputs[item_type];
  } else {
    remaining = userInputs[item_type] - uk_sales[item_type]; // remaining to be shipped from other country
    total_cost = total_cost + uk_sales[item_type] * uk_sales[param]; //cost of entire lot of item_type
    uk_sales[item_type] = 0;
    if (remaining <= germany_sales[item_type]) {
      remaining_cost = remaining_cost + remaining * germany_sales[param];
      germany_sales[item_type] = germany_sales[item_type] - remaining;
      if (userInputs.passport === "GERMANY") {
        const quotient = Math.floor(remaining / 10);
        const remainder = userInputs[item_type] % 10;
        remaining_cost = remaining_cost + remainder * germany_sales[param];
        remaining_cost =
          remaining_cost + quotient * (transport_cost - discount);
      } else {
        const quotient = Math.floor(remaining / 10);
        remaining_cost = remaining_cost + quotient * transport_cost;
      }
    }
    total_cost = total_cost + remaining_cost;
    remaining = 0;
    remaining_cost = 0;
    transport_cost = 400;
    discount = 80;
  }
  return {
    total_cost,
    uk_sales,
    germany_sales,
  };
}

module.exports = { calculateSalesForUK };
