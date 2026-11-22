import { useProducts } from "../Store/products"



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



export const Dashboard = () => {
    const products = useProducts((state) => state.products)
    console.log(products)
   const totalProjects = products.length;

  const earnings = products
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.budget, 0);

  const tasksDue = products.filter((p) => p.status !== "Completed").length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <p className="text-gray-600 mb-4">Here's a quick overview of your projects.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Projects" value={totalProjects} icon="📁" color="bg-blue-100" />
        <Card title="Earnings" value={`$${earnings.toLocaleString()}`} icon="💰" color="bg-green-100" />
        <Card title="Tasks Due" value={tasksDue} icon="⏰" color="bg-yellow-100" />
      </div>
    </div>
  );
}