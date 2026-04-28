import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Smartphone, AlertTriangle, Tag } from "lucide-react";
import { liveAlerts } from "@/lib/demoData";

const allAlerts = [
  ...liveAlerts,
  { id: "a5", level: "info" as const, msg: "Daily report ready", time: "3 hr ago" },
  { id: "a6", level: "critical" as const, msg: "Tomato batch crossed 80% spoilage threshold", time: "5 hr ago" },
  { id: "a7", level: "warning" as const, msg: "Camera CAM-02 went offline (Aisle 4)", time: "6 hr ago" },
];

const levelStyle = {
  critical: { color: "text-destructive", bg: "bg-destructive/10 border-l-destructive", icon: AlertTriangle },
  warning: { color: "text-warning", bg: "bg-warning/10 border-l-warning", icon: AlertTriangle },
  info: { color: "text-primary", bg: "bg-primary/10 border-l-primary", icon: Tag },
};

export default function Alerts() {
  return (
    <div className="space-y-6 max-w-[1500px]">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Notifications</div>
        <h1 className="text-3xl font-bold mt-1">Alerts</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Bell, label: "In-app", on: true, sub: "Real-time push" },
          { icon: MessageSquare, label: "WhatsApp", on: true, sub: "Critical only" },
          { icon: Smartphone, label: "SMS", on: false, sub: "Fallback channel" },
        ].map((c, i) => (
          <Card key={i} className="p-4 bg-gradient-card border-border flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </div>
            <Badge variant="outline" className={c.on ? "text-success border-success/30" : ""}>{c.on ? "ON" : "OFF"}</Badge>
          </Card>
        ))}
      </div>

      <Card className="p-5 bg-gradient-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Recent alerts</div>
          <Button size="sm" variant="outline">Mark all read</Button>
        </div>
        <div className="space-y-2">
          {allAlerts.map(a => {
            const s = levelStyle[a.level];
            const I = s.icon;
            return (
              <div key={a.id} className={`border-l-4 ${s.bg} pl-4 py-3 pr-3 rounded-r flex items-start gap-3`}>
                <I className={`h-4 w-4 mt-0.5 ${s.color}`} />
                <div className="flex-1">
                  <div className="text-sm">{a.msg}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.time}</div>
                </div>
                <Badge variant="outline" className={`${s.color} border-current`}>{a.level}</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
