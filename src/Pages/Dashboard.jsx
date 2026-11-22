import { useProducts } from "../Store/products";

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

export const Dashboard = () => {
  const products = useProducts((state) => state.products);

  const totalProjects = products.length;
  const earnings = products
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.budget, 0);
  const tasksDue = products.filter((p) => p.status !== "Completed").length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <p className="text-gray-600 mb-4">Here's a quick overview of your projects.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Projects" value={totalProjects} icon="📁" color="bg-blue-100" />
        <Card title="Earnings" value={`$${earnings.toLocaleString()}`} icon="💰" color="bg-green-100" />
        <Card title="Tasks Due" value={tasksDue} icon="⏰" color="bg-yellow-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <BasicStats products={products} />
      </div>
    </div>
  );
};