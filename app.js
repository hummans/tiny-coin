const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Tiny Coin running...');
});

app.get('/', (req, res) => {
  res.send('Tiny Coin 1.0');
});
