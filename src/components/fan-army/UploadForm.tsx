import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DISTRICTS, POST_TYPE_LABEL } from "@/lib/fan-army";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import type { FanProfile } from "@/lib/use-auth";

const TYPES = ["photo", "video", "message", "edit", "birthday"] as const;

export function UploadForm({ profile, onUploaded }: { profile: FanProfile; onUploaded: () => void }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<typeof TYPES[number]>("photo");
  const [caption, setCaption] = useState("");
  const [district, setDistrict] = useState(profile.district);
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let media_url: string | null = null;
      if (file) {
        const path = `${profile.id}/${type}-${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("fan-uploads").upload(path, file);
        if (error) throw error;
        const { data: pub } = supabase.storage.from("fan-uploads").getPublicUrl(path);
        media_url = pub.publicUrl;
      }
      if (!media_url && type !== "message" && type !== "birthday") {
        throw new Error("Please attach a file for this post type");
      }
      const tagArr = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const { error } = await supabase.from("fan_posts").insert({
        user_id: profile.id, title, type, caption, district, tags: tagArr, media_url,
      });
      if (error) throw error;
      toast.success("Submitted! Waiting for admin approval. Jai DBoss!");
      setTitle(""); setCaption(""); setTags(""); setFile(null);
      onUploaded();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
      <L label="Post title *"><input required value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT} /></L>
      <L label="Upload type *">
        <select value={type} onChange={(e) => setType(e.target.value as typeof TYPES[number])} className={INPUT}>
          {TYPES.map((t) => <option key={t} value={t}>{POST_TYPE_LABEL[t]}</option>)}
        </select>
      </L>
      <L label="Caption" className="sm:col-span-2">
        <textarea rows={3} value={caption} onChange={(e) => setCaption(e.target.value)} className={INPUT} />
      </L>
      <L label="District">
        <select value={district} onChange={(e) => setDistrict(e.target.value)} className={INPUT}>
          {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </L>
      <L label="Tags (comma separated)"><input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="DBoss, Kaatera, Mass" className={INPUT} /></L>
      <L label={`Upload file ${type === "message" || type === "birthday" ? "(optional)" : "*"}`} className="sm:col-span-2">
        <input type="file" accept={type === "video" ? "video/*" : type === "photo" || type === "edit" ? "image/*" : "image/*,video/*"}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-xs text-zinc-400 file:mr-3 file:rounded file:border-0 file:bg-amber-500/20 file:text-amber-200 file:px-3 file:py-1.5" />
      </L>
      <button type="submit" disabled={loading}
        className="sm:col-span-2 mt-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:brightness-110 text-black font-bold uppercase tracking-[0.2em] text-sm rounded-md py-3 flex items-center justify-center gap-2 shadow-[0_0_25px_-5px_rgba(239,68,68,0.6)] disabled:opacity-60">
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
        Submit Tribute
      </button>
    </form>
  );
}

const INPUT = "w-full bg-black/60 border border-amber-500/20 focus:border-amber-400 rounded-md px-3 py-2 text-sm text-amber-50 outline-none";
function L({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-[10px] uppercase tracking-[0.25em] text-amber-300/80">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
