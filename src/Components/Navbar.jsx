import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useProfile } from "../Store/profile";
import { useTheme } from "../Store/theme";

export const Navbar = () => {
  const name = useProfile((s) => s.profile.name);
  const jobTitle = useProfile((s) => s.profile.jobTitle);
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: "⌂" },
    { name: "Projects", path: "/projects", icon: "▦" },
    { name: "Profile", path: "/profile", icon: "◉" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
        : "text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/70 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/50 dark:bg-[#0f172a]/95 dark:shadow-xl dark:shadow-black/10 sm:px-6 sm:py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
            N
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white sm:text-xl">Nexora</h1>
            <p className="hidden text-[10px] font-medium tracking-[2px] text-slate-500 dark:text-slate-400 min-[400px]:block">
              CLIENT DASHBOARD
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-700/50 dark:bg-slate-800/60 md:flex">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} end={link.path === "/"} className={linkClass}>
                <span>{link.icon}</span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

          <Link to="/profile" className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">
              {(name || "A").slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{name || "Admin"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{jobTitle || "Administrator"}</p>
            </div>
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="mt-3 space-y-1 rounded-2xl border border-slate-200 bg-slate-100 p-2 dark:border-slate-700/50 dark:bg-slate-800/60 md:hidden">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                <span>{link.icon}</span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};