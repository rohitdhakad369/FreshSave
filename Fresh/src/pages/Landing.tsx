import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, ShieldCheck, Camera, Tag, BarChart3, CheckCircle2, Play, TrendingDown, IndianRupee, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Stat({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient">{value}<span className="text-2xl">{suffix}</span></div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            FreshSave
          </Link>
          <nav className="hidden md:flex items-center gap-8 ml-12 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#stats" className="hover:text-foreground">Impact</a>
            <a href="#demo" className="hover:text-foreground">Demo</a>
          </nav>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" asChild><Link to="/app">Sign in</Link></Button>
            <Button asChild className="bg-gradient-primary"><Link to="/app">Start Free Trial <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-glow" />
        <div className="container relative py-20 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <Badge className="mb-6 bg-accent text-accent-foreground border-0 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 inline-block pulse-ring" />
              Live • Computer Vision + Dynamic Pricing
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Stop guessing discounts.<br/>
              <span className="text-gradient">Start saving revenue.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              FreshSave uses real-time computer vision to detect spoilage on your shelves and
              automatically adjusts prices — so perishables sell <em>before</em> they rot.
              Built for kirana stores, agri-retailers, and small grocery chains.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="bg-gradient-primary shadow-elegant">
                <Link to="/app">Launch Demo Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" /> Watch 90s demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground">
              {["No hardware required", "Works offline", "Setup in 4 minutes", "Made in India 🇮🇳"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {t}</span>
              ))}
            </div>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="rounded-2xl bg-gradient-card border border-border shadow-elegant overflow-hidden">
              <div className="h-9 border-b border-border bg-muted/50 flex items-center px-4 gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <span className="ml-4 text-xs text-muted-foreground">FreshSave.app/dashboard</span>
              </div>
              <div className="grid md:grid-cols-4 gap-4 p-6">
                {[
                  { icon: Activity, label: "Items at risk", value: "23", delta: "+4" },
                  { icon: IndianRupee, label: "Saved today", value: "₹3,240", delta: "+18%" },
                  { icon: TrendingDown, label: "Waste reduced", value: "62%", delta: "+9%" },
                  { icon: Tag, label: "Active discounts", value: "17", delta: "live" },
                ].map((c, i) => (
                  <Card key={i} className="p-4 bg-card border-border">
                    <div className="flex items-center justify-between">
                      <c.icon className="h-4 w-4 text-primary" />
                      <span className="text-[10px] text-success font-semibold">{c.delta}</span>
                    </div>
                    <div className="mt-3 text-2xl font-bold">{c.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-border bg-muted/30">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="62" suffix="%" label="Avg waste reduction" />
          <Stat value="₹4.2L" label="Saved per store / year" />
          <Stat value="3.4" suffix="x" label="Sell-through speed" />
          <Stat value="4" suffix="min" label="Avg setup time" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Multi-agent AI system</Badge>
          <h2 className="text-4xl md:text-5xl font-bold">Four agents. One mission.<br/><span className="text-muted-foreground">Stop perishables from perishing.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Leaf, title: "Inventory Agent", desc: "Tracks shelf-life, turnover, and flags items approaching spoilage in real time." },
            { icon: Camera, title: "Vision Agent", desc: "YOLOv8-powered detection of browning, wilting, and mold on a live camera feed." },
            { icon: Tag, title: "Pricing Agent", desc: "Combines shelf-life + spoilage score + demand to set the optimal discount automatically." },
            { icon: BarChart3, title: "Profit Engine", desc: "Quantifies revenue saved vs. waste avoided. Reports investors will love." },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 bg-gradient-card border-border h-full hover:shadow-elegant transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="font-semibold">{f.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container relative py-24">
          <div className="max-w-2xl">
            <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 mb-4">How it works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">From shelf to sale, in three steps.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { n: "01", t: "See", d: "Any phone or webcam scans your shelves. AI grades freshness 0–100." },
              { n: "02", t: "Decide", d: "The pricing agent calculates the discount that maximizes sell-through before expiry." },
              { n: "03", t: "Save", d: "QR shelf labels & ESL update instantly. You keep margin instead of writing off loss." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur p-6">
                <div className="text-5xl font-bold opacity-40">{s.n}</div>
                <div className="mt-4 text-xl font-semibold">{s.t}</div>
                <p className="text-sm text-primary-foreground/70 mt-2">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="container py-24 text-center">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-4xl md:text-5xl font-bold">Try the full dashboard.<br/>Loaded with real demo data.</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">No signup needed. See how FreshSave would look running in your store today.</p>
        <Button size="lg" asChild className="bg-gradient-primary shadow-elegant mt-8">
          <Link to="/app">Open the Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" />
            © 2026 FreshSave. Reducing food waste, one shelf at a time.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
