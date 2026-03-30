import { motion } from "framer-motion";
import {
  ListTodo,
  FileText,
  MessageSquare,
  Workflow,
  TrendingUp,
  Bot,
  Zap,
  Clock,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const kpis = [
  { label: "Tasks Completed", value: "247", change: "+12%", icon: ListTodo, color: "text-primary" },
  { label: "Docs Processed", value: "1,834", change: "+8%", icon: FileText, color: "text-purple-glow" },
  { label: "Messages Sent", value: "562", change: "+23%", icon: MessageSquare, color: "text-success" },
  { label: "Active Workflows", value: "18", change: "+3", icon: Workflow, color: "text-warning" },
];

const quickActions = [
  { label: "New Task", icon: Plus, href: "/tasks", color: "from-primary/20 to-primary/5 border-primary/20" },
  { label: "Upload Doc", icon: FileText, href: "/documents", color: "from-purple-glow/20 to-purple-glow/5 border-purple-glow/20" },
  { label: "AI Chat", icon: Bot, href: "/ai-command", color: "from-success/20 to-success/5 border-success/20" },
  { label: "New Workflow", icon: Workflow, href: "/workflows", color: "from-warning/20 to-warning/5 border-warning/20" },
];

const activities = [
  { text: "Agent Analyst completed quarterly report analysis", time: "2 min ago", icon: Bot },
  { text: "New document uploaded: Q4 Financial Summary.pdf", time: "15 min ago", icon: FileText },
  { text: "Task 'Client onboarding flow' moved to Done", time: "1 hr ago", icon: ListTodo },
  { text: "Workflow 'Email Follow-up' triggered for 12 clients", time: "2 hrs ago", icon: Workflow },
  { text: "Agent Writer drafted 3 email templates", time: "3 hrs ago", icon: Bot },
  { text: "System performance report generated", time: "5 hrs ago", icon: TrendingUp },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={item} className="glass rounded-2xl p-6 glow-cyan">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-wide text-foreground glow-text-cyan">
              Welcome back, Admin
            </h1>
            <p className="text-muted-foreground mt-1 max-w-xl">
              Your AI agents processed 47 tasks overnight. 3 workflows need your attention and 5 client follow-ups are pending.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} variants={item} className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              <span className="text-xs text-success font-mono flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div variants={item} className="lg:col-span-1 space-y-3">
          <h2 className="font-display text-sm font-semibold tracking-wider text-muted-foreground uppercase">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className={`glass rounded-xl p-4 flex flex-col items-center gap-2 bg-gradient-to-b ${action.color} border hover:scale-[1.03] transition-all duration-200`}
              >
                <action.icon className="w-6 h-6 text-foreground" />
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Agent Status */}
          <div className="glass rounded-xl p-4 mt-4">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">AI Agents</h3>
            {[
              { name: "Writer", status: "Idle", color: "bg-muted-foreground" },
              { name: "Researcher", status: "Working", color: "bg-primary animate-pulse-glow" },
              { name: "Analyst", status: "Completed", color: "bg-success" },
              { name: "Executor", status: "Working", color: "bg-warning animate-pulse-glow" },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-purple-glow" />
                  <span className="text-sm text-foreground">{agent.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${agent.color}`} />
                  <span className="text-xs text-muted-foreground">{agent.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={item} className="lg:col-span-2">
          <h2 className="font-display text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3">Recent Activity</h2>
          <div className="glass rounded-xl divide-y divide-border/50">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{activity.time}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
