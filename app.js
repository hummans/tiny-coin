const express = require('express');
const app = express();
const blockchain = require('./blockchain');
const tinycoin = new blockchain();

app.listen(3000, () => {
  console.log('Tiny Coin running...');
});

app.get('/', (req, res) => {
  res.send('Tiny Coin 1.0');
});

app.get('/new', (req, res) => {
  const index = tinycoin.createTransaction(
    req.query.sender,
    req.query.recipient,
    parseInt(req.query.amount)
  );
  res.send(`Transaction will be added to Block ${index}`);
});

app.get('/pool', (req, res) => {
  res.send(tinycoin.transaction_pool);
});

app.get('/blocks', (req, res) => {
  res.send(tinycoin.chain);
});

app.get('/mine', (req, res) => {
  res.send(tinycoin.mine('shankar'));
});
