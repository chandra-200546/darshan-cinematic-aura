import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type FanProfile = {
  id: string;
  full_name: string;
  email: string;
  district: string;
  avatar_url: string | null;
  fan_club_name: string | null;
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<FanProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const user: User | undefined = session?.user;
    if (!user) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }
    (async () => {
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id),
      ]);
      setProfile((prof as FanProfile) ?? null);
      setIsAdmin(!!roles?.some((r: { role: string }) => r.role === "admin"));
    })();
  }, [session]);

  return { session, user: session?.user ?? null, profile, isAdmin, loading };
}

export async function signOut() {
  await supabase.auth.signOut();
}
