function calculateSalesForGermany(
  userInputs,
  uk_sales,
  germany_sales,
  param,
  item_type
) {
  let remaining_cost = 0;
  let total_cost = 0;
  let transport_cost = 400;
  let discountPercent = 20 / 100;
  let discount = transport_cost * discountPercent;

  const quotient = Math.floor(userInputs[item_type] / 10);
  remaining_cost = remaining_cost + quotient * 10 * uk_sales[param];
  const remainder = userInputs[item_type] % 10;
  remaining_cost = remaining_cost + remainder * germany_sales[param];

  uk_sales[item_type] = uk_sales[item_type] - quotient * 10;
  germany_sales[item_type] = germany_sales[item_type] - remainder;

  // Calculate Transport Cost considering discount
  if (userInputs.passport === "UK") {
    remaining_cost = remaining_cost + quotient * (transport_cost - discount);
  } else {
    remaining_cost = remaining_cost + quotient * transport_cost;
  }
  const tempComparison = germany_sales[param] * userInputs[item_type];
  if (tempComparison < remaining_cost) {
    remaining_cost = tempComparison;
    uk_sales[item_type] = uk_sales[item_type] + quotient * 10;
    germany_sales[item_type] =
      germany_sales[item_type] + remainder - userInputs[item_type];
  }
  total_cost = total_cost + remaining_cost;
  return {
    total_cost,
    uk_sales,
    germany_sales,
  };
}

module.exports = { calculateSalesForGermany };
