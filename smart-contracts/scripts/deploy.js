const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying CertificateVerification contract...");

  const CertificateVerification = await hre.ethers.getContractFactory("CertificateVerification");
  const contract = await CertificateVerification.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("✅ Contract deployed to:", address);
  console.log("\n📝 Save this address for your frontend:");
  console.log(`CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });