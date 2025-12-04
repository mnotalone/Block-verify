import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Shield, Search, Download, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from '../lib/api';

interface Certificate {
  _id: string;
  studentName: string;
  institution: string;
  certificateHash: string;
  issueDate: string;
}

interface VerifyResult {
  certificate: Certificate;
  blockchain: {
    found: boolean;
    message: string;
  };
  qrCode: string;
}

const VerifyPage = () => {
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hash.trim()) {
      toast({
        title: "Error",
        description: "Please enter a certificate hash",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.verifyCertificate(hash);
      
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: "Success!",
          description: "Certificate verified successfully",
        });
      } else {
        setError(response.message || 'Certificate not found');
        toast({
          title: "Not Found",
          description: "Certificate could not be verified",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError('Failed to verify certificate. Please try again.');
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (result?.certificate?.certificateHash) {
      api.downloadCertificate(result.certificate.certificateHash);
      toast({
        title: "Downloading",
        description: "Certificate PDF is being downloaded",
      });
    }
  };

  const handleCopyHash = () => {
    if (result?.certificate?.certificateHash) {
      navigator.clipboard.writeText(result.certificate.certificateHash);
      toast({
        title: "Copied!",
        description: "Certificate hash copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-dark overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(142,195,127,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(142,195,127,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Verify Certificate
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly verify the authenticity of any certificate on the blockchain
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Form Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Verify Certificate</h2>
                <p className="text-muted-foreground">Enter the certificate hash to verify authenticity</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hash">Certificate Hash</Label>
                  <Input
                    id="hash"
                    placeholder="Enter certificate hash..."
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    className="bg-background/50 border-border focus:border-primary font-mono text-sm"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all group"
                  disabled={loading}
                >
                  {loading ? (
                    "Verifying..."
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Verify Certificate
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="bg-destructive/10 backdrop-blur-md border border-destructive rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold text-destructive mb-2">
                    Verification Failed
                  </h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="bg-primary/10 backdrop-blur-md border border-primary rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Certificate Verified!
                  </h3>
                  <p className="text-muted-foreground">
                    This certificate is authentic and verified on the blockchain
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Student Name</p>
                    <p className="font-semibold text-lg">{result.certificate.studentName}</p>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Institution</p>
                    <p className="font-semibold text-lg">{result.certificate.institution}</p>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                    <p className="font-semibold">
                      {new Date(result.certificate.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Certificate Hash</p>
                    <p className="font-mono text-xs break-all">{result.certificate.certificateHash}</p>
                  </div>

                  {/* Blockchain Status */}
                  <div className={`rounded-lg p-4 ${result.blockchain.found ? 'bg-primary/20' : 'bg-destructive/20'}`}>
                    <div className="flex items-center gap-3">
                      {result.blockchain.found ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-primary">Verified on Blockchain</p>
                            <p className="text-sm text-muted-foreground">{result.blockchain.message}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-destructive">Not Found on Blockchain</p>
                            <p className="text-sm text-muted-foreground">{result.blockchain.message}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                {result.qrCode && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <img src={result.qrCode} alt="QR Code" className="w-48 h-48" />
                      <p className="text-xs text-center text-gray-600 mt-2">Scan to verify</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleDownloadPDF}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={handleCopyHash}
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Hash
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Blockchain Verified</h3>
              <p className="text-sm text-muted-foreground">
                All certificates are stored on immutable blockchain for permanent verification
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Validation</h3>
              <p className="text-sm text-muted-foreground">
                Real-time verification in seconds with complete certificate details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Download Proof</h3>
              <p className="text-sm text-muted-foreground">
                Download verified certificate PDF with QR code for sharing
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VerifyPage;