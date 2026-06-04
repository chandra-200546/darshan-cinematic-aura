import { useEffect, useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, signOut, type FanProfile } from "@/lib/use-auth";
import { AuthDialog } from "@/components/fan-army/AuthDialog";
import { UploadForm } from "@/components/fan-army/UploadForm";
import { DISTRICTS, DISTRICT_POSITIONS, KARNATAKA_PATH, POST_TYPE_LABEL, nextBirthday } from "@/lib/fan-army";
import { Heart, MessageCircle, Share2, Flame, LogOut, Crown, Trophy, Cake, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import fanArmyKarnataka from "@/assets/fan-army-karnataka.png";

export const Route = createFileRoute("/fan-army")({
  head: () => ({ meta: [
    { title: "DBoss Fan Army — Challenging Star Darshan" },
    { name: "description", content: "Join the DBoss Fan Army. Upload tributes, edits, photos and birthday wishes for Challenging Star Darshan." },
  ]}),
  component: FanArmyPage,
});

type Post = {
  id: string; user_id: string; title: string; type: string; caption: string | null;
  district: string | null; tags: string[] | null; media_url: string | null;
  status: string; featured: boolean; created_at: string;
  profile?: FanProfile;
  likes?: number; reactions?: number; comments?: number; liked?: boolean; reacted?: boolean;
};

function FanArmyPage() {
  const { user, profile, isAdmin, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("latest");
  const [districtFilter, setDistrictFilter] = useState<string>("");
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);

  async function loadPosts() {
    const { data } = await supabase
      .from("fan_posts")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(200);
    if (!data) return;
    const ids = data.map((p) => p.user_id);
    const { data: profiles } = await supabase.from("profiles").select("*").in("id", ids);
    const { data: likes } = await supabase.from("post_likes").select("post_id, user_id");
    const { data: reactions } = await supabase.from("post_reactions").select("post_id, user_id");
    const { data: comments } = await supabase.from("post_comments").select("post_id");
    const pmap = new Map((profiles ?? []).map((p) => [p.id, p as FanProfile]));
    const enriched: Post[] = data.map((p) => {
      const pl = (likes ?? []).filter((l) => l.post_id === p.id);
      const pr = (reactions ?? []).filter((r) => r.post_id === p.id);
      return {
        ...p,
        profile: pmap.get(p.user_id),
        likes: pl.length,
        reactions: pr.length,
        comments: (comments ?? []).filter((c) => c.post_id === p.id).length,
        liked: user ? pl.some((l) => l.user_id === user.id) : false,
        reacted: user ? pr.some((r) => r.user_id === user.id) : false,
      };
    });
    setPosts(enriched);
  }

  useEffect(() => { loadPosts(); }, [user?.id]);

  const filtered = useMemo(() => {
    let list = [...posts];
    if (districtFilter) list = list.filter((p) => p.district === districtFilter);
    if (filter === "photos") list = list.filter((p) => p.type === "photo");
    if (filter === "videos") list = list.filter((p) => p.type === "video");
    if (filter === "edits") list = list.filter((p) => p.type === "edit");
    if (filter === "birthdays") list = list.filter((p) => p.type === "birthday");
    if (filter === "most-liked") list.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    return list;
  }, [posts, filter, districtFilter]);

  const leaderboard = useMemo(() => {
    const map = new Map<string, { profile?: FanProfile; points: number; uploads: number }>();
    for (const p of posts) {
      const cur = map.get(p.user_id) ?? { profile: p.profile, points: 0, uploads: 0 };
      cur.points += 5 + (p.likes ?? 0) + (p.reactions ?? 0) * 2 + (p.comments ?? 0);
      cur.uploads += 1;
      cur.profile = p.profile;
      map.set(p.user_id, cur);
    }
    return [...map.entries()].map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => b.points - a.points).slice(0, 10);
  }, [posts]);

  const districtCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts) if (p.district) c[p.district] = (c[p.district] ?? 0) + 1;
    return c;
  }, [posts]);

  async function toggleLike(p: Post) {
    if (!user) { setAuthMode("login"); setAuthOpen(true); return; }
    if (p.liked) {
      await supabase.from("post_likes").delete().eq("user_id", user.id).eq("post_id", p.id);
    } else {
      await supabase.from("post_likes").insert({ user_id: user.id, post_id: p.id });
    }
    loadPosts();
  }
  async function toggleReact(p: Post) {
    if (!user) { setAuthMode("login"); setAuthOpen(true); return; }
    if (p.reacted) {
      await supabase.from("post_reactions").delete().eq("user_id", user.id).eq("post_id", p.id);
    } else {
      await supabase.from("post_reactions").insert({ user_id: user.id, post_id: p.id });
      toast.success("Jai DBoss! 🔥");
    }
    loadPosts();
  }
  async function share(p: Post) {
    const url = window.location.href + "#post-" + p.id;
    try { await navigator.share?.({ title: p.title, url }); }
    catch { navigator.clipboard.writeText(url); toast.success("Link copied"); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-amber-50">
      <Toaster theme="dark" />
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />

      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-lg bg-black/70 border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display gold-gradient text-xl font-bold tracking-widest">D • BOSS · ARMY</a>
          <div className="flex items-center gap-3">
            {loading ? null : user && profile ? (
              <>
                {isAdmin && <a href="/fan-army/admin" className="hidden sm:inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-amber-300 hover:text-amber-100"><Crown size={14} /> Admin</a>}
                <div className="flex items-center gap-2 text-sm">
                  {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-amber-400/50" />}
                  <span className="hidden sm:inline text-amber-200">{profile.full_name}</span>
                </div>
                <button onClick={signOut} className="text-zinc-400 hover:text-red-400"><LogOut size={18} /></button>
              </>
            ) : (
              <>
                <button onClick={() => { setAuthMode("login"); setAuthOpen(true); }} className="text-xs uppercase tracking-[0.2em] text-amber-200 hover:text-amber-100">Login</button>
                <button onClick={() => { setAuthMode("signup"); setAuthOpen(true); }}
                  className="bg-gradient-to-r from-red-600 to-amber-500 text-black font-bold uppercase tracking-[0.2em] text-xs rounded-md px-4 py-2 shadow-[0_0_20px_-5px_rgba(239,68,68,0.7)]">
                  Join Army
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.18),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.15),transparent_60%)]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
          <p className="text-amber-300/80 uppercase tracking-[0.5em] text-xs mb-4">A Digital Stadium</p>
          <h1 className="font-display gold-gradient text-5xl sm:text-7xl font-black glow-gold">DBoss Fan Army</h1>
          <p className="max-w-2xl mx-auto mt-6 text-zinc-300 text-sm sm:text-base">
            Where every Challenging Star fan stands tall. Upload your edits, photos, tributes and birthday wishes — proudly carry the flag of Karnataka cinema's mass emotion.
          </p>
          {!user && (
            <button onClick={() => { setAuthMode("signup"); setAuthOpen(true); }}
              className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-black font-bold uppercase tracking-[0.2em] text-sm rounded-md px-7 py-3 shadow-[0_0_40px_-5px_rgba(239,68,68,0.7)] hover:brightness-110">
              <Flame size={16} /> Become a Verified Fan
            </button>
          )}
        </motion.div>
      </section>

      {/* BIRTHDAY COUNTDOWN */}
      <BirthdayCountdown />

      {/* DASHBOARD */}
      {user && profile && (
        <Section title="Fan Dashboard" eyebrow="Upload Your Tribute">
          <div className="rounded-2xl border border-amber-500/20 bg-black/50 p-6 sm:p-8 shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]">
            <UploadForm profile={profile} onUploaded={loadPosts} />
            <p className="text-xs text-zinc-500 mt-4 text-center">Posts appear on the public wall after admin approval.</p>
          </div>
        </Section>
      )}

      {/* FAN WALL */}
      <Section title="Live Fan Wall" eyebrow="Approved Tributes">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { k: "latest", label: "Latest" },
            { k: "most-liked", label: "Most Liked" },
            { k: "photos", label: "Photos" },
            { k: "videos", label: "Videos" },
            { k: "edits", label: "Edits" },
            { k: "birthdays", label: "Birthday Wishes" },
          ].map((f) => (
            <button key={f.k} onClick={() => setFilter(f.k)}
              className={`text-xs uppercase tracking-[0.2em] rounded-full px-4 py-1.5 border transition ${filter === f.k ? "bg-amber-400 text-black border-amber-400" : "border-amber-500/30 text-amber-200 hover:border-amber-400"}`}>
              {f.label}
            </button>
          ))}
          <select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}
            className="text-xs uppercase tracking-[0.2em] rounded-full px-3 py-1.5 bg-black border border-amber-500/30 text-amber-200">
            <option value="">All districts</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-zinc-500 py-12">No approved posts yet. Be the first DBoss warrior to upload!</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((p) => (
              <motion.article key={p.id} id={`post-${p.id}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="break-inside-avoid rounded-xl border border-amber-500/15 bg-zinc-950/70 overflow-hidden hover:border-amber-400/60 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] transition">
                {p.media_url && (p.type === "video" ? (
                  <video src={p.media_url} controls className="w-full" />
                ) : (
                  <img src={p.media_url} alt={p.title} className="w-full object-cover" />
                ))}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {p.profile?.avatar_url
                      ? <img src={p.profile.avatar_url} className="w-8 h-8 rounded-full object-cover border border-amber-400/40" alt="" />
                      : <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 text-xs font-bold">{p.profile?.full_name?.[0] ?? "F"}</div>}
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-amber-100">{p.profile?.full_name ?? "Fan"}</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/60">{p.district}</div>
                    </div>
                    {p.featured && <span className="ml-auto text-[9px] uppercase tracking-[0.2em] bg-amber-400 text-black px-2 py-0.5 rounded">Featured</span>}
                  </div>
                  <h3 className="font-display text-amber-50 text-base">{p.title}</h3>
                  <span className="inline-block text-[9px] uppercase tracking-[0.25em] text-red-300 mt-1">{POST_TYPE_LABEL[p.type]}</span>
                  {p.caption && <p className="text-zinc-300 text-sm mt-2">{p.caption}</p>}
                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <button onClick={() => toggleLike(p)} className={`flex items-center gap-1 hover:text-red-400 ${p.liked ? "text-red-500" : "text-zinc-400"}`}>
                      <Heart size={15} fill={p.liked ? "currentColor" : "none"} /> {p.likes}
                    </button>
                    <button onClick={() => toggleReact(p)} className={`flex items-center gap-1 hover:text-amber-400 ${p.reacted ? "text-amber-400" : "text-zinc-400"}`}>
                      <Flame size={15} /> Jai DBoss · {p.reactions}
                    </button>
                    <span className="flex items-center gap-1 text-zinc-400"><MessageCircle size={14} /> {p.comments}</span>
                    <button onClick={() => share(p)} className="ml-auto text-zinc-400 hover:text-amber-300"><Share2 size={15} /></button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </Section>

      {/* KARNATAKA MAP */}
      <Section title="Karnataka Fan Map" eyebrow="District-wise Army">
        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 items-center">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-black/60 p-3 shadow-[0_0_60px_-20px_rgba(245,158,11,0.45)]">
            <img
              src={fanArmyKarnataka}
              alt="DBoss Fan Army Karnataka tribute collage"
              className="h-auto w-full rounded-xl object-cover"
            />
            {false && <svg viewBox="0 0 1000 1000" className="w-full h-auto">
              <defs>
                <radialGradient id="kgrad" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <path d={KARNATAKA_PATH} fill="url(#kgrad)" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.5" />
              {DISTRICTS.map((d) => {
                const pos = DISTRICT_POSITIONS[d];
                const count = districtCounts[d] ?? 0;
                const r = 8 + Math.min(count * 2, 18);
                const active = activeDistrict === d;
                return (
                  <g key={d} onClick={() => setActiveDistrict(d)} style={{ cursor: "pointer" }}>
                    <circle cx={pos.x} cy={pos.y} r={r} fill={active ? "#fbbf24" : "#dc2626"} fillOpacity={0.8}
                      stroke="#fde68a" strokeWidth={active ? 3 : 1}>
                      <title>{d} — {count} posts</title>
                    </circle>
                    {count > 0 && <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize="11" fill="#000" fontWeight="bold">{count}</text>}
                  </g>
                );
              })}
            </svg>}
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-black/60 p-6">
            <div className="flex items-center gap-2 text-amber-300 mb-3"><MapPin size={18} /> <span className="font-display text-xl">{activeDistrict ?? "Choose a district"}</span></div>
            {activeDistrict ? (
              <DistrictDetails district={activeDistrict} posts={posts.filter((p) => p.district === activeDistrict)} />
            ) : (
              <p className="text-zinc-400 text-sm">Tap any glowing marker to see fans, clubs and tributes from that district.</p>
            )}
          </div>
        </div>
      </Section>

      {/* LEADERBOARD */}
      <Section title="Top Fans This Week" eyebrow="Leaderboard">
        <div className="grid gap-3">
          {leaderboard.length === 0 && <p className="text-center text-zinc-500">Leaderboard awakens when fans start uploading.</p>}
          {leaderboard.map((row, i) => {
            const badge = i === 0 ? "DBoss Army Legend" : i === 1 ? "Challenging Star Supporter" : i === 2 ? "Mass Fan of the Week" : "Karnataka DBoss Warrior";
            return (
              <div key={row.id} className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-zinc-950/70 p-4 hover:border-amber-400/60 transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i === 0 ? "bg-amber-400 text-black" : i === 1 ? "bg-amber-300/70 text-black" : i === 2 ? "bg-orange-400/70 text-black" : "bg-zinc-800 text-amber-200"}`}>
                  {i === 0 ? <Trophy size={18} /> : i + 1}
                </div>
                {row.profile?.avatar_url
                  ? <img src={row.profile.avatar_url} className="w-12 h-12 rounded-full object-cover border border-amber-400/40" alt="" />
                  : <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 font-bold">{row.profile?.full_name?.[0] ?? "F"}</div>}
                <div className="flex-1">
                  <div className="font-semibold text-amber-100">{row.profile?.full_name ?? "Fan"}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300/70">{row.profile?.district}</div>
                </div>
                <div className="text-right">
                  <div className="font-display gold-gradient text-2xl font-bold">{row.points}</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-amber-300/70">{badge}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* BIRTHDAY WISHES */}
      <Section title="Birthday Wishes" eyebrow="For Our Star">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.filter((p) => p.type === "birthday").slice(0, 12).map((p) => (
            <div key={p.id} className="rounded-xl border border-red-500/30 bg-gradient-to-b from-red-950/30 to-black p-5">
              <div className="flex items-center gap-2 mb-3">
                <Cake className="text-amber-300" size={18} />
                <div className="text-sm font-semibold text-amber-100">{p.profile?.full_name}</div>
                <span className="text-[10px] text-amber-300/70 ml-auto">{p.district}</span>
              </div>
              <p className="text-zinc-200 text-sm italic">"{p.caption || p.title}"</p>
              {p.media_url && <img src={p.media_url} className="mt-3 rounded-md w-full" alt="" />}
            </div>
          ))}
          {posts.filter((p) => p.type === "birthday").length === 0 && (
            <p className="col-span-full text-center text-zinc-500">Be the first to wish DBoss a happy birthday!</p>
          )}
        </div>
      </Section>

      <footer className="text-center py-10 text-xs text-zinc-500 border-t border-amber-500/10">
        DBoss Fan Army — A digital stadium built by fans, for fans. Jai DBoss!
      </footer>
    </div>
  );
}

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-300/80 uppercase tracking-[0.4em] text-[10px] mb-3">{eyebrow}</p>
          <h2 className="font-display gold-gradient text-3xl sm:text-5xl font-bold">{title}</h2>
          <div className="mx-auto mt-4 h-px w-24 gold-line" />
        </div>
        {children}
      </div>
    </section>
  );
}

