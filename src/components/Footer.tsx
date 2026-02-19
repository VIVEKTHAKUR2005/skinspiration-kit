import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gradient mb-2">Aurelia</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your AI-powered skincare coach for routines, products, and personalized advice.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link to="/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chat</Link>
              <Link to="/skin-analysis" className="text-sm text-muted-foreground hover:text-primary transition-colors">Skin Analysis</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Stay Updated</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-full bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-soft">
                ✉
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 Aurelia. All rights reserved. Made with 💗
        </div>
      </div>
    </footer>
  );
};

export default Footer;
