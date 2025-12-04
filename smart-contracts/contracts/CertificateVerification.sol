// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateVerification {
    
    struct Certificate {
        string studentName;
        string institution;
        string certificateHash;
        uint256 issueDate;
        address issuer;
        bool exists;
        uint256 timestamp;
    }

    mapping(string => Certificate) public certificates;
    string[] public certificateHashes;
    address public owner;

    event CertificateIssued(
        string indexed certificateHash,
        string studentName,
        string institution,
        address indexed issuer,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function issueCertificate(
        string memory _studentName,
        string memory _institution,
        string memory _certificateHash,
        uint256 _issueDate
    ) public {
        require(!certificates[_certificateHash].exists, "Certificate already exists");

        Certificate memory newCert = Certificate({
            studentName: _studentName,
            institution: _institution,
            certificateHash: _certificateHash,
            issueDate: _issueDate,
            issuer: msg.sender,
            exists: true,
            timestamp: block.timestamp
        });

        certificates[_certificateHash] = newCert;
        certificateHashes.push(_certificateHash);

        emit CertificateIssued(
            _certificateHash,
            _studentName,
            _institution,
            msg.sender,
            block.timestamp
        );
    }

    function verifyCertificate(string memory _certificateHash)
        public
        view
        returns (
            bool exists,
            string memory studentName,
            string memory institution,
            uint256 issueDate,
            address issuer,
            uint256 timestamp
        )
    {
        Certificate memory cert = certificates[_certificateHash];
        return (
            cert.exists,
            cert.studentName,
            cert.institution,
            cert.issueDate,
            cert.issuer,
            cert.timestamp
        );
    }

    function certificateExists(string memory _certificateHash)
        public
        view
        returns (bool)
    {
        return certificates[_certificateHash].exists;
    }

    function getTotalCertificates() public view returns (uint256) {
        return certificateHashes.length;
    }

    function getAllCertificateHashes() public view returns (string[] memory) {
        return certificateHashes;
    }
}
