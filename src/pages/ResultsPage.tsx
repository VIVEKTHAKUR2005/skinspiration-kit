import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Result {
  skinType: string;
  concerns: string;
  budget: string;
  morningRoutine: string[];
  nightRoutine: string[];
  products: string[];
}

const ResultsPage = () => {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("aureliaResult");
    if (data) setResult(JSON.parse(data));
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No results found. Please complete the skin analysis first.</p>
          <Link to="/skin-analysis">
            <Button className="gradient-primary text-primary-foreground rounded-full px-8 border-0">Start Analysis</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Your Personalized Routine 💖</h1>
          <p className="text-muted-foreground">Here's what Aurelia recommends for you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-7 shadow-card space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Skin Type", value: result.skinType },
              { label: "Concerns", value: result.concerns },
              { label: "Budget", value: result.budget },
            ].map((item) => (
              <div key={item.label} className="bg-secondary rounded-xl p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <hr className="border-border" />

          {/* Morning Routine */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sun className="text-primary" size={20} />
              <h3 className="font-bold text-lg">Morning Routine</h3>
            </div>
            <div className="space-y-2">
              {result.morningRoutine.map((item, i) => (
                <div key={item} className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
                  <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Night Routine */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Moon className="text-primary" size={20} />
              <h3 className="font-bold text-lg">Night Routine</h3>
            </div>
            <div className="space-y-2">
              {result.nightRoutine.map((item, i) => (
                <div key={item} className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
                  <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border" />

          {/* Recommended Products */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="text-primary" size={20} />
              <h3 className="font-bold text-lg">Recommended Products</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.products.map((p) => (
                <span key={p} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold">{p}</span>
              ))}
            </div>
          </div>

          <Link to="/products">
            <Button className="w-full gradient-primary text-primary-foreground rounded-xl font-semibold border-0 gap-2 mt-2">
              Browse All Products <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
