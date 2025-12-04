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

const institutionLogos = [
  { name: "Harvard University", initials: "HU", tagline: "Ivy League" },
  { name: "Massachusetts Institute of Technology", initials: "MIT", tagline: "Technology" },
  { name: "Oxford University", initials: "OXF", tagline: "Global Research" },
  { name: "Stanford University", initials: "SU", tagline: "Innovation" },
  { name: "Microsoft", initials: "MS", tagline: "Enterprise" },
  { name: "Amazon Web Services", initials: "AWS", tagline: "Cloud" },
  { name: "IBM", initials: "IBM", tagline: "Security" },
  { name: "Google", initials: "G", tagline: "Scale" },
  { name: "World Education Council", initials: "WEC", tagline: "Accreditation" },
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

        {/* Trusted institutions carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-3">Trusted by leading institutions</p>
            <h3 className="text-2xl md:text-3xl font-bold">Global leaders modernizing their verification</h3>
          </div>

          <div className="relative mt-10 px-4 sm:px-6 lg:px-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-muted/60 via-muted/20 to-transparent z-20" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-muted/60 via-muted/20 to-transparent z-20" aria-hidden="true" />

            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl">
              <div className="flex items-center gap-8 sm:gap-12 px-8 sm:px-12 py-8 animate-carousel will-change-transform">
                {[...institutionLogos, ...institutionLogos].map((institution, index) => (
                  <div
                    key={`${institution.name}-${index}`}
                    className="flex-shrink-0 min-w-[180px] sm:min-w-[220px] lg:min-w-[260px]"
                    aria-label={`${institution.name} ${institution.tagline}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 px-4 sm:px-5 py-4 rounded-2xl border border-border/60 bg-background/80 shadow-sm hover:shadow-lg transition-shadow duration-500">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 via-secondary/15 to-accent/15 border border-primary/20 text-base sm:text-lg font-semibold tracking-wide text-primary">
                        {institution.initials}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{institution.tagline}</p>
                        <h4 className="text-sm sm:text-base font-semibold text-foreground leading-snug max-w-[200px]">
                          {institution.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
