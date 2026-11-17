import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Privacy() {
  usePageMeta({
    title: "隐私政策 | SORGEN",
    description: "SORGEN 隐私政策：说明我们如何收集和使用预约咨询中的姓名、电话和留言。",
    path: "/privacy",
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 flex items-center px-6 border-b border-border/50">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回首页</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">隐私政策</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground">最后更新日期：2026年11月17日</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. 信息收集</h2>
            <p>
              本网站由深圳溯元求索智能科技有限公司（简称“溯元”，品牌为 SORGEN / SORGEN X）运营，用于介绍家用恢复舱 Aether，并接收预约体验咨询。
            </p>
            <p>
              仅在您提交预约或联系表单时，我们收集您填写的姓名、电话，以及可选的留言。我们不会通过本网站收集健康数据，也不会要求您创建账户或设置密码。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. 信息使用</h2>
            <p>
              上述信息仅用于就该次咨询与您联系、跟进预约体验。我们不会出售您的个人信息。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. 信息保护</h2>
            <p>
              我们采取合理的安全措施保护您提交的信息，并限制仅用于处理该次咨询。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. 信息共享</h2>
            <p>
              除法律要求或您明确同意的情况外，我们不会将您的个人信息分享给第三方用于其他目的。处理咨询过程中，我们可能使用必要的服务提供商（例如邮件送达），并要求其仅按我们的指示处理信息。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. 您的权利</h2>
            <p>
              您有权访问、更正或删除您通过本表单提交的个人信息。如需行使这些权利，请发送邮件至{" "}
              <a href="mailto:business@sorgenx.com" className="text-link underline-offset-4 hover:underline">
                business@sorgenx.com
              </a>
              。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. 联系我们</h2>
            <p>如果您对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
            <p>公司：深圳溯元求索智能科技有限公司</p>
            <p>
              邮箱：
              <a href="mailto:business@sorgenx.com" className="text-link underline-offset-4 hover:underline">
                business@sorgenx.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
