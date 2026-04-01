import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Bell, Search, Monitor } from "lucide-react";
import { useState, useEffect } from "react";

export function Layout() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--win-face)", fontFamily: "'Tahoma', 'MS Sans Serif', Arial, sans-serif" }}>
      {/* Window chrome titlebar */}
      <div className="win-titlebar flex items-center justify-between px-2" style={{ height: "22px" }}>
        <div className="flex items-center gap-2">
          <Monitor className="w-3 h-3" style={{ color: "#FFFFFF" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#FFFFFF" }}>AIOS Enterprise — Dashboard</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="win-btn win-btn-small" title="Minimize">_</button>
          <button className="win-btn win-btn-small" title="Maximize">□</button>
          <button className="win-btn win-btn-small" title="Close" style={{ fontWeight: 900 }}>✕</button>
        </div>
      </div>

      {/* Menu bar */}
      <div
        className="flex items-center gap-1 px-2"
        style={{
          backgroundColor: "var(--win-face)",
          borderBottom: "1px solid var(--win-shadow)",
          height: "20px",
          fontSize: "11px",
        }}
      >
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button
            key={item}
            className="px-2 win-nav-item"
            style={{
              background: "none",
              border: "none",
              cursor: "default",
              fontSize: "11px",
              height: "18px",
              padding: "0 6px",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Toolbar address bar */}
      <div
        className="flex items-center gap-2 px-2"
        style={{
          backgroundColor: "var(--win-face)",
          borderBottom: "2px solid var(--win-shadow)",
          height: "28px",
          padding: "2px 6px",
        }}
      >
        <span style={{ fontSize: "11px", color: "#000" }}>Address:</span>
        <div
          className="win-sunken flex items-center gap-2 flex-1"
          style={{ height: "20px", padding: "0 4px", backgroundColor: "#FFF" }}
        >
          <Search className="w-3 h-3" style={{ color: "#808080" }} />
          <input
            type="text"
            defaultValue="C:\\AIOS\\Dashboard"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "11px",
              fontFamily: "'Tahoma', sans-serif",
              color: "#000",
              width: "100%",
            }}
          />
        </div>
        <button className="win-btn" style={{ minWidth: "48px", padding: "1px 8px", fontSize: "11px" }}>
          Go
        </button>
        <div className="flex items-center gap-1 ml-2">
          <button className="relative p-1" style={{ background: "none", border: "none", cursor: "default" }}>
            <Bell className="w-4 h-4" style={{ color: "#000080" }} />
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "6px",
                height: "6px",
                backgroundColor: "#FF0000",
                borderRadius: "50%",
              }}
            />
          </button>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#000080",
              border: "1px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: "#FFF",
            }}
          >
            A
          </div>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main
          className="flex-1 overflow-auto p-4"
          style={{
            backgroundColor: "var(--win-face)",
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Status bar / Taskbar at bottom */}
      <div
        className="win-taskbar"
        style={{
          borderTop: "2px solid var(--win-light)",
          borderBottom: "none",
          padding: "2px 4px",
          gap: "4px",
        }}
      >
        {/* Start button */}
        <button className="win-start" style={{ fontSize: "11px" }}>
          <Monitor className="w-3 h-3" />
          Start
        </button>
        <div style={{ width: "1px", height: "22px", borderLeft: "1px solid var(--win-shadow)", borderRight: "1px solid var(--win-light)", margin: "0 2px" }} />
        {/* Task button */}
        <button
          className="win-raised flex items-center gap-1"
          style={{ minWidth: "120px", height: "22px", padding: "0 6px", fontSize: "11px" }}
        >
          <Monitor className="w-3 h-3" />
          AIOS Enterprise
        </button>
        <div className="flex-1" />
        {/* System tray */}
        <div
          className="win-sunken flex items-center gap-2 px-2"
          style={{ height: "22px", backgroundColor: "var(--win-face)", fontSize: "11px" }}
        >
          <span style={{ fontSize: "11px" }}>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
