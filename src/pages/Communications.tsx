import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Send, Clock, CheckCircle2, AlertCircle, User, Search, Plus, FileText } from "lucide-react";

interface ClientFollowUp {
  id: string;
  client: string;
  subject: string;
  status: "pending" | "sent" | "replied";
  date: string;
  priority: "high" | "medium" | "low";
}

interface InternalMessage {
  id: string;
  from: string;
  message: string;
  time: string;
  read: boolean;
}

const followUps: ClientFollowUp[] = [
  { id: "1", client: "Acme Corp", subject: "Contract renewal discussion", status: "pending", date: "2026-03-30", priority: "high" },
  { id: "2", client: "TechVault Inc", subject: "Product demo follow-up", status: "sent", date: "2026-03-29", priority: "medium" },
  { id: "3", client: "GlobalEdge Ltd", subject: "Pricing proposal review", status: "replied", date: "2026-03-28", priority: "high" },
  { id: "4", client: "NovaStar", subject: "Onboarding kickoff", status: "pending", date: "2026-03-30", priority: "medium" },
  { id: "5", client: "DataPulse", subject: "Quarterly business review", status: "sent", date: "2026-03-27", priority: "low" },
];

const messages: InternalMessage[] = [
  { id: "1", from: "Sarah M.", message: "The Q4 report is ready for review. Agent Analyst flagged 2 anomalies.", time: "10 min ago", read: false },
  { id: "2", from: "James K.", message: "Client call with Acme Corp went well. They want to proceed with the enterprise plan.", time: "1 hr ago", read: false },
  { id: "3", from: "AI Executor", message: "Workflow 'Invoice Processing' completed. 24 invoices processed successfully.", time: "2 hrs ago", read: true },
  { id: "4", from: "Lisa T.", message: "Updated the product roadmap with Q2 priorities. Please review by EOD.", time: "3 hrs ago", read: true },
  { id: "5", from: "AI Writer", message: "Draft email templates are ready. 3 templates created for client onboarding.", time: "4 hrs ago", read: true },
];

const statusConfig = {
  pending: { color: "text-warning", bg: "bg-warning/10 border-warning/20", icon: Clock },
  sent: { color: "text-primary", bg: "bg-primary/10 border-primary/20", icon: CheckCircle2 },
  replied: { color: "text-success", bg: "bg-success/10 border-success/20", icon: CheckCircle2 },
};

const templates = [
  { name: "Client Follow-up", desc: "Standard follow-up after initial meeting" },
  { name: "Contract Renewal", desc: "Renewal reminder with updated terms" },
  { name: "Onboarding Welcome", desc: "Welcome email for new clients" },
  { name: "Quarterly Review", desc: "QBR scheduling and agenda" },
];

export default function Communications() {
  const [activeTab, setActiveTab] = useState<"messages" | "followups" | "compose">("messages");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-wide text-foreground">Communication Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage team messages, client follow-ups, and email drafts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-xl p-1 w-fit">
        {([["messages", "Messages", MessageSquare], ["followups", "Client Follow-ups", AlertCircle], ["compose", "Compose Email", Mail]] as const).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === key ? "bg-primary/20 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === "messages" && (
        <div className="glass rounded-xl divide-y divide-border/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors ${!msg.read ? "border-l-2 border-l-primary" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                {msg.from.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground">{msg.from}</span>
                  {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono shrink-0">{msg.time}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "followups" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 border border-border/50 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input placeholder="Search clients..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/30 text-sm text-primary hover:bg-primary/30 transition-colors">
              <Plus className="w-4 h-4" /> New Follow-up
            </button>
          </div>
          <div className="glass rounded-xl divide-y divide-border/50">
            {followUps.map((fu) => {
              const sCfg = statusConfig[fu.status];
              return (
                <div key={fu.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center"><User className="w-4 h-4 text-muted-foreground" /></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{fu.client}</h3>
                    <p className="text-xs text-muted-foreground">{fu.subject}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${sCfg.bg} ${sCfg.color} capitalize`}>{fu.status}</span>
                  <span className="text-xs text-muted-foreground font-mono">{fu.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "compose" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass rounded-xl p-5 space-y-4">
            <div className="space-y-3">
              <input placeholder="To: client@example.com" className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50" />
              <input placeholder="Subject" className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50" />
              <textarea placeholder="Write your message here..." rows={10} className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 resize-none" />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-sm text-primary hover:bg-primary/30 transition-colors glow-cyan">
                <Send className="w-4 h-4" /> Send
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-colors">
                <FileText className="w-4 h-4" /> Save Draft
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase">Email Templates</h2>
            {templates.map((tpl) => (
              <div key={tpl.name} className="glass rounded-xl p-4 cursor-pointer hover:border-primary/20 transition-all">
                <h3 className="text-sm font-semibold text-foreground">{tpl.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tpl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
