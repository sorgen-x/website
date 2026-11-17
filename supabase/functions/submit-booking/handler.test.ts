import { createHandler, type ServiceDb } from "./handler.ts";
import { submitBookingSchema, startOfBeijingDay } from "../_shared/booking.ts";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const valid = { name: "测试预约", phone: "13800000000" };
const now = new Date("2026-11-17T10:00:00+08:00");

type MockDb = ServiceDb & {
  inserts: Array<{ name: string; phone: string; message: string | null }>;
  counts: Array<{ phone: string; sinceIso: string }>;
  recentCount: number;
  dailyCount: number;
  insertError?: Error;
  countError?: Error;
};

function createMockDb(overrides: Partial<Pick<MockDb, "recentCount" | "dailyCount" | "insertError" | "countError">> = {}): MockDb {
  const db: MockDb = {
    inserts: [],
    counts: [],
    recentCount: 0,
    dailyCount: 0,
    ...overrides,
    async countInquiries(phone, sinceIso) {
      if (db.countError) throw db.countError;
      db.counts.push({ phone, sinceIso });
      const windowStart = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
      if (sinceIso === windowStart) return db.recentCount;
      return db.dailyCount;
    },
    async insertInquiry(row) {
      if (db.insertError) throw db.insertError;
      db.inserts.push(row);
      return { created_at: now.toISOString() };
    },
  };
  return db;
}

function env(overrides: Record<string, string | undefined> = {}) {
  const values: Record<string, string | undefined> = {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-not-a-real-key",
    RESEND_API_KEY: "test-only-not-a-credential",
    ...overrides,
  };
  return (name: string) => values[name];
}

function makeHandler(db: ServiceDb, options: {
  getEnv?: (name: string) => string | undefined;
  fetch?: typeof fetch;
} = {}) {
  return createHandler({
    getEnv: options.getEnv ?? env(),
    fetch: options.fetch ?? (() => { throw new Error("不应调用邮件服务"); }),
    now: () => now,
    db,
  });
}

async function post(handler: (request: Request) => Promise<Response>, body: unknown) {
  return await handler(new Request("http://localhost/submit-booking", {
    method: "POST",
    body: JSON.stringify(body),
  }));
}

Deno.test("姓名必填且最多50字", () => {
  assert(!submitBookingSchema.safeParse({ ...valid, name: " " }).success, "空姓名被接受");
  assert(submitBookingSchema.safeParse({ ...valid, name: "名".repeat(50) }).success, "50字被拒绝");
  assert(!submitBookingSchema.safeParse({ ...valid, name: "名".repeat(51) }).success, "51字被接受");
});

Deno.test("电话必须是中国大陆11位手机号", () => {
  assert(submitBookingSchema.safeParse(valid).success, "有效手机号被拒绝");
  for (const phone of ["", "12800000000", "1380000000", "138000000000", "+8613800000000"]) {
    assert(!submitBookingSchema.safeParse({ ...valid, phone }).success, "无效手机号被接受");
  }
});

Deno.test("留言可空且最多500字，并拒绝额外字段", () => {
  assert(submitBookingSchema.safeParse({ ...valid, message: "" }).success, "空留言被拒绝");
  assert(submitBookingSchema.safeParse({ ...valid, message: "字".repeat(500) }).success, "500字被拒绝");
  assert(!submitBookingSchema.safeParse({ ...valid, message: "字".repeat(501) }).success, "501字被接受");
  assert(!submitBookingSchema.safeParse({ ...valid, created_at: "2026-11-17T02:00:00Z" }).success, "客户端时间被接受");
  assert(!submitBookingSchema.safeParse({ ...valid, to: "other@example.com" }).success, "额外收件人被接受");
});

Deno.test("校验失败时不写入数据库", async () => {
  const db = createMockDb();
  const response = await post(makeHandler(db), { ...valid, phone: "12800000000" });
  assert(response.status === 400, "无效预约未返回400");
  assert(db.inserts.length === 0, "校验失败时写入了数据库");
  assert(db.counts.length === 0, "校验失败时查询了频率");
});

Deno.test("同一手机号10分钟内超过3次返回429且不写入", async () => {
  const db = createMockDb({ recentCount: 3 });
  const response = await post(makeHandler(db), valid);
  assert(response.status === 429, "超频未返回429");
  assert((await response.json()).error === "提交过于频繁，请稍后再试", "超频错误文案不正确");
  assert(db.inserts.length === 0, "超频时写入了数据库");
});

Deno.test("同一手机号北京时间当日超过10次返回429且不写入", async () => {
  const db = createMockDb({ recentCount: 0, dailyCount: 10 });
  const response = await post(makeHandler(db), valid);
  assert(response.status === 429, "日限额未返回429");
  assert(db.inserts.length === 0, "日限额时写入了数据库");
  const dayStart = startOfBeijingDay(now).toISOString();
  assert(db.counts.some((item) => item.sinceIso === dayStart), "未按北京时间当日起始计数");
});

Deno.test("保存成功且邮件发送成功时返回 notified true", async () => {
  const db = createMockDb();
  let payload: Record<string, unknown> | undefined;
  const handler = makeHandler(db, {
    fetch: async (_url, options) => {
      payload = JSON.parse(String(options?.body));
      return new Response(JSON.stringify({ id: "test-email" }), { status: 200 });
    },
  });
  const response = await post(handler, { ...valid, message: "想预约体验" });
  const body = await response.json();
  assert(response.status === 200, "成功提交未返回200");
  assert(body.success === true && body.notified === true, "成功提交未返回 notified true");
  assert(db.inserts.length === 1, "未写入预约");
  assert(db.inserts[0].message === "想预约体验", "留言未保存");
  assert(JSON.stringify(payload?.to) === '["business@sorgenx.com"]', "收件人不正确");
  assert(payload?.subject === "新预约体验：测试预约", "主题不正确");
});

Deno.test("保存成功但邮件失败时仍返回 saved 且 notified false", async () => {
  const db = createMockDb();
  const handler = makeHandler(db, {
    fetch: async () => new Response("resend down", { status: 500 }),
  });
  const response = await post(handler, valid);
  const body = await response.json();
  assert(response.status === 200, "邮件失败不应让预约丢失");
  assert(body.success === true && body.notified === false, "邮件失败应返回 notified false");
  assert(db.inserts.length === 1, "邮件失败时未保留预约");
});

Deno.test("缺少邮件密钥时仍保存预约并返回 notified false", async () => {
  const db = createMockDb();
  const handler = makeHandler(db, {
    getEnv: env({ RESEND_API_KEY: undefined }),
  });
  const response = await post(handler, valid);
  const body = await response.json();
  assert(response.status === 200, "缺少邮件密钥不应丢单");
  assert(body.success === true && body.notified === false, "缺少邮件密钥应返回 notified false");
  assert(db.inserts.length === 1, "缺少邮件密钥时未保留预约");
});

Deno.test("缺少服务角色配置时不写入并返回503", async () => {
  const db = createMockDb();
  const handler = makeHandler(db, {
    getEnv: env({ SUPABASE_SERVICE_ROLE_KEY: undefined }),
  });
  const response = await post(handler, valid);
  assert(response.status === 503, "缺少服务配置未返回503");
  assert(db.inserts.length === 0, "缺少服务配置时写入了数据库");
});
