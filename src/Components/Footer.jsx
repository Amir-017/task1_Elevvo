import { Link } from "react-router-dom";

export const Footer = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Profile", path: "/profile" },
  ];

  const socialClass =
    "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400";

  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-10 transition-colors duration-300 dark:border-slate-700/50 dark:bg-[#0f172a]">
      <div className="mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="flex flex-col justify-between gap-8 md:flex-row">

          {/* Logo & Description */}
          <div className="max-w-sm">
            <Link to="/" className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
                N
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">
                  Nexora
                </h2>
                <p className="text-[10px] font-medium tracking-[2px] text-slate-500 dark:text-slate-400">
                  CLIENT DASHBOARD
                </p>
              </div>
            </Link>

            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
              Manage your workspace, track your projects,
              and stay productive with Nexora.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-500 transition-colors duration-300 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Connect With Us
            </h3>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={socialClass}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.06c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.24-5.11 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.53A11.1 11.1 0 0 0 12 .9Z"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={socialClass}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18V9.65H5.56V18h2.78ZM6.95 8.52a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22ZM18.45 18v-4.57c0-2.45-1.31-3.59-3.05-3.59a2.64 2.64 0 0 0-2.38 1.31V9.65h-2.77V18h2.77v-4.13c0-1.09.21-2.14 1.56-2.14 1.34 0 1.36 1.24 1.36 2.21V18h2.51Z"/>
                </svg>
              </a>

              <a
                href="mailto:hello@nexora.com"
                aria-label="Email"
                className={socialClass}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m3 7 9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-center dark:border-slate-700/50 sm:flex-row">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Made with
            <span className="text-indigo-600 dark:text-indigo-400">♥</span>
            for better productivity
          </p>
        </div>

      </div>
    </footer>
  );
};