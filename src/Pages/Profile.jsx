
import { useState } from "react";
import Swal from "sweetalert2";
import { User, Mail, Phone, Briefcase, Lock, Save } from "lucide-react";
import { useProfile } from "../Store/profile";

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </span>

      <div className="relative">
        <Icon
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
        {children}
      </div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-700/60 bg-slate-800/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

export const Profile = () => {
  const saved = useProfile((s) => s.profile);
  const saveProfile = useProfile((s) => s.saveProfile);

  const [form, setForm] = useState(saved);
  const [password, setPassword] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    saveProfile({ ...form, name });
    setPassword("");

    Swal.fire({
      icon: "success",
      title: "Profile saved",
      text: `Your changes have been saved, ${name}.`,
      confirmButtonText: "Done",
      confirmButtonColor: "#4f46e5",
      timer: 2500,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
      },
    });
  };

  const handleReset = () => {
    setForm(saved);
    setPassword("");
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "Changes discarded",
      showConfirmButton: false,
      timer: 1800,
    });
  };

  const initials = (form.name || "?").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen space-y-7 bg-[#0f172a] p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Account Management
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Profile Settings
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Profile Content */}
      <div className="mx-auto max-w-4xl space-y-5">

        {/* Profile Overview */}
        <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-[#1e293b]/70 shadow-xl shadow-black/10">

          <div className="h-28 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 sm:h-36" />

          <div className="px-6 pb-6">
            <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-[#1e293b] bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white shadow-xl">
                  {initials}
                </div>

                <div className="pb-1">
                  <h2 className="text-lg font-bold text-white">
                    {form.name || "Your name"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {form.jobTitle || "Your job title"}
                  </p>
                </div>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700/50 bg-[#1e293b]/70 p-5 shadow-xl shadow-black/10 backdrop-blur-sm sm:p-7"
        >

          {/* Form Header */}
          <div className="mb-7 flex items-center gap-3 border-b border-slate-700/60 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <User size={22} />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Personal Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Update your personal details below.
              </p>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Field label="Full Name" icon={User}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Amir Whdan"
                className={inputClass}
              />
            </Field>

            <Field label="Email Address" icon={Mail}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Phone Number" icon={Phone}>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+20 100 000 0000"
                className={inputClass}
              />
            </Field>

            <Field label="Job Title" icon={Briefcase}>
              <input
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="Front-End Developer"
                className={inputClass}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Password" icon={Lock}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass}
                />
              </Field>
              <p className="mt-2 text-xs text-slate-500">
                Enter a new password if you want to change it.
              </p>
            </div>

            {/* Bio */}
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-300">
                About Me
              </span>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us a little about yourself..."
                className="w-full resize-none rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </label>

          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-700/60 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-600/70 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
            >
              Reset Changes
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30"
            >
              <Save size={17} />
              Save Changes
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};
