import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface Message {
  sender: "user" | "aurelia";
  text: string;
}

const quickResponses: Record<string, string> = {
  "What is the best vitamin C serum?":
    "A great Vitamin C serum should have 10-20% L-ascorbic acid with Vitamin E & Ferulic Acid for stability. Look for dark packaging to prevent oxidation. Apply in the morning before sunscreen for best results! 🍊✨",
  "How do I reduce acne?":
    "For acne, use a gentle salicylic acid cleanser, niacinamide serum to control oil, and a lightweight moisturizer. Avoid touching your face and change pillowcases regularly. Consistency is key! 💪",
  "Explain retinol benefits":
    "Retinol (Vitamin A) is an anti-aging superstar! It boosts collagen, reduces fine lines, fades dark spots, and smooths texture. Start with 0.25% concentration and use at night. Always pair with sunscreen! 🌙",
  "Budget friendly moisturizers?":
    "Great budget moisturizers: Cetaphil Moisturizing Cream (~₹300), Neutrogena Hydro Boost (~₹400), and Minimalist Sepicalm Moisturizer (~₹350). All are effective and gentle! 💧",
};

const fallbackResponse = "Great question! For best results, follow a gentle routine: cleanse, treat, moisturize, and always use sunscreen daily. Consistency is the key to glowing skin! 💗";

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "aurelia", text: "Hi! I'm Aurelia 💗 Ask me anything about skincare products or routines." },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { sender: "user", text };
    const response = quickResponses[text] || fallbackResponse;
    const botMsg: Message = { sender: "aurelia", text: response };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const quickTopics = [
    "What is the best vitamin C serum?",
    "How do I reduce acne?",
    "Explain retinol benefits",
    "Budget friendly moisturizers?",
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Chat with Aurelia 💬</h1>
          <p className="text-muted-foreground">Get instant skincare advice powered by AI.</p>
        </motion.div>

        {/* Chat Box */}
        <div ref={chatRef} className="bg-card rounded-2xl shadow-card p-5 h-[400px] overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {quickTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => sendMessage(topic)}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
            >
              {topic.length > 25 ? topic.slice(0, 22) + "..." : topic}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask Aurelia anything..."
            className="flex-1 px-5 py-3 rounded-full bg-card border-2 border-primary/20 text-sm outline-none focus:ring-2 focus:ring-primary/30 shadow-card"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-12 h-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-soft"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
