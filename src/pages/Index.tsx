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
  { label: "Tasks Completed", value: "247", change: "+12%", icon: ListTodo },
  { label: "Docs Processed", value: "1,834", change: "+8%", icon: FileText },
  { label: "Messages Sent", value: "562", change: "+23%", icon: MessageSquare },
  { label: "Active Workflows", value: "18", change: "+3", icon: Workflow },
];

const quickActions = [
  { label: "New Task", icon: Plus, href: "/tasks" },
  { label: "Upload Doc", icon: FileText, href: "/documents" },
  { label: "AI Chat", icon: Bot, href: "/ai-command" },
  { label: "New Workflow", icon: Workflow, href: "/workflows" },
];

const activities = [
  { text: "Agent Analyst completed quarterly report analysis", time: "2 min ago", icon: Bot },
  { text: "New document uploaded: Q4 Financial Summary.pdf", time: "15 min ago", icon: FileText },
  { text: "Task 'Client onboarding flow' moved to Done", time: "1 hr ago", icon: ListTodo },
  { text: "Workflow 'Email Follow-up' triggered for 12 clients", time: "2 hrs ago", icon: Workflow },
  { text: "Agent Writer drafted 3 email templates", time: "3 hrs ago", icon: Bot },
  { text: "System performance report generated", time: "5 hrs ago", icon: TrendingUp },
];

const agents = [
  { name: "Writer", status: "Idle", color: "#808080" },
  { name: "Researcher", status: "Working", color: "#00AA00" },
  { name: "Analyst", status: "Completed", color: "#0000AA" },
  { name: "Executor", status: "Working", color: "#00AA00" },
];

// Win2k GroupBox component
function GroupBox({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <fieldset
      style={{
        border: "none",
        margin: 0,
        padding: 0,
        ...style,
      }}
    >
      {/* Title bar mimicking groupbox */}
      <div
        style={{
          background: "linear-gradient(to right, #000080, #1084D0)",
          color: "#FFFFFF",
          fontSize: "11px",
          fontWeight: 700,
          padding: "2px 6px",
          marginBottom: "0",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          border: "2px solid",
          borderColor: "#808080 #FFFFFF #FFFFFF #808080",
          backgroundColor: "var(--win-face)",
          padding: "6px",
        }}
      >
        {children}
      </div>
    </fieldset>
  );
}

export default function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "'Tahoma', 'MS Sans Serif', Arial, sans-serif", fontSize: "11px" }}>

      {/* Welcome panel */}
      <GroupBox title="System Status — AIOS Enterprise Dashboard">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#000080", marginBottom: "4px" }}>
              Welcome back, Administrator
            </div>
            <div style={{ color: "#333", maxWidth: "600px", lineHeight: "1.5" }}>
              Your AI agents processed 47 tasks overnight. 3 workflows need your attention and 5 client follow-ups are pending.
            </div>
          </div>
          <div
            className="win-sunken flex items-center gap-1 px-2"
            style={{ fontSize: "11px", height: "22px", backgroundColor: "#FFF", whiteSpace: "nowrap" }}
          >
            <Clock className="w-3 h-3" style={{ color: "#808080" }} />
            <span style={{ fontFamily: "'Courier New', monospace" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </GroupBox>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className="win-window" style={{ padding: 0, overflow: "hidden" }}>
            {/* tiny title */}
            <div style={{
              backgroundColor: "#000080",
              color: "#FFF",
              fontSize: "10px",
              padding: "1px 4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}>
              <kpi.icon className="w-3 h-3" />
              {kpi.label}
            </div>
            <div style={{ padding: "8px 8px 6px", textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#000080", lineHeight: 1 }}>{kpi.value}</div>
              <div
                style={{
                  marginTop: "4px",
                  fontSize: "10px",
                  color: "#006600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <TrendingUp className="w-3 h-3" />
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lower section */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "6px" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

          {/* Quick Actions */}
          <GroupBox title="Quick Actions">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
              {quickActions.map((action) => (
                <Link key={action.label} to={action.href} style={{ textDecoration: "none" }}>
                  <button
                    className="win-btn"
                    style={{
                      width: "100%",
                      minWidth: "unset",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "3px",
                      padding: "6px 4px",
                      fontSize: "10px",
                      cursor: "default",
                    }}
                  >
                    <action.icon className="w-5 h-5" style={{ color: "#000080" }} />
                    {action.label}
                  </button>
                </Link>
              ))}
            </div>
          </GroupBox>

          {/* AI Agents */}
          <GroupBox title="AI Agents Status">
            <div>
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "3px 2px",
                    borderBottom: "1px solid #C0C0C0",
                    fontSize: "11px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Zap className="w-3 h-3" style={{ color: "#000080" }} />
                    <span>{agent.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: agent.color, border: "1px solid #404040" }} />
                    <span style={{ color: "#555", fontSize: "10px" }}>{agent.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </GroupBox>
        </div>

        {/* Activity Feed */}
        <GroupBox title="Recent Activity Log">
          <div className="win-listbox" style={{ height: "260px", overflow: "auto" }}>
            {/* listview header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 16px",
                gap: "4px",
                padding: "2px 4px",
                backgroundColor: "var(--win-face)",
                borderBottom: "2px solid",
                borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                position: "sticky",
                top: 0,
              }}
            >
              <div className="win-raised" style={{ padding: "1px 4px", fontSize: "10px", fontWeight: 700 }}>Activity</div>
              <div className="win-raised" style={{ padding: "1px 4px", fontSize: "10px", fontWeight: 700 }}>Time</div>
              <div className="win-raised" style={{ padding: "1px 4px", fontSize: "10px", fontWeight: 700 }}>&nbsp;</div>
            </div>
            {activities.map((activity, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 16px",
                  gap: "4px",
                  padding: "4px 4px",
                  borderBottom: "1px solid #E0E0E0",
                  alignItems: "center",
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F5F5F5",
                  cursor: "default",
                }}
                className="win-nav-item"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#000080",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <activity.icon className="w-3 h-3" style={{ color: "#FFF" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#000" }}>{activity.text}</span>
                </div>
                <span style={{ fontSize: "10px", color: "#555", fontFamily: "'Courier New', monospace" }}>
                  {activity.time}
                </span>
                <ArrowUpRight className="w-3 h-3" style={{ color: "#000080" }} />
              </div>
            ))}
          </div>
        </GroupBox>
      </div>

      {/* Windows 2000 status bar at bottom of content */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          borderTop: "1px solid var(--win-shadow)",
          paddingTop: "3px",
          marginTop: "2px",
        }}
      >
        {[
          "6 object(s)",
          "Administrator",
          "AIOS Enterprise v2.0.0",
          "Licensed",
        ].map((item, i) => (
          <div
            key={i}
            className="win-sunken"
            style={{
              padding: "1px 6px",
              fontSize: "10px",
              backgroundColor: "var(--win-face)",
              border: "1px solid",
              borderColor: "#808080 #FFF #FFF #808080",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
