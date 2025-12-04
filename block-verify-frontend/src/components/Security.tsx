import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database } from "lucide-react";

const Security = () => {
  return (
    <section id="security" className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full h-[500px]">
              {/* Central shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-md border border-primary/30">
                    <Shield className="w-32 h-32 text-primary" />
                  </div>
                  <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl -z-10 animate-glow-pulse" />
                </div>
              </div>

              {/* Orbiting icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-card/80 backdrop-blur-md border border-secondary/30 rounded-xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-secondary" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-card/80 backdrop-blur-md border border-accent/30 rounded-xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-16 h-16 bg-card/80 backdrop-blur-md border border-primary/30 rounded-xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-primary" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Enterprise-Grade{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Security
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Built on battle-tested blockchain technology with military-grade encryption to protect your credentials
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cryptographic Hashing</h3>
                  <p className="text-muted-foreground">
                    SHA-256 algorithm creates unique digital fingerprints that are mathematically impossible to reverse or forge
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Blockchain Immutability</h3>
                  <p className="text-muted-foreground">
                    Once recorded on Ethereum, certificate hashes become permanent and cannot be altered by anyone
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Privacy Protected</h3>
                  <p className="text-muted-foreground">
                    No personal information stored on blockchain. Only hashes are public, ensuring NDPR compliance
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Access Control</h3>
                  <p className="text-muted-foreground">
                    Role-based permissions ensure only authorized personnel can issue or manage certificates
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-primary">100% Secure:</span> Our platform undergoes regular security audits and complies with international data protection standards
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;
