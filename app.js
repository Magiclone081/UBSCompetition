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
        Order: {
          orderId: 'String',
          version: 'Long',
          orderType: 'OrderType',
          orderSide: 'OrderSide',
          status: 'Status',
          allocations: 'List<Allocation>',
          goodUntilDate: 'LocalDate',
          externalEventOrigin: 'EventOrigin',
          submissionTime: 'Instant?'
        },
        EventOrigin: [ 'Channel', 'ExecutionOrigin' ],
        Channel: [ 'SoulAsia', 'SoulAsiaIM' ],
        ExecutionOrigin: [ 'TradingHeaven', 'Anaconda' ],
        OrderType: [ 'MarketOrderType', 'LimitOrderType' ],
        MarketOrderType: '',
        LimitOrderType: { price: 'Double' },
        OrderSide: [ 'Buy', 'Sell' ],
        Status: [
          'PendingValidation',
          'New',
          'Verifying',
          'PendingExecution',
          'Working',
          'PartiallyFilled',
          'Filled',
          'Cancelled'
        ],
        Allocation: [ 'BigDecimalAllocation', 'LongAllocation', 'EmptyAllocation' ],
        LongAllocation: {
          allocationId: 'AllocationId',
          cif: 'Cif',
          portfolioId: 'PortfolioId',
          quantity: 'LongQuantity',
          clientInstruction: 'ClientInstruction'
        },
        BigDecimalAllocation: {
          allocationId: 'AllocationId',
          cif: 'Cif',
          portfolioId: 'PortfolioId',
          quantity: 'BigDecimalQuantity',
          clientInstruction: 'ClientInstruction'
        },
        EmptyAllocation: '',
        AllocationId: [ 'InternalAllocationId', 'ExternalAllocationId' ],
        InternalAllocationId: { orderId: 'String', portfolioId: 'PortfolioId' },
        Cif: { id: 'String' },
        PortfolioId: { id: 'String' },
        ExternalAllocationId: { id: 'String' },
        Quantity: [ 'LongQuantity', 'BigDecimalQuantity' ],
        LongQuantity: { quantity: 'Long' },
        BigDecimalQuantity: { quantity: 'BigDecimal' },
        ClientInstruction: { solicitation: 'Solicitation', clientContact: 'ClientContact' },
        Solicitation: [ 'EXECUTION', 'NON_EXECUTION' ],
        ClientContact: [ 'WithClientContact', 'WithoutClientContact' ],
        WithClientContact: { channel: 'String', details: 'String', timestamp: 'Instant' },
        WithoutClientContact: ''
      }
    ], 
    statements: [
      // 'Order.',
      // 'Order.order',
      // 'Order.allocations.',
      // 'Status.P',
      // 'MarketOrderType.',
      // '',
      // 'Allocation.',
      // 'Status.PartiallyFilled',
      // 'Status.PartiallyFilld',
      // 'LongAllocation.clientInstruction.solicitation.',
      // 'LongAllocation.clientInstruction.clientContact.',
      // 'Solicitation.EXEC',
      // 'Aioldfjbghoidfjboidfjoi',
      // 'Order.submissionTime.',
      // 'Order.version.',
      'Order.externalEventOrigin.',
      // 'EventSource.',
      // '1234',
      // 'LimitOrderType.price..',
      // 'LimitOrderType.price.123.',
      // 'LimitOrderType.price.123..',
      // 'LimitOrderType.price.123..value'
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
