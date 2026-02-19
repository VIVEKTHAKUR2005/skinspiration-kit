import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login feature coming soon! 💗");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back 🔐</h1>
          <p className="text-muted-foreground">Sign in to continue your skincare journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-7 shadow-card space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="text-sm font-semibold block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl font-semibold border-0 shadow-soft">
            Login
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-3">
            Don't have an account?{" "}
            <Link to="/skin-analysis" className="text-primary font-semibold hover:underline">
              Get Started
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
