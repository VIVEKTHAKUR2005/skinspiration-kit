import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, ClipboardList, Heart, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-skincare.jpg";

const stats = [
  { icon: <CheckCircle size={16} />, label: "Science-Backed" },
  { icon: <CheckCircle size={16} />, label: "10,000+ Products" },
  { icon: <CheckCircle size={16} />, label: "Personalized" },
];

const steps = [
  {
    icon: <Camera className="text-primary" size={28} />,
    title: "Upload Image",
    desc: "Upload your selfie to detect acne, dryness, spots and more.",
  },
  {
    icon: <ClipboardList className="text-primary" size={28} />,
    title: "Answer Questions",
    desc: "Tell us your skin type, concerns, allergies and budget.",
  },
  {
    icon: <Heart className="text-primary" size={28} />,
    title: "Get Routine",
    desc: "Aurelia recommends products + morning/night routine.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="container px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Sparkles size={14} /> AI-Powered Skincare Intelligence
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                Meet <span className="text-gradient">Aurelia</span>
                <br />
                Your Personal Skin Coach
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                Discover personalized skincare powered by AI. Get expert recommendations,
                analyze your skin, and build the perfect routine tailored just for you.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/skin-analysis">
                  <Button size="lg" className="gradient-primary text-primary-foreground rounded-full px-8 font-semibold shadow-soft border-0 gap-2">
                    Start Your Journey <ArrowRight size={16} />
                  </Button>
                </Link>
                <a href="#how">
                  <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold border-primary/30 text-primary hover:bg-secondary">
                    How It Works
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {stats.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 bg-card shadow-card px-4 py-2 rounded-full text-sm font-medium text-foreground"
                  >
                    {s.icon} {s.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="rounded-3xl overflow-hidden shadow-soft">
                <img
                  src={heroImage}
                  alt="Aurelia AI Skincare - glowing skin with botanical elements"
                  className="w-full h-[480px] object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card shadow-card rounded-2xl p-4 animate-float">
                <p className="text-sm font-semibold">✨ 98% accuracy</p>
                <p className="text-xs text-muted-foreground">Skin analysis AI</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              How It Works <span className="text-gradient">✨</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Simple steps to get your perfect skincare routine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card rounded-2xl p-7 shadow-card hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Scan CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 max-w-lg mx-auto bg-card rounded-2xl p-8 shadow-card text-center"
          >
            <h3 className="font-bold text-xl mb-2">Try Quick Skin Scan</h3>
            <p className="text-muted-foreground text-sm mb-5">
              Ready to discover your ideal skincare routine? Start your analysis now.
            </p>
            <Link to="/skin-analysis">
              <Button className="gradient-primary text-primary-foreground rounded-full px-8 font-semibold shadow-soft border-0 gap-2">
                Start Analysis <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
