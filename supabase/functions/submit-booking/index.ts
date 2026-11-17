import { createClient } from "npm:@supabase/supabase-js@2";
import { createHandler, type ServiceDb } from "./handler.ts";

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function createServiceDb(): ServiceDb {
  const supabase = createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  return {
    async countInquiries(phone, sinceIso) {
      const { count, error } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("phone", phone)
        .gte("created_at", sinceIso);
      if (error) throw error;
      return count ?? 0;
    },
    async insertInquiry(row) {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .insert(row)
        .select("created_at")
        .single();
      if (error) throw error;
      if (!data?.created_at) throw new Error("insert did not return created_at");
      return { created_at: data.created_at };
    },
  };
}

Deno.serve(createHandler({
  getEnv: (name) => Deno.env.get(name),
  fetch,
  now: () => new Date(),
  // Client is created at startup; handler still checks env before calling db.
  db: createServiceDb(),
}));
