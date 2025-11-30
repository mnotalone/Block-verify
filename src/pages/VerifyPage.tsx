import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Upload, Search, Shield, XCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

type VerificationStatus = "idle" | "verifying" | "verified" | "invalid" | "not-found";

const VerifyPage = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle");
  const [certificateId, setCertificateId] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationStatus("verifying");
    
    // Simulate verification process
    setTimeout(() => {
      // Random result for demo
      const results: VerificationStatus[] = ["verified", "invalid", "not-found"];
      setVerificationStatus(results[Math.floor(Math.random() * results.length)]);
    }, 2000);
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "verified":
        return <CheckCircle2 className="w-16 h-16 text-primary" />;
      case "invalid":
        return <XCircle className="w-16 h-16 text-destructive" />;
      case "not-found":
        return <AlertCircle className="w-16 h-16 text-accent" />;
      default:
        return <Shield className="w-16 h-16 text-muted-foreground" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case "verifying":
        return { title: "Verifying...", message: "Checking blockchain records..." };
      case "verified":
        return { 
          title: "Certificate Verified ✓", 
          message: "This certificate is authentic and has not been tampered with." 
        };
      case "invalid":
        return { 
          title: "Invalid Certificate", 
          message: "This certificate hash does not match blockchain records." 
        };
      case "not-found":
        return { 
          title: "Certificate Not Found", 
          message: "No matching certificate found in the blockchain." 
        };
      default:
        return { title: "Ready to Verify", message: "Enter a certificate ID or upload a file" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
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
              Instant blockchain-powered verification for academic and professional credentials
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12"
          >
            {/* Input Form */}
            <form onSubmit={handleVerify} className="space-y-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="certificateId">Certificate ID</Label>
                <div className="relative">
                  <Input
                    id="certificateId"
                    placeholder="Enter certificate ID (e.g., CERT-2024-001234)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="bg-background/50 border-border focus:border-primary pr-12"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or upload file</span>
                </div>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, PNG, or JPG (Max 10MB)
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all"
                disabled={verificationStatus === "verifying"}
              >
                {verificationStatus === "verifying" ? "Verifying..." : "Verify Certificate"}
              </Button>
            </form>

            {/* Verification Result */}
            {verificationStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`border-2 rounded-xl p-8 text-center ${
                  verificationStatus === "verified"
                    ? "border-primary bg-primary/5"
                    : verificationStatus === "invalid"
                    ? "border-destructive bg-destructive/5"
                    : verificationStatus === "not-found"
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card/50"
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-4"
                >
                  {getStatusIcon()}
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">{getStatusMessage().title}</h3>
                <p className="text-muted-foreground mb-6">{getStatusMessage().message}</p>

                {verificationStatus === "verified" && (
                  <div className="space-y-4 text-left bg-background/50 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Certificate ID:</span>
                      <span className="font-mono text-sm">{certificateId || "CERT-2024-001234"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Blockchain Hash:</span>
                      <span className="font-mono text-sm">0x7a8f9b2c...</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Issue Date:</span>
                      <span className="text-sm">January 15, 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Institution:</span>
                      <span className="text-sm">Example University</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm text-primary font-semibold">✓ Verified</span>
                    </div>
                  </div>
                )}

                {verificationStatus !== "verifying" && (
                  <Button
                    onClick={() => {
                      setVerificationStatus("idle");
                      setCertificateId("");
                    }}
                    variant="outline"
                    className="mt-6"
                  >
                    Verify Another Certificate
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Tamper-proof verification using blockchain technology
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Instant</h3>
              <p className="text-sm text-muted-foreground">
                Real-time verification results in seconds
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Transparent</h3>
              <p className="text-sm text-muted-foreground">
                Public blockchain records ensure transparency
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VerifyPage;
