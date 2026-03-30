import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Zap, PenTool, Search, BarChart3, Play, Sparkles } from "lucide-react";

type Agent = { name: string; role: string; icon: React.ElementType; status: "idle" | "working" | "completed"; tasks: number };

const agents: Agent[] = [
  { name: "Writer", role: "Content & Email Drafting", icon: PenTool, status: "idle", tasks: 12 },
  { name: "Researcher", role: "Data Gathering & Analysis", icon: Search, status: "working", tasks: 8 },
  { name: "Analyst", role: "Reports & Insights", icon: BarChart3, status: "completed", tasks: 15 },
  { name: "Executor", role: "Task Automation", icon: Play, status: "working", tasks: 23 },
];

const statusColors = { idle: "bg-muted-foreground", working: "bg-primary animate-pulse-glow", completed: "bg-success" };

type Message = { role: "user" | "assistant"; content: string };

const mockResponses = [
  "I've analyzed your request. Based on current data, I recommend prioritizing the Q4 client follow-ups. Shall I assign the Executor agent to handle automated outreach?",
  "The Researcher agent has found 3 relevant market reports. I can have the Analyst summarize key findings and the Writer draft an executive brief. Want me to proceed?",
  "Task created and assigned to the Writer agent. Estimated completion: 15 minutes. I'll notify you when the draft is ready for review.",
];

export default function AICommand() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to the AI Command Center. I'm your central AI orchestrator. You can chat with me directly or assign tasks to specialist agents. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const response = mockResponses[messages.length % mockResponses.length];
    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: response }]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-5rem)] flex gap-6">
      {/* Chat */}
      <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold tracking-wide text-foreground">AI Command Center</h2>
            <p className="text-xs text-muted-foreground">Central AI Orchestrator</p>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary/20 text-foreground border border-primary/20"
                    : "bg-muted/50 text-foreground border border-border/50"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your AI assistant or assign a task to an agent..."
              className="flex-1 bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
            <button onClick={send} className="p-3 bg-primary/20 border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors glow-cyan">
              <Send className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Agents Panel */}
      <div className="hidden lg:flex flex-col w-80 space-y-4">
        <h2 className="font-display text-sm font-semibold tracking-wider text-muted-foreground uppercase">AI Agents</h2>
        {agents.map((agent) => (
          <motion.div
            key={agent.name}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-xl p-4 cursor-pointer hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-glow/20 border border-purple-glow/30 flex items-center justify-center">
                <agent.icon className="w-5 h-5 text-purple-glow" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${statusColors[agent.status]}`} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="capitalize">{agent.status}</span>
              <span>{agent.tasks} tasks completed</span>
            </div>
          </motion.div>
        ))}

        <div className="glass rounded-xl p-4 border-dashed border-primary/30">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium">Assign a task to any agent via chat</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