function DistrictDetails({ district, posts }: { district: string; posts: Post[] }) {
  const fans = new Map<string, FanProfile>();
  const clubs = new Set<string>();
  for (const p of posts) {
    if (p.profile) fans.set(p.profile.id, p.profile);
    if (p.profile?.fan_club_name) clubs.add(p.profile.fan_club_name);
  }
  const topFan = [...fans.values()][0];
  return (
    <div className="space-y-3 text-sm">
      <div><span className="text-amber-300/70 uppercase tracking-[0.2em] text-[10px]">Registered Fans:</span> <span className="text-amber-100 font-bold">{fans.size}</span></div>
      <div><span className="text-amber-300/70 uppercase tracking-[0.2em] text-[10px]">Posts:</span> <span className="text-amber-100 font-bold">{posts.length}</span></div>
      {clubs.size > 0 && <div><span className="text-amber-300/70 uppercase tracking-[0.2em] text-[10px]">Fan Clubs:</span> <div className="mt-1 flex flex-wrap gap-2">{[...clubs].map((c) => <span key={c} className="text-xs bg-amber-500/15 text-amber-200 rounded px-2 py-1">{c}</span>)}</div></div>}
      {topFan && <div className="pt-2"><span className="text-amber-300/70 uppercase tracking-[0.2em] text-[10px]">Most Active:</span> <span className="text-amber-100 font-semibold">{topFan.full_name}</span></div>}
      {posts.slice(0, 3).map((p) => (
        <div key={p.id} className="text-xs text-zinc-400 border-l-2 border-amber-500/40 pl-2">{p.title}</div>
      ))}
    </div>
  );
}

function BirthdayCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = nextBirthday().getTime() - Date.now();
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="px-6 py-12">
      <div className="max-w-4xl mx-auto rounded-2xl border border-amber-500/30 bg-gradient-to-r from-red-950/50 via-black to-amber-950/30 p-8 text-center shadow-[0_0_50px_-15px_rgba(245,158,11,0.4)]">
        <p className="text-amber-300/80 uppercase tracking-[0.4em] text-[10px] mb-3 flex items-center justify-center gap-2"><Cake size={14}/> Countdown</p>
        <h3 className="font-display gold-gradient text-2xl sm:text-3xl font-bold mb-6">To DBoss Birthday — 16 February</h3>
        <div className="flex justify-center gap-4 sm:gap-8">
          {[["Days", t.d], ["Hours", t.h], ["Mins", t.m], ["Secs", t.s]].map(([l, v]) => (
            <div key={l as string} className="text-center">
              <div className="font-display gold-gradient text-4xl sm:text-6xl font-black glow-gold tabular-nums">{String(v).padStart(2, "0")}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300/80 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
