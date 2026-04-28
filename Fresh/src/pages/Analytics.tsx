import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { wasteSeries } from "@/lib/demoData";
import { Brain, IndianRupee, Recycle, TrendingUp } from "lucide-react";

const monthly = [
  { m: "Nov", saved: 24000, waste: 88 },
  { m: "Dec", saved: 31000, waste: 72 },
  { m: "Jan", saved: 38000, waste: 64 },
  { m: "Feb", saved: 42000, waste: 55 },
  { m: "Mar", saved: 51000, waste: 42 },
  { m: "Apr", saved: 64000, waste: 31 },
];

const topItems = [
  { name: "Bananas", units: 142, revenue: 8520 },
  { name: "Spinach", units: 96, revenue: 2880 },
  { name: "Tomatoes", units: 88, revenue: 3520 },
  { name: "Bread", units: 64, revenue: 3200 },
  { name: "Curd", units: 52, revenue: 2340 },
];

const insights = [
  "📉 Order 18% less spinach next week — historical waste is highest on Tuesdays.",
  "📈 Tomato demand spikes 2x on Saturdays. Increase orders by 30%.",
  "🔥 Best discount window: 6–8 PM yields 64% sell-through on perishables.",
  "🥛 Switch milk supplier — current spoilage rate is 22% above benchmark.",
];

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-[1500px]">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Profit Recovery Engine</div>
        <h1 className="text-3xl font-bold mt-1">Analytics & insights</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: IndianRupee, label: "Total saved (90d)", value: "₹1,57,400", delta: "+34%" },
          { icon: Recycle, label: "Waste reduced", value: "62%", delta: "+9%" },
          { icon: TrendingUp, label: "Sell-through rate", value: "84%", delta: "+12%" },
          { icon: Brain, label: "AI accuracy", value: "94.2%", delta: "+2.1%" },
        ].map((s, i) => (
          <Card key={i} className="p-5 bg-gradient-card border-border">
            <div className="flex justify-between items-start">
              <s.icon className="h-5 w-5 text-primary" />
              <Badge variant="outline" className="text-success border-success/30">{s.delta}</Badge>
            </div>
            <div className="text-3xl font-bold mt-3">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5 bg-gradient-card border-border">
          <div className="font-semibold mb-1">Revenue saved (monthly)</div>
          <div className="text-xs text-muted-foreground mb-3">Rolling 6 months</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Line dataKey="saved" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-gradient-card border-border">
          <div className="font-semibold mb-1">Top discounted sellers</div>
          <div className="text-xs text-muted-foreground mb-3">Last 30 days</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topItems} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={70} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="units" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-4 w-4 text-primary" />
          <div className="font-semibold">Predictive insights</div>
          <Badge variant="outline" className="ml-auto">AI generated</Badge>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {insights.map((t, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 text-sm">{t}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
