import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Briefcase, Building2, CheckCircle2, Shield, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Workspace",
    description: "Set up an institutional account and invite teammates to collaborate.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Configure Templates",
    description: "Customize certificate layouts, branding, and approval workflows.",
    icon: Shield,
  },
  {
    number: "03",
    title: "Start Issuing",
    description: "Upload graduate data and issue blockchain-backed certificates instantly.",
    icon: CheckCircle2,
  },
];

const enablers = [
  {
    title: "Team Onboarding",
    description: "Role-based access controls keep your registry, admissions, and legal teams aligned.",
    icon: Users,
  },
  {
    title: "Launch Checklist",
    description: "Follow a guided rollout plan so every stakeholder knows when to switch to the new flow.",
    icon: Briefcase,
  },
  {
    title: "24/7 Support",
    description: "Our specialists help you migrate data, test integrations, and monitor live issuance.",
    icon: Shield,
  },
];

const GetStarted = () => {
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm"
          >
            Guided onboarding for institutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Launch blockchain verification in days, not months
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            BLOCK VERIFY pairs automation with human guidance so your registry team can issue tamper-proof
            credentials without re-engineering existing workflows.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/issue" className="inline-flex items-center gap-2">
                Issue your first certificate
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary">
              <Link to="/verify">Preview verification portal</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                    <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center bg-card/40 border border-border rounded-3xl p-10"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Your launch plan in a single dashboard</h2>
              <p className="text-muted-foreground">
                From sandbox testing to production cutover, the BLOCK VERIFY control center shows exactly what to do
                next. You can assign tasks, upload historical records, and track live issuance volume in one place.
              </p>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  Provision staging and production API keys with environment-specific templates.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  Define approval checkpoints so registrars, provosts, and QA sign off before issuance.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  Run smart-contract simulations that mirror live issuance and capture audit logs automatically.
                </li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/dashboard">Explore the dashboard demo</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/statistics">View real-time metrics</Link>
                </Button>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/30 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold">Everything you need to launch</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>✔️ Deployment guides for Render, AWS, and on-prem environments.</li>
                <li>✔️ Sample data sets to rehearse issuance with faculty and auditors.</li>
                <li>✔️ Security playbooks covering IAM, key rotation, and disaster recovery.</li>
              </ul>
              <Button asChild variant="outline" className="w-full border-primary/40 text-primary">
                <Link to="/create">Configure certificate templates</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            {enablers.map((item) => (
              <div
                key={item.title}
                className="h-full bg-card/40 border border-border rounded-2xl p-8 space-y-3"
              >
                <item.icon className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to launch your credential modernization?</h2>
          <p className="text-muted-foreground">
            Book a 30-minute onboarding session and we will configure environments, map your data sources, and help
            you publish the first certificate before the call ends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/login">Create an administrator account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary">
              <Link to="/issue">Issue a sample certificate</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;