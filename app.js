const express = require('express');
const morganBody = require('morgan-body');
const { LazyDeveloper } = require('./lazy-developer/LazyDeveloper');
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === 'production' });

app.get('/', (req, res) => {
  const jsonMap = {
    "classes": [
      {
        "Order": {
          "orderId": "String",
          "version": "Long",
          "orderType": "OrderType",
          "orderSide": "OrderSide",
          "status": "Status",
          "allocations": "List<Allocation>"
        }
      },
      {
        "OrderType": [
          "MarketOrderType",
          "LimitOrderType"
        ]
      },
      {
        "MarketOrderType": ""
      },
      {
        "LimitOrderType": {
          "price": "Double"
        }
      },
      {
        "OrderSide": [
          "Buy",
          "Sell"
        ]
      },
      {
        "Status": [
          "New",
          "Verifying",
          "Pending",
          "Working",
          "PartiallyFilled",
          "Filled",
          "Cancelled"
        ]
      },
      {
        "Allocation": [
          "LongAllocation",
          "EmptyAllocation"
        ]
      },
      {
        "LongAllocation": {
          "clientName": "String"
        }
      },
      {
        "EmptyAllocation": ""
      }
    ],
    "statements": [
      "Order.",
      "Order.order",
      "Order.allocations.",
      "Status.P",
      "MarketOrderType.",
      "Allocation.",
      "",
      "A",
      "Order..",
      "order.",
      "B",
      "."
    ]
  };
  const output = LazyDeveloper(jsonMap);
  console.log(output);
})


app
  .post("/lazy-developer", (req, res) => {
    const jsonMap = req.body;
    
    const output = LazyDeveloper(jsonMap);
    console.log("jsonMap");
    console.log(jsonMap);
    classes = jsonMap["classes"];
    console.log(Object.values(classes));
    console.log("output");
    console.log(output);
    //res.send(JSON.stringify(output));
    res.send(output);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
