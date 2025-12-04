import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Download, Eye, Calendar, Building2, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from '../lib/api';

interface Certificate {
  _id: string;
  studentName: string;
  institution: string;
  certificateHash: string;
  issueDate: string;
  createdAt?: string;
}

const Dashboard = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadCertificates();
  }, []);

  useEffect(() => {
    filterCertificates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, certificates]);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const response = await api.getAllCertificates();
      
      if (response.success && response.data) {
        setCertificates(response.data.data);
        toast({
          title: "Success",
          description: `Loaded ${response.data.count} certificates`,
        });
      }
    } catch (error) {
      console.error('Error loading certificates:', error);
      toast({
        title: "Error",
        description: "Failed to load certificates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCertificates = () => {
    if (!searchTerm.trim()) {
      setFilteredCertificates(certificates);
      return;
    }

    const filtered = certificates.filter(cert => 
      cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateHash.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  };

  const handleDownload = (hash: string) => {
    api.downloadCertificate(hash);
    toast({
      title: "Downloading",
      description: "Certificate PDF is being downloaded",
    });
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied!",
      description: "Certificate hash copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
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
          <div className="absolute inset-0 bg-[linear-gradient(rgba(142,195,127,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(142,195,127,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Certificate Dashboard
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              View and manage all issued certificates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold">{certificates.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Institutions</p>
                  <p className="text-2xl font-bold">
                    {new Set(certificates.map(c => c.institution)).size}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold">
                    {new Set(certificates.map(c => c.studentName)).size}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by student name, institution, or hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border"
              />
            </div>
          </motion.div>

          {/* Certificates List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading certificates...</p>
            </div>
          ) : filteredCertificates.length === 0 ? (
            <div className="text-center py-12 bg-card/50 rounded-xl border border-border">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No certificates found</p>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search' : 'Start by issuing your first certificate'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Student</p>
                          <p className="font-semibold">{cert.studentName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Institution</p>
                          <p className="font-semibold">{cert.institution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Date</p>
                          <p className="font-semibold text-sm">
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">Hash</p>
                      <p 
                        className="font-mono text-xs cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleCopyHash(cert.certificateHash)}
                        title="Click to copy"
                      >
                        {cert.certificateHash.substring(0, 12)}...
                      </p>
                    </div>

                    <div className="md:col-span-2 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(cert.certificateHash)}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.location.href = `/verify?hash=${cert.certificateHash}`}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;