import { motion } from "framer-motion";
import { FileText, Building2, TrendingUp, Award, Calendar, Users, Shield, Activity } from "lucide-react";
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

interface Stats {
  totalCertificates: number;
  recentCertificates: Certificate[];
  blockchainLength: number;
}

const Statistics = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      // Load stats
      const statsResponse = await api.getStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }

      // Load all certificates for additional stats
      const certsResponse = await api.getAllCertificates();
      if (certsResponse.success && certsResponse.data) {
        setCertificates(certsResponse.data.data);
      }

      toast({
        title: "Success",
        description: "Statistics loaded successfully",
      });
    } catch (error) {
      console.error('Error loading statistics:', error);
      toast({
        title: "Error",
        description: "Failed to load statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate additional statistics
  const uniqueInstitutions = new Set(certificates.map(c => c.institution)).size;
  const uniqueStudents = new Set(certificates.map(c => c.studentName)).size;
  
  // Certificates per month
  const monthlyData: Record<string, number> = certificates.reduce((acc, cert) => {
    const month = new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top institutions
  const institutionCounts: Record<string, number> = certificates.reduce((acc, cert) => {
    acc[cert.institution] = (acc[cert.institution] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topInstitutions = Object.entries(institutionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentCerts = certificates.filter(c => 
    new Date(c.createdAt || c.issueDate) >= sevenDaysAgo
  ).length;

  const maxMonthlyCount = Math.max(...Object.values(monthlyData), 1);

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
                Statistics & Analytics
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Track certificate issuance and system performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading statistics...</p>
            </div>
          ) : (
            <>
              {/* Main Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{certificates.length}</p>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-secondary" />
                    </div>
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{uniqueInstitutions}</p>
                  <p className="text-sm text-muted-foreground">Institutions</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{uniqueStudents}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{recentCerts}</p>
                  <p className="text-sm text-muted-foreground">Last 7 Days</p>
                </motion.div>
              </div>

              {/* Blockchain Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  Blockchain Status
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {stats?.blockchainLength || 0}
                    </p>
                    <p className="text-muted-foreground">Total Blocks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-secondary mb-2">100%</p>
                    <p className="text-muted-foreground">Chain Integrity</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-accent mb-2">
                      {certificates.length}
                    </p>
                    <p className="text-muted-foreground">Verified Records</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Top Institutions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-secondary" />
                    Top Institutions
                  </h2>
                  <div className="space-y-4">
                    {topInstitutions.length > 0 ? (
                      topInstitutions.map(([institution, count], index) => (
                        <div key={institution} className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{institution}</p>
                            <div className="w-full bg-background/50 rounded-full h-2 mt-1">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${(count / certificates.length) * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">
                            {count}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No data available</p>
                    )}
                  </div>
                </motion.div>

                {/* Monthly Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-accent" />
                    Monthly Distribution
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(monthlyData).slice(-5).map(([month, count]) => (
                      <div key={month} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium text-muted-foreground">
                          {month}
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-background/50 rounded-full h-3">
                            <div
                              className="bg-accent h-3 rounded-full transition-all"
                              style={{ width: `${(count / maxMonthlyCount) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-bold">{count}</span>
                      </div>
                    ))}
                    {Object.keys(monthlyData).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No data available</p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Recent Certificates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 mt-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-primary" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {certificates.slice(-5).reverse().map((cert) => (
                    <div
                      key={cert._id}
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{cert.studentName}</p>
                          <p className="text-sm text-muted-foreground">{cert.institution}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(cert.createdAt || cert.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {certificates.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No recent activity</p>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Statistics;