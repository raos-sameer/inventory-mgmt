function calculateSalesForGermany(
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

  const quotient = Math.floor(userInputs[item_type] / 10);
  remaining_cost = remaining_cost + quotient * 10 * uk_sales[param];
  const remainder = userInputs[item_type] % 10;
  remaining_cost = remaining_cost + remainder * germany_sales[param];

  uk_sales[item_type] = uk_sales[item_type] - quotient * 10;
  germany_sales[item_type] = germany_sales[item_type] - remainder;

  if (userInputs.passport === "UK") {
    remaining_cost = remaining_cost + quotient * (transport_cost - discount); //2500 + 2 * 320
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

  remaining = 0;
  remaining_cost = 0;
  transport_cost = 400;
  discount = 80;
  return {
    total_cost,
    uk_sales,
    germany_sales,
  };
}

module.exports = { calculateSalesForGermany };
