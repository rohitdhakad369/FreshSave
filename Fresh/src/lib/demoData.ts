export type FreshnessStatus = "fresh" | "moderate" | "critical";

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expiryDate: string;
  basePrice: number;
  spoilageScore: number; // 0-100
  status: FreshnessStatus;
  image?: string;
}

const today = new Date();
const daysFromNow = (d: number) => new Date(today.getTime() + d * 86400000).toISOString().slice(0, 10);
const daysAgo = (d: number) => new Date(today.getTime() - d * 86400000).toISOString().slice(0, 10);

export const demoProducts: Product[] = [
  { id: "p1", name: "Bananas (Robusta)", category: "Fruits", quantity: 24, unit: "kg", purchaseDate: daysAgo(3), expiryDate: daysFromNow(1), basePrice: 60, spoilageScore: 72, status: "critical" },
  { id: "p2", name: "Spinach Bunch", category: "Leafy Greens", quantity: 18, unit: "bunch", purchaseDate: daysAgo(2), expiryDate: daysFromNow(0), basePrice: 30, spoilageScore: 85, status: "critical" },
  { id: "p3", name: "Whole Milk 1L", category: "Dairy", quantity: 40, unit: "ltr", purchaseDate: daysAgo(4), expiryDate: daysFromNow(2), basePrice: 65, spoilageScore: 48, status: "moderate" },
  { id: "p4", name: "Tomatoes", category: "Vegetables", quantity: 32, unit: "kg", purchaseDate: daysAgo(2), expiryDate: daysFromNow(3), basePrice: 40, spoilageScore: 35, status: "moderate" },
  { id: "p5", name: "Coriander", category: "Leafy Greens", quantity: 22, unit: "bunch", purchaseDate: daysAgo(1), expiryDate: daysFromNow(1), basePrice: 15, spoilageScore: 68, status: "critical" },
  { id: "p6", name: "Apples (Shimla)", category: "Fruits", quantity: 50, unit: "kg", purchaseDate: daysAgo(1), expiryDate: daysFromNow(7), basePrice: 140, spoilageScore: 12, status: "fresh" },
  { id: "p7", name: "Paneer 200g", category: "Dairy", quantity: 16, unit: "pkt", purchaseDate: daysAgo(2), expiryDate: daysFromNow(2), basePrice: 90, spoilageScore: 42, status: "moderate" },
  { id: "p8", name: "Brown Bread", category: "Bakery", quantity: 12, unit: "loaf", purchaseDate: daysAgo(2), expiryDate: daysFromNow(1), basePrice: 50, spoilageScore: 58, status: "critical" },
  { id: "p9", name: "Cucumber", category: "Vegetables", quantity: 28, unit: "kg", purchaseDate: daysAgo(1), expiryDate: daysFromNow(4), basePrice: 35, spoilageScore: 18, status: "fresh" },
  { id: "p10", name: "Curd 500g", category: "Dairy", quantity: 20, unit: "pkt", purchaseDate: daysAgo(3), expiryDate: daysFromNow(2), basePrice: 45, spoilageScore: 50, status: "moderate" },
];

export function discountForScore(score: number): number {
  if (score >= 65) return Math.min(60, 40 + Math.round((score - 65) * 0.6));
  if (score >= 40) return 20;
  if (score >= 20) return 10;
  return 0;
}

export function discountedPrice(p: Product) {
  const d = discountForScore(p.spoilageScore);
  return Math.round(p.basePrice * (1 - d / 100));
}

export const wasteSeries = [
  { day: "Mon", waste: 12, saved: 2400 },
  { day: "Tue", waste: 9, saved: 2900 },
  { day: "Wed", waste: 14, saved: 1800 },
  { day: "Thu", waste: 7, saved: 3400 },
  { day: "Fri", waste: 6, saved: 3800 },
  { day: "Sat", waste: 4, saved: 4500 },
  { day: "Sun", waste: 5, saved: 4200 },
];

export const salesImpact = [
  { hour: "9AM", base: 12, discounted: 14 },
  { hour: "11AM", base: 18, discounted: 26 },
  { hour: "1PM", base: 22, discounted: 38 },
  { hour: "3PM", base: 16, discounted: 30 },
  { hour: "5PM", base: 28, discounted: 52 },
  { hour: "7PM", base: 34, discounted: 64 },
  { hour: "9PM", base: 20, discounted: 42 },
];

export const liveAlerts = [
  { id: "a1", level: "critical" as const, msg: "Spinach: 18 bunches – discount NOW (40%)", time: "2 min ago" },
  { id: "a2", level: "warning" as const, msg: "Bananas browning detected on Shelf B-3", time: "8 min ago" },
  { id: "a3", level: "info" as const, msg: "Auto-pricing applied to 12 items", time: "22 min ago" },
  { id: "a4", level: "warning" as const, msg: "Milk batch expires in 36 hours", time: "1 hr ago" },
];
