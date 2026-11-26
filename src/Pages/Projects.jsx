import { useMemo, useState } from "react";
import {
  Search, LayoutGrid, List, CalendarDays, CheckCircle2, AlertTriangle,
  Clock, Hourglass, Wallet, FolderKanban, SearchX,
} from "lucide-react";
import { useProducts } from "../Store/products";

const STATUS = {
  "In Progress": {
    icon: Clock,
    badge: "bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-400",
    bar: "bg-blue-500",
  },
  Completed: {
    icon: CheckCircle2,
    badge: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  Pending: {
    icon: Hourglass,
    badge: "bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-400",
    bar: "bg-slate-400",
  },
  Overdue: {
    icon: AlertTriangle,
    badge: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-400",
    bar: "bg-rose-500",
  },
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

const cardStyle =
  "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/50 dark:bg-[#1e293b]/70 dark:shadow-xl dark:shadow-black/10 dark:backdrop-blur-sm";

function StatusBadge({ status }) {
  const { icon: Icon, badge } = STATUS[status];

  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badge}`}>
      <Icon size={13} />
      {status}
    </span>
  );
}

function ProgressBar({ value, status }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700/70">
        <div
          className={`h-full rounded-full transition-all duration-500 ${STATUS[status].bar}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-9 text-right text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">
        {value}%
      </span>
    </div>
  );
}

function Avatar({ name }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-sm font-bold text-indigo-700 dark:text-indigo-300">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className={`${cardStyle} flex flex-col gap-5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60 dark:hover:border-indigo-500/40 dark:hover:shadow-indigo-950/30`}>

      {/* Project Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={p.client} />

          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-900 dark:text-white">{p.name}</h3>
            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{p.client}</p>
          </div>
        </div>

        <StatusBadge status={p.status} />
      </div>

      {/* Progress */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Project Progress</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">Completion</span>
        </div>

        <ProgressBar value={p.progress} status={p.status} />
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <CalendarDays size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Deadline</p>
            <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">{p.deadline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Wallet size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Budget</p>
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">
              ${p.budget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Deadline Status */}
      <p className={`border-t border-slate-200 pt-3 text-xs font-semibold dark:border-slate-700/60 ${
        p.status === "Overdue" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"
      }`}>
        {p.status === "Overdue" ? "⚠ " : "● "}
        {deadlineLabel(p)}
      </p>
    </div>
  );
}

function ProjectsTable({ items }) {
  return (
    <div className={`${cardStyle} overflow-x-auto`}>
      <table className="w-full min-w-[720px] text-sm">

        <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400">
          <tr>
            <th className="px-5 py-4 font-semibold">Project</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="w-48 px-5 py-4 font-semibold">Progress</th>
            <th className="px-5 py-4 font-semibold">Deadline</th>
            <th className="px-5 py-4 text-right font-semibold">Budget</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
          {items.map((p) => (
            <tr
              key={p.id}
              className="transition-colors duration-200 hover:bg-indigo-500/5"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={p.client} />

                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{p.client}</p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={p.status} />
              </td>

              <td className="px-5 py-4">
                <ProgressBar value={p.progress} status={p.status} />
              </td>

              <td className="px-5 py-4">
                <p className="text-slate-700 dark:text-slate-300">{p.deadline}</p>
                <p className={`mt-1 text-xs ${
                  p.status === "Overdue" ? "text-rose-600 dark:text-rose-400" : "text-slate-500"
                }`}>
                  {deadlineLabel(p)}
                </p>
              </td>

              <td className="px-5 py-4 text-right font-semibold text-slate-900 dark:text-white">
                ${p.budget.toLocaleString()}
              </td>
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
    <div className="min-h-screen space-y-7 bg-slate-50 p-4 transition-colors duration-300 dark:bg-[#0f172a] sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <FolderKanban size={24} />
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Workspace Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {products.length} projects
              <span className="mx-2 text-slate-400 dark:text-slate-600">·</span>
              ${totalBudget.toLocaleString()} total budget
            </p>
          </div>
        </div>
      </div>

      {/* Search and View */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project or client"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700/60 dark:bg-[#1e293b]/70 dark:text-white dark:shadow-lg dark:shadow-black/5 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex self-start rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700/60 dark:bg-[#1e293b]/70">
          {[
            { id: "cards", icon: LayoutGrid, label: "Cards" },
            { id: "table", icon: List, label: "Table" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              aria-label={`${label} view`}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                view === id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/70 dark:hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
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
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              filter === f
                ? "border-indigo-500/40 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700/60 dark:bg-[#1e293b]/70 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            {f}
            <span className={`rounded-md px-1.5 py-0.5 text-xs ${
              filter === f
                ? "bg-white/15 text-white"
                : "bg-slate-100 text-slate-500 dark:bg-slate-700/70 dark:text-slate-400"
            }`}>
              {counts[f] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">All Projects</h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {visible.length} of {products.length} projects
          </p>
        </div>
      </div>

      {/* Content */}
      {visible.length === 0 ? (
        <div className={`${cardStyle} flex flex-col items-center justify-center px-4 py-20 text-center`}>
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <SearchX size={32} />
          </div>

          <p className="font-semibold text-slate-900 dark:text-white">No projects found</p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try a different search or clear the status filter.
          </p>
        </div>
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <ProjectsTable items={visible} />
      )}
    </div>
  );
};