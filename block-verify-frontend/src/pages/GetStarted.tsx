import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Building2, Users, Shield, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from '../lib/api';

const GetStarted = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    institution: "",
    issueDate: "",
  });
  const { toast } = useToast();

  const steps = [
    {
      number: "01",
      title: "Upload Certificate",
      description: "Enter student and institution details for certificate issuance",
      icon: Building2,
    },
    {
      number: "02",
      title: "Blockchain Verification",
      description: "Certificate is hashed and stored on dual blockchains",
      icon: Shield,
    },
    {
      number: "03",
      title: "Get QR Code",
      description: "Receive QR code and PDF for instant verification",
      icon: CheckCircle2,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.institution || !formData.issueDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.addCertificate(formData);
      
      if (response.success && response.data) {
        setResult(response.data);
        
        toast({
          title: "Success!",
          description: "Certificate issued successfully on blockchain",
        });

        // Reset form
        setFormData({
          studentName: "",
          institution: "",
          issueDate: "",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to issue certificate",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to server. Make sure backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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
                Issue Certificate
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Create blockchain-verified certificates in seconds
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Issue Certificate</h2>
                <p className="text-muted-foreground">Enter certificate details to create blockchain record</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    placeholder="John Doe"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input
                    id="institution"
                    placeholder="University Name"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Issuing Certificate..."
                  ) : (
                    <>
                      Issue Certificate
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

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
                    Certificate Issued Successfully!
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Student Name</p>
                    <p className="font-semibold">{result.certificate.studentName}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Institution</p>
                    <p className="font-semibold">{result.certificate.institution}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Certificate Hash</p>
                    <p className="font-mono text-xs break-all">{result.certificate.certificateHash}</p>
                  </div>
                </div>

                {result.qrCode && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <img src={result.qrCode} alt="QR Code" className="w-48 h-48" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => api.downloadCertificate(result.certificate.certificateHash)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    📄 Download PDF
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(result.certificate.certificateHash);
                      toast({
                        title: "Copied!",
                        description: "Certificate hash copied to clipboard",
                      });
                    }}
                    variant="outline"
                  >
                    📋 Copy Hash
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

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
              <h3 className="text-lg font-semibold mb-2">Secure & Immutable</h3>
              <p className="text-sm text-muted-foreground">
                Blockchain-powered verification ensures tamper-proof credentials
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dual Blockchain</h3>
              <p className="text-sm text-muted-foreground">
                Stored on custom blockchain and Ethereum for maximum security
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Verification</h3>
              <p className="text-sm text-muted-foreground">
                Real-time certificate validation with QR code generation
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;