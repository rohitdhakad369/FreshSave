import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoProducts, discountForScore, discountedPrice } from "@/lib/demoData";
import { Download, Printer, Leaf } from "lucide-react";

export default function Labels() {
  return (
    <div className="space-y-6 max-w-[1500px]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">QR & Electronic Shelf Labels</div>
          <h1 className="text-3xl font-bold mt-1">Print discounted shelf labels</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-1" /> Print all</Button>
          <Button size="sm" className="bg-gradient-primary"><Download className="h-4 w-4 mr-1" /> Download PDF</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {demoProducts.map(p => {
          const d = discountForScore(p.spoilageScore);
          const url = `https://FreshSave.app/p/${p.id}`;
          return (
            <Card key={p.id} className="p-0 bg-gradient-card border-border overflow-hidden">
              {/* Simulated ESL */}
              <div className="bg-foreground text-background p-4 relative">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-70">
                  <Leaf className="h-3 w-3" /> FreshSave ESL
                </div>
                <div className="font-bold mt-2 text-lg leading-tight">{p.name}</div>
                <div className="text-[10px] opacity-70">{p.category}</div>
                <div className="mt-3 flex items-end gap-2">
                  {d > 0 && <div className="text-xs line-through opacity-50">₹{p.basePrice}</div>}
                  <div className="text-3xl font-bold">₹{discountedPrice(p)}</div>
                </div>
                {d > 0 && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{d}% OFF</Badge>
                )}
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="bg-white p-1.5 rounded">
                  <QRCodeSVG value={url} size={64} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-muted-foreground">Scan to view freshness report</div>
                  <div className="text-xs font-mono mt-1 truncate">{url}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
