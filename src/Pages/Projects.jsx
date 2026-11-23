import { useMemo, useState } from "react";
import {
  Search, LayoutGrid, List, CalendarDays, CheckCircle2, AlertTriangle,
  Clock, Hourglass, Wallet, FolderKanban, SearchX,
} from "lucide-react";
import { useProducts } from "../Store/products";

const STATUS = {
  "In Progress": { icon: Clock,         badge: "bg-blue-50 text-blue-700 ring-blue-200",     bar: "bg-blue-500" },
  Completed:     { icon: CheckCircle2,  badge: "bg-green-50 text-green-700 ring-green-200",  bar: "bg-green-500" },
  Pending:       { icon: Hourglass,     badge: "bg-gray-100 text-gray-700 ring-gray-200",    bar: "bg-gray-400" },
  Overdue:       { icon: AlertTriangle, badge: "bg-red-50 text-red-700 ring-red-200",        bar: "bg-red-500" },
};

const FILTERS = ["All", "In Progress", "Completed", "Pending", "Overdue"];

const daysLeft = (deadline) => Math.ceil((new Date(deadline) - new Date()) / 86400000);

function deadlineLabel(p) {
  if (p.status === "Completed") return "Delivered";
  const d = daysLeft(p.deadline);
  if (d < 0) return `${Math.abs(d)} days late`;
  if (d === 0) return "Due today";
  return `${d} days left`;
}

function StatusBadge({ status }) {
  const { icon: Icon, badge } = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${badge}`}>
      <Icon size={13} />
      {status}
    </span>
  );
}

function ProgressBar({ value, status }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${STATUS[status].bar}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-600 w-9 text-right">{value}%</span>
    </div>
  );
}

function Avatar({ name }) {
  return (
    <div className="w-9 h-9 shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={p.client} />
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{p.name}</h3>
            <p className="text-sm text-gray-500 truncate">{p.client}</p>
          </div>
        </div>
        <StatusBadge status={p.status} />
      </div>

      <ProgressBar value={p.progress} status={p.status} />

      <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} /> {p.deadline}
        </span>
        <span className="flex items-center gap-1.5">
          <Wallet size={15} /> ${p.budget.toLocaleString()}
        </span>
      </div>
      <p className={`text-xs font-medium ${p.status === "Overdue" ? "text-red-600" : "text-gray-500"}`}>
        {deadlineLabel(p)}
      </p>
    </div>
  );
}

function ProjectsTable({ items }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm min-w-[720px]">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="px-5 py-3 font-medium">Project</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium w-48">Progress</th>
            <th className="px-5 py-3 font-medium">Deadline</th>
            <th className="px-5 py-3 font-medium text-right">Budget</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={p.client} />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-gray-500">{p.client}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
              <td className="px-5 py-4"><ProgressBar value={p.progress} status={p.status} /></td>
              <td className="px-5 py-4">
                <p>{p.deadline}</p>
                <p className={`text-xs ${p.status === "Overdue" ? "text-red-600" : "text-gray-500"}`}>
                  {deadlineLabel(p)}
                </p>
              </td>
              <td className="px-5 py-4 text-right font-medium">${p.budget.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Projects = () => {
  const products = useProducts((state) => state.products);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("cards");

  const counts = useMemo(() => {
    const c = { All: products.length };
    products.forEach((p) => (c[p.status] = (c[p.status] || 0) + 1));
    return c;
  }, [products]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products
      .filter((p) => filter === "All" || p.status === filter)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q))
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }, [products, filter, search]);

  const totalBudget = products.reduce((s, p) => s + p.budget, 0);

  return (
    <div className="p-4 space-y-5">
      {/* address */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <FolderKanban size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-gray-500 text-sm">
              {products.length} projects · ${totalBudget.toLocaleString()} total budget
            </p>
          </div>
        </div>
      </div>

      {/* Search and View */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project or client"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1 self-start">
          {[
            { id: "cards", icon: LayoutGrid, label: "Cards" },
            { id: "table", icon: List, label: "Table" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              aria-label={`${label} view`}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm transition-colors ${
                view === id ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 shadow-sm border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f} <span className="opacity-70">({counts[f] || 0})</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm py-16 flex flex-col items-center text-center text-gray-500">
          <SearchX size={36} className="mb-3 text-gray-300" />
          <p className="font-medium text-gray-700">No projects found</p>
          <p className="text-sm">Try a different search or clear the status filter.</p>
        </div>
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      ) : (
        <ProjectsTable items={visible} />
      )}
    </div>
  );
};