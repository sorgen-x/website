import { z } from "npm:zod@3.25.76";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export const bookingFieldsSchema = z.object({
  name: z.string().max(50).trim().min(1),
  phone: z.string().regex(/^1[3-9]\d{9}$/),
  message: z.string().max(500).optional(),
});

export const bookingSchema = bookingFieldsSchema.extend({
  created_at: z.string().datetime({ offset: true }).optional(),
}).strict();

export const submitBookingSchema = bookingFieldsSchema.strict();

export const DEFAULT_FROM = "SORGEN 预约通知 <onboarding@resend.dev>";
export const BOOKING_TO = ["business@sorgenx.com"] as const;

export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const RATE_LIMIT_MAX_PER_WINDOW = 3;
export const RATE_LIMIT_MAX_PER_DAY = 10;

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

export function startOfBeijingDay(date: Date): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return new Date(`${get("year")}-${get("month")}-${get("day")}T00:00:00+08:00`);
}

export type SendBookingEmailInput = {
  fetch: typeof fetch;
  apiKey: string;
  from: string;
  name: string;
  phone: string;
  message?: string;
  submittedAt: Date;
};

export type SendBookingEmailResult =
  | { ok: true; id: string }
  | { ok: false; status: number; details: string };

export async function sendBookingEmail(
  input: SendBookingEmailInput,
): Promise<SendBookingEmailResult> {
  const response = await input.fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${input.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: input.from,
      to: [...BOOKING_TO],
      subject: `新预约体验：${input.name}`,
      text: [
        `姓名：${input.name}`,
        `电话：${input.phone}`,
        `留言：${input.message ?? ""}`,
        `提交时间：${formatBeijingTime(input.submittedAt)}（北京时间 Asia/Shanghai）`,
      ].join("\n"),
    }),
  });
  if (!response.ok) {
    const details = await response.text();
    console.warn("Resend 邮件通知失败", response.status);
    return { ok: false, status: response.status, details };
  }
  const result = await response.json();
  return { ok: true, id: result.id };
}
