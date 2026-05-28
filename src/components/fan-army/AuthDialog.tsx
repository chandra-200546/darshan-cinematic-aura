import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
import { DISTRICTS } from "@/lib/fan-army";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

type Mode = "login" | "signup";

export function AuthDialog({ open, onClose, initialMode = "login" }: { open: boolean; onClose: () => void; initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", confirm: "",
    district: "", fan_club_name: "", avatar: null as File | null,
  });

  const update = (k: keyof typeof form, v: string | File | null) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (form.password !== form.confirm) throw new Error("Passwords do not match");
        if (form.password.length < 6) throw new Error("Password must be at least 6 characters");
        if (!form.district) throw new Error("Please choose your district");
        if (!form.full_name.trim()) throw new Error("Full name is required");

        const { data, error } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin + "/fan-army",
            data: {
              full_name: form.full_name.trim(),
              district: form.district,
              fan_club_name: form.fan_club_name.trim() || null,
            },
          },
        });
        if (error) throw error;
        const userId = data.user?.id;
        if (userId && form.avatar) {
          const path = `${userId}/avatar-${Date.now()}-${form.avatar.name}`;
          const { error: upErr } = await supabase.storage.from("avatars").upload(path, form.avatar, { upsert: true });
          if (!upErr) {
            const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
            await supabase.from("profiles").update({ avatar_url: pub.publicUrl }).eq("id", userId);
          }
        }
        toast.success("Welcome to the DBoss Army!");
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
        if (error) throw error;
        toast.success("Jai DBoss! Logged in.");
        onClose();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative w-full max-w-md bg-gradient-to-b from-zinc-950 to-black border border-red-500/40 rounded-2xl shadow-[0_0_60px_-10px_rgba(239,68,68,0.5)] p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-zinc-400 hover:text-amber-300"><X size={20} /></button>
            <h2 className="font-display gold-gradient text-3xl font-bold text-center">{mode === "login" ? "Fan Login" : "Join the Army"}</h2>
            <p className="text-center text-zinc-400 text-xs uppercase tracking-[0.3em] mt-2 mb-6">
              {mode === "login" ? "Welcome back, abhimani" : "Register as a verified DBoss Fan"}
            </p>
            <form onSubmit={submit} className="space-y-3">
              {mode === "signup" && (
                <Field label="Full Name *" value={form.full_name} onChange={(v) => update("full_name", v)} />
              )}
              <Field label="Gmail *" type="email" value={form.email} onChange={(v) => update("email", v)} />
              <Field label="Password *" type="password" value={form.password} onChange={(v) => update("password", v)} />
              {mode === "signup" && (
                <>
                  <Field label="Confirm Password *" type="password" value={form.confirm} onChange={(v) => update("confirm", v)} />
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-amber-300/80">District *</label>
                    <select required value={form.district} onChange={(e) => update("district", e.target.value)}
                      className="mt-1 w-full bg-black/60 border border-amber-500/20 focus:border-amber-400 rounded-md px-3 py-2 text-sm text-amber-50 outline-none">
                      <option value="">Choose district…</option>
                      {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <Field label="Fan Club Name (optional)" value={form.fan_club_name} onChange={(v) => update("fan_club_name", v)} />
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-amber-300/80">Profile Photo</label>
                    <input type="file" accept="image/*" onChange={(e) => update("avatar", e.target.files?.[0] ?? null)}
                      className="mt-1 w-full text-xs text-zinc-400 file:mr-3 file:rounded file:border-0 file:bg-amber-500/20 file:text-amber-200 file:px-3 file:py-1.5" />
                  </div>
                </>
              )}
              <button type="submit" disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:brightness-110 text-black font-bold uppercase tracking-[0.2em] text-sm rounded-md py-3 shadow-[0_0_25px_-5px_rgba(239,68,68,0.6)] flex items-center justify-center gap-2 disabled:opacity-60">
                {loading && <Loader2 className="animate-spin" size={16} />}
                {mode === "login" ? "Enter Fort" : "Become a DBoss Fan"}
              </button>
            </form>
            <p className="text-center text-xs text-zinc-400 mt-4">
              {mode === "login" ? "Not yet registered? " : "Already part of the army? "}
              <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-amber-300 hover:underline">
                {mode === "login" ? "Register here" : "Login"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-amber-300/80">{label}</label>
      <input type={type} required={label.includes("*")} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-black/60 border border-amber-500/20 focus:border-amber-400 rounded-md px-3 py-2 text-sm text-amber-50 outline-none" />
    </div>
  );
}
