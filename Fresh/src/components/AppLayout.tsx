import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Camera, Tag, QrCode, BarChart3, Bell, Settings, Leaf, LogOut, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "./fre.jpeg";

const nav = [
  { to: "/app", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/app/inventory", icon: Package, label: "Inventory" },
  { to: "/app/vision", icon: Camera, label: "AI Vision", badge: "LIVE" },
  { to: "/app/pricing", icon: Tag, label: "Smart Pricing" },
  { to: "/app/labels", icon: QrCode, label: "QR & Labels" },
  { to: "/app/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/app/alerts", icon: Bell, label: "Alerts", badge: "5" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout() {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-5 py-5 flex items-center gap-2 border-b border-sidebar-border">
          <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow">
  <img 
    src={logo} 
    alt="FreshSave Logo" 
    className="h-full w-full object-contain"
  />
</div>
          <div>
            <div className="font-bold tracking-tight">FreshSave</div>
            <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">Perish Optimizer</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-semibold shadow-card"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                }`
              }
            >
              <n.icon className="h-4 w-4" />
              <span className="flex-1">{n.label}</span>
              {n.badge && (
                <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-sidebar-primary/40 text-sidebar-primary bg-sidebar-primary/10">
                  {n.badge}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="rounded-xl bg-sidebar-accent/60 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-sidebar-primary" />
              <div className="text-xs font-semibold">Demo Mode</div>
            </div>
            <p className="text-[11px] text-sidebar-foreground/60 leading-relaxed">
              Pre-loaded with realistic store data. Reset anytime.
            </p>
          </div>
          <Button variant="ghost" className="w-full mt-3 justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-14 border-b border-border bg-card/80 backdrop-blur sticky top-0 z-40 flex items-center px-4 lg:px-8 gap-4">
          <div className="lg:hidden font-bold flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" /> FreshSave
          </div>
          <div className="flex-1" />
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success pulse-ring" />
            All systems operational
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            <Badge className="h-5 px-1.5 bg-destructive text-destructive-foreground">5</Badge>
          </Button>
        </header>

        <motion.div
          key={loc.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 p-4 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
