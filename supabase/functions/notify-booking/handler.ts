import {
  DEFAULT_FROM,
  bookingSchema,
  corsHeaders,
  formatBeijingTime,
  sendBookingEmail,
} from "../_shared/booking.ts";

export { bookingSchema, formatBeijingTime };

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
    const from = dependencies.getEnv("RESEND_FROM") || DEFAULT_FROM;
    const booking = parsed.data;
    const submittedAt = booking.created_at ? new Date(booking.created_at) : dependencies.now();

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
        return json({ error: "邮件服务发送失败", status: result.status, details: result.details }, result.status);
      }
      return json({ success: true, id: result.id });
    } catch {
      console.warn("Resend 邮件服务暂时无法连接");
      return json({ error: "邮件服务暂时无法连接" }, 502);
    }
  };
}

