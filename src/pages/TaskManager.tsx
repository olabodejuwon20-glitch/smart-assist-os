import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Clock, AlertTriangle, CheckCircle2, Bot, User, GripVertical } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Status = "todo" | "in_progress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string;
  assigneeType: "human" | "agent";
  deadline: string;
}

const initialTasks: Task[] = [
  { id: "1", title: "Prepare Q4 Financial Report", description: "Compile and analyze Q4 data", priority: "high", status: "in_progress", assignee: "Analyst", assigneeType: "agent", deadline: "2026-04-02" },
  { id: "2", title: "Draft client onboarding emails", description: "Create email templates", priority: "medium", status: "todo", assignee: "Writer", assigneeType: "agent", deadline: "2026-04-05" },
  { id: "3", title: "Research competitor pricing", description: "Gather pricing data from top 5 competitors", priority: "high", status: "in_progress", assignee: "Researcher", assigneeType: "agent", deadline: "2026-04-03" },
  { id: "4", title: "Update CRM contacts", description: "Import new leads from last event", priority: "low", status: "todo", assignee: "Sarah M.", assigneeType: "human", deadline: "2026-04-07" },
  { id: "5", title: "Deploy new landing page", description: "Push staging to production", priority: "high", status: "done", assignee: "Executor", assigneeType: "agent", deadline: "2026-03-28" },
  { id: "6", title: "Client follow-up calls", description: "Follow up with 8 pending clients", priority: "medium", status: "todo", assignee: "James K.", assigneeType: "human", deadline: "2026-04-04" },
  { id: "7", title: "Generate weekly insights report", description: "AI summary of team performance", priority: "low", status: "done", assignee: "Analyst", assigneeType: "agent", deadline: "2026-03-27" },
  { id: "8", title: "Automate invoice processing", description: "Set up workflow for invoice extraction", priority: "medium", status: "in_progress", assignee: "Executor", assigneeType: "agent", deadline: "2026-04-06" },
];

const columns: { status: Status; label: string; color: string }[] = [
  { status: "todo", label: "To Do", color: "border-muted-foreground/30" },
  { status: "in_progress", label: "In Progress", color: "border-primary/30" },
  { status: "done", label: "Done", color: "border-success/30" },
];

const priorityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/20", icon: AlertTriangle },
  medium: { color: "text-warning", bg: "bg-warning/10 border-warning/20", icon: Clock },
  low: { color: "text-muted-foreground", bg: "bg-muted/50 border-border/50", icon: CheckCircle2 },
};

export default function TaskManager() {
  const [tasks] = useState<Task[]>(initialTasks);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-wide text-foreground">Task Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage tasks across your team and AI agents</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/30 text-sm text-primary hover:bg-primary/30 transition-colors glow-cyan">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="space-y-3">
              <div className={`flex items-center gap-2 pb-2 border-b ${col.color}`}>
                <h2 className="font-display text-xs font-semibold tracking-wider uppercase text-muted-foreground">{col.label}</h2>
                <span className="text-xs bg-muted/50 px-2 py-0.5 rounded-full text-muted-foreground">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {colTasks.map((task) => {
                  const pCfg = priorityConfig[task.priority];
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      whileHover={{ scale: 1.01 }}
                      className="glass rounded-xl p-4 cursor-pointer hover:border-primary/20 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0 mt-0.5" />
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${pCfg.bg} ${pCfg.color} font-medium uppercase tracking-wider`}>
                          {task.priority}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{task.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {task.assigneeType === "agent" ? (
                            <Bot className="w-3.5 h-3.5 text-purple-glow" />
                          ) : (
                            <User className="w-3.5 h-3.5 text-primary" />
                          )}
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">{task.deadline}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
