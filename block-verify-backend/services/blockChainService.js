const crypto = require('crypto');
const Block = require('../models/Block');

class BlockchainService {
  
  // Calculate hash for a block
  calculateHash(index, previousHash, timestamp, certificateHash, nonce) {
    const data = index.toString() + previousHash + timestamp.toString() + certificateHash + nonce.toString();
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Create genesis block (first block)
  async createGenesisBlock() {
    try {
      const timestamp = new Date();
      const hash = this.calculateHash(0, '0', timestamp, 'GENESIS_BLOCK', 0);

      const genesisBlock = new Block({
        index: 0,
        timestamp: timestamp,
        certificateHash: 'GENESIS_BLOCK',
        previousHash: '0',
        hash: hash,
        nonce: 0
      });

      await genesisBlock.save();
      console.log('✅ Genesis block created');
      return genesisBlock;
    } catch (error) {
      console.error('Error creating genesis block:', error);
      throw error;
    }
  }

  // Get the latest block
  async getLatestBlock() {
    try {
      const blocks = await Block.find().sort({ index: -1 }).limit(1);
      
      if (blocks.length === 0) {
        return await this.createGenesisBlock();
      }
      
      return blocks[0];
    } catch (error) {
      console.error('Error getting latest block:', error);
      throw error;
    }
  }

  // Mine a new block (proof of work)
  mineBlock(index, previousHash, timestamp, certificateHash, difficulty = 2) {
    let nonce = 0;
    let hash = this.calculateHash(index, previousHash, timestamp, certificateHash, nonce);
    
    const target = '0'.repeat(difficulty);

    while (!hash.startsWith(target)) {
      nonce++;
      hash = this.calculateHash(index, previousHash, timestamp, certificateHash, nonce);
    }

    console.log(`⛏️ Block mined! Hash: ${hash}, Nonce: ${nonce}`);
    return { hash, nonce };
  }

  // Add a new block to the blockchain
  async addBlock(certificateHash) {
    try {
      const latestBlock = await this.getLatestBlock();
      const newIndex = latestBlock.index + 1;
      const timestamp = new Date();

      console.log('⛏️ Mining new block...');
      const { hash, nonce } = this.mineBlock(
        newIndex,
        latestBlock.hash,
        timestamp,
        certificateHash,
        2
      );

      const newBlock = new Block({
        index: newIndex,
        timestamp: timestamp,
        certificateHash: certificateHash,
        previousHash: latestBlock.hash,
        hash: hash,
        nonce: nonce
      });

      await newBlock.save();
      console.log(`✅ Block ${newIndex} added to blockchain`);
      return newBlock;
    } catch (error) {
      console.error('Error adding block:', error);
      throw error;
    }
  }

  // Verify blockchain integrity
  async verifyBlockchain() {
    try {
      const blocks = await Block.find().sort({ index: 1 });

      if (blocks.length === 0) {
        return {
          valid: false,
          message: 'Blockchain is empty'
        };
      }

      for (let i = 1; i < blocks.length; i++) {
        const currentBlock = blocks[i];
        const previousBlock = blocks[i - 1];

        const recalculatedHash = this.calculateHash(
          currentBlock.index,
          currentBlock.previousHash,
          currentBlock.timestamp,
          currentBlock.certificateHash,
          currentBlock.nonce
        );

        if (currentBlock.hash !== recalculatedHash) {
          return {
            valid: false,
            message: `Block ${i} has been tampered with - hash mismatch`
          };
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
          return {
            valid: false,
            message: `Block ${i} is not properly linked to previous block`
          };
        }
      }

      return {
        valid: true,
        message: 'Blockchain is valid and intact'
      };
    } catch (error) {
      console.error('Error verifying blockchain:', error);
      throw error;
    }
  }

  // Get entire blockchain
  async getBlockchain() {
    try {
      return await Block.find().sort({ index: 1 });
    } catch (error) {
      console.error('Error getting blockchain:', error);
      throw error;
    }
  }

  // Verify a specific certificate exists in blockchain
  async verifyCertificateInBlockchain(certificateHash) {
    try {
      const block = await Block.findOne({ certificateHash: certificateHash });
      
      if (!block) {
        return {
          found: false,
          message: 'Certificate not found in blockchain',
          block: null
        };
      }

      return {
        found: true,
        message: 'Certificate found in blockchain',
        block: {
          index: block.index,
          hash: block.hash,
          timestamp: block.timestamp,
          previousHash: block.previousHash
        }
      };
    } catch (error) {
      console.error('Error verifying certificate in blockchain:', error);
      throw error;
    }
  }
}

module.exports = new BlockchainService();