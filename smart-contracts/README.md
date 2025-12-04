# BLOCK VERIFY - Blockchain Certificate Authentication

## Project Structure
```
block-verify-project/
├── block-verify-backend/     # Node.js API + MongoDB
└── smart-contracts/           # Solidity Smart Contract
```

## Running the Backend

### Node.js Backend
```bash
cd block-verify-backend
npm run dev
# Runs on http://localhost:5000
```

### Smart Contract Blockchain
```bash
cd smart-contracts
npx hardhat node
# In another terminal:
npx hardhat run scripts/deploy.js --network localhost
# Contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Blockchain:** Solidity, Hardhat, Ethereum
- **Libraries:** Mongoose, PDFKit, QRCode, Ethers.js

## Contract Address
```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Team
- Backend: [Your Name]
- Frontend: [Teammate Name]
```

---

## **5. Quick Reference - Sticky Note Style**

Save this in **`QUICK_START.txt`**:
```
QUICK START GUIDE
=================

1. Start Node.js Backend:
   cd block-verify-backend
   npm run dev

2. Start Blockchain:
   cd smart-contracts
   npx hardhat node
   
3. Deploy Contract (one time):
   npx hardhat run scripts/deploy.js --network localhost

CONTRACT ADDRESS:
0x5FbDB2315678afecb367f032d93F642f64180aa3

RPC: http://127.0.0.1:8545
API: http://localhost:5000
```

---

## 📊 Summary - Where to Save:

✅ **`smart-contracts/CONTRACT_INFO.md`** - Full contract details  
✅ **`FRONTEND_INTEGRATION.txt`** - For frontend team  
✅ **`block-verify-backend/.env`** - For backend integration  
✅ **`README.md`** - Project documentation  
✅ **`QUICK_START.txt`** - Quick reference  

---

## 🎯 What to Send Your Frontend Teammate:

Send them the **`FRONTEND_INTEGRATION.txt`** file or just this info:
```
Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
RPC URL: http://127.0.0.1:8545
Chain ID: 1337
API URL: http://localhost:5000