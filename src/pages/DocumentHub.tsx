import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Search, Grid, List, Tag, Eye, Sparkles, FolderOpen } from "lucide-react";

interface Doc {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  tags: string[];
  summary: string;
  folder: string;
}

const docs: Doc[] = [
  { id: "1", name: "Q4 Financial Summary.pdf", type: "PDF", size: "2.4 MB", date: "2026-03-28", tags: ["finance", "quarterly"], summary: "Revenue increased 18% YoY. Key growth areas: enterprise SaaS and consulting services.", folder: "Finance" },
  { id: "2", name: "Client Onboarding Guide.docx", type: "DOCX", size: "890 KB", date: "2026-03-25", tags: ["operations", "guide"], summary: "Step-by-step onboarding process for enterprise clients including compliance checklist.", folder: "Operations" },
  { id: "3", name: "Market Research - AI Industry.pdf", type: "PDF", size: "5.1 MB", date: "2026-03-22", tags: ["research", "AI"], summary: "AI market projected to reach $500B by 2028. Key trends: automation, LLMs, edge computing.", folder: "Research" },
  { id: "4", name: "Employee Handbook 2026.pdf", type: "PDF", size: "1.8 MB", date: "2026-03-15", tags: ["HR", "policy"], summary: "Updated company policies including remote work guidelines and new benefits package.", folder: "HR" },
  { id: "5", name: "Product Roadmap Q2.xlsx", type: "XLSX", size: "340 KB", date: "2026-03-20", tags: ["product", "planning"], summary: "Q2 priorities: AI agent improvements, workflow builder v2, mobile app launch.", folder: "Product" },
  { id: "6", name: "Sales Pipeline Report.pdf", type: "PDF", size: "1.2 MB", date: "2026-03-27", tags: ["sales", "report"], summary: "42 active deals worth $3.2M total. Conversion rate improved to 28% from 22% last quarter.", folder: "Sales" },
];

const typeColors: Record<string, string> = {
  PDF: "bg-destructive/20 text-destructive border-destructive/20",
  DOCX: "bg-primary/20 text-primary border-primary/20",
  XLSX: "bg-success/20 text-success border-success/20",
};

export default function DocumentHub() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = docs.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.tags.some((t) => t.includes(search.toLowerCase())));

  const selectedDoc = docs.find((d) => d.id === selected);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-xl font-bold tracking-wide text-foreground">Document Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload, search, and get AI summaries of your documents</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 border border-border/50 w-64">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
          </div>
          <div className="flex glass rounded-xl overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}><Grid className="w-4 h-4" /></button>
            <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}><List className="w-4 h-4" /></button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/30 text-sm text-primary hover:bg-primary/30 transition-colors glow-cyan">
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((doc) => (
                <motion.div
                  key={doc.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelected(doc.id)}
                  className={`glass rounded-xl p-4 cursor-pointer transition-all ${selected === doc.id ? "border-primary/40 glow-cyan" : "hover:border-primary/20"}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate">{doc.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${typeColors[doc.type]}`}>{doc.type}</span>
                        <span className="text-[10px] text-muted-foreground">{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <FolderOpen className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{doc.folder}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-xl divide-y divide-border/50">
              {filtered.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelected(doc.id)}
                  className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors ${selected === doc.id ? "bg-primary/5" : ""}`}
                >
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground flex-1 truncate">{doc.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${typeColors[doc.type]}`}>{doc.type}</span>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <span className="text-xs text-muted-foreground font-mono">{doc.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedDoc && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden xl:block w-80 glass rounded-xl p-5 space-y-4 h-fit sticky top-0">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Document Preview</h3>
            </div>
            <h2 className="text-sm font-semibold text-foreground">{selectedDoc.name}</h2>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">AI Summary</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedDoc.summary}</p>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Folder</span><span className="text-foreground">{selectedDoc.folder}</span></div>
              <div className="flex justify-between"><span>Size</span><span className="text-foreground">{selectedDoc.size}</span></div>
              <div className="flex justify-between"><span>Modified</span><span className="text-foreground font-mono">{selectedDoc.date}</span></div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
