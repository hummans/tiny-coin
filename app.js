const express = require('express');
const app = express();
const blockchain = require('./blockchain');
const tinycoin = new blockchain();

app.listen(3000, () => {
  console.log('Tiny Coin running...');
  const index = tinycoin.createTransaction('network', 'shankar', 500);
  console.log(tinycoin.mine('shankar'));
  console.log('network transfered 500 tinycoins to address: shankar');
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
  tinycoin.mine('shankar'); //mine after every transaction, for test purpose
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

app.get('/history', (req, res) => {
  const blocks = tinycoin.chain;
  let transactions = [].concat
    .apply([], blocks.map(block => block.transactions))
    .filter(
      transaction =>
        transaction != null &&
        (transaction.sender == req.query.address ||
          transaction.receipient == req.query.address)
    );

  transactions = transactions.map(transaction => ({
    ...transaction,
    createdAt: new Date(transaction.created).toUTCString()
  }));

  res.send(transactions);
});

app.get('/balance', (req, res) => {
  const blocks = tinycoin.chain;
  const transactionsSent = [].concat
    .apply([], blocks.map(block => block.transactions))
    .filter(
      transaction =>
        transaction != null && transaction.sender == req.query.address
    );
  let total_sent = 0;
  transactionsSent.map(transaction => (total_sent += transaction.amount));

  const transactionsReceived = [].concat
    .apply([], blocks.map(block => block.transactions))
    .filter(
      transaction =>
        transaction != null && transaction.receipient == req.query.address
    );

  let total_received = 0;
  transactionsReceived.map(
    transaction => (total_received += transaction.amount)
  );

  const balance = total_received - total_sent;

  res.send(
    `Total balance for address:${req.query.address} is ${balance} tinycoins`
  );
});
