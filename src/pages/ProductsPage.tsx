import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const products = [
  { name: "Vitamin C Serum", price: "₹499", desc: "Brightens skin & reduces dark spots.", tags: ["Glow", "Serum"], category: "serum" },
  { name: "Hydrating Moisturizer", price: "₹399", desc: "Deep hydration for dry & sensitive skin.", tags: ["Hydration", "Moisturizer"], category: "moisturizer" },
  { name: "Gentle Cleanser", price: "₹299", desc: "Removes dirt without stripping skin.", tags: ["Daily", "Cleanser"], category: "cleanser" },
  { name: "Sunscreen SPF 50", price: "₹599", desc: "Protects against UV damage & tanning.", tags: ["Protection", "Sunscreen"], category: "sunscreen" },
  { name: "Niacinamide Serum", price: "₹549", desc: "Controls oil, reduces acne marks & pores.", tags: ["Acne", "Serum"], category: "serum" },
  { name: "Night Repair Cream", price: "₹699", desc: "Repairs skin barrier while you sleep.", tags: ["Night", "Moisturizer"], category: "moisturizer" },
  { name: "Salicylic Acid Wash", price: "₹349", desc: "Deep pore cleansing for acne-prone skin.", tags: ["Acne", "Cleanser"], category: "cleanser" },
  { name: "Retinol Night Serum", price: "₹799", desc: "Anti-aging powerhouse for fine lines.", tags: ["Anti-aging", "Serum"], category: "serum" },
  { name: "Collagen Boost Cream", price: "₹899", desc: "Firms skin & reduces sagging with peptides.", tags: ["Anti-aging", "Moisturizer"], category: "moisturizer" },
  { name: "Hyaluronic Acid Serum", price: "₹449", desc: "Plumps skin & reduces fine lines instantly.", tags: ["Hydration", "Serum"], category: "serum" },
  { name: "Anti-Aging Eye Cream", price: "₹649", desc: "Targets crow's feet, dark circles & puffiness.", tags: ["Anti-aging", "Eye Care"], category: "moisturizer" },
];

const categories = ["all", "cleanser", "serum", "moisturizer", "sunscreen"];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [routine, setRoutine] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, filter]);

  const addToRoutine = (name: string) => {
    if (!routine.includes(name)) {
      setRoutine([...routine, name]);
      toast.success(`${name} added to routine!`);
    } else {
      toast.info("Already in your routine");
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Skincare Products 🧴</h1>
          <p className="text-muted-foreground">Explore trending skincare essentials recommended by Aurelia.</p>
        </motion.div>

        {/* Search & Filter */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products... (e.g., serum, sunscreen)"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border shadow-card text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                  filter === cat
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-5 shadow-card hover:-translate-y-1 transition-transform"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{p.name}</h3>
                <span className="text-primary font-bold text-sm">{p.price}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">{p.desc}</p>
              <div className="flex gap-1.5 flex-wrap mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <Button
                onClick={() => addToRoutine(p.name)}
                className="w-full gradient-primary text-primary-foreground rounded-xl font-semibold border-0 shadow-soft"
                size="sm"
              >
                Add to Routine
              </Button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No products found.</p>
        )}

        {/* Routine */}
        {routine.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-14 max-w-xl mx-auto bg-card rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="text-primary" size={20} />
              <h3 className="font-bold text-lg">Your Routine List</h3>
            </div>
            <ul className="space-y-2 mb-4">
              {routine.map((item) => (
                <li key={item} className="flex justify-between items-center bg-secondary rounded-xl px-4 py-2.5 text-sm">
                  <span className="font-medium">{item}</span>
                  <button onClick={() => setRoutine(routine.filter((r) => r !== item))}>
                    <X size={16} className="text-muted-foreground hover:text-destructive" />
                  </button>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              onClick={() => { setRoutine([]); toast.info("Routine cleared"); }}
              className="w-full rounded-xl border-primary/30 text-primary"
            >
              Clear Routine
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
