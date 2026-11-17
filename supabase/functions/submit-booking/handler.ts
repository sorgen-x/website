import {
  DEFAULT_FROM,
  RATE_LIMIT_MAX_PER_DAY,
  RATE_LIMIT_MAX_PER_WINDOW,
  RATE_LIMIT_WINDOW_MS,
  corsHeaders,
  sendBookingEmail,
  startOfBeijingDay,
  submitBookingSchema,
} from "../_shared/booking.ts";

export type InquiryRecord = {
  created_at: string;
};

export type ServiceDb = {
  countInquiries: (phone: string, sinceIso: string) => Promise<number>;
  insertInquiry: (row: {
    name: string;
    phone: string;
    message: string | null;
  }) => Promise<InquiryRecord>;
};

type Dependencies = {
  getEnv: (name: string) => string | undefined;
  fetch: typeof fetch;
  now: () => Date;
  db: ServiceDb;
};

export function createHandler(dependencies: Dependencies) {
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

  return async (request: Request): Promise<Response> => {
    if (request.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }
    if (request.method !== "POST") return json({ error: "仅支持 POST 请求" }, 405);

    let input: unknown;
    try {
      input = await request.json();
    } catch {
      return json({ error: "请求必须是有效 JSON" }, 400);
    }
    const parsed = submitBookingSchema.safeParse(input);
    if (!parsed.success) {
      return json({ error: "预约信息校验失败", details: parsed.error.flatten() }, 400);
    }

    const supabaseUrl = dependencies.getEnv("SUPABASE_URL");
    const serviceRoleKey = dependencies.getEnv("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: "预约服务未配置" }, 503);
    }

    const booking = parsed.data;
    const message = booking.message ? booking.message : null;
    const now = dependencies.now();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);
    const dayStart = startOfBeijingDay(now);

    try {
      const recentCount = await dependencies.db.countInquiries(booking.phone, windowStart.toISOString());
      if (recentCount >= RATE_LIMIT_MAX_PER_WINDOW) {
        return json({ error: "提交过于频繁，请稍后再试" }, 429);
      }
      const dailyCount = await dependencies.db.countInquiries(booking.phone, dayStart.toISOString());
      if (dailyCount >= RATE_LIMIT_MAX_PER_DAY) {
        return json({ error: "提交过于频繁，请稍后再试" }, 429);
      }
    } catch {
      console.warn("查询预约频率失败");
      return json({ error: "预约服务暂时无法处理请求" }, 500);
    }

    let saved: InquiryRecord;
    try {
      saved = await dependencies.db.insertInquiry({
        name: booking.name,
        phone: booking.phone,
        message,
      });
    } catch {
      console.warn("保存预约失败");
      return json({ error: "预约保存失败，请稍后重试" }, 500);
    }

    const submittedAt = saved.created_at ? new Date(saved.created_at) : now;
    const apiKey = dependencies.getEnv("RESEND_API_KEY");
    const from = dependencies.getEnv("RESEND_FROM") || DEFAULT_FROM;

    if (!apiKey) {
      console.warn("预约已保存，但邮件通知未配置");
      return json({ success: true, notified: false });
    }

    try {
      const result = await sendBookingEmail({
        fetch: dependencies.fetch,
        apiKey,
        from,
        name: booking.name,
        phone: booking.phone,
        message: booking.message,
        submittedAt,
      });
      if (!result.ok) {
        return json({ success: true, notified: false });
      }
      return json({ success: true, notified: true });
    } catch {
      console.warn("预约已保存，但邮件通知未发送成功");
      return json({ success: true, notified: false });
    }
  };
}
