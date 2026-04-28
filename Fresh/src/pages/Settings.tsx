import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [sensitivity, setSensitivity] = useState([72]);
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Configuration</div>
        <h1 className="text-3xl font-bold mt-1">Settings</h1>
      </div>

      <Card className="p-6 bg-gradient-card border-border space-y-5">
        <div className="font-semibold">Discount rules</div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label>Mild spoilage</Label>
            <Input defaultValue="10" type="number" />
            <div className="text-[11px] text-muted-foreground mt-1">Score 20–39</div>
          </div>
          <div>
            <Label>Moderate</Label>
            <Input defaultValue="20" type="number" />
            <div className="text-[11px] text-muted-foreground mt-1">Score 40–64</div>
          </div>
          <div>
            <Label>Critical</Label>
            <Input defaultValue="50" type="number" />
            <div className="text-[11px] text-muted-foreground mt-1">Score 65+</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border space-y-5">
        <div className="font-semibold">AI sensitivity</div>
        <p className="text-xs text-muted-foreground">Controls how aggressively the Vision Agent flags items as spoiled.</p>
        <Slider value={sensitivity} max={100} step={1} onValueChange={setSensitivity} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Conservative</span><span className="font-semibold text-foreground">{sensitivity[0]}%</span><span>Aggressive</span>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border space-y-4">
        <div className="font-semibold">Camera settings</div>
        {[
          { l: "Auto-scan every 5 min", v: true },
          { l: "Save annotated images", v: true },
          { l: "Stream to cloud (off-site backup)", v: false },
          { l: "Multi-store sync", v: true },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <Label>{s.l}</Label>
            <Switch defaultChecked={s.v} />
          </div>
        ))}
      </Card>

      <Button className="bg-gradient-primary" onClick={() => toast.success("Settings saved")}>Save changes</Button>
    </div>
  );
}
