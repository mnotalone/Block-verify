// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API Response Types
export interface Certificate {
  _id: string;
  studentName: string;
  institution: string;
  certificateHash: string;
  issueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlockchainBlock {
  blockIndex: number;
  blockHash: string;
  previousHash: string;
  timestamp: string;
  nonce: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AddCertificateResponse {
  certificate: Certificate;
  blockchain: BlockchainBlock;
  qrCode: string;
  verificationURL: string;
  pdfGenerated: boolean;
}

export interface VerifyCertificateResponse {
  certificate: Certificate;
  blockchain: {
    found: boolean;
    message: string;
    block?:  BlockchainBlock;  
  };
  qrCode: string;
}

// API Functions
export const api = {
  // Add Certificate
  async addCertificate(data: {
    studentName: string;
    institution: string;
    issueDate: string;
  }): Promise<ApiResponse<AddCertificateResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/certificates/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw error;
    }
  },

  // Verify Certificate
  async verifyCertificate(hash: string): Promise<ApiResponse<VerifyCertificateResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/certificates/verify/${hash}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            message: 'Certificate not found',
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying certificate:', error);
      throw error;
    }
  },

  // Get All Certificates
  async getAllCertificates(): Promise<ApiResponse<{ count: number; data: Certificate[] }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/certificates/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },

  // Get QR Code
  async getQRCode(hash: string): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/certificates/qr/${hash}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error fetching QR code:', error);
      throw error;
    }
  },

  // Download Certificate PDF
  downloadCertificate(hash: string) {
    window.open(`${API_BASE_URL}/api/certificates/download/${hash}`, '_blank');
  },

  // Get Blockchain Chain
  async getBlockchain(): Promise<ApiResponse<{ length: number; chain:  BlockchainBlock[] }>>  {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blockchain/chain`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching blockchain:', error);
      throw error;
    }
  },

  // Verify Blockchain Integrity
  async verifyBlockchain(): Promise<ApiResponse<{ valid: boolean; message: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blockchain/verify`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying blockchain:', error);
      throw error;
    }
  },

  // Get Statistics
  async getStats(): Promise<ApiResponse<{
  totalCertificates: number;
  recentCertificates: Certificate[];
  blockchainLength: number;
}>> { 

    try {
      const response = await fetch(`${API_BASE_URL}/api/certificates/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },
};