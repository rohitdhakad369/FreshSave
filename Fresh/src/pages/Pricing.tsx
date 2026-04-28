import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { demoProducts, discountForScore, discountedPrice } from "@/lib/demoData";
import { Check, X, Sparkles, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

const priceTimeline = [
  { t: "9AM", price: 60 }, { t: "11AM", price: 60 }, { t: "1PM", price: 54 },
  { t: "3PM", price: 48 }, { t: "5PM", price: 36 }, { t: "7PM", price: 30 }, { t: "9PM", price: 24 },
];

export default function Pricing() {
  const [auto, setAuto] = useState(true);
  const suggestions = demoProducts.filter(p => discountForScore(p.spoilageScore) > 0);

  return (
    <div className="space-y-6 max-w-[1500px]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Pricing Agent</div>
          <h1 className="text-3xl font-bold mt-1">Smart pricing</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-recommended discounts based on shelf-life + spoilage + demand.</p>
        </div>
        <Card className="p-3 px-4 flex items-center gap-3 bg-gradient-card border-border">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="text-sm">Auto-pricing</div>
          <Switch checked={auto} onCheckedChange={setAuto} />
          <Badge variant="outline" className={auto ? "text-success border-success/30" : ""}>{auto ? "ON" : "OFF"}</Badge>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5 bg-gradient-card border-border">
          <div className="font-semibold mb-1">Recommended discounts</div>
          <div className="text-xs text-muted-foreground mb-4">{suggestions.length} active suggestions</div>
          <div className="space-y-3">
            {suggestions.map(p => {
              const d = discountForScore(p.spoilageScore);
              return (
                <div key={p.id} className="rounded-lg border border-border bg-card p-4 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[180px]">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category} • spoilage {p.spoilageScore}/100</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground line-through">₹{p.basePrice}</div>
                    <div className="text-lg font-bold text-primary">₹{discountedPrice(p)}</div>
                  </div>
                  <Badge className="bg-gradient-primary">{d}% OFF</Badge>
                  <div className="flex gap-1">
                    <Button size="icon" variant="outline" className="h-8 w-8 border-success/40 text-success hover:bg-success/10" onClick={() => toast.success(`Applied ${d}% to ${p.name}`)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => toast(`Rejected ${p.name}`)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border">
          <div className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Price timeline</div>
          <div className="text-xs text-muted-foreground mb-3">Bananas (Robusta) — today</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={priceTimeline}>
              <defs>
                <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="stepAfter" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gp)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground mt-3">
            Price reduced 6 times today. Sell-through reached <strong className="text-foreground">82%</strong>.
          </div>
        </Card>
      </div>
    </div>
  );
}
