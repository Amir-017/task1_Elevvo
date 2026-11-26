import { NavLink, Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useProfile } from "../Store/profile";
import { useTheme } from "../Store/theme";

export const Navbar = () => {
  const name = useProfile((s) => s.profile.name);
  const jobTitle = useProfile((s) => s.profile.jobTitle);
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);

  const links = [
    { name: "Home", path: "/", icon: "⌂" },
    { name: "Projects", path: "/projects", icon: "▦" },
    { name: "Profile", path: "/profile", icon: "◉" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-slate-700/50 dark:bg-[#0f172a]/95 dark:shadow-xl dark:shadow-black/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
            N
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">Nexora</h1>
            <p className="text-[10px] font-medium tracking-[2px] text-slate-500 dark:text-slate-400">
              CLIENT DASHBOARD
            </p>
          </div>
        </Link>

        <ul className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-700/50 dark:bg-slate-800/60">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/70 dark:hover:text-white"
                  }`
                }
              >
                <span>{link.icon}</span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
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
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{name || "Admin"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{jobTitle || "Administrator"}</p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};