import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const concerns = ["Acne", "Dryness", "Dark Spots", "Pigmentation", "Redness", "Wrinkles", "Oiliness", "Large Pores"];

const SkinAnalysisPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    skinType: "",
    ageGroup: "",
    concerns: [] as string[],
    allergy: "",
    budget: "",
  });

  const progress = ((step + 1) / 3) * 100;

  const toggleConcern = (c: string) => {
    setForm((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(c) ? prev.concerns.filter((x) => x !== c) : [...prev.concerns, c],
    }));
  };

  const handleSubmit = () => {
    const result = {
      skinType: form.skinType || "Combination",
      concerns: form.concerns.join(", ") || "General care",
      budget: form.budget || "Medium",
      morningRoutine: ["Gentle Cleanser", "Vitamin C Serum", "Moisturizer", "Sunscreen SPF 50"],
      nightRoutine: ["Oil Cleanser", "Treatment Serum", "Night Repair Cream"],
      products: ["Vitamin C Serum", "Hydrating Moisturizer", "Sunscreen SPF 50", "Niacinamide Serum"],
    };
    localStorage.setItem("aureliaResult", JSON.stringify(result));
    navigate("/results");
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Build Your Skin Profile 🌸</h1>
          <p className="text-muted-foreground">Answer a few questions and let Aurelia do the magic.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="h-2.5 bg-muted rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full gradient-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="bg-card rounded-2xl p-7 shadow-card">
          {/* Step 1 */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-primary font-bold text-lg mb-5">Step 1: Skin Basics</h3>

              <label className="text-sm font-semibold block mb-1.5">Skin Type</label>
              <select
                value={form.skinType}
                onChange={(e) => setForm({ ...form, skinType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm mb-4 outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select Skin Type</option>
                {["Oily", "Dry", "Combination", "Normal", "Sensitive"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <label className="text-sm font-semibold block mb-1.5">Age Group</label>
              <select
                value={form.ageGroup}
                onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm mb-5 outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select Age</option>
                {["Under 18", "18 - 25", "26 - 35", "36 - 45", "46+"].map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>

              <Button onClick={() => setStep(1)} className="w-full gradient-primary text-primary-foreground rounded-xl font-semibold border-0 gap-2">
                Next <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-primary font-bold text-lg mb-5">Step 2: Skin Concerns</h3>

              <label className="text-sm font-semibold block mb-2">Select your concerns</label>
              <div className="flex flex-wrap gap-2 mb-6">
                {concerns.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleConcern(c)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      form.concerns.includes(c)
                        ? "gradient-primary text-primary-foreground shadow-soft"
                        : "bg-secondary text-secondary-foreground hover:scale-105"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)} className="flex-1 rounded-xl border-primary/30 text-primary gap-1">
                  <ArrowLeft size={16} /> Back
                </Button>
                <Button onClick={() => setStep(2)} className="flex-1 gradient-primary text-primary-foreground rounded-xl font-semibold border-0 gap-1">
                  Next <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-primary font-bold text-lg mb-5">Step 3: Preferences</h3>

              <label className="text-sm font-semibold block mb-1.5">Allergies / Ingredients to avoid</label>
              <input
                value={form.allergy}
                onChange={(e) => setForm({ ...form, allergy: e.target.value })}
                placeholder="Example: fragrance, parabens"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm mb-4 outline-none focus:ring-2 focus:ring-primary/30"
              />

              <label className="text-sm font-semibold block mb-1.5">Budget Range</label>
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm mb-5 outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select Budget</option>
                {["Low (under ₹500)", "Medium (₹500-1500)", "High (₹1500+)"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl border-primary/30 text-primary gap-1">
                  <ArrowLeft size={16} /> Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1 gradient-primary text-primary-foreground rounded-xl font-semibold border-0">
                  Analyze My Skin ✨
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysisPage;
