const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  "Enter Input in below Format \n " +
    "<purchase_country>:<optional_passport_number>:<item_type>:<number_of_units_to_be_ordered>:<item_type>:<number_of_units_to_be_ordered>\n" +
    " For eg: UK:B123AB1234567:Gloves:20:Mask:10\n",
  (input) => {
    input = input.split(":");
    let uk_sales = {
      gloves_quantity: 100,
      glove_cost: 100,
      mask_quantity: 100,
      mask_cost: 65,
    };

    let germany_sales = {
      gloves_quantity: 50,
      glove_cost: 150,
      mask_quantity: 100,
      mask_cost: 100,
    };

    const userInputs = {
      purchase_country: input[0].toUpperCase(),
      passport: input.length > 5 ? findRegex(input[1]) : "",
      gloves_quantity: input.length > 5 ? input[3] : input[2],
      mask_quantity: input.length > 5 ? input[5] : input[4],
    };

    let total_cost = 0;
    const total_gloves_quantity =
      uk_sales.gloves_quantity + germany_sales.gloves_quantity;
    const total_mask_quantity =
      uk_sales.mask_quantity + germany_sales.mask_quantity;
    if (
      userInputs.gloves_quantity > total_gloves_quantity ||
      userInputs.mask_quantity > total_mask_quantity
    ) {
      total_cost = "OUT_OF_STOCK";
    } else {
      // Gloves Calculations for UK
      if (userInputs.purchase_country === "UK") {
        const uk = require("./calculateForUk");

        let resultSet = uk.calculateSalesForUK(
          userInputs,
          uk_sales,
          germany_sales,
          "glove_cost",
          "gloves_quantity"
        );
        total_cost = resultSet.total_cost;
        uk_sales = resultSet.uk_sales;
        germany_sales = resultSet.germany_sales;

        // Mask Calculations for UK
        resultSet = uk.calculateSalesForUK(
          userInputs,
          uk_sales,
          germany_sales,
          "mask_cost",
          "mask_quantity"
        );
        total_cost = total_cost + resultSet.total_cost;
        uk_sales = resultSet.uk_sales;
        germany_sales = resultSet.germany_sales;
      }

      // Glove calculation for Germany
      if (userInputs.purchase_country === "GERMANY") {
        const germany = require("./calculateForGermany");
        resultSet = germany.calculateSalesForGermany(
          userInputs,
          uk_sales,
          germany_sales,
          "glove_cost",
          "gloves_quantity"
        );
        total_cost = total_cost + resultSet.total_cost;
        uk_sales = resultSet.uk_sales;
        germany_sales = resultSet.germany_sales;

        // Mask calculation for Germany
        resultSet = germany.calculateSalesForGermany(
          userInputs,
          uk_sales,
          germany_sales,
          "mask_cost",
          "mask_quantity"
        );
        total_cost = total_cost + resultSet.total_cost;
        uk_sales = resultSet.uk_sales;
        germany_sales = resultSet.germany_sales;
      }
    }
    console.log(
      total_cost +
        ":" +
        uk_sales.mask_quantity +
        ":" +
        germany_sales.mask_quantity +
        ":" +
        uk_sales.gloves_quantity +
        ":" +
        germany_sales.gloves_quantity
    );
    function findRegex(input) {
      const ukRegex = /B\d{3}([a-zA-Z0-9]{9})$/g;
      const germanyRegex = /A([a-zA-Z]{2})([a-zA-Z0-9]{9})$/g;
      return ukRegex.test(input)
        ? "UK"
        : germanyRegex.test(input)
        ? "GERMANY"
        : "";
    }

    readline.close();
  }
);
