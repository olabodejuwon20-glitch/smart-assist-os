import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Calendar, Bot, ListTodo, FileText, Zap } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const taskData = [
  { name: "Mon", completed: 18, created: 22 },
  { name: "Tue", completed: 24, created: 19 },
  { name: "Wed", completed: 32, created: 28 },
  { name: "Thu", completed: 28, created: 25 },
  { name: "Fri", completed: 35, created: 30 },
  { name: "Sat", completed: 15, created: 12 },
  { name: "Sun", completed: 10, created: 8 },
];

const agentData = [
  { name: "Writer", tasks: 42, efficiency: 94 },
  { name: "Researcher", tasks: 38, efficiency: 87 },
  { name: "Analyst", tasks: 56, efficiency: 96 },
  { name: "Executor", tasks: 71, efficiency: 91 },
];

const pieData = [
  { name: "Completed", value: 247, color: "hsl(185, 80%, 55%)" },
  { name: "In Progress", value: 43, color: "hsl(270, 60%, 60%)" },
  { name: "To Do", value: 28, color: "hsl(215, 15%, 55%)" },
];

const insights = [
  { text: "Your team completed 30% more tasks this week compared to last week", icon: TrendingUp, color: "text-success" },
  { text: "Agent Analyst has the highest efficiency rate at 96%", icon: Bot, color: "text-primary" },
  { text: "Document processing volume increased by 45% this month", icon: FileText, color: "text-purple-glow" },
  { text: "3 workflows saved an estimated 12 hours of manual work today", icon: Zap, color: "text-warning" },
];

export default function Analytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-wide text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Performance metrics and AI-generated insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Calendar className="w-4 h-4" /> Last 7 days
        </button>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                <insight.icon className={`w-4 h-4 ${insight.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">AI Insight</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Completion Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <h2 className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">Task Completion Trends</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={taskData}>
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185, 80%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(185, 80%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(270, 60%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={11} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(230, 20%, 10%)", border: "1px solid hsl(230, 15%, 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210, 40%, 93%)" }} />
              <Area type="monotone" dataKey="completed" stroke="hsl(185, 80%, 55%)" fillOpacity={1} fill="url(#cyanGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="created" stroke="hsl(270, 60%, 60%)" fillOpacity={1} fill="url(#purpleGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="glass rounded-xl p-5">
          <h2 className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">Task Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(230, 20%, 10%)", border: "1px solid hsl(230, 15%, 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210, 40%, 93%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[10px] text-muted-foreground">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="glass rounded-xl p-5">
        <h2 className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">Agent Performance</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={agentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 18%)" />
            <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={11} />
            <YAxis stroke="hsl(215, 15%, 55%)" fontSize={11} />
            <Tooltip contentStyle={{ background: "hsl(230, 20%, 10%)", border: "1px solid hsl(230, 15%, 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210, 40%, 93%)" }} />
            <Bar dataKey="tasks" fill="hsl(185, 80%, 55%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="efficiency" fill="hsl(270, 60%, 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
