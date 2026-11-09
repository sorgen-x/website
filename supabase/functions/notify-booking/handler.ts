import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.25.76";

export const bookingSchema = z.object({
  name: z.string().max(50).trim().min(1),
  phone: z.string().regex(/^1[3-9]\d{9}$/),
  message: z.string().max(500).optional(),
  created_at: z.string().datetime({ offset: true }).optional(),
}).strict();

export function formatBeijingTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

type Dependencies = {
  getEnv: (name: string) => string | undefined;
  fetch: typeof fetch;
  now: () => Date;
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
    const parsed = bookingSchema.safeParse(input);
    if (!parsed.success) {
      return json({ error: "预约信息校验失败", details: parsed.error.flatten() }, 400);
    }

    const apiKey = dependencies.getEnv("RESEND_API_KEY");
    if (!apiKey) {
      return json({ error: "邮件通知未配置：请在 Cloud Secrets 添加 RESEND_API_KEY" }, 503);
    }
    const from = dependencies.getEnv("RESEND_FROM") || "SORGEN 预约通知 <onboarding@resend.dev>";
    const booking = parsed.data;
    const submittedAt = booking.created_at ? new Date(booking.created_at) : dependencies.now();

    try {
      const response = await dependencies.fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: ["business@sorgenx.com"],
          subject: `新预约体验：${booking.name}`,
          text: [
            `姓名：${booking.name}`,
            `电话：${booking.phone}`,
            `留言：${booking.message ?? ""}`,
            `提交时间：${formatBeijingTime(submittedAt)}（北京时间 Asia/Shanghai）`,
          ].join("\n"),
        }),
      });
      if (!response.ok) {
        const details = await response.text();
        console.warn("Resend 邮件通知失败", response.status);
        return json({ error: "邮件服务发送失败", status: response.status, details }, response.status);
      }
      const result = await response.json();
      return json({ success: true, id: result.id });
    } catch {
      console.warn("Resend 邮件服务暂时无法连接");
      return json({ error: "邮件服务暂时无法连接" }, 502);
    }
  };
}
