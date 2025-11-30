import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Director of Academic Records",
    organization: "State University",
    content: "BLOCK VERIFY has revolutionized how we issue and verify diplomas. The blockchain integration gives our graduates lifelong, tamper-proof credentials.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "HR Manager",
    organization: "TechCorp Industries",
    content: "Verification used to take weeks. Now it's instant. We've eliminated credential fraud entirely and saved thousands in background check costs.",
    rating: 5,
  },
  {
    name: "Aisha Okonkwo",
    role: "Recent Graduate",
    organization: "Business School Alumni",
    content: "Having my degree on blockchain means I can prove my credentials to any employer worldwide instantly. It's incredibly empowering.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
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
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users say about transforming credential verification
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary">{testimonial.organization}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner logos section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">Trusted by leading institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["🏛️ Harvard", "🎓 MIT", "📚 Oxford", "🌟 Stanford", "💼 Google", "🚀 Microsoft"].map((logo) => (
              <div key={logo} className="text-xl font-bold">{logo}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
