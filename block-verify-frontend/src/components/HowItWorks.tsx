import { motion } from "framer-motion";
import { Upload, Hash, Database, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Certificate",
    description: "Institutions upload academic or professional credentials to the platform",
    color: "primary",
  },
  {
    icon: Hash,
    title: "Generate Hash",
    description: "SHA-256 algorithm creates a unique, tamper-proof digital fingerprint",
    color: "secondary",
  },
  {
    icon: Database,
    title: "Store on Blockchain",
    description: "Hash is recorded on Ethereum blockchain for permanent, immutable storage",
    color: "accent",
  },
  {
    icon: CheckCircle,
    title: "Verify Anytime",
    description: "Anyone can verify authenticity instantly using the certificate or QR code",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple four-step process to ensure your credentials are verified and secure
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/10">
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-${step.color}/10 border border-${step.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 text-${step.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Visual representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 bg-card/50 backdrop-blur-sm border border-border rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 max-w-[calc(100vw-2rem)] sm:max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              <span className="text-[11px] sm:text-sm font-medium">Certificate Hash</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span className="text-[11px] sm:text-sm font-medium">Blockchain</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              <span className="text-[11px] sm:text-sm font-medium">Verified ✓</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
