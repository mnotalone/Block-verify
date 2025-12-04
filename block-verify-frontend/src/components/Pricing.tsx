import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free Trial",
    price: "0",
    period: "14 days",
    description: "Perfect for testing the platform",
    features: [
      "Up to 50 certificates",
      "Basic verification",
      "Email support",
      "Dashboard access",
      "API documentation",
    ],
    highlighted: false,
  },
  {
    name: "Institution",
    price: "299",
    period: "month",
    description: "For universities and colleges",
    features: [
      "Unlimited certificates",
      "Priority verification",
      "24/7 Premium support",
      "Advanced analytics",
      "Custom branding",
      "Bulk upload",
      "API access",
      "QR code generation",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Special",
    description: "For large organizations",
    features: [
      "Everything in Institution",
      "Dedicated account manager",
      "Custom integration",
      "SLA guarantee",
      "White-label solution",
      "Advanced security features",
      "Training sessions",
      "Custom contracts",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {plan.highlighted && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div
                className={`relative h-full bg-card/50 backdrop-blur-sm border rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? "border-primary shadow-xl shadow-primary/20 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Custom" && <span className="text-2xl font-bold">$</span>}
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/50"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Employer verification pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-secondary/10 via-accent/10 to-primary/10 border border-secondary/20 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Employer Verification</h3>
            <p className="text-muted-foreground">
              Pay-per-verification model for recruiters and HR teams
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">$2</div>
              <div className="text-sm text-muted-foreground">per verification</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">$1.50</div>
              <div className="text-sm text-muted-foreground">bulk (100+ verifications)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Free</div>
              <div className="text-sm text-muted-foreground">first 10 verifications</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
