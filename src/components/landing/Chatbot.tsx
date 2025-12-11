import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { CustomButton } from "@/components/custom/buttons/Button";
import { Input } from "@/components/ui/input";
import GlassCard from "@/components/ui/GlassCard";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const botResponses: Record<string, string> = {
  hello: "Hello! How can I help you today?",
  hi: "Hi there! Looking for a job or want to post one?",
  job: "We have thousands of jobs available! Check out our Browse Jobs section to find your perfect match.",
  apply:
    "To apply for a job, simply click on any job listing and hit the Apply button. Easy!",
  employer:
    "Are you an employer? Sign up as an Employer to post jobs and find top talent.",
  help: "I can help you with: Finding jobs, Applying to positions, Posting jobs (for employers), Account questions.",
  default:
    "Thanks for your message! For detailed assistance, please contact our support team or explore our FAQ section below.",
};

const getResponse = (input: string): string => {
  const lowered = input.toLowerCase();
  for (const key of Object.keys(botResponses)) {
    if (lowered.includes(key)) {
      return botResponses[key];
    }
  }
  return botResponses["default"];
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm HireBot. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getResponse(input),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 animate-scale-in">
          <GlassCard className="flex flex-col h-[450px] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">HireBot</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <CustomButton
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </CustomButton>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.isBot
                        ? "bg-muted text-foreground rounded-bl-sm"
                        : "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-background/50"
                />
                <CustomButton
                  onClick={handleSend}
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </CustomButton>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};

export default Chatbot;
