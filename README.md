# tiny-coin

Tiniest Crypto Currency on a Blockchain (Powered by NodeJS and VueJS)

# backend

Backend is served from http://localhost:3000

To install backend:  
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

# frontend

Frontend is served from http://localhost:8080

To install frontend:  
cd vue-frontend  
npm install

To run frontend:  
npm run serve

Usage examples:

1. Login with account name "shankar", there are some dummy transactions.
2. Make a Transfer to "jack"
3. Logout, then login with account name "jack"

# docker

Backend image:  
docker pull shankqr/tiny-coin  
docker run -p 3000:3000 -d shankqr/tiny-coin

Frontend image:  
docker pull shankqr/tiny-coin-frontend  
docker run -p 8080:8080 -d shankqr/tiny-coin-frontend

# docker compose

docker-compose up
