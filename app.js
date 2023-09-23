const express = require('express');
const morganBody = require('morgan-body');
const { LazyDeveloper } = require('./lazy-developer/LazyDeveloper');
const { GreedyMonkey } = require('./greedy-monkey/GreedyMonkey');
const { DigitalColony } = require('./digital-colony/DigitalColony');
const { RailwayBuilder } = require('./railway-builder/RailwayBuilder');
const { ParkingLot } = require('./parking-lot/ParkingLot');
const { PieChart } = require('./pie-chart/PieChart');
const PORT = process.env.PORT || 5000;


const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === 'production' });

app.get('/', (req, res) => {
  // const inputStr = {
  //       w: 863,
  //       v: 843,
  //       f: [
  //         [ 835, 448, 38 ],
  //         [ 430, 1001, 94 ],
  //         [ 248, 68, 46 ],
  //         [ 838, 889, 91 ],
  //         [ 654, 169, 72 ],
  //         [ 696, 165, 32 ],
  //         [ 607, 272, 96 ],
  //         [ 343, 792, 52 ],
  //         [ 938, 605, 5 ],
  //         [ 879, 717, 23 ]
  //       ]
  //     }
  // const inputMap = inputStr;

  const digitalColony = [
    { generations: 10, colony: '5592' },
    // { generations: 10, colony: '7750' },
    // { generations: 50, colony: '6221' }
  ];


  //const output = DigitalColony(digitalColony);

  // const railwayBulder = [
  //   "5, 3, 2, 1, 4",
  //   "3, 3, 4, 1, 2",
  //   "11, 1, 2"
  // ]
  // const output = GreedyMonkey(inputMap);
  //const output = LazyDeveloper(jsonMap);
  const parkingLotInfo = {
    "BusParkingSlots": 1,
    "CarParkingSlots": 0,
    "ParkingCharges": {
      "Bus": 300,
      "Car": 140,
      "Bike": 30
    },
    "Buses": 3,
    "Cars": 2,
    "Bikes": 7
  };
  const output = ParkingLot(parkingLotInfo);
  // console.log(output);
})

app
  .post("/greedyMonkey", (req, res) => {
    const body123 = req.body;
    console.log(body123);
    const output = GreedyMonkey(body123);

    console.log(output);
    //res.send(JSON.stringify(output));
    res.set('Content-Type', 'text/plain');
    res.send(output.toString());
  })

app
  .post("/digital-colony", (req, res) => {
    const reqBody = req.body;
    //console.log(reqBody);
    const output = DigitalColony(reqBody);

    console.log(output);
    output.push("123");
    //res.send(JSON.stringify(output));
    res.send(output);
  })

app
  .post("/railway-builder", (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
    const output = RailwayBuilder(reqBody);

    console.log(output);
    //res.send(JSON.stringify(output));
    res.send(output);
  })

app
  .post("/parking-lot", (req, res) => {
    console.log("/parking-lot");
    const reqBody = req.body;
    console.log(reqBody);
    const output = ParkingLot(reqBody);

    console.log(output);
    //res.send(JSON.stringify(output));
    res.send(output);
  })



  app
  .post("/pie-chart", (req, res) => {
    const jsonMap = req.body;

    const output = PieChart(jsonMap);
    console.log(output);
    //res.send(JSON.stringify(output));
    res.send(output);
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
