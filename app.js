const express = require('express');
const morganBody = require('morgan-body');
const { LazyDeveloper } = require('./lazy-developer/LazyDeveloper');
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === 'production' });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app
  .post("/api/lazy-developer", (req, res) => {
    const jsonMap = req.body;
    const output = LazyDeveloper(jsonMap);
    //console.log(output);
    //res.send(JSON.stringify(output));
    res.json(output);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
