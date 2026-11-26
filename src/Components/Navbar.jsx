import { NavLink, Link } from "react-router-dom";
import { useProfile } from "../Store/profile";

export const Navbar = () => {
  const name = useProfile((s) => s.profile.name);
  const jobTitle = useProfile((s) => s.profile.jobTitle);

  const links = [
    { name: "Home", path: "/", icon: "⌂" },
    { name: "Projects", path: "/projects", icon: "▦" },
    { name: "Profile", path: "/profile", icon: "◉" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-[#0f172a]/95 px-6 py-4 shadow-xl shadow-black/10 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
            N
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">Nexora</h1>
            <p className="text-[10px] font-medium tracking-[2px] text-slate-400">
              CLIENT DASHBOARD
            </p>
          </div>
        </Link>

        <ul className="flex items-center gap-2 rounded-2xl border border-slate-700/50 bg-slate-800/60 p-1.5">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:bg-slate-700/70 hover:text-white"
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
          <button className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 01-6 0"
              />
            </svg>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#0f172a]" />
          </button>

          <div className="hidden h-8 w-px bg-slate-700 sm:block" />

          <Link to="/profile" className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white">
              {(name || "A").slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-white">{name || "Admin"}</p>
              <p className="text-xs text-slate-400">{jobTitle || "Administrator"}</p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};