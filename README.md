# tiny-coin

To install:
cd tiny-coin
npm install

To run blockchain:
node app.js

Sample commands to create transactions:
localhost:3000/new?sender=shankar&recipient=jack&amount=7
localhost:3000/new?sender=jack&recipient=shankar&amount=5
localhost:3000/new?sender=network&recipient=jack&amount=100

Sample commands to check transaction history:
localhost:3000/history?address=shankar
localhost:3000/history?address=jack

Sample commands to check balances:
localhost:3000/balance?address=shankar
localhost:3000/balance?address=jack
