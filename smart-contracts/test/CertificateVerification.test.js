const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateVerification Smart Contract", function () {
  let contract;
  let owner;
  let addr1;
  let addr2;

  // Deploy fresh contract before each test
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const CertificateVerification = await ethers.getContractFactory("CertificateVerification");
    contract = await CertificateVerification.deploy();
    await contract.waitForDeployment();
  });

  describe("📋 Deployment Tests", function () {
    it("Should set the correct owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should authorize owner as issuer automatically", async function () {
      expect(await contract.authorizedIssuers(owner.address)).to.equal(true);
    });
  });

  describe("📝 Certificate Issuance Tests", function () {
    it("Should issue a certificate successfully", async function () {
      const hash = "test_certificate_hash_123";
      
      await contract.issueCertificate(
        "Eniola Idowu",
        "Covenant University",
        hash,
        1732377600 // Nov 23, 2024
      );

      const result = await contract.verifyCertificate(hash);
      expect(result.exists).to.equal(true);
      expect(result.studentName).to.equal("Eniola Idowu");
      expect(result.institution).to.equal("Covenant University");
    });

    it("Should reject duplicate certificate hash", async function () {
      const hash = "duplicate_test_hash";
      
      // Issue first certificate
      await contract.issueCertificate("Student 1", "University 1", hash, 1700000000);
      
      // Try to issue duplicate
      await expect(
        contract.issueCertificate("Student 2", "University 2", hash, 1700000000)
      ).to.be.revertedWith("Certificate already exists");
    });

    it("Should reject empty student name", async function () {
      await expect(
        contract.issueCertificate("", "University", "hash", 1700000000)
      ).to.be.reverted;
    });

    it("Should reject empty institution", async function () {
      await expect(
        contract.issueCertificate("Student", "", "hash", 1700000000)
      ).to.be.reverted;
    });

    it("Should reject empty certificate hash", async function () {
      await expect(
        contract.issueCertificate("Student", "University", "", 1700000000)
      ).to.be.reverted;
    });

    it("Should increment total certificate count", async function () {
      await contract.issueCertificate("Student 1", "Uni 1", "hash1", 1700000000);
      expect(await contract.getTotalCertificates()).to.equal(1);
      
      await contract.issueCertificate("Student 2", "Uni 2", "hash2", 1700000000);
      expect(await contract.getTotalCertificates()).to.equal(2);
      
      await contract.issueCertificate("Student 3", "Uni 3", "hash3", 1700000000);
      expect(await contract.getTotalCertificates()).to.equal(3);
    });

    it("Should store correct issuer address", async function () {
      const hash = "issuer_test_hash";
      
      await contract.issueCertificate("Student", "University", hash, 1700000000);
      
      const result = await contract.verifyCertificate(hash);
      expect(result.issuer).to.equal(owner.address);
    });
  });

  describe("🔍 Certificate Verification Tests", function () {
    it("Should return false for non-existent certificate", async function () {
      const result = await contract.verifyCertificate("fake_hash_12345");
      expect(result.exists).to.equal(false);
      expect(result.studentName).to.equal("");
      expect(result.institution).to.equal("");
    });

    it("Should verify existing certificate correctly", async function () {
      const hash = "verification_test_hash";
      const timestamp = 1732377600;
      
      await contract.issueCertificate("John Doe", "Test University", hash, timestamp);
      
      const result = await contract.verifyCertificate(hash);
      expect(result.exists).to.equal(true);
      expect(result.studentName).to.equal("John Doe");
      expect(result.institution).to.equal("Test University");
      expect(result.issueDate).to.equal(timestamp);
    });

    it("Should return correct exists status", async function () {
      const hash1 = "exists_test_1";
      const hash2 = "exists_test_2";
      
      await contract.issueCertificate("Student", "University", hash1, 1700000000);
      
      expect(await contract.certificateExists(hash1)).to.equal(true);
      expect(await contract.certificateExists(hash2)).to.equal(false);
    });
  });

  describe("📊 Certificate Retrieval Tests", function () {
    it("Should return all certificate hashes", async function () {
      await contract.issueCertificate("S1", "U1", "hash1", 1700000000);
      await contract.issueCertificate("S2", "U2", "hash2", 1700000000);
      await contract.issueCertificate("S3", "U3", "hash3", 1700000000);
      
      const hashes = await contract.getAllCertificateHashes();
      expect(hashes.length).to.equal(3);
      expect(hashes[0]).to.equal("hash1");
      expect(hashes[1]).to.equal("hash2");
      expect(hashes[2]).to.equal("hash3");
    });

    it("Should return correct total count", async function () {
      expect(await contract.getTotalCertificates()).to.equal(0);
      
      await contract.issueCertificate("S1", "U1", "h1", 1700000000);
      expect(await contract.getTotalCertificates()).to.equal(1);
      
      await contract.issueCertificate("S2", "U2", "h2", 1700000000);
      expect(await contract.getTotalCertificates()).to.equal(2);
    });

    it("Should return empty array when no certificates exist", async function () {
      const hashes = await contract.getAllCertificateHashes();
      expect(hashes.length).to.equal(0);
    });
  });

  describe("🔐 Events Tests", function () {
    it("Should emit CertificateIssued event with correct parameters", async function () {
      const hash = "event_test_hash";
      const studentName = "Event Test Student";
      const institution = "Event Test University";
      
      await expect(
        contract.issueCertificate(studentName, institution, hash, 1700000000)
      ).to.emit(contract, "CertificateIssued")
       .withArgs(hash, studentName, institution, owner.address);
    });
  });

  describe("💾 Data Integrity Tests", function () {
    it("Should maintain data integrity after multiple operations", async function () {
      // Issue multiple certificates
      const certs = [
        { name: "Alice", inst: "Harvard", hash: "cert1", date: 1700000000 },
        { name: "Bob", inst: "MIT", hash: "cert2", date: 1700000100 },
        { name: "Charlie", inst: "Stanford", hash: "cert3", date: 1700000200 }
      ];

      for (const cert of certs) {
        await contract.issueCertificate(cert.name, cert.inst, cert.hash, cert.date);
      }

      // Verify all certificates
      for (const cert of certs) {
        const result = await contract.verifyCertificate(cert.hash);
        expect(result.exists).to.equal(true);
        expect(result.studentName).to.equal(cert.name);
        expect(result.institution).to.equal(cert.inst);
        expect(result.issueDate).to.equal(cert.date);
      }

      // Check total
      expect(await contract.getTotalCertificates()).to.equal(3);
    });
  });
});