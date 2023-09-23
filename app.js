const express = require('express');
const morganBody = require('morgan-body');
const { LazyDeveloper } = require('./lazy-developer/LazyDeveloper');
const { GreedyMonkey } = require('./greedy-monkey/GreedyMonkey');
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === 'production' });

app.get('/', (req, res) => {
  const inputStr = {
    "w": 100,
    "v": 150,
    "f": [
            [
                    60,
                    70,
                    60
            ],
            [
                    30,
                    80,
                    40
            ],
            [
                    35,
                    70,
                    70
            ]
    ]
}
  const inputMap = inputStr;

  const inputMap2 ={
    "w": 100,
    "v": 150,
    "f": [
      [110, 80, 60],
      [80, 155, 90]
    ]
  }

  const output = GreedyMonkey(inputMap);
  //const output = LazyDeveloper(jsonMap);
  console.log(output);
})

app
  .post("/greedyMonkey", (req, res) => {
    //const jsonMap = JSON.stringify(req.body);
    const jsonMap = req.body;
    const output = GreedyMonkey(jsonMap);
    
    console.log(output);
    //res.send(JSON.stringify(output));
    res.type('txt');
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
