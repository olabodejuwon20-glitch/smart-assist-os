import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import AICommand from "./pages/AICommand";
import TaskManager from "./pages/TaskManager";
import DocumentHub from "./pages/DocumentHub";
import Analytics from "./pages/Analytics";
import Communications from "./pages/Communications";
import Workflows from "./pages/Workflows";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/ai-command" element={<AICommand />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/documents" element={<DocumentHub />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Communications />} />
            <Route path="/workflows" element={<Workflows />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
