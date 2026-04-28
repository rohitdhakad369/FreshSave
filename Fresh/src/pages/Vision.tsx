import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Pause, Play, Crosshair } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const detections = [
  { label: "Banana", confidence: 0.94, status: "Browning", score: 72, x: 18, y: 22, w: 28, h: 30 },
  { label: "Spinach Bunch", confidence: 0.89, status: "Wilting", score: 85, x: 55, y: 18, w: 30, h: 36 },
  { label: "Tomato", confidence: 0.91, status: "Fresh", score: 22, x: 12, y: 62, w: 22, h: 26 },
  { label: "Bread", confidence: 0.87, status: "Mold trace", score: 58, x: 60, y: 58, w: 28, h: 30 },
];

const statusColor = (s: number) =>
  s >= 65 ? "bg-destructive/15 text-destructive border-destructive/30"
  : s >= 40 ? "bg-warning/15 text-warning border-warning/30"
  : "bg-success/15 text-success border-success/30";

const history = [
  { id: 1, time: "Just now", items: 4, critical: 2 },
  { id: 2, time: "12 min ago", items: 6, critical: 1 },
  { id: 3, time: "34 min ago", items: 5, critical: 3 },
  { id: 4, time: "1h 22m ago", items: 7, critical: 0 },
];

export default function Vision() {
  const [running, setRunning] = useState(true);

  return (
    <div className="space-y-6 max-w-[1500px]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">AI Vision Agent</div>
          <h1 className="text-3xl font-bold mt-1">Live shelf monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">YOLOv8 freshness detection on Camera 01 — Aisle 3, Shelf B</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" /> Upload image</Button>
          <Button size="sm" className="bg-gradient-primary" onClick={() => setRunning(!running)}>
            {running ? <><Pause className="h-4 w-4 mr-1" /> Pause feed</> : <><Play className="h-4 w-4 mr-1" /> Resume</>}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-4 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">CAM-01 / Aisle 3-B</span>
              <Badge variant="outline" className="text-success border-success/30 text-[10px] gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success pulse-ring" /> LIVE
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">1080p • 24fps</div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-muted via-muted/70 to-muted border border-border">
            {/* Fake shelf background */}
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-warning/10" />

            {/* Scan overlay */}
            {running && <div className="absolute inset-0 scanline pointer-events-none" />}
            {running && (
              <div className="absolute left-0 right-0 h-px bg-primary shadow-glow scan-line" />
            )}

            {/* Detection boxes */}
            {detections.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }}
                className="absolute border-2 rounded"
                style={{
                  left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%`,
                  borderColor: d.score >= 65 ? "hsl(var(--destructive))" : d.score >= 40 ? "hsl(var(--warning))" : "hsl(var(--success))",
                }}
              >
                <div className="absolute -top-6 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded text-primary-foreground"
                  style={{ background: d.score >= 65 ? "hsl(var(--destructive))" : d.score >= 40 ? "hsl(var(--warning))" : "hsl(var(--success))" }}>
                  {d.label} {Math.round(d.confidence * 100)}%
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="bg-background/80 backdrop-blur px-3 py-1.5 rounded-md text-xs flex items-center gap-2">
                <Crosshair className="h-3 w-3 text-primary" />
                4 objects detected
              </div>
              <div className="bg-background/80 backdrop-blur px-3 py-1.5 rounded-md text-xs font-mono">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border">
          <div className="font-semibold mb-1">Detections</div>
          <div className="text-xs text-muted-foreground mb-4">Real-time spoilage scoring</div>
          <div className="space-y-3">
            {detections.map((d, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{d.label}</div>
                  <Badge variant="outline" className={statusColor(d.score)}>{d.status}</Badge>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                  <span>Spoilage score</span><span>{d.score}/100</span>
                </div>
                <Progress value={d.score} className="h-1.5" />
                <div className="text-[10px] text-muted-foreground mt-2">Confidence {(d.confidence * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-gradient-card border-border">
        <div className="font-semibold mb-3">Scan history</div>
        <div className="grid md:grid-cols-4 gap-3">
          {history.map(h => (
            <div key={h.id} className="rounded-lg border border-border p-3 bg-card">
              <div className="text-xs text-muted-foreground">{h.time}</div>
              <div className="text-2xl font-bold mt-1">{h.items}</div>
              <div className="text-xs text-muted-foreground">items scanned</div>
              {h.critical > 0 && <Badge variant="outline" className="mt-2 text-destructive border-destructive/30">{h.critical} critical</Badge>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
