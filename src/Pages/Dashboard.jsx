import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
} from "recharts";
import { useProducts } from "../Store/products";

// بيانات وهمية للرسم والأنشطة
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

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
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
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Basic Stats</h2>

      <div className="space-y-4">
        <StatBar label="Completion rate" value={completionRate} color="bg-green-500" />
        <StatBar label="Average progress" value={avgProgress} color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-gray-100 text-sm">
        <div>
          <p className="text-gray-500">Overdue</p>
          <p className="text-xl font-bold text-red-600">{overdue}</p>
        </div>
        <div>
          <p className="text-gray-500">Next deadline</p>
          <p className="font-semibold">{next ? next.name : "None"}</p>
          {next && <p className="text-gray-500">{next.deadline}</p>}
        </div>
      </div>
    </div>
  );
}

function EarningsChart() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Monthly Earnings</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v) => `$${v}`} />
            <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TypesChart({ products }) {
  // بيعدّ المشاريع حسب النوع: [{ name: "Design", value: 2 }, ...]
  const data = Object.entries(
    products.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Projects by Type</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="divide-y divide-gray-100">
        {activities.map((a) => (
          <li key={a.id} className="py-3 flex justify-between gap-4 text-sm">
            <span>{a.text}</span>
            <span className="text-gray-500 whitespace-nowrap">{a.time}</span>
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
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-gray-600">Here's a quick overview of your projects.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Projects" value={totalProjects} icon="📁" color="bg-blue-100" />
        <Card title="Earnings" value={`$${earnings.toLocaleString()}`} icon="💰" color="bg-green-100" />
        <Card title="Tasks Due" value={tasksDue} icon="⏰" color="bg-yellow-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BasicStats products={products} />
        <TypesChart products={products} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EarningsChart />
        <RecentActivity />
      </div>
    </div>
  );
};