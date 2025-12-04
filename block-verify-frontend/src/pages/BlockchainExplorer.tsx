import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Box, Link2, Hash, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from '../lib/api';

interface Block {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;
  nonce: number;
}

const BlockchainExplorer = () => {
  const [blockchain, setBlockchain] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    setLoading(true);
    try {
      const response = await api.getBlockchain();
      
      if (response.success && response.data) {
        setBlockchain(response.data.chain);
        toast({
          title: "Success",
          description: `Loaded ${response.data.length} blocks`,
        });
      }
    } catch (error) {
      console.error('Error loading blockchain:', error);
      toast({
        title: "Error",
        description: "Failed to load blockchain data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyBlockchain = async () => {
    setVerifying(true);
    try {
      const response = await api.verifyBlockchain();
      
      if (response.success && response.data) {
        setIsValid(response.data.valid);
        toast({
          title: response.data.valid ? "Valid!" : "Invalid!",
          description: response.data.message,
          variant: response.data.valid ? "default" : "destructive",
        });
      }
    } catch (error) {
      console.error('Error verifying blockchain:', error);
      toast({
        title: "Error",
        description: "Failed to verify blockchain",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
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
                Blockchain Explorer
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              View the complete blockchain and verify its integrity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Explorer Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats and Verify */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Box className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Blocks</p>
                  <p className="text-2xl font-bold">{blockchain.length}</p>
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
                  <Link2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chain Status</p>
                  <p className="text-xl font-bold">
                    {isValid === null ? 'Unknown' : isValid ? 'Valid' : 'Invalid'}
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
                  <Hash className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latest Block</p>
                  <p className="text-2xl font-bold">
                    #{blockchain.length > 0 ? blockchain[blockchain.length - 1].index : 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center"
            >
              <Button
                onClick={verifyBlockchain}
                disabled={verifying}
                className="w-full bg-primary hover:bg-primary/90 h-full"
              >
                <Shield className="w-5 h-5 mr-2" />
                {verifying ? 'Verifying...' : 'Verify Chain'}
              </Button>
            </motion.div>
          </div>

          {/* Validity Status */}
          {isValid !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className={`p-6 rounded-xl border ${isValid ? 'bg-primary/10 border-primary' : 'bg-destructive/10 border-destructive'}`}>
                <div className="flex items-center gap-4">
                  {isValid ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-xl font-bold text-primary">Blockchain is Valid</p>
                        <p className="text-muted-foreground">All blocks are properly linked and verified</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-destructive" />
                      <div>
                        <p className="text-xl font-bold text-destructive">Blockchain is Invalid</p>
                        <p className="text-muted-foreground">Chain integrity has been compromised</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Blockchain Blocks */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading blockchain...</p>
            </div>
          ) : blockchain.length === 0 ? (
            <div className="text-center py-12 bg-card/50 rounded-xl border border-border">
              <Box className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No blocks found</p>
              <p className="text-muted-foreground">The blockchain is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blockchain.map((block, index) => (
                <motion.div
                  key={block.index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Box className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Block #{block.index}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {new Date(block.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">Block Hash</p>
                          <p className="font-mono text-xs break-all text-primary">{block.hash}</p>
                        </div>

                        <div className="bg-background/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2">Previous Hash</p>
                          <p className="font-mono text-xs break-all text-secondary">
                            {block.previousHash === '0' ? 'Genesis Block' : block.previousHash}
                          </p>
                        </div>
                      </div>

                      <div className="bg-background/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-2">Block Data</p>
                        <pre className="font-mono text-xs overflow-x-auto">
                          {JSON.stringify(block.data, null, 2)}
                        </pre>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="bg-background/50 rounded-lg px-4 py-2">
                          <span className="text-muted-foreground">Nonce:</span>
                          <span className="ml-2 font-mono font-bold">{block.nonce}</span>
                        </div>
                        {index === 0 && (
                          <div className="bg-primary/20 text-primary rounded-lg px-4 py-2 font-semibold">
                            Genesis Block
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {index < blockchain.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent"></div>
                    </div>
                  )}
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

export default BlockchainExplorer;