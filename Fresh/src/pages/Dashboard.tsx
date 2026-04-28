import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertTriangle, IndianRupee, Package, TrendingDown, Tag, ArrowUpRight, Zap } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { demoProducts, discountForScore, discountedPrice, liveAlerts, salesImpact, wasteSeries } from "@/lib/demoData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const KPI = ({ icon: Icon, label, value, delta, accent }: any) => (
  <Card className="p-5 bg-gradient-card border-border shadow-card relative overflow-hidden">
    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5" />
    <div className="flex items-center justify-between relative">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${accent ?? "bg-accent text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <Badge variant="outline" className="text-[10px] gap-1 border-success/30 text-success">
        <ArrowUpRight className="h-3 w-3" /> {delta}
      </Badge>
    </div>
    <div className="mt-4 text-3xl font-bold tracking-tight">{value}</div>
    <div className="text-xs text-muted-foreground mt-1">{label}</div>
  </Card>
);

const statusColor = { fresh: "bg-success/15 text-success border-success/30", moderate: "bg-warning/15 text-warning border-warning/30", critical: "bg-destructive/15 text-destructive border-destructive/30" };
const alertColor = { critical: "border-l-destructive bg-destructive/5", warning: "border-l-warning bg-warning/5", info: "border-l-primary bg-primary/5" };

export default function Dashboard() {
  const atRisk = demoProducts.filter(p => p.status !== "fresh").length;
  const discounted = demoProducts.filter(p => discountForScore(p.spoilageScore) > 0).length;
  const savedToday = demoProducts.reduce((s, p) => s + (p.basePrice - discountedPrice(p)) * Math.min(p.quantity, 5), 0);

  const distData = [
    { name: "Fresh", value: demoProducts.filter(p => p.status === "fresh").length, color: "hsl(var(--success))" },
    { name: "Moderate", value: demoProducts.filter(p => p.status === "moderate").length, color: "hsl(var(--warning))" },
    { name: "Critical", value: demoProducts.filter(p => p.status === "critical").length, color: "hsl(var(--destructive))" },
  ];

  return (
    <div className="space-y-6 max-w-[1500px]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Overview</div>
          <h1 className="text-3xl font-bold mt-1">Good evening, Rahul 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what your perishables need right now.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild><Link to="/app/vision"><Zap className="h-4 w-4 mr-1" /> Run Scan</Link></Button>
          <Button size="sm" className="bg-gradient-primary" asChild><Link to="/app/pricing">Auto-price all</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={Package} label="Total inventory items" value={demoProducts.length} delta="+2" />
        <KPI icon={AlertTriangle} label="Items at risk" value={atRisk} delta="+4" accent="bg-warning/15 text-warning" />
        <KPI icon={IndianRupee} label="Revenue saved today" value={`₹${savedToday.toLocaleString("en-IN")}`} delta="+18%" accent="bg-success/15 text-success" />
        <KPI icon={Tag} label="Active discounts" value={discounted} delta="live" accent="bg-primary/15 text-primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5 bg-gradient-card border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Waste reduction & revenue saved</div>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
            <Badge variant="outline" className="text-success border-success/30">+34% WoW</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={wasteSeries}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="saved" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" name="₹ saved" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card">
          <div className="font-semibold">Freshness distribution</div>
          <div className="text-xs text-muted-foreground">Current stock</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={distData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {distData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {distData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: d.color }} /> {d.name}</div>
                <div className="font-semibold">{d.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5 bg-gradient-card border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Sales impact: discounted vs base</div>
              <div className="text-xs text-muted-foreground">Today, hourly units sold</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="base" fill="hsl(var(--muted-foreground))" radius={[4,4,0,0]} name="Without AI" />
              <Bar dataKey="discounted" fill="hsl(var(--primary))" radius={[4,4,0,0]} name="With FreshSave" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-destructive pulse-ring" /> Live alerts
            </div>
            <Button size="sm" variant="ghost" asChild><Link to="/app/alerts">View all</Link></Button>
          </div>
          <div className="space-y-2">
            {liveAlerts.map(a => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className={`border-l-2 ${alertColor[a.level]} pl-3 py-2 rounded-r`}
              >
                <div className="text-sm">{a.msg}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{a.time}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-gradient-card border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold">Items needing attention</div>
            <div className="text-xs text-muted-foreground">Sorted by spoilage score</div>
          </div>
          <Button size="sm" variant="outline" asChild><Link to="/app/inventory">Open inventory</Link></Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...demoProducts].sort((a,b) => b.spoilageScore - a.spoilageScore).slice(0, 6).map(p => {
            const d = discountForScore(p.spoilageScore);
            return (
              <div key={p.id} className="rounded-lg border border-border p-4 hover:shadow-card transition bg-card">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">{p.category} • {p.quantity} {p.unit}</div>
                  </div>
                  <Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>Spoilage</span><span>{p.spoilageScore}/100</span>
                  </div>
                  <Progress value={p.spoilageScore} className="h-1.5" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground line-through">₹{p.basePrice}</div>
                    <div className="text-lg font-bold text-primary">₹{discountedPrice(p)}</div>
                  </div>
                  {d > 0 && <Badge className="bg-gradient-primary">{d}% OFF</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
