import {
  LayoutDashboard,
  Bot,
  ListTodo,
  FileText,
  BarChart3,
  MessageSquare,
  Workflow,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Command", url: "/ai-command", icon: Bot },
  { title: "Tasks", url: "/tasks", icon: ListTodo },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Workflows", url: "/workflows", icon: Workflow },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <div
      className="win-panel flex flex-col"
      style={{
        width: "180px",
        minWidth: "180px",
        backgroundColor: "var(--win-face)",
        borderRight: "2px solid var(--win-shadow)",
        borderLeft: "none",
        borderTop: "none",
        borderBottom: "none",
        overflowY: "auto",
      }}
    >
      {/* Explorer left panel header */}
      <div
        style={{
          background: "linear-gradient(to bottom, #1464A0, #003087)",
          padding: "8px 8px 12px",
          color: "#FFF",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "28px",
              height: "28px",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cpu className="w-4 h-4" style={{ color: "#FFF" }} />
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFF" }}>AIOS</div>
            <div style={{ fontSize: "9px", color: "#A0C8F0", letterSpacing: "1px" }}>ENTERPRISE AI</div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className="win-separator" style={{ margin: "2px 0" }} />

      {/* Nav group label */}
      <div style={{ padding: "4px 8px 2px", fontSize: "10px", fontWeight: 700, color: "#000080" }}>
        Navigation
      </div>

      {/* Nav items */}
      <div style={{ padding: "2px" }}>
        {items.map((item) => {
          const active =
            item.url === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              style={{ textDecoration: "none" }}
            >
              <div
                className={active ? "win-selected" : "win-nav-item"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 6px",
                  fontSize: "11px",
                  cursor: "default",
                  color: active ? "#FFFFFF" : "#000000",
                  backgroundColor: active ? "var(--win-selection)" : "transparent",
                  borderLeft: active ? "2px solid #FFCC00" : "2px solid transparent",
                }}
              >
                <item.icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: active ? "#FFFFFF" : "#000080" }}
                />
                <span style={{ flex: 1 }}>{item.title}</span>
                {active && <ChevronRight className="w-3 h-3" />}
              </div>
            </Link>
          );
        })}
      </div>

      <hr className="win-separator" style={{ margin: "4px 6px" }} />

      {/* My Computer section */}
      <div style={{ padding: "4px 8px 2px", fontSize: "10px", fontWeight: 700, color: "#000080" }}>
        System Info
      </div>
      <div style={{ padding: "4px 8px", fontSize: "10px", color: "#333" }}>
        <div style={{ marginBottom: "4px" }}>
          <div style={{ color: "#808080" }}>OS Version</div>
          <div>AIOS 2000 SP4</div>
        </div>
        <div style={{ marginBottom: "4px" }}>
          <div style={{ color: "#808080" }}>User</div>
          <div>Administrator</div>
        </div>
        <div>
          <div style={{ color: "#808080" }}>License</div>
          <div style={{ color: "#000080" }}>Enterprise</div>
        </div>
      </div>
    </div>
  );
}
