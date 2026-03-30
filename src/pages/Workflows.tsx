import { useState } from "react";
import { motion } from "framer-motion";
import { Workflow, Play, Pause, RotateCcw, Clock, CheckCircle2, Zap, Plus, ArrowRight, Bot } from "lucide-react";

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  steps: number;
  lastRun: string;
  runs: number;
  agents: string[];
}

const workflows: WorkflowItem[] = [
  { id: "1", name: "Client Onboarding", description: "Automated new client setup: welcome email, CRM entry, task creation, and first meeting scheduling", status: "active", steps: 6, lastRun: "2 hrs ago", runs: 142, agents: ["Writer", "Executor"] },
  { id: "2", name: "Document Review Pipeline", description: "AI reads uploaded documents, extracts key data, generates summary, and routes for human approval", status: "active", steps: 4, lastRun: "30 min ago", runs: 89, agents: ["Researcher", "Analyst"] },
  { id: "3", name: "Weekly Report Generation", description: "Automatically compiles KPIs, team metrics, and AI insights into a formatted report every Monday", status: "completed", steps: 5, lastRun: "1 day ago", runs: 52, agents: ["Analyst", "Writer"] },
  { id: "4", name: "Email Follow-up Sequence", description: "3-step follow-up sequence for clients who haven't responded within 48 hours", status: "active", steps: 3, lastRun: "1 hr ago", runs: 234, agents: ["Writer", "Executor"] },
  { id: "5", name: "Invoice Processing", description: "Extract data from invoices, validate amounts, update accounting system, and flag discrepancies", status: "paused", steps: 5, lastRun: "3 hrs ago", runs: 67, agents: ["Analyst", "Executor"] },
  { id: "6", name: "Competitor Monitoring", description: "Daily scan of competitor websites and news, summarize changes, and alert on significant updates", status: "active", steps: 4, lastRun: "6 hrs ago", runs: 180, agents: ["Researcher", "Analyst"] },
];

const statusConfig = {
  active: { color: "text-success", bg: "bg-success/10 border-success/20", icon: Play, label: "Active" },
  paused: { color: "text-warning", bg: "bg-warning/10 border-warning/20", icon: Pause, label: "Paused" },
  completed: { color: "text-primary", bg: "bg-primary/10 border-primary/20", icon: CheckCircle2, label: "Completed" },
};

export default function Workflows() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedWf = workflows.find((w) => w.id === selected);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-wide text-foreground">Workflow Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Automate business processes with AI-powered workflows</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/30 text-sm text-primary hover:bg-primary/30 transition-colors glow-cyan">
          <Plus className="w-4 h-4" /> New Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Workflows", value: workflows.filter((w) => w.status === "active").length, color: "text-success" },
          { label: "Total Runs", value: workflows.reduce((s, w) => s + w.runs, 0).toLocaleString(), color: "text-primary" },
          { label: "Hours Saved", value: "324", color: "text-purple-glow" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          {workflows.map((wf) => {
            const sCfg = statusConfig[wf.status];
            return (
              <motion.div
                key={wf.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelected(wf.id)}
                className={`glass rounded-xl p-5 cursor-pointer transition-all ${selected === wf.id ? "border-primary/40 glow-cyan" : "hover:border-primary/20"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Workflow className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{wf.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 max-w-md">{wf.description}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${sCfg.bg} ${sCfg.color} flex items-center gap-1`}>
                    <sCfg.icon className="w-3 h-3" /> {sCfg.label}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {wf.steps} steps</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {wf.lastRun}</span>
                  <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> {wf.runs} runs</span>
                  <span className="flex items-center gap-1"><Bot className="w-3 h-3" /> {wf.agents.join(", ")}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {selectedWf && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden xl:block w-80 glass rounded-xl p-5 space-y-4 h-fit sticky top-0">
            <h2 className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase">Workflow Steps</h2>
            <h3 className="text-sm font-semibold text-foreground">{selectedWf.name}</h3>
            <div className="space-y-3">
              {Array.from({ length: selectedWf.steps }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {i + 1}
                  </div>
                  <span className="text-xs text-muted-foreground flex-1">Step {i + 1}</span>
                  {i < selectedWf.steps - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground/30" />}
                </div>
              ))}
            </div>
            <div className="pt-2 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary/20 border border-primary/30 text-xs text-primary hover:bg-primary/30 transition-colors">
                <Play className="w-3 h-3" /> Run
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl glass text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Pause className="w-3 h-3" /> Pause
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
