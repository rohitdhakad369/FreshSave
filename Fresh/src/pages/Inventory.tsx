import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { demoProducts, discountForScore, discountedPrice, type Product } from "@/lib/demoData";
import { Plus, Search, Upload, LayoutGrid, List, Filter, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const statusColor = { fresh: "bg-success/15 text-success border-success/30", moderate: "bg-warning/15 text-warning border-warning/30", critical: "bg-destructive/15 text-destructive border-destructive/30" };

export default function Inventory() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [filter, setFilter] = useState<"all" | "expiring" | "high-risk">("all");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Product[]>(demoProducts);

  const filtered = items.filter(p => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === "expiring") return new Date(p.expiryDate).getTime() - Date.now() < 2 * 86400000;
    if (filter === "high-risk") return p.spoilageScore >= 50;
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1500px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Inventory</div>
          <h1 className="text-3xl font-bold mt-1">Stock & shelf life</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" /> Bulk CSV</Button>
          <Button size="sm" className="bg-gradient-primary" onClick={() => toast.success("Use the form to add a product (demo)")}>
            <Plus className="h-4 w-4 mr-1" /> Add product
          </Button>
        </div>
      </div>

      <Card className="p-4 bg-gradient-card border-border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All ({items.length})</TabsTrigger>
              <TabsTrigger value="expiring">Expiring soon</TabsTrigger>
              <TabsTrigger value="high-risk">High risk</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex border border-border rounded-md p-0.5">
            <Button variant={view === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setView("list")} className="h-7 px-2"><List className="h-4 w-4" /></Button>
            <Button variant={view === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setView("grid")} className="h-7 px-2"><LayoutGrid className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>

      {view === "list" ? (
        <Card className="bg-gradient-card border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="w-[180px]">Spoilage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => {
                const d = discountForScore(p.spoilageScore);
                const days = Math.ceil((new Date(p.expiryDate).getTime() - Date.now()) / 86400000);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.category}</TableCell>
                    <TableCell>{p.quantity} {p.unit}</TableCell>
                    <TableCell className={days <= 1 ? "text-destructive font-semibold" : "text-muted-foreground"}>
                      {days <= 0 ? "Today" : `${days}d`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={p.spoilageScore} className="h-1.5 flex-1" />
                        <span className="text-xs w-8 text-right">{p.spoilageScore}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      {d > 0 ? (
                        <div>
                          <div className="text-xs text-muted-foreground line-through">₹{p.basePrice}</div>
                          <div className="font-bold text-primary">₹{discountedPrice(p)} <span className="text-[10px] text-success">-{d}%</span></div>
                        </div>
                      ) : <div className="font-semibold">₹{p.basePrice}</div>}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => { setItems(items.filter(i => i.id !== p.id)); toast.success(`Removed ${p.name}`); }}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => {
            const d = discountForScore(p.spoilageScore);
            return (
              <Card key={p.id} className="p-4 bg-gradient-card border-border hover:shadow-elegant transition">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                  </div>
                  <Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">Spoilage {p.spoilageScore}/100</div>
                <Progress value={p.spoilageScore} className="h-1.5 mt-1" />
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="text-xs text-muted-foreground">{p.quantity} {p.unit}</div>
                    <div className="text-lg font-bold">₹{discountedPrice(p)}</div>
                  </div>
                  {d > 0 && <Badge className="bg-gradient-primary">{d}% OFF</Badge>}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
