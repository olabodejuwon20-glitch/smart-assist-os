import {
  LayoutDashboard,
  Bot,
  ListTodo,
  FileText,
  BarChart3,
  MessageSquare,
  Workflow,
  Cpu,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

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
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-sidebar pt-4">
        {/* Logo */}
        <div className="px-4 pb-6 pt-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center glow-cyan">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-display text-sm font-bold tracking-wider text-foreground glow-text-cyan">
                AIOS
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Enterprise AI
              </p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          active
                            ? "bg-primary/10 text-primary border border-primary/20 glow-cyan"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        activeClassName=""
                      >
                        <item.icon
                          className={`w-5 h-5 shrink-0 ${
                            active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        />
                        {!collapsed && (
                          <span className="text-sm font-medium">{item.title}</span>
                        )}
                        {active && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
