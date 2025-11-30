import { motion } from "framer-motion";
import { Shield, Eye, Zap, Users, QrCode, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Tamper-Proof Verification",
    description: "Once stored on blockchain, certificates cannot be altered or forged, ensuring absolute authenticity.",
  },
  {
    icon: Eye,
    title: "Public Verifiability",
    description: "Anyone can verify credentials instantly without compromising privacy or requiring special permissions.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Verify credentials in seconds. No lengthy manual checks or waiting periods required.",
  },
  {
    icon: Users,
    title: "Easy Integration",
    description: "Simple API and dashboard for universities and employers. No blockchain expertise needed.",
  },
  {
    icon: QrCode,
    title: "QR Code Verification",
    description: "Each certificate gets a unique QR code for instant mobile verification on the go.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Only hashes stored on-chain. No personal information exposed, ensuring NDPR compliance.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BLOCK VERIFY
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade features designed for institutions, employers, and individuals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Value proposition banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trusted {" "}
            </span>
            by Leading Institutions Worldwide
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Join hundreds of universities, colleges, and organizations using blockchain technology to modernize credential verification
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {["🎓 Universities", "🏢 Employers", "📜 Certification Bodies", "👥 HR Teams", " 🤑 and more"].map((item) => (
              <div key={item} className="text-sm font-medium">{item}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
