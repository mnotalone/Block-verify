import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Upload } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Counter animation hook
const useCountUp = (end: number, duration: number = 5) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (nodeRef.current) {
        const value = latest.toFixed(end % 1 !== 0 ? 1 : 0);
        nodeRef.current.textContent = value;
      }
    });
    return unsubscribe;
  }, [springValue, end]);

  return nodeRef;
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-dark overflow-hidden">
        {/* Moving gradient blobs */}
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px]"
          animate={{
            x: [-200, -100, -200],
            y: [-200, -100, -200],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(142,195,127,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(142,195,127,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
              <span className="text-sm font-medium text-primary">Blockchain-Powered Verification</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Secure, Immutable
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Certificate Validation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Upload, hash, and verify academic and professional credentials on the blockchain. 
              Ensure authenticity with tamper-proof, decentralized verification.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/get-started">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all group"
                >
                  <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Get Started
                </Button>
              </Link>
              <Link to="/verify">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Verify Certificate
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <StatsSection />
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]">
              {/* Central certificate card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-80 h-96 bg-card/50 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Verified Certificate</h3>
                        <p className="text-sm text-muted-foreground mb-4">Blockchain Hash: 0x7a8f...</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-primary rounded-full animate-pulse" />
                        </div>
                        <p className="text-xs text-center text-primary font-medium">Status: Verified ✓</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl -z-10 animate-glow-pulse" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 right-10 w-20 h-20 bg-secondary/20 backdrop-blur-md border border-secondary/30 rounded-lg flex items-center justify-center"
              >
                <div className="text-2xl">🔐</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-lg flex items-center justify-center"
              >
                <div className="text-3xl">⛓️</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Stats Section Component with Count-up Animation
const StatsSection = () => {
  const count1Ref = useCountUp(99);
  const count2Ref = useCountUp(500);
  const count3Ref = useCountUp(99.9);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border"
    >
      <div>
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <span ref={count1Ref}>0</span>K+
        </div>
        <div className="text-sm text-muted-foreground">Certificates Verified</div>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-secondary">
          <span ref={count2Ref}>0</span>+
        </div>
        <div className="text-sm text-muted-foreground">Institutions</div>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-accent">
          <span ref={count3Ref}>0</span>%
        </div>
        <div className="text-sm text-muted-foreground">Uptime</div>
      </div>
    </motion.div>
  );
};

export default Hero;
