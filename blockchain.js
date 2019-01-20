const crypto = require('crypto');
const axios = require('axios');

class Blockchain {
  constructor() {
    this.chain = [];
    this.transaction_pool = [];
  }

  createBlock = (proof, previousHash) => {
    const block = {
      index: this.chain.length + 1,
      time_stamp: Date.now(),
      transactions: this.transaction_pool,
      proof: proof,
      previous_hash: previousHash
    };
    this.transaction_pool = [];
    this.chain.push(block);
    return block;
  };

  createTransaction = (sender, receipient, amount) => {
    this.transaction_pool.push({
      sender: sender,
      receipient: receipient,
      amount: amount
    });
    return this.previousBlock()['index'] + 1;
  };

  hash = block => {
    const blockStr = JSON.stringify(block);
    const hash = crypto
      .createHmac('sha256', 'secret')
      .update(blockStr)
      .digest('hex');

    return hash;
  };

  previousBlock = () => {
    return this.chain.slice(-1)[0];
  };

  proofOfWork = lastProof => {
    let incrementor = lastProof + 1;
    while (!(incrementor % 9 === 0 && incrementor % lastProof === 0)) {
      incrementor += 1;
    }
    return incrementor;
  };

  mine = minerAddress => {
    const proof = this.proofOfWork(this.previousBlock().proof);
    this.createTransaction('network', minerAddress, 1);
    return this.createBlock(proof, this.hash(this.previousBlock()));
  };

  consensus = async () => {
    const otherChains = await this.discoverPeerChains();
    let longestChain = this.chain;
    for (let chain of otherChains)
      if (chain.length > longestChain.length) longestChain = chain;
    this.chain = longestChain;
  };

  discoverPeerChains = async () => {
    const peerChains = [];
    const peersList = process.env.PEERS.split(',');
    for (let peerUrl of peersList) {
      const peerChain = await axios.get(`${peerUrl}/blocks`);
      peerChains.push(peerChain);
    }
    return peerChains;
  };
}

module.exports = Blockchain;
