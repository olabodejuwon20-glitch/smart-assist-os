import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Bell, Search } from "lucide-react";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full grid-bg">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 glass">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 border border-border/50 w-72">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search across AIOS..."
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary-foreground">
                A
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
