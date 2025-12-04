# Smart Contract Deployment Info

## Contract Address
```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Network Configuration
- **Network:** Hardhat Local (Development)
- **RPC URL:** http://127.0.0.1:8545
- **Chain ID:** 1337

## Deployment Date
November 23, 2025

## Contract Functions
- `issueCertificate(studentName, institution, hash, date)` - Add certificate
- `verifyCertificate(hash)` - Verify certificate
- `certificateExists(hash)` - Check if exists
- `getTotalCertificates()` - Get total count
- `getAllCertificateHashes()` - Get all hashes

## Important Notes
- Keep hardhat node running: `npx hardhat node`
- This is a local development network
- For production, deploy to testnet (Sepolia/Goerli)
```

---

## **2. Share with Frontend Team**

Create **`FRONTEND_INTEGRATION.txt`** in your project root:
```
=== BLOCK VERIFY - BACKEND INTEGRATION INFO ===

📍 NODE.JS API
URL: http://localhost:5000
Endpoints:
- POST /api/certificates/add
- GET /api/certificates/verify/:hash
- GET /api/certificates/all
- GET /api/certificates/qr/:hash
- GET /api/blockchain/chain
- GET /api/blockchain/verify

📍 SMART CONTRACT
Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
RPC URL: http://127.0.0.1:8545
Chain ID: 1337
Network: Hardhat Local

⚠️ IMPORTANT:
1. Keep Node.js backend running: npm run dev
2. Keep Hardhat node running: npx hardhat node
3. Both must be running for full functionality