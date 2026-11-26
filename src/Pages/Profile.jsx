import { useState } from "react";
import { User, Mail, Phone, Briefcase, Lock, Save } from "lucide-react";
import { useProfile } from "../Store/profile";

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative mt-1">
        <Icon size={16} className="absolute left-3 top-3 text-gray-400" />
        {children}
      </div>
    </label>
  );
}

const inputClass =
  "w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300";

export const Profile = () => {
  const saved = useProfile((s) => s.profile);
  const saveProfile = useProfile((s) => s.saveProfile);

  const [form, setForm] = useState(saved);
  const [password, setPassword] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile({ ...form, name: form.name.trim() });
    setPassword(""); // الباسورد مش بيتخزن
    alert("Profile saved successfully");
  };

  const initials = (form.name || "?").slice(0, 2).toUpperCase();

  return (
    <div className="p-4 max-w-3xl">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <p className="text-gray-500 text-sm mb-5">Update your personal information.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        {/* الصورة الرمزية */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-semibold">
            {initials}
          </div>
          <div>
            <p className="font-semibold">{form.name || "Your name"}</p>
            <p className="text-sm text-gray-500">{form.jobTitle || "Your job title"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full name" icon={User}>
            <input name="name" value={form.name} onChange={handleChange} required
              placeholder="Amir Whdan" className={inputClass} />
          </Field>

          <Field label="Email" icon={Mail}>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              placeholder="you@example.com" className={inputClass} />
          </Field>

          <Field label="Phone" icon={Phone}>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="+20 100 000 0000" className={inputClass} />
          </Field>

          <Field label="Job title" icon={Briefcase}>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange}
              placeholder="Front-End Developer" className={inputClass} />
          </Field>

          <div className="md:col-span-2">
            <Field label="Password" icon={Lock}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete="new-password" className={inputClass} />
            </Field>
          </div>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-gray-700">Bio</span>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={4}
              placeholder="Tell us a little about yourself"
              className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => setForm(saved)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50">
            Reset
          </button>
          <button type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2">
            <Save size={16} /> Save changes
          </button>
        </div>
      </form>
    </div>
  );
};