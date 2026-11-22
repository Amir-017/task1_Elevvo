
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
} from "recharts";
import { useProducts } from "../Store/products";

// fake data for demonstration purposes
const monthlyEarnings = [
  { month: "Jun", amount: 1200 },
  { month: "Jul", amount: 1800 },
  { month: "Aug", amount: 900 },
  { month: "Sep", amount: 2100 },
  { month: "Oct", amount: 1500 },
  { month: "Nov", amount: 2400 },
];

const activities = [
  { id: 1, text: 'Project "Brand Logo Design" completed', time: "2 days ago" },
  { id: 2, text: "Payment of $400 received", time: "3 days ago" },
  { id: 3, text: 'New project "Admin Panel" added', time: "5 days ago" },
  { id: 4, text: '"Landing Page" is overdue', time: "1 week ago" },
];

const PIE_COLORS = ["#818cf8", "#34d399", "#fbbf24", "#fb7185"];

const cardStyle =
  "rounded-2xl border border-slate-700/50 bg-[#1e293b]/70 p-5 shadow-xl shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40";

function Card({ title, value, icon, color }) {
  return (
    <div className={`${cardStyle} flex items-center gap-4 hover:-translate-y-1`}>
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${color}`}>
        {icon}
      </div>

      <div className="min-w-0">
        <p className="mb-1 text-sm font-medium text-slate-400">{title}</p>
        <p className="text-2xl font-bold tracking-tight text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-400">{label}</span>
        <span className="font-bold text-white">{value}%</span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/70">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function BasicStats({ products }) {
  const total = products.length;
  if (!total) return null;

  const completed = products.filter((p) => p.status === "Completed").length;
  const overdue = products.filter((p) => p.status === "Overdue").length;
  const completionRate = Math.round((completed / total) * 100);
  const avgProgress = Math.round(products.reduce((s, p) => s + p.progress, 0) / total);

  const next = products
    .filter((p) => p.status !== "Completed" && new Date(p.deadline) >= new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

  return (
    <div className={cardStyle}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Basic Stats</h2>
          <p className="mt-1 text-xs text-slate-400">
            Your project performance
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M18 17V9m-5 8V5m-5 12v-5" />
          </svg>
        </div>
      </div>

      <div className="space-y-6">
        <StatBar
          label="Completion rate"
          value={completionRate}
          color="bg-gradient-to-r from-emerald-500 to-green-400"
        />

        <StatBar
          label="Average progress"
          value={avgProgress}
          color="bg-gradient-to-r from-indigo-600 to-violet-400"
        />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-700/70 pt-5">
        <div className="rounded-xl bg-slate-800/60 p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <p className="text-xs font-medium text-slate-400">Overdue</p>
          </div>
          <p className="text-2xl font-bold text-rose-400">{overdue}</p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <p className="text-xs font-medium text-slate-400">Next deadline</p>
          </div>

          <p className="truncate text-sm font-bold text-white">
            {next ? next.name : "None"}
          </p>

          {next && (
            <p className="mt-1 text-xs text-slate-400">{next.deadline}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function EarningsChart() {
  return (
    <div className={cardStyle}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Monthly Earnings</h2>
          <p className="mt-1 text-xs text-slate-400">
            Your monthly income overview
          </p>
        </div>

        <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400">
          Revenue
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyEarnings}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#334155", opacity: 0.3 }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#818cf8" }}
              formatter={(v) => [`$${v}`, "Earnings"]}
            />

            <Bar
              dataKey="amount"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TypesChart({ products }) {

  const data = Object.entries(
    products.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className={cardStyle}>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Projects by Type</h2>
        <p className="mt-1 text-xs text-slate-400">
          Distribution of your projects
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={85}
              innerRadius={48}
              paddingAngle={4}
              label
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={PIE_COLORS[i % PIE_COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#cbd5e1" }}
            />

            <Legend
              formatter={(value) => (
                <span className="text-xs text-slate-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className={cardStyle}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Recent Activity</h2>
          <p className="mt-1 text-xs text-slate-400">
            Latest updates from your workspace
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>

      <ul className="divide-y divide-slate-700/60">
        {activities.map((a) => (
          <li
            key={a.id}
            className="flex items-start justify-between gap-4 py-4 transition-colors duration-200 hover:bg-slate-800/40"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50" />

              <span className="text-sm leading-6 text-slate-300">
                {a.text}
              </span>
            </div>

            <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">
              {a.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Dashboard = () => {
  const products = useProducts((state) => state.products);

  const totalProjects = products.length;

  const earnings = products
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.budget, 0);

  const tasksDue = products.filter((p) => p.status !== "Completed").length;

  return (
    <div className="min-h-screen space-y-7 bg-[#0f172a] p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Dashboard Overview
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Overview
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's a quick overview of your projects.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-2.5">
          <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          </svg>

          <span className="text-xs font-medium text-slate-300">
            Workspace Overview
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card
          title="Total Projects"
          value={totalProjects}
          icon="📁"
          color="bg-indigo-500/15 text-indigo-400"
        />

        <Card
          title="Earnings"
          value={`$${earnings.toLocaleString()}`}
          icon="💰"
          color="bg-emerald-500/15 text-emerald-400"
        />

        <Card
          title="Tasks Due"
          value={tasksDue}
          icon="⏰"
          color="bg-amber-500/15 text-amber-400"
        />
      </div>

      {/* Stats & Project Types */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BasicStats products={products} />
        <TypesChart products={products} />
      </div>

      {/* Earnings & Activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <EarningsChart />
        <RecentActivity />
      </div>

    </div>
  );
};
