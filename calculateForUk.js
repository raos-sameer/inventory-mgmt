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
  let discountPercent = 20 / 100;
  let discount = transport_cost * discountPercent;
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

      // Calculate Transport Cost considering discount
      const quotient = Math.floor(remaining / 10);
      const remainder = userInputs[item_type] % 10;
      if (userInputs.passport === "GERMANY") {
        remaining_cost = remaining_cost + remainder * germany_sales[param];
        remaining_cost =
          remaining_cost + quotient * (transport_cost - discount);
      } else {
        remaining_cost = remaining_cost + quotient * transport_cost;
      }
    }
    // Add Transport Cost to Total Cost
    total_cost = total_cost + remaining_cost;
  }
  return {
    total_cost,
    uk_sales,
    germany_sales,
  };
}

module.exports = { calculateSalesForUK };
