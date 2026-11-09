import { bookingSchema, createHandler, formatBeijingTime } from "./handler.ts";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const valid = { name: "测试预约", phone: "13800000000" };

Deno.test("姓名必填且最多50字", () => {
  assert(!bookingSchema.safeParse({ ...valid, name: " " }).success, "空姓名被接受");
  assert(bookingSchema.safeParse({ ...valid, name: "名".repeat(50) }).success, "50字被拒绝");
  assert(!bookingSchema.safeParse({ ...valid, name: "名".repeat(51) }).success, "51字被接受");
});

Deno.test("电话必须是中国大陆11位手机号", () => {
  assert(bookingSchema.safeParse(valid).success, "有效手机号被拒绝");
  for (const phone of ["", "12800000000", "1380000000", "138000000000", "+8613800000000"]) {
    assert(!bookingSchema.safeParse({ ...valid, phone }).success, "无效手机号被接受");
  }
});

Deno.test("留言可空且最多500字", () => {
  assert(bookingSchema.safeParse({ ...valid, message: "" }).success, "空留言被拒绝");
  assert(bookingSchema.safeParse({ ...valid, message: "字".repeat(500) }).success, "500字被拒绝");
  assert(!bookingSchema.safeParse({ ...valid, message: "字".repeat(501) }).success, "501字被接受");
});

Deno.test("拒绝额外字段与无效时间", () => {
  assert(!bookingSchema.safeParse({ ...valid, to: "other@example.com" }).success, "额外收件人被接受");
  assert(!bookingSchema.safeParse({ ...valid, created_at: "invalid" }).success, "无效时间被接受");
});

Deno.test("北京时间格式精确到秒", () => {
  assert(formatBeijingTime(new Date("2026-11-09T10:40:00Z")) === "2026-11-09 18:40:00", "北京时间不正确");
});

Deno.test("缺少邮件密钥返回明确错误并保留CORS", async () => {
  const handler = createHandler({
    getEnv: () => undefined,
    fetch: () => { throw new Error("不应调用邮件服务"); },
    now: () => new Date("2026-11-09T10:40:00Z"),
  });
  const response = await handler(new Request("http://localhost/notify-booking", {
    method: "POST", body: JSON.stringify(valid),
  }));
  assert(response.status === 503, "缺少密钥未返回503");
  assert((await response.json()).error.includes("RESEND_API_KEY"), "缺少明确配置提示");
  assert(response.headers.has("Access-Control-Allow-Origin"), "缺少CORS");
});

Deno.test("通知使用固定商务收件人与指定发件人，纯文本包含预约信息", async () => {
  for (const sender of [undefined, "SORGEN <booking@sorgenx.com>"]) {
    let payload: Record<string, unknown> | undefined;
    const handler = createHandler({
      getEnv: (name) => name === "RESEND_FROM" ? sender : "test-only-not-a-credential",
      fetch: async (_url, options) => {
        payload = JSON.parse(String(options?.body));
        return new Response(JSON.stringify({ id: "test-email" }), { status: 200 });
      },
      now: () => new Date("2026-11-09T10:40:00Z"),
    });
    const response = await handler(new Request("http://localhost/notify-booking", {
      method: "POST", body: JSON.stringify(valid),
    }));
    assert(response.status === 200, "有效通知未成功");
    assert(JSON.stringify(payload?.to) === '["business@sorgenx.com"]', "收件人不正确");
    assert(payload?.from === (sender ?? "SORGEN 预约通知 <onboarding@resend.dev>"), "发件人不正确");
    assert(payload?.subject === "新预约体验：测试预约", "主题不正确");
    assert(payload?.text === "姓名：测试预约\n电话：13800000000\n留言：\n提交时间：2026-11-09 18:40:00（北京时间 Asia/Shanghai）", "预约信息不完整");
    assert(!Object.hasOwn(payload ?? {}, "html"), "不应发送HTML");
  }
});
