import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Check, X, Star, Trash2, Crown } from "lucide-react";

export const Route = createFileRoute("/fan-army/admin")({
  head: () => ({ meta: [{ title: "Admin · DBoss Fan Army" }] }),
  component: AdminPage,
});

type Row = { id: string; user_id: string; title: string; type: string; caption: string | null; media_url: string | null; status: string; featured: boolean; district: string | null; created_at: string; profile?: { full_name: string; email: string } };

function AdminPage() {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [tab, setTab] = useState<"pending" | "approved" | "rejected" | "users">("pending");
  const [users, setUsers] = useState<{ id: string; full_name: string; email: string; district: string }[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/fan-army" });
  }, [loading, user, isAdmin, navigate]);

  async function load() {
    if (tab === "users") {
      const { data } = await supabase.from("profiles").select("id, full_name, email, district").order("created_at", { ascending: false });
      setUsers(data ?? []);
      return;
    }
    const { data } = await supabase.from("fan_posts").select("*").eq("status", tab).order("created_at", { ascending: false });
    if (!data) return;
    const ids = data.map((r) => r.user_id);
    const { data: profiles } = await supabase.from("profiles").select("id, full_name, email").in("id", ids);
    const pmap = new Map((profiles ?? []).map((p) => [p.id, p]));
    setRows(data.map((r) => ({ ...r, profile: pmap.get(r.user_id) })));
  }
  useEffect(() => { if (isAdmin) load(); }, [tab, isAdmin]);

  async function setStatus(id: string, status: "approved" | "rejected") {
    const { error } = await supabase.from("fan_posts").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success(status); load(); }
  }
  async function toggleFeature(id: string, featured: boolean) {
    await supabase.from("fan_posts").update({ featured: !featured }).eq("id", id);
    load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("fan_posts").delete().eq("id", id);
    load();
  }

  if (loading || !isAdmin) return <div className="min-h-screen flex items-center justify-center bg-black text-amber-200">Checking access…</div>;

  return (
    <div className="min-h-screen bg-black text-amber-50">
      <Toaster theme="dark" />
      <header className="border-b border-red-500/30 bg-zinc-950/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display gold-gradient text-xl font-bold"><Crown size={18}/> DBoss Admin</div>
        <a href="/fan-army" className="text-xs uppercase tracking-[0.2em] text-amber-200 hover:text-amber-100">← Back to Wall</a>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["pending", "approved", "rejected", "users"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-xs uppercase tracking-[0.2em] rounded-full px-4 py-1.5 border ${tab === t ? "bg-amber-400 text-black border-amber-400" : "border-amber-500/30 text-amber-200"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "users" ? (
          <div className="rounded-xl border border-amber-500/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 text-amber-300 text-xs uppercase tracking-[0.2em]">
                <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">District</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-amber-500/10"><td className="p-3">{u.full_name}</td><td className="p-3 text-zinc-400">{u.email}</td><td className="p-3 text-amber-200">{u.district}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rows.length === 0 && <p className="col-span-full text-center text-zinc-500 py-12">Nothing here.</p>}
            {rows.map((r) => (
              <div key={r.id} className="rounded-xl border border-amber-500/20 bg-zinc-950/70 overflow-hidden">
                {r.media_url && (r.type === "video"
                  ? <video src={r.media_url} controls className="w-full h-48 object-cover" />
                  : <img src={r.media_url} alt="" className="w-full h-48 object-cover" />)}
                <div className="p-4 space-y-2">
                  <div className="font-semibold text-amber-100">{r.title}</div>
                  <div className="text-xs text-zinc-400">{r.profile?.full_name} · {r.district} · {r.type}</div>
                  {r.caption && <p className="text-sm text-zinc-300">{r.caption}</p>}
                  <div className="flex gap-2 pt-2">
                    {tab !== "approved" && <button onClick={() => setStatus(r.id, "approved")} className="flex-1 bg-green-600 text-white rounded text-xs py-1.5 flex items-center justify-center gap-1"><Check size={14}/> Approve</button>}
                    {tab !== "rejected" && <button onClick={() => setStatus(r.id, "rejected")} className="flex-1 bg-zinc-700 text-white rounded text-xs py-1.5 flex items-center justify-center gap-1"><X size={14}/> Reject</button>}
                    {r.status === "approved" && <button onClick={() => toggleFeature(r.id, r.featured)} className={`flex-1 rounded text-xs py-1.5 flex items-center justify-center gap-1 ${r.featured ? "bg-amber-400 text-black" : "bg-amber-500/20 text-amber-200"}`}><Star size={14}/> {r.featured ? "Featured" : "Feature"}</button>}
                    <button onClick={() => remove(r.id)} className="bg-red-600 text-white rounded text-xs px-3 py-1.5"><Trash2 size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
